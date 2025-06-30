"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/api/order.service";

const StatisticsChart = () => {
  const { data: statisticsResponse } = useQuery(["STATISTICS"], () => getStatistics(), {
    refetchOnWindowFocus: true,
  });

  const statistics: any = statisticsResponse?.data;

  if (!statistics) {
    return (
      <div className="w-full space-y-6">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl border animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatGrowth = (percent: number, isPositive: boolean) => {
    const symbol = isPositive ? "+" : "";
    return `${symbol}${percent}%`;
  };

  const totalRevenue = statistics.revenue.thisMonth + statistics.revenue.lastMonth;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Business Analytics</h2>
        <span className="text-sm text-gray-500">Updated now</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Orders Card */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h4>
            <div className="flex items-end justify-between mb-3">
              <span className="text-3xl font-bold text-blue-700">{statistics.totalOrders}</span>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-sm text-blue-600">Orders</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium flex items-center ${
                statistics.isGrowthPositive ? "text-green-600" : "text-red-600"
              }`}>
                {statistics.isGrowthPositive ? (
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                {formatGrowth(statistics.growthPercent, statistics.isGrowthPositive)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-blue-200 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-100 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h4>
            <div className="flex items-end justify-between mb-3">
              <span className="text-3xl font-bold text-green-700">{formatUSD(totalRevenue)}</span>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-sm text-green-600">USD</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium flex items-center ${
                statistics.revenue.isGrowthPositive ? "text-green-600" : "text-red-600"
              }`}>
                {statistics.revenue.isGrowthPositive ? (
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                {formatGrowth(statistics.revenue.growthPercent, statistics.revenue.isGrowthPositive)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-green-200 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Average Order Value Card */}
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Avg Order Value</h4>
            <div className="flex items-end justify-between mb-3">
              <span className="text-3xl font-bold text-purple-700">
                {formatUSD(totalRevenue / (statistics.totalOrders || 1))}
              </span>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-purple-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm text-purple-600">Per order</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Based on total orders</span>
            </div>
          </div>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-purple-200 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Comparison Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h4 className="font-medium text-gray-700 mb-4">Orders Comparison</h4>
          <div className="space-y-4">
            {/* This Month */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">This Month</span>
                <span className="text-sm font-bold text-blue-600">{statistics.thisMonth}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(statistics.thisMonth / Math.max(statistics.thisMonth, statistics.lastMonth)) * 100}%` }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Last Month */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Last Month</span>
                <span className="text-sm font-bold text-gray-600">{statistics.lastMonth}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(statistics.lastMonth / Math.max(statistics.thisMonth, statistics.lastMonth)) * 100}%` }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Growth indicator */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Growth Rate</span>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    statistics.isGrowthPositive ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    statistics.isGrowthPositive ? "text-green-600" : "text-red-600"
                  }`}>
                    {formatGrowth(statistics.growthPercent, statistics.isGrowthPositive)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Comparison Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h4 className="font-medium text-gray-700 mb-4">Revenue Comparison</h4>
          <div className="space-y-4">
            {/* This Month */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">This Month</span>
                <span className="text-sm font-bold text-green-600">{formatUSD(statistics.revenue.thisMonth)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(statistics.revenue.thisMonth / Math.max(statistics.revenue.thisMonth, statistics.revenue.lastMonth)) * 100}%` }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Last Month */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Last Month</span>
                <span className="text-sm font-bold text-gray-600">{formatUSD(statistics.revenue.lastMonth)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(statistics.revenue.lastMonth / Math.max(statistics.revenue.thisMonth, statistics.revenue.lastMonth)) * 100}%` }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Growth indicator */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Growth Rate</span>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    statistics.revenue.isGrowthPositive ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    statistics.revenue.isGrowthPositive ? "text-green-600" : "text-red-600"
                  }`}>
                    {formatGrowth(statistics.revenue.growthPercent, statistics.revenue.isGrowthPositive)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart; 