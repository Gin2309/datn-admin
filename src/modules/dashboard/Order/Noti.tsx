"use client";
import React, { useEffect, useState } from "react";
import { profileState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import { getFeedBack } from "@/api/order.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import bellIcon from "@/assets/notifi.png";
import { formatDate } from "@/helper/utility";
import { Modal, Button } from "antd";

interface NotiProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface FeedbackItem {
  id: number;
  orderId: string;
  content: string;
  createdUser: any;
  createdTime: string;
}

const Noti = ({ isOpen = false, onClose }: NotiProps) => {
  const [open, setOpen] = useState(isOpen);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profile = useRecoilValue(profileState);
  const id = profile?.data?.id;
  const [count, setCount] = useState(0);

  const { data, isLoading } = useQuery(["feedBack", id], () => getFeedBack(id), {
    enabled: !!id,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setOpen(isOpen);
    if (isOpen) {
      setIsModalOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (data?.data?.count) {
      setCount(data.data.count);
    }
  }, [data]);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const feedbackList = data?.data?.list || [];

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
      >
        <div className="relative">
          {count > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </div>
          )}
          <Image src={bellIcon} alt="Notifications" width={20} height={20} />
        </div>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 p-4 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium">Thông báo</h3>
            <button 
              onClick={handleToggle}
              className=""
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">Đang tải...</div>
            ) : feedbackList.length > 0 ? (
              <>
                {feedbackList.slice(0, 3).map((feedback: FeedbackItem) => (
                  <div key={feedback.id} className="p-3 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">Đơn hàng #{feedback.orderId.substring(0, 8)}</p>
                      <span className="text-xs">{formatDate(feedback.createdTime)}</span>
                    </div>
                    <p className="text-sm mt-1">{feedback.content}</p>
                  </div>
                ))}
                {feedbackList.length > 3 && (
                  <div className="p-2 text-center">
                    <Button type="link" onClick={showModal}>
                      Xem tất cả ({feedbackList.length})
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center">Không có thông báo</div>
            )}
          </div>
        </div>
      )}

      <Modal
        title="Thông báo"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={{ 'aria-label': 'Đóng' }}
      >
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">Đang tải...</div>
          ) : feedbackList.length > 0 ? (
            feedbackList.map((feedback: FeedbackItem) => (
              <div key={feedback.id} className="p-3 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">Đơn hàng #{feedback.orderId.substring(0, 8)}</p>
                  <span className="text-xs">{formatDate(feedback.createdTime)}</span>
                </div>
                <p className="text-sm mt-1">{feedback.content}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">Không có thông báo</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Noti;