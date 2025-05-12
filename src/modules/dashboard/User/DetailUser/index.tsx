"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { message, Spin, Skeleton } from "antd";
import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { LoadingOutlined } from "@ant-design/icons";

import schema from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetail, updateUser } from "@/api/user.service";

const DetailUser = ({ id }: { id: any }) => {
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery(["DETAIL_USER"], () => getUserDetail(id), {
    enabled: !!id,
  });

  const detail = data?.data;

  const {
    getValues,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: detail?.name || "",
      lastName: detail?.lastName || "",
      email: detail?.email || "",
      phone: detail?.phone || "",
      avatar: detail?.avatar || "",
      companyName: detail?.companyName || "",
      companyURL: detail?.companyURL || "",
    },
  });

  useEffect(() => {
    if (detail) {
      reset({
        name: detail?.name,
        lastName: detail?.lastName,
        email: detail?.email,
        phone: detail?.phone,
        avatar: detail?.avatar,
        companyName: detail?.companyName,
        companyURL: detail?.companyURL,
      });
    }
  }, [detail, reset]);

  const { mutate: updateMutation, isLoading: isUpdating } = useMutation((data: any) => updateUser(id, data), {
    onSuccess: () => {
      message.success("Success!");
      refetch();
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = (data: any) => {
    updateMutation(data);
  };

  return (
    <>
      <div className="create-order w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6">
        {isLoading ? (
          <Skeleton active style={{ height: "400px" }} />
        ) : (
          <>
            <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
              <h1 className="text-[#212529] font-medium text-[24px]">{detail?.name}</h1>

              <div className="flex gap-2">
                <div onClick={() => router.back()} className="btn-secondary">
                  Cancel
                </div>

                <div onClick={handleSubmit(onSubmit)} className="btn-primary">
                  {isUpdating ? <Spin indicator={<LoadingOutlined spin />} size="default" /> : "Save"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-1 md:col-span-2">
                      <Label label="Name" required />
                      <CustomInput
                        className={`suffix-icon h-11 !rounded`}
                        placeholder="Enter title name"
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
                  name="lastName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-1 md:col-span-2">
                      <Label label="Last Name" />
                      <CustomInput
                        className={`suffix-icon h-11 !rounded`}
                        placeholder="Enter last name"
                        onChange={onChange}
                        value={value}
                      />
                      <InputError error={errors.lastName?.message} />
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-1 md:col-span-2">
                      <Label label="Email" />
                      <CustomInput
                        className={`suffix-icon h-11 !rounded`}
                        placeholder="Enter email"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                      <InputError error={errors.email?.message} />
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-1 md:col-span-2">
                      <Label label="Phone" />
                      <CustomInput
                        className={`suffix-icon h-11 !rounded`}
                        placeholder="Enter phone"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                      <InputError error={errors.phone?.message} />
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-1 md:col-span-2">
                      <Label label="Company Name" />
                      <CustomInput
                        className={`suffix-icon h-11 !rounded`}
                        placeholder="Enter company name"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                      <InputError error={errors.companyName?.message} />
                    </div>
                  )}
                />
              </div>

              <div>
                <Controller
                  name="companyURL"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-1 md:col-span-2">
                      <Label label="Company URL" />
                      <CustomInput
                        className={`suffix-icon h-11 !rounded`}
                        placeholder="Enter company URL"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                      <InputError error={errors.companyURL?.message} />
                    </div>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailUser;
