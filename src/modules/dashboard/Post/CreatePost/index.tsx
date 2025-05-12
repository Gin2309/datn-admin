"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { message, Spin } from "antd";
import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { LoadingOutlined } from "@ant-design/icons";
import CustomUpload from "@/components/CustomUpload";

import schema from "../schema";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog } from "@/api/blog.service";
import { getTagsList } from "@/api/tag.service";

const CreatePost = () => {
  const router = useRouter();
  const [formFilter, setFormFilter] = useState({
    page: 1,
    itemsPerPage: 9999,
  });

  const {
    getValues,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data } = useQuery(["TAG", formFilter], () => getTagsList(formFilter), { refetchOnWindowFocus: true });

  const title = watch("title");

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/[đĐ]/g, 'd') 
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-') 
        .replace(/-+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
      setValue("slug", generatedSlug);
    }
  }, [title, setValue]);

  const { mutate: createMutation, isLoading: isUpdating } = useMutation((data: any) => createBlog(data), {
    onSuccess: () => {
      message.success("Success!");
      router.push("/post");
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = () => {
    const data = getValues();

    const submitedData = {
      ...data,
      tags: data.tags ? [parseInt(data.tags, 10)] : [],
    };

    createMutation(submitedData);
  };

  const handleChangeDescription = (value: string) => {
    setValue("content", value, { shouldValidate: true });
  };

  return (
    <>
      <div className="create-order w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6">
        <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
          <h1 className="text-[#212529] font-medium text-[24px]">Create new post</h1>

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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-1 md:col-span-8">
              <div className="flex flex-col gap-6">
                <div>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="col-span-1 md:col-span-2">
                        <Label label="Title" required />
                        <CustomInput
                          className={`suffix-icon h-11 !rounded`}
                          placeholder="Enter title post"
                          onChange={onChange}
                          value={value}
                        />
                        <InputError error={errors.title?.message} />
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
                          placeholder="Enter slug post"
                          onChange={onChange}
                          value={value}
                        />
                        <InputError error={errors.slug?.message} />
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="shortDesc"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="col-span-1 md:col-span-2">
                        <Label label="Short description" required />
                        <CustomInput
                          className={`suffix-icon h-11 !rounded`}
                          placeholder="Enter short description"
                          onChange={onChange}
                          value={value}
                        />
                        <InputError error={errors.shortDesc?.message} />
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="col-span-1 md:col-span-2">
                        <Label label="Tag" />
                        <CustomSelect
                          placeholder="Select post tag"
                          className={`suffix-icon h-11 !rounded `}
                          onChange={onChange}
                          value={value}
                          options={data?.data?.list?.map((item: any) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                        />
                        <InputError error={errors.tags?.message} />
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Label label="Content" required />
                  <ReactQuill
                    value={getValues("content")}
                    onChange={handleChangeDescription}
                    modules={{ toolbar: true }}
                    placeholder="Enter blog content"
                    className="bg-white"
                  />
                  <InputError error={errors.content?.message} />
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4">
              <div className="sticky top-6">
                <Label label="Image" />
                <CustomUpload
                  value={getValues("img")}
                  onChange={(value: string) => setValue("img", value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
