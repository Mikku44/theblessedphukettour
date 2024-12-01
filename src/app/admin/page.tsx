"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";


export default function Page() {
    const [activeTab, setActiveTab] = useState("Pending"); // State สำหรับแท็บที่เลือก (tabs1)
    const [activeTab2, setActiveTab2] = useState("Booking review"); // State สำหรับแท็บที่เลือก (tabs2)

    const tabs = ["Pending", "Approved", "Reject", "Cancel", "Complete"];
    const tabs2 = ["Booking review", "Chat"];

    const statusColorMap = {
        Pending: "default",
        Approve: "success",
        Reject: "danger",
        Cencel: "warning",
        Complete: "warning",
      };
    return (
        <div className="min-h-screen bg-white p-4 pt-10">
            {/* Button Admin Merchant */}
            <div className="flex justify-start mb-6">
                <Button color="warning" className="hover:text-white">
                    Admin Merchant
                </Button>
            </div>

            {/* Section สำหรับ tabs2 */}
            <div className="max-w-2xl w-full mb-6">
                {/* Header ของ Tabs2 */}
                <div className="flex gap-2 p-4">
                    {tabs2.map((tab) => (
                        <Button
                            key={tab}
                            onPress={() => setActiveTab2(tab)}
                            color={activeTab2 === tab ? "warning" : "primary"}
                            variant={activeTab2 === tab ? "solid" : "flat"}
                            className={`flex-1 text-sm ${activeTab2 === tab ? "text-white" : "text-black"
                                }`}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Section สำหรับเนื้อหาของ tabs2 */}
            <div className="flex justify-center mb-6">
                <div className="w-full p-4 text-left">
                    {activeTab2 === "Booking review" && (
                        <>
                            {/* Tabs1 จะปรากฏเฉพาะเมื่อเลือก Booking review */}
                            <div className="flex gap-2 p-4">
                                {tabs.map((tab) => (
                                    <Button
                                        key={tab}
                                        onPress={() => setActiveTab(tab)}
                                        color={activeTab === tab ? "warning" : "primary"}
                                        variant={activeTab === tab ? "solid" : "flat"}
                                        className={`flex-1 text-sm ${activeTab === tab ? "text-white" : "text-black"
                                            }`}
                                    >
                                        {tab}
                                    </Button>
                                ))}
                            </div>
                            {/* Content ของ Tabs1 */}
                            <div className="p-4">
                                {activeTab === "Pending" && (
                                    <p className="text-gray-700"><Table removeWrapper aria-label="Example static collection table">
                                        <TableHeader>
                                            <TableColumn>NAME</TableColumn>
                                            <TableColumn>ROLE</TableColumn>
                                            <TableColumn>STATUS</TableColumn>
                                            <TableColumn>Date</TableColumn>
                                            <TableColumn>total day (If any)</TableColumn>
                                            <TableColumn>Pick up?</TableColumn>
                                            <TableColumn>Where to Pick up (If any)</TableColumn>
                                            <TableColumn>Price</TableColumn>
                                            <TableColumn>Contact host?</TableColumn>
                                            <TableColumn>Status</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                                <TableCell>Tony Reichert</TableCell>
                                                <TableCell>CEO</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                            </TableRow>
                                            <TableRow key="2">
                                                <TableCell>Zoey Lang</TableCell>
                                                <TableCell>Technical Lead</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                                <TableCell>Paused</TableCell>
                                            </TableRow>
                                            <TableRow key="3">
                                                <TableCell>Jane Fisher</TableCell>
                                                <TableCell>Senior Developer</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>Active</TableCell>
                                            </TableRow>
                                            <TableRow key="4">
                                                <TableCell>William Howard</TableCell>
                                                <TableCell>Community Manager</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                                <TableCell>Vacation</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table></p>
                                )}
                                {activeTab === "Approved" && (
                                    <p className="text-gray-700">ข้อมูลสถานะ: Approved</p>
                                )}
                                {activeTab === "Reject" && (
                                    <p className="text-gray-700">ข้อมูลสถานะ: Reject</p>
                                )}
                                {activeTab === "Cancel" && (
                                    <p className="text-gray-700">ข้อมูลสถานะ: Cancel</p>
                                )}
                                {activeTab === "Complete" && (
                                    <p className="text-gray-700">ข้อมูลสถานะ: Complete</p>
                                )}
                            </div>
                        </>
                    )}
                    {activeTab2 === "Chat" && (
                        <p className="text-gray-700">ข้อมูล: Chat</p>
                    )}
                </div>
            </div>
        </div>
    );
}