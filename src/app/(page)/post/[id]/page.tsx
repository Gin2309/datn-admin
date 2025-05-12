"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@/modules/dashboard/Post/DetailPost";

const Page = () => {
  const { id } = useParams();

  return (
    <div>
      <Detail id={id} />
    </div>
  );
};

export default Page;
