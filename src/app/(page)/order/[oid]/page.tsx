"use client";
import React from "react";
import { useParams } from "next/navigation";
import DetailOrder from "@/modules/dashboard/Order/DetailOrder";

const Detail = () => {
  const { oid } = useParams();

  return (
    <div>
      <DetailOrder oid={oid} />
    </div>
  );
};

export default Detail;
