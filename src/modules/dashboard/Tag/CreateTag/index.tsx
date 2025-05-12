"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { message, Spin } from "antd";
import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { LoadingOutlined } from "@ant-design/icons";

import schema from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";

import { useMutation } from "@tanstack/react-query";
import { createTags } from "@/api/tag.service";

const CreateTag = () => {
  const router = useRouter();

  const {
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const title = watch("name");

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setValue("slug", generatedSlug);
    }
  }, [title, setValue]);

  const { mutate: createMutation, isLoading: isUpdating } = useMutation((data: any) => createTags(data), {
    onSuccess: () => {
      message.success("Success!");
      router.push("/tag");
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = (data: any) => {
    createMutation(data);
  };

  return (
    <>
      <div className="create-order w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6">
        <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
          <h1 className="text-[#212529] font-medium text-[24px]">Create new tag</h1>

          <div className="flex gap-2">
            <div onClick={() => router.back()} className="btn-secondary">
              Cancel
            </div>
            <div onClick={handleSubmit(onSubmit)} className="btn-primary">
              {isUpdating ? <Spin indicator={<LoadingOutlined spin />} size="default" /> : "Create"}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="col-span-1 md:col-span-2">
                  <Label label="Title" required />
                  <CustomInput
                    className={`suffix-icon h-11 !rounded`}
                    placeholder="Enter tag name"
                    onChange={onChange}
                    value={value}
                  />
                  <InputError error={errors.name?.message} />
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="slug"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="col-span-1 md:col-span-2">
                  <Label label="Slug" required />
                  <CustomInput
                    className={`suffix-icon h-11 !rounded`}
                    placeholder="Enter tag slug"
                    onChange={onChange}
                    value={value}
                  />
                  <InputError error={errors.slug?.message} />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTag;
