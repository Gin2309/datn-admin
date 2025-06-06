"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { message, Spin } from "antd";
import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { LoadingOutlined } from "@ant-design/icons";
import CustomUpload from "@/components/CustomUpload";

import schema from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";

import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/user.service";

const CreateUser = () => {
  const router = useRouter();

  const roleOptions = [
    { value: "USER", label: "User" },
    { value: "EMPLOYEE", label: "Employee" },
    { value: "ADMIN", label: "Admin" },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate: updateMutation, isLoading: isUpdating } = useMutation((data: any) => createUser(data), {
    onSuccess: () => {
      message.success("Success!");
      router.push("/user");
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
        <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
          <h1 className="text-[#212529] font-medium text-[24px]">Create User</h1>

          <div className="flex gap-2">
            <div onClick={() => router.back()} className="btn-secondary">
              Cancel
            </div>

            <div onClick={handleSubmit(onSubmit)} className="btn-primary">
              {isUpdating ? <Spin indicator={<LoadingOutlined spin />} size="default" /> : "Save"}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-1 md:col-span-8">
              <div className="flex flex-col gap-6">
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
                    name="role"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="col-span-1 md:col-span-2">
                        <Label label="Role" required />
                        <CustomSelect
                          placeholder="Select role"
                          className="suffix-icon h-11 !rounded"
                          options={roleOptions}
                          onChange={onChange}
                          value={value}
                        />
                        <InputError error={errors.role?.message} />
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
                        <Label label="Email" required/>
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
                        <Label label="Phone" required/>
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
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="col-span-1 md:col-span-2">
                        <Label label="Password" required/>
                        <CustomInput
                          className={`suffix-icon h-11 !rounded`}
                          placeholder="Enter password"
                          onChange={onChange}
                          value={value ?? ""}
                        />
                        <InputError error={errors.password?.message} />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4">
              <div className="sticky top-6">
                <Label label="Avatar" />
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomUpload
                      value={value}
                      onChange={(url: string) => onChange(url)}
                    />
                  )}
                />
                <InputError error={errors.avatar?.message} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
