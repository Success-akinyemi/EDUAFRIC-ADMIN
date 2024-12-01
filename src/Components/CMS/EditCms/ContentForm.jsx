import { IoIosArrowDown } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import toast from "react-hot-toast";

function ContentForm({ formData, setFormData, handleChange, setErrorMsg, data }) {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleMessageChange = (value) => {
    setFormData({ ...formData, message: value });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (files.length > 1) {
      setErrorMsg("Only one image is allowed.");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }

    const file = files[0];
    handleImageUpload(file);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    if (isUploading) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Only image files are allowed.");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size should not exceed 5MB.");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }

    setIsUploading(true);
    try {
      const startTime = new Date();
      const fileName = file.name;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      // Initiate multipart upload
      const initRes = await fetch(`${baseUrl}/initiateUpload`, {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: { "Content-Type": "application/json" },
      });
      const { uploadId } = await initRes.json();

      // Upload file chunks
      const uploadPromises = [];
      let uploadedChunks = 0;
      let start = 0,
        end;

      for (let i = 0; i < totalChunks; i++) {
        end = start + CHUNK_SIZE;
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append("index", i);
        formData.append("totalChunks", totalChunks);
        formData.append("fileName", fileName);
        formData.append("file", chunk);

        const uploadPromise = fetch(`${baseUrl}/uploadFile?uploadId=${uploadId}`, {
          method: "POST",
          body: formData,
        }).then(() => {
          uploadedChunks++;
          const progressValue = Math.floor((uploadedChunks / totalChunks) * 100);
          setProgress(progressValue);
        });
        uploadPromises.push(uploadPromise);
        start = end;
      }

      await Promise.all(uploadPromises);

      // Complete multipart upload
      const completeRes = await fetch(
        `${baseUrl}/completeUpload?fileName=${fileName}&uploadId=${uploadId}`,
        { method: "POST" }
      );
      const { success, data } = await completeRes.json();

      if (!success) throw new Error("Error completing upload");

      const endTime = new Date();
      console.log("Upload completed in", (endTime - startTime) / 1000, "seconds");

      toast.success("Image Uploaded Successfully");
      setFormData({ ...formData, image: data });
      setProgress(0); // Reset progress after upload
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-[12px]">
      <div className="inputGroup gap-[30px] mb-[30px]">
        <label className="label text-primary-color flex items-center gap-1 text-[16px] font-semibold">
          <IoIosArrowDown />
          Title
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="title"
          className="input"
          placeholder="Enter Title"
          value={formData?.title}
        />
      </div>

      <div className="inputGroup">
        <label className="label text-primary-color flex items-center gap-1 text-[16px] font-semibold">
          <IoIosArrowDown />
          Message
        </label>
        {formData?.type === "pushnotification" && (
          <textarea
            id="message"
            onChange={handleChange}
            className="w-full h-[200px] input resize-none"
            defaultValue={formData?.message}
            value={formData?.message}
          ></textarea>
        )}
        {formData?.type === "promotionalmail" && (
          <ReactQuill
            value={formData.message}
            onChange={handleMessageChange}
            placeholder="Enter message here"
            theme="snow"
            className="w-full h-[200px] mb-6"
            defaultValue={formData?.message}
          />
        )}
      </div>

      <div className="inputGroup gap-[30px] mt-[50px]">
        <label className="label text-primary-color flex items-center gap-1 text-[16px] font-semibold">
          <IoIosArrowDown />
          Additional Configurations
        </label>

        {/* Image upload section */}
        <div
          className={`border-2 rounded-lg py-[19px] px-[29px] border-dashed text-center cursor-pointer shadow-sm ${
            isDragging ? "bg-gray-100 border-gray-300" : "border-[#D0D5DD]"
          }`}
          style={{
            width: "100%",
            minHeight: "100px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isDragging ? (
            <p className="text-gray-500 text-sm">Drop image here</p>
          ) : progress > 0 ? (
            <p className="text-gray-500 text-sm">Uploading....</p>
          ): (
            <>
              <p className="flex text-[10px] font-normal text-[#585858]">
                Drag and drop an image here or
              </p>
              <label
                htmlFor="file-upload"
                className="border-[#EBEBEB] border-[1px] rounded-[16px] flex items-center justify-center gap-[10px] p-[10px] text-[12px] font-semibold text-[#929292]"
              >
                Browse file
              </label>
              <p className="flex text-[10px] font-normal text-[#585858]">
                Max of 5mb
              </p>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </div>
        {progress > 0 && (
          <div className="w-full mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary-color rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-900 text-right">{progress}%</p>
          </div>
        )}
        {
            formData?.image && (
                <img alt="cms image" src={formData?.image} className="w-[45%] flex items-center justify-center" />
            )
        }
        {/** End of image upload section */}

        <input
          onChange={handleChange}
          type="text"
          id="url"
          className="input"
          placeholder="Url"
          value={formData?.url}
          defaultValue={formData?.url}
        />
        <input
          onChange={handleChange}
          type="text"
          id="caption"
          className="input"
          placeholder="Caption"
          value={formData?.caption}
          defaultValue={formData?.caption}
        />

      </div>
    </div>
  );
}

export default ContentForm;
