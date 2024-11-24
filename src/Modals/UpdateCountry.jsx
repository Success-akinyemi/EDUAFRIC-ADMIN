import toast from "react-hot-toast";
import { updateCountry } from "../Helpers/apis";
import Button from "../Components/Helpers/Button";
import { fetchCountries } from "../Helpers/fetch.api";
import { useState } from "react";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

function UpdateCountry({ countryId, setCountryId, setSelectedCard }) {
    const { countriesData, isFetchingData } = fetchCountries(countryId)
  const countryData = countriesData?.data

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [totalChunks, setTotalChunks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({ id: countryId });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(`${Date.now()}_${selectedFile.name}`);
      setTotalChunks(Math.ceil(selectedFile.size / CHUNK_SIZE));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select a file");
    }

    setIsUploading(true);
    try {
      const startTime = new Date();

      // Initiate multipart upload
      const requestBody = { fileName };
      const initRes = await fetch(`${baseUrl}/initiateUpload`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
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

        const uploadPromise = fetch(
          `${baseUrl}/uploadFile?uploadId=${uploadId}`,
          {
            method: "POST",
            body: formData,
          }
        ).then(() => {
          uploadedChunks++;
          const progressValue = Math.floor(
            (uploadedChunks / totalChunks) * 100
          );
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

      if (!success) {
        throw new Error("Error completing upload");
      }

      const endTime = new Date();
      const timeElapsed = (endTime - startTime) / 1000;
      console.log("Time elapsed:", timeElapsed, "seconds");
      console.log("COURSE FILE UPLOADED", data);
      toast.success("Image Upload");
      setFormData({
        ...formData,
        image: data,
      });

      resetProgressBar();
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    }

    setIsUploading(false);
  };

  const resetProgressBar = () => {
    setProgress(0);
    setFile(null);
    setFileName("");
    setTotalChunks(0);
  };

  const [loading, setLoading] = useState(false);
  const handleUpdateCountries = async () => {
    try {
      setLoading(true);
      const res = await updateCountry(formData)
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else {
        toast.error(res.data)
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCountryId()
    setSelectedCard()
  }

    return (
    <div className="flex w-full flex-col gap-5 h-[60vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-center flex-col gap-1">
            <h2 className="text-center text-gray-900 text-lg font-semibold" >
                Update Country Infomation
            </h2>

            <p className="text-sm text-gray-600 font-normal text-center">
                This will pop up on the instructor screen for blocked courses so he/she can mend the right amendments
            </p>
        </div>

        {/**FORM */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2 flex-col">
            <div className="max-w-[280px]">
              <h2 className="font-semibold text-[18px] text-gray-900">
                Country Name
              </h2>
              <p className="font-normal text-[14px] text-gray-600">
                More Countries Edu Africa Operates in.
              </p>
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                onChange={handleChange}
                id="country"
                defaultValue={countryData?.country}
                placeholder="Enter Country Name"
                type="text"
                className="input text-[16px] text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 flex-col">
            <div className="max-w-[280px]">
              <h2 className="font-semibold text-[18px] text-gray-900">
                Country Currency
              </h2>
              <p className="font-normal text-[14px] text-gray-600">
                Currency of Country Edu Africa Operates in.
              </p>
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                onChange={handleChange}
                id="currency"
                defaultValue={countryData?.currency}
                placeholder="Enter Country currency"
                type="text"
                className="input text-[16px] text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-start gap-8 mb-4 flex-col">
            <div className="min-w-[280px] flex flex-col">
              <h3 className="text-[14px] font-medium text-gray-700">
                Country image
              </h3>
              <p className="text-gray-600 font-normal text-[14px]">
                Attach image of country flag.
              </p>
            </div>
            <div className="inputGroup mt-2">
              <img
                alt="site image"
                src={formData?.image || countryData?.image}
                className="w-[45%]"
              />
              <div className="form-group flex flex-col">
                <label className="label">Upload Country Image</label>
                <br />
                <label htmlFor="siteImage">Select Image File:</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="siteImage"
                  accept="image/png image/jpeg"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </div>
              <div className="progress mb-3 h-[3px] w-full">
                <div
                  className="progress-bar h-[3px] bg-primary-color"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary bg-primary-color text-white py-2 px-4 rounded-[8px]"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Media file"}
              </button>
            </div>
          </div>

          <hr />

        </div>

        {/**BTN */}
        <div className="flex items-center justify-center gap-3 flex-col w-full">
            <div className="w-full items-center justify-center">
              <Button
                onCLick={handleUpdateCountries}
                text={loading ? "Uploading..." : "Upate"}
                style={`w-full`}
              />
            </div>
            <div className="w-full items-center justify-center">
              <Button
                onCLick={handleCancel}
                text={"Cancel"}
                style={`bg-transparent hover:bg-transparent border-[1px] border-[#000000] text-[#000] w-full`}
              />
            </div>

          </div>
    </div>
  )
}

export default UpdateCountry
