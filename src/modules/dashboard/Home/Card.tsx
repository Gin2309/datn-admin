"use client";
import React from "react";
import { useRouter } from "next/navigation";

type ProjectCardProps = {
  name: string;
  service: string;
  id: string;
  status: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "AWAITING":
      return "#FFC107";
    case "READY":
      return "#0DCAF0";
    case "DONE":
      return "#198754";
    case "REWORK":
      return "#FD7E14";
    default:
      return "#FFC107";
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ name, service, id, status }) => {
  const router = useRouter();
  const statusColor = getStatusColor(status);

  return (
    <div
      onClick={() => router.push(`order/${id}`)}
      className="card-2 flex flex-wrap justify-between gap-6 cursor-pointer"
    >
      <div className="flex gap-4 md:gap-8 lg:gap-12 flex-wrap">
        <div>
          <h1 className="uppercase text-[#6C757D] text-[12px]">Project name</h1>
          <h2 className="text-[#212529] font-medium">{name}</h2>
        </div>
        <div>
          <h1 className="uppercase text-[#6C757D] text-[12px]">Service</h1>
          <h2 className="text-[#212529]">{service}</h2>
        </div>
        <div className="hidden md:block">
          <h1 className="uppercase text-[#6C757D] text-[12px]">Order ID</h1>
          <h2 className="text-[#212529]">{id}</h2>
        </div>
        <div>
          <h1 className="uppercase text-[12px]">Status</h1>
          <h2 className="font-medium" style={{ color: statusColor }}>
            {status}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
