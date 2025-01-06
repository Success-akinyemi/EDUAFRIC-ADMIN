import { useState } from "react";
import Button from "../Helpers/Button";
import toast from "react-hot-toast";
import { fetchCountries } from "../../Helpers/fetch.api";
import { deleteCountry, newCountry } from "../../Helpers/apis";
import Spinner from "../Helpers/Spinner";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

function Countries({ setSelectedCard, setCountryId }) {
  const { countriesData, isFetchingData } = fetchCountries()
  const countryData = countriesData?.data

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [totalChunks, setTotalChunks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({});
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
  const handleUploadCountries = async () => {
    try {
      setLoading(true);
      const res = await newCountry(formData)
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

  const [deleting, setDeleting] = useState(false);
  const handleDeleteCountries = async (id) => {
    if(deleting){
        return
    }
    try {
        const confirm = window.confirm(`Are you sure you want to delete this country`)
        if(confirm){
            setDeleting(true);
            const res = await deleteCountry({ id })
            if(res.success){
              toast.success(res.data)
              window.location.reload()
            } else {
              toast.error(res.data)
            }
        }
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateCountries = async (id) => {
    setCountryId(id)
    setSelectedCard('updateCountry')
  }

  return (
    <div className="card px-[28px] py-[28px] border-[1px] border-white shadow-sm min-h-[1026px] mb-12 scrollbar-thin">
      {/**AVAILBLE COUNTRIES */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex w-full justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-[18px] text-gray-900">
              Countries Info
            </h2>
            <p className="font-normal text-[14px] text-gray-600">
              Add and Update countries Edu Afric operates in.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="">
              <Button
                text={"Cancel"}
                style={`bg-transparent hover:bg-transparent border-[1px] border-[#000000] text-[#000]`}
              />
            </div>
            <div className="">
              <Button
                onCLick={handleUploadCountries}
                text={loading ? "Uploading..." : "Save"}
              />
            </div>
          </div>
        </div>
        <hr />

        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-8">
            <div className="max-w-[280px]">
              <h2 className="font-semibold text-[18px] text-gray-900">
                Country Name
              </h2>
              <p className="font-normal text-[14px] text-gray-600">
                More Countries Edu Africa Operates in.
              </p>
            </div>
            <div className="w-[512px] flex items-center justify-center">
              <input
                onChange={handleChange}
                id="country"
                placeholder="Enter Country Name"
                type="text"
                className="input text-[16px] text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-start gap-8">
            <div className="max-w-[280px]">
              <h2 className="font-semibold text-[18px] text-gray-900">
                Country Currency
              </h2>
              <p className="font-normal text-[14px] text-gray-600">
                Currency of Country Edu Africa Operates in.
              </p>
            </div>
            <div className="w-[512px] flex items-center justify-center">
              <input
                onChange={handleChange}
                id="currency"
                placeholder="Enter Country currency"
                type="text"
                className="input text-[16px] text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-start gap-8 mb-4">
            <div className="min-w-[280px]flex flex-col">
              <h3 className="text-[14px] font-medium text-gray-700">
                Country image
              </h3>
              <p className="text-gray-600 font-normal text-[14px]">
                Attach image of country flag.
              </p>
            </div>
            <div className="inputGroup mt-8">
              <img
                alt="site image"
                src={formData?.image}
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

          {/**Display List Of Availble Countries */}
          <div className="">
            <div className="flex w-full justify-between items-start">
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[18px] text-gray-900">
                  Available Countries
                </h2>
              </div>
            </div>
            <hr />

            {/**LIST OF COUNTRIES */}
            <div className="flex flex-col gap-6">
                {
                    isFetchingData ? (
                        <div className="flex justify-center items-center mt-6">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5 mt-6">
                            
                            {
                                countryData.map((item) => (
                                    <div key={item?._id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img alt={`Flag of ${item?.country}`} src={item.image} className="w-[20px]" />
                                            <p>{item?.country}</p>
                                            <p>{item?.currency}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div onClick={() => handleUpdateCountries(item?._id)} className="text-primary-color cursor-pointer">
                                                <FaRegEdit className="text-[24px]" />
                                            </div>
                                            <div onClick={() => handleDeleteCountries(item?._id)} className="text-error cursor-pointer">
                                                <MdDelete className="text-[24px]" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>

          </div>
      </div>
    </div>
  );
}

export default Countries;
