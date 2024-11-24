import { useState } from "react"
import Button from "../Helpers/Button"
import LogoImg from '../../assets/images/logo2.png'
import toast from "react-hot-toast";
import { siteSetting } from "../../Helpers/apis";
import { fetchSiteSettings } from "../../Helpers/fetch.api";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

function SiteSettings() {
    const { isFetchingData, siteSettingsData } = fetchSiteSettings()
    const settingsData = siteSettingsData?.data || {}
    //console.log('object', settingsData)

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [totalChunks, setTotalChunks] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
  

    const [ formData, setFormData ] = useState({ id: settingsData._id })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

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
          toast.success('Image Upload')
          setFormData({
            ...formData,
            siteImage: data,
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

    const [ loading, setLoading ] = useState(false)
    const handleUploadSettings = async () => {
        try {
            setLoading(true)
            const res = await siteSetting(formData)
            if(res.success){
                toast.success(res.data)
                window.location.reload()
            } else {
                toast.error(res.data)
            }
        } catch { 
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="card px-[28px] py-[28px] border-[1px] border-white shadow-sm max-h-[1026px] mb-12 scrollbar-thin">
      {/**SITE INFO */}
      <div className="flex flex-col gap-6 w-full">

        <div className="flex w-full justify-between items-start">
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[18px] text-gray-900">Site info</h2>
                <p className="font-normal text-[14px] text-gray-600">Update site photo and info details here.</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="">
                    <Button text={'Cancel'} style={`bg-transparent hover:bg-transparent border-[1px] border-[#000000] text-[#000]`} />
                </div>
                <div className="">
                    <Button onCLick={handleUploadSettings} text={loading ? 'Uploading...' : 'Save'} />
                </div>
            </div>
        </div>
        <hr />

        <div className="flex flex-col gap-5">
            <div className="flex items-start gap-8 mb-4">
                <div className="min-w-[280px]flex flex-col">
                    <h3 className="text-[14px] font-medium text-gray-700">Your photo</h3>
                    <p className="text-gray-600 font-normal text-[14px]">This will be displayed on your profile.</p>
                </div>
                <div className="inputGroup mt-8">
                    <img alt="site image" src={formData?.siteImage || settingsData?.siteImage || LogoImg} className="w-[45%]" />
                  <div className="form-group flex flex-col">
                    <label className="label">Upload Media Assets</label>
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
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Site Name</p>
                </div>
                <div className="w-[512px] flex items-center gap-6">
                    <input onChange={handleChange} id="siteName" defaultValue={settingsData?.siteName} type="text" className="input text-[16px] text-gray-900" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Email Address</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="siteEmail" defaultValue={settingsData?.siteEmail} type="text" className="input text-[16px] text-gray-900 w-full" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Site Link</p>
                </div>
                <div className="w-[512px]">
                <input onChange={handleChange} id="siteLink" defaultValue={settingsData?.siteLink} type="text" className="input text-[16px] text-gray-900" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="min-w-[280px]">
                    <p className="text-[14px] font-medium text-gray-700">Country</p>
                </div>
                <div className="w-[512px]">
                    <input onChange={handleChange} id="siteCountry" defaultValue={settingsData?.siteCountry} type="text" className="input text-[16px] text-gray-900" />
                </div>
            </div>
            <hr />
            <div className="flex items-start gap-8">
                <div className="max-w-[280px]">
                    <h2 className="font-semibold text-[18px] text-gray-900">Edu Africa Sales Percenatge</h2>
                    <p className="font-normal text-[14px] text-gray-600">Enter Percenatge amount Edu Africa would make on every sales of course made</p>
                </div>
                <div className="w-[512px] flex items-center justify-center">
                    <input onChange={handleChange} id="salesPercentage" defaultValue={settingsData?.salesPercentage} type="number" className="input text-[16px] text-gray-900" />%
                </div>
            </div>
        </div>

      </div>


    </div>
  )
}

export default SiteSettings
