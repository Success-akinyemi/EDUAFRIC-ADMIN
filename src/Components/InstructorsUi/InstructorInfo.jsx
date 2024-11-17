import { formatDateAndTime } from "../../Helpers/formatDateAndTime";

function InstructorInfo({ data }) {
  const { formattedDate } = formatDateAndTime(data?.createdAt);
  return (
    <div className="card mb-[6rem] flex flex-col border-[1px] border-[#EFF0F6] shadow-sm rounded-[12px]">
      <div className="border-b-[1px] border-b-[#EFF0F6]">
        <p className="font-semibold text-[16px] text-[#344054]">Instructor Info</p>
      </div>

      <div className="flex mt-[30px] flex-col gap-3">
        <div className="flex p-[3px] gap-[4px]" >
            <p className="font-normal w-[300px] text-[14px] text-[#929292]">Name</p>
            <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{data?.name}</p>
        </div>
        <div className="flex p-[3px] gap-[4px]" >
            <p className="font-normal w-[300px] text-[14px] text-[#929292]">Display Name</p>
            <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{data?.displayName}</p>
        </div>
        <div className="flex p-[3px] gap-[4px]" >
            <p className="font-normal w-[300px] text-[14px] text-[#929292]">Customer ID</p>
            <p className="text-sm font-medium text-[#13693B] text-[14px]">{data?.instructorID}</p>
        </div>
        <div className="flex p-[3px] gap-[4px]" >
            <p className="font-normal w-[300px] text-[14px] text-[#929292]">Email</p>
            <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{data?.email}</p>
        </div>
        <div className="flex p-[3px] gap-[4px]" >
            <p className="font-normal w-[300px] text-[14px] text-[#929292]">Country</p>
            <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{data?.country}</p>
        </div>
        <div className="flex p-[3px] gap-[4px]" >
            <p className="font-normal w-[300px] text-[14px] text-[#929292]">Registration Date</p>
            <p className="text-sm font-medium text-[#1F2A37] text-[14px]">{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default InstructorInfo
