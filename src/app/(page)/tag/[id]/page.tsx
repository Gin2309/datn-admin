"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@/modules/dashboard/Tag/DetailTag";

const Page = () => {
  const { id } = useParams();

  return (
    <div>
      <Detail id={id} />
    </div>
  );
};

export default Page;
