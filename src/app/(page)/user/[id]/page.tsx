"use client";
import React from "react";
import { useParams } from "next/navigation";
import DetailUser from "@/modules/dashboard/User/DetailUser";

const Page = () => {
  const { id } = useParams();

  return (
    <div>
      <DetailUser id={id} />
    </div>
  );
};

export default Page;
