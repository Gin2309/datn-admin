"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input, message, Table } from "antd";
import { formatDate } from "@/helper/utility";
import CustomPagination from "@/components/CustomPagination";
import DeleteModal from "@/components/CustomModal/DeleteModal";

import editIcon from "@/assets/editBlue.svg";
import deleteIcon from "@/assets/deleteRed.svg";
import addIcon from "@/assets/plus.svg";
import search from "@/assets/Search.svg";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getBlogList, deleteBlog } from "@/api/blog.service";

const Post = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<any>(null);
  const [formFilter, setFormFilter] = useState({
    page: 1,
    itemsPerPage: 20,
    search: "",
    sortDesc: true,
  });

  const { data, isLoading, refetch } = useQuery(["USER", formFilter], () => getBlogList(formFilter));

  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation(() => deleteBlog(item?.id), {
    onSuccess: () => {
      message.success("Success!");
      setItem(null);
      setOpen(false);
      refetch();
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const onDelete = () => {
    deleteMutation();
  };

  const handleDelete = (record: any) => {
    setItem(record);
    setOpen(true);
  };

  const columns: any = [
    {
      title: "Index",
      key: "index",
      align: "center",
      render: (_: any, __: any, index: any) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    // {
    //   title: "Author",
    //   dataIndex: "user",
    //   key: "name",
    //   align: "center",
    //   render: (value: any) => <div>{value.name}</div>,
    // },
    {
      title: "Created At",
      dataIndex: "createdTime",
      key: "createdTime",
      align: "center",
      render: (value: any) => (value ? formatDate(value) : "---"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex gap-3 justify-center">
          <div className=" cursor-pointer" onClick={() => router.push(`/post/${record.id}`)}>
            <Image src={editIcon} alt="icon" />
          </div>
          <div className=" cursor-pointer" onClick={() => handleDelete(record)}>
            <Image src={deleteIcon} alt="icon" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - 24px)" }}
        className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6"
      >
        <div className="pt-4 md:pt-0 mb-[-20px] md:mb-0 flex justify-between">
          <h1 className="text-[#212529] font-medium text-[24px]">Post Management</h1>

          <div onClick={() => router.push("/post/create-post")} className="btn-primary gap-2">
            <Image src={addIcon} alt="icon" /> New Post
          </div>
        </div>

        <div className="card">
          <Input
            placeholder="Search"
            onChange={(e: any) => setFormFilter((prev) => ({ ...prev, search: e.target.value }))}
            className="!h-10 mb-4"
            prefix={<Image src={search} alt="icon" height={20} width={20} className="mr-2" />}
          />

          <Table
            columns={columns}
            loading={isLoading}
            dataSource={data?.data?.list}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1000 }}
          />

          <CustomPagination
            page={formFilter.page}
            pageSize={formFilter.itemsPerPage}
            total={data?.data?.count}
            setPage={(value) => setFormFilter({ ...formFilter, page: value })}
            setPerPage={(value) => setFormFilter({ ...formFilter, itemsPerPage: value })}
          />
        </div>
      </div>

      <DeleteModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onSubmit={onDelete}
        content={item?.title}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Post;
