import { useEffect, useState } from "react";
import Spinner from "../Components/Helpers/Spinner";
import { fetchCouponCodes } from "../Helpers/fetch.api";
import { updateCoupon } from "../Helpers/apis";
import Button from "../Components/Helpers/Button";
import LoadingBtn from "../Components/Helpers/LoadingBtn";
import toast from "react-hot-toast";

function EditCouponCode({ setSelectedCard, couponCodeId, setCouponCodeId }) {
  const { couponCodeData, isFetchingCoupon } = fetchCouponCodes({
    all: false,
    id: couponCodeId,
  });
  const data = couponCodeData?.data;

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setFormData({ ...formData, _id: data?._id });
  }, [data?._id]);
  useEffect(() => {
    console.log("FORMDATA", formData);
  }, [formData]);

  const [updating, setUpdating] = useState(false);
  const handleUpdateCouponCode = async () => {
    try {
      setUpdating(true);
      const res = await updateCoupon(formData);
      if (res.success) {
        toast.success(res.data);
        window.location.reload();
      } else {
        toast.error(res.data);
      }
    } catch {
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setCouponCodeId()
    setSelectedCard()
  }
  return (
    <div className="flex w-full flex-col gap-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-center flex-col gap-1">
        <h2 className="text-center text-gray-900 text-lg font-semibold">
          Edit Coupon Code
        </h2>
      </div>
      {isFetchingCoupon ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
            <div className="inputGroup">
                <label className="label">Code</label>
                <input type="text" disabled readOnly defaultValue={data?.code} className="input" />
            </div>

            <div className="inputGroup">
                <label className="label">Text</label>
                <input id="text" onChange={handleChange} defaultValue={data?.text} type="text" className="input" />
            </div>

            <div className="inputGroup">
                <label className="label">Percentage Discount</label>
                <input id="percentageOff" onChange={handleChange} defaultValue={data?.percentageOff} type="text" className="input" />
            </div>

            <div className="inputGroup">
                <label className="label">Max number of student</label>
                <input id="maxNumber" onChange={handleChange} defaultValue={data?.maxNumber} type="number" className="input" />
            </div>

            <div className="inputGroup">
                <label className="label">Active</label>
                <select id="active" onChange={handleChange} defaultValue={data?.active} className="input">
                    <option value='true' >Active</option>
                    <option value='false' >Deactivate</option>
                </select>
            </div>


          {/**BTN */}
          {
            updating ? (
                <LoadingBtn style={`mb-4 w-full`} />
            ) : (
                <>
                    <div className="mb-4 flex items-center justify-center gap-3 flex-col w-full">
                        <div className="w-full items-center justify-center">
                        <Button
                            onCLick={handleUpdateCouponCode}
                            text={updating ? "Updating..." : "Update Coupon Code"}
                            style={`w-full`}
                        />
                        </div>
                        <div className="w-full items-center justify-center">
                        <Button
                            onCLick={handleCancel}
                            text={"Cancel"}
                            style={`!bg-transparent !hover:bg-transparent !border-[1px] !border-black !text-black w-full`}
                        />
                        </div>
                    </div>
                </>
            )
          }
        </div>
      )}
    </div>
  );
}

export default EditCouponCode;
