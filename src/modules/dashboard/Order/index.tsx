"use client";
import React, { useState } from "react";

import Card from "./Card/Cards";
import { CustomSelect } from "@/components/CustomSelect";
import CustomTabs from "@/components/CustomTabs";
import CustomPagination from "@/components/CustomPagination";

import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "@/api/order.service";

const tabs = [
  { key: "", label: "All order" },
  { key: "AWAITING", label: "Awaiting payment" },
  { key: "READY", label: "Getting ready" },
  { key: "DONE", label: "Order delivered" },
  { key: "REWORK", label: "Rework requested" },
];

const options = [
  { value: true, label: "Newest First" },
  { value: false, label: "Oldest First" },
];

const Order = () => {
  const [formFilter, setFormFilter] = useState({
    page: 1,
    itemsPerPage: 10,
    status: "",
    sortDesc: true,
  });

  const currentTab = tabs.find((tab) => tab.key === formFilter.status) || { label: "All order" };

  const { data, isLoading, refetch } = useQuery(["ORDER", formFilter], () => getOrderList(formFilter), {
    refetchOnWindowFocus: true,
  });

  const handleTabChange = (key: string) => {
    setFormFilter((prev) => ({
      ...prev,
      status: key,
    }));
  };

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - 24px)" }}
        className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12"
      >
        <div className="pt-4 md:pt-0 mb-[-20px] md:mb-0">
          <h1 className="text-[#212529] font-medium text-[24px]">All orders</h1>
        </div>

        <div className="flex flex-col gap-6 mb-6">
          <CustomTabs tabs={tabs} onChange={handleTabChange} activeKey={formFilter.status} />

          <div className="card flex flex-col gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1>{currentTab.label}</h1>
              <div className="flex gap-4 items-center text-[#6C757D] whitespace-nowrap">
                <h1>Sort by</h1>
                <CustomSelect
                  options={options}
                  onChange={(selectedValue) => {
                    setFormFilter((prev) => ({
                      ...prev,
                      sortDesc: selectedValue,
                    }));
                  }}
                  value={formFilter.sortDesc}
                />
              </div>
            </div>

            {data?.data?.list.map((item: any, index: number) => (
              <Card
                key={index}
                name={item.projectName}
                categories={item.service}
                status={item.status}
                price={item.orderTotal}
                style={item.designStyle}
                quantity={item.quantity}
                id={item.id}
                date={item.createdTime}
                refetch={refetch}
              />
            ))}

            <CustomPagination
              page={formFilter.page}
              pageSize={formFilter.itemsPerPage}
              total={data?.data?.count}
              setPage={(value) => setFormFilter({ ...formFilter, page: value })}
              setPerPage={(value) => setFormFilter({ ...formFilter, itemsPerPage: value })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
