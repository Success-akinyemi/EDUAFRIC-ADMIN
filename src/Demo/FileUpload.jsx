import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadCourseContent } from "./api";
import LoadingBtn from "../Components/Helpers/LoadingBtn";
import Button from "../Components/Helpers/Button";
import toast from "react-hot-toast";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [totalChunks, setTotalChunks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({ courseID: "AFRICEZXQR9", overview: "" });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(`${Date.now()}_${selectedFile.name}`);
      setTotalChunks(Math.ceil(selectedFile.size / CHUNK_SIZE));
    }
  };

  const mediaTypes = [
    {
      type: 'video'
    },
    {
      type: 'audio'
    },
    {
      type: 'image'
    },
    {
      type: 'pdf'
    }
  ]

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select a file");
    }

    if(!formData?.assestType){
      return alert('Please select the asset type you want to uplaod')
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

      if (!success) {
        throw new Error("Error completing upload");
      }

      const endTime = new Date();
      const timeElapsed = (endTime - startTime) / 1000;
      console.log("Time elapsed:", timeElapsed, "seconds");
      console.log("COURSE FILE UPLOADED", data);
      setFormData({
        ...formData,
        assestLink: data,
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOverviewChange = (value) => {
    setFormData({ ...formData, overview: value });
  };
  const handlecourseNoteChange = (value) => {
    setFormData({ ...formData, courseNote: value });
  };
  const handleAssignmentChange = (value) => {
    setFormData({ ...formData, assignment: value });
  };

  useEffect(() => {console.log('object data', formData)}, [formData])

  const [ loading, setLoading ] = useState(false)
  const handleUploadCourseContent = async () => {
    try {
      setLoading(true)
      const res = await uploadCourseContent(formData)
      if(res.success){
        toast.success(res.data)
        window.location.reload()
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-5 flex items-center justify-center">
      <div className="row justify-content-center w-[50%]">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Upload course content to Backend</h5>
              <form className="flex flex-col gap-4">

                <div className="inputGroup">
                  <label className="label">Enter Course Title</label>
                  <input
                    type="text"
                    id="sectionTitle"
                    onChange={handleInputChange}
                    className="input"
                    placeholder="E.g Chapter 1,2,3"
                  />
                </div>

                <div className="inputGroup mt-8">
                  <label className="label">Enter Course Overview</label>
                  <ReactQuill
                    value={formData.overview}
                    onChange={handleOverviewChange}
                    placeholder="What is in this course"
                    theme="snow"
                    className="w-full h-[200px] mb-6"
                  />
                </div>

                <div className="inputGroup mt-8">
                  <label className="label">Enter Course Notes</label>
                  <ReactQuill
                    value={formData.courseNote}
                    onChange={handlecourseNoteChange}
                    placeholder="Enter notes here"
                    theme="snow"
                    className="w-full h-[200px] mb-6"
                  />
                </div>

                <div className="inputGroup mt-8">
                  <label className="label">Enter Assignments (optional)</label>
                  <ReactQuill
                    value={formData.assignment}
                    onChange={handleAssignmentChange}
                    placeholder="Enter Assignments"
                    theme="snow"
                    className="w-full h-[200px] mb-6"
                  />
                </div>

                <div className="inputGroup mt-8">
                  <div className="form-group">
                    <label className="label">Upload Media Assets</label>
                    <br />
                    <div className="inputGroup my-4">
                      <label className="label">Select Media Type</label>
                      <div className="flex items-center justify-center gap-4">
                          {
                            mediaTypes.map((item, idx) => (
                              <div key={idx} onClick={() => setFormData({...formData, assestType: item?.type })} className={`cursor-pointer`}>
                                  <p className={`${formData?.assestType === item?.type ? 'font-bold text-primary-color' : 'font-normal'}`}>{item?.type}</p>
                              </div>
                            ))
                          }
                      </div>
                    </div>
                    <label htmlFor="fileInput">Select File:</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="fileInput"
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

                <hr />

                {
                  loading ? (
                    <LoadingBtn />
                  ) : (
                    <Button text={`Upload Course Content`} onCLick={handleUploadCourseContent} />
                  )
                }

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
