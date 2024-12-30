import { useEffect, useState } from "react"
import Navbar from "../../Components/Helpers/Navbar"
import Sidebar from "../../Components/Helpers/Sidebar"
import Button from "../../Components/Helpers/Button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import ErrorCard from "../../Components/Helpers/ErrorCard"
import { createAdvert, updateAdvert } from "../../Helpers/apis"
import LoadingBtn from "../../Components/Helpers/LoadingBtn"
import { fetchAllAdvert } from "../../Helpers/fetch.api"
import Spinner from "../../Components/Helpers/Spinner"


function RecommendationsForm() {
  const navigate = useNavigate()
  const loc = useLocation()
  const pathName = loc.pathname.split('/')[2]
  const { advertData, isFetchingAdvert } = fetchAllAdvert({ id: pathName })
  const data = advertData?.data || {}
  
  useEffect(() => {
    setFormData(advertData?.data)
  }, [advertData?.data?.name])

  const [ formData, setFormData ] = useState({ id: pathName === 'noid' ? '' : pathName, advertType: 'recommendation' })
  const [ errorMsg, setErrorMsg ] = useState()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  
  const options = [
    {
        name: 'Banners',
        slug: 'banner'
    },
    {
        name: 'Recommendations',
        slug: 'recommendations'
    }
  ]
  const [ cardState, setCardState ] = useState(options[1]?.slug)

  const handleToggle = (value) => {
    //setCardState(value)
    setCardState('recommendations')
  }

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);


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

  const handleDelete = () => {
    setFormData({})
  }
  
  useEffect(() => {console.log('FORM DATA', formData)}, [formData])
  const [ uploading, setUploading ] = useState(false)
  const handleNewAdvertBanner = async () => {
    if(uploading){
      return
    }
    if(pathName === 'noid'){
      if(!formData?.name){
        setErrorMsg('Enter Nane')
        setTimeout(() => {
          setErrorMsg()
        }, 2500)
        return
      }
    }
    if(!formData?.advertType){
      setErrorMsg('Advert Type is Required')
      setTimeout(() => {
        setErrorMsg()
      }, 2500)
      return
    }
    if(!formData?.name){
      setErrorMsg('Enter Nane')
      setTimeout(() => {
        setErrorMsg()
      }, 2500)
      return
    }
    try {
      const res = pathName === 'noid' ? await createAdvert(formData) : await updateAdvert(formData)
      if(res.success){
        toast.success(res.data)
        navigate('/advert')
      } else {
        toast.error(res.data)
      }
    } catch (error) {
      
    } finally {
      setUploading
    }
  }
    return (
        <div className="page relative">
          {
            errorMsg && (
              <ErrorCard errorMsg={errorMsg} />
            )
          }
          <div className="fixed w-[257px] h-[100vh] left-0 top-0">
            <Sidebar />
          </div>
    
          <div className="section ml-auto">
            <Navbar />
    
            {
            isFetchingAdvert ? (
              <div className="flex items-center justify-center mt-8">
                <Spinner />
              </div>
            ) : (
              <div className="w-[97%] m-auto mt-4 tablet:w-full flex flex-col gap-[30px]">
                <h2 className="text-off-black text-[30px] font-semibold" >Advert</h2>
                

                <div className="w-full  flex items-center gap-4 border-b-[1px] border-b-[#D9DBE9]">
                  {
                    options?.map((item, idx) => (
                      <div key={idx} onClick={() => handleToggle(item?.slug)} className={`flex flex-col pt-[1px] pb-[11px] py-[4px] cursor-pointer border-b-[2px] min-w-[103px] items-center justify-center ${item?.slug === cardState ? 'text-primary-color border-b-primary-color' : 'text-[#364152] border-b-transparent' }`}>
                        {item?.name}
                      </div>
                    ))
                  }
                </div>

                <div className="mb-12 border-t-[12px] border-[1px[] border-white bg-white shadow-sm p-5 flex flex-col gap-[30px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
              <Link to={`/advert`}>
                  <span className="flex items-center justify-center w-5 h-5">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#22282F]">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </span>
              </Link>
              <p className="text-[18px] font-semibold text-[#14142B]">Add Banner</p>
          </div>

          <div className="flex items-center gap-[13.7px]">
              <div onClick={handleDelete} className="flex items-center gap-2 py-[10px] px-[18px] border-[1px] border-[#D0D5DD] rounded-[8px] text-[16px] font-medium text-[#585858]">
                  <span className="icon">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </span>
                  Delete
              </div>
              {
                uploading ? (
                  <LoadingBtn style={`min-w-[240px]`} />
                ) : (
                  <Button disabled={uploading} onCLick={handleNewAdvertBanner} text={pathName === 'noid' ? `Add Banner` : `Update Banner`} />
                )
              }
          </div>
        </div>
        
        {/**IMAGE */}
        <div>
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

        </div>

        <div className="flex flex-col gap-[54px]">
              <div className="flex items-center gap-5">
                  <div className="inputGroup flex-1">
                      <label className="label text-sm text-gray-700">Name</label>
                      <input onChange={handleChange} type="text" id="name" value={formData?.name} className="input" placeholder="Enter name" />
                  </div>
                  <div className="inputGroup flex-1">
                      <label className="label text-sm text-gray-700">Start date</label>
                      <input onChange={handleChange} type="date" id="startDate" value={formData?.startDate} className="input" />
                  </div>
                  <div className="inputGroup flex-1">
                      <label className="label text-sm text-gray-700">Destination</label>
                      <select onChange={handleChange} id="destination" value={formData?.destination} className="input">
                          <option value="">Select Destination</option>
                          <option value="uppersection">Upper Section</option>
                          <option value="lowersection">Lower Section</option>
                      </select>
                  </div>
              </div>

              <div className="flex items-center gap-5">
                  <div className="inputGroup flex-1">
                      <label className="label text-sm text-gray-700">Type</label>
                      <select onChange={handleChange} id="type" value={formData?.type} className="input">
                          <option value="">Select Type</option>
                          <option value="organization">Organization</option>
                          <option value="instructor">Instructor</option>
                          <option value="student">Student</option>
                          <option value="all">All</option>
                      </select>
                  </div>
                  <div className="inputGroup flex-1">
                      <label className="label text-sm text-gray-700">End date</label>
                      <input onChange={handleChange} type="date" id="endDate" value={formData?.endDate} className="input" />
                  </div>
                  <div className="inputGroup flex-1">
                      <label className="label text-sm text-gray-700">Organization URL</label>
                      <input onChange={handleChange} type="text" id="organizationUrl" value={formData?.organizationUrl} className="input" placeholder="Enter Organization URL" />
                  </div>
              </div>
        </div>

      </div>

              </div>
            )
          }
    
    
          </div>
    
        </div>
      )
}

export default RecommendationsForm
