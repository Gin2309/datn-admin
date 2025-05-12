import Image from "next/image";
import DeleteIcon from "@/assets/deleteRed.svg";

import { CustomButton } from "@/components/CustomButton";
import { CustomModal } from "@/components/CustomModal";

const DeleteModal = ({
  isOpen,
  onCancel,
  onSubmit,
  content,
  isLoading,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
  content: string;
  isLoading?: boolean;
}) => {
  return (
    <CustomModal isOpen={isOpen} onCancel={onCancel} onSubmit={onSubmit} customFooter width={423}>
      <div className="flex flex-col items-center justify-start gap-6 text-[#1C1C28]">
        <div className="w-[100%] ">
          <div className="w-[46px] h-[46px] bg-[#FFF5F4] flex items-center justify-center rounded-md">
            <Image src={DeleteIcon} height={32} width={32} alt="icon" />
          </div>
        </div>

        <div className="flex text-xl font-medium">Are you sure you want to delete {content} ?</div>
        <p>
          Once deleted, <span className="font-medium">{content}</span> will no longer exist in the system.
        </p>

        <div className="flex justify-start w-[100%] gap-[15px]">
          <CustomButton outline={true} className="!h-11 !w-[120px]" onClick={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton disabled={isLoading} className="!h-11 !w-[120px]" onClick={onSubmit}>
            Delete
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
