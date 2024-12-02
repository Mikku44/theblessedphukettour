"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";


export default function Page() {
    const [activeTab, setActiveTab] = useState("Pending"); // State สำหรับแท็บที่เลือก (tabs1)
    const [activeTab2, setActiveTab2] = useState("Booking review"); // State สำหรับแท็บที่เลือก (tabs2)
    const [status, setStatus] = useState("Yes");
    const [status2, setStatus2] = useState("Pending");

    const tabs = ["Pending", "Approved", "Reject", "Cancel", "Complete"];
    const tabs2 = ["Booking review", "Chat"];

    // const statusColorMap = {
    //     Pending: "default",
    //     Approve: "success",
    //     Reject: "danger",
    //     Cencel: "warning",
    //     Complete: "warning",
    // };
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
                <div className="flex gap-2">
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
                    {/* Booking review */}
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
                                    <p className="text-gray-700">
                                        <Table
                                            removeWrapper
                                            aria-label="Responsive Table Example"
                                            className="min-w-full overflow-x-auto"
                                        >
                                            <TableHeader>
                                                <TableColumn className="text-center">NAME</TableColumn>
                                                <TableColumn className="text-center">Email</TableColumn>
                                                <TableColumn className="text-center">Contact number</TableColumn>
                                                <TableColumn className="text-center">Optional contact</TableColumn>
                                                <TableColumn className="text-center">Total Day</TableColumn>
                                                <TableColumn className="text-center">Pick up?</TableColumn>
                                                <TableColumn className="text-center">Where to Pick up</TableColumn>
                                                <TableColumn className="text-center">Price</TableColumn>
                                                <TableColumn className="text-center">contact host?</TableColumn>
                                                <TableColumn className="text-center">Status</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow key="1">
                                                    <TableCell className="text-center">Tony</TableCell>
                                                    <TableCell className="text-center">CEO2024@gmail.com</TableCell>
                                                    <TableCell className="text-center">0999999999</TableCell>
                                                    <TableCell className="text-center">0888888888</TableCell>
                                                    <TableCell className="text-center">2</TableCell>
                                                    <TableCell className="text-center">1</TableCell>
                                                    <TableCell className="text-center">4</TableCell>
                                                    <TableCell className="text-center">3999</TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status === "Yes"
                                                                        ? "bg-green-500 text-white"
                                                                        : status === "Pending"
                                                                            ? "bg-red-500 text-white"
                                                                            : "bg-gray-500 text-black"
                                                                        }`}
                                                                >
                                                                    {status}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus(key)}
                                                                aria-label="Select status"
                                                            >
                                                                <DropdownItem key="Yes" className="bg-green-500 text-white">
                                                                    Yes
                                                                </DropdownItem>
                                                                <DropdownItem key="Pending" className="bg-red-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status2 === "Approve"
                                                                        ? "bg-green-500 text-white"
                                                                        : status2 === "Reject"
                                                                            ? "bg-red-500 text-white"
                                                                            : status2 === "Cancel"
                                                                                ? "bg-orange-400 text-white"
                                                                                : status2 === "Complete"
                                                                                    ? "bg-purple-500 text-white"
                                                                                    : "bg-gray-500 text-white"
                                                                        }`}
                                                                >
                                                                    {status2}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus2(key)}
                                                                aria-label="Select status2"
                                                            >
                                                                <DropdownItem key="Pending" className="bg-gray-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                                <DropdownItem key="Approve" className="bg-green-500 text-white">
                                                                    Approve
                                                                </DropdownItem>
                                                                <DropdownItem key="Reject" className="bg-red-500 text-white">
                                                                    Reject
                                                                </DropdownItem>
                                                                <DropdownItem key="Cancel" className="bg-orange-400 text-white">
                                                                    Cancel
                                                                </DropdownItem>
                                                                <DropdownItem key="Complete" className="bg-purple-500 text-white">
                                                                    Complete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </p>
                                )}
                                {activeTab === "Approved" && (
                                    <p className="text-gray-700">
                                        <Table
                                            removeWrapper
                                            aria-label="Responsive Table Example"
                                            className="min-w-full overflow-x-auto"
                                        >
                                            <TableHeader>
                                                <TableColumn className="text-center">NAME</TableColumn>
                                                <TableColumn className="text-center">Email</TableColumn>
                                                <TableColumn className="text-center">Contact number</TableColumn>
                                                <TableColumn className="text-center">Optional contact</TableColumn>
                                                <TableColumn className="text-center">Total Day</TableColumn>
                                                <TableColumn className="text-center">Pick up?</TableColumn>
                                                <TableColumn className="text-center">Where to Pick up</TableColumn>
                                                <TableColumn className="text-center">Price</TableColumn>
                                                <TableColumn className="text-center">contact host?</TableColumn>
                                                <TableColumn className="text-center">Status</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow key="1">
                                                    <TableCell className="text-center">Amad</TableCell>
                                                    <TableCell className="text-center">CEO2024@gmail.com</TableCell>
                                                    <TableCell className="text-center">0999999999</TableCell>
                                                    <TableCell className="text-center">0888888888</TableCell>
                                                    <TableCell className="text-center">2</TableCell>
                                                    <TableCell className="text-center">1</TableCell>
                                                    <TableCell className="text-center">4</TableCell>
                                                    <TableCell className="text-center">3999</TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status === "Yes"
                                                                        ? "bg-green-500 text-white"
                                                                        : status === "Pending"
                                                                            ? "bg-red-500 text-white"
                                                                            : "bg-gray-500 text-black"
                                                                        }`}
                                                                >
                                                                    {status}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus(key)}
                                                                aria-label="Select status"
                                                            >
                                                                <DropdownItem key="Yes" className="bg-green-500 text-white">
                                                                    Yes
                                                                </DropdownItem>
                                                                <DropdownItem key="Pending" className="bg-red-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status2 === "Approve"
                                                                        ? "bg-green-500 text-white"
                                                                        : status2 === "Reject"
                                                                            ? "bg-red-500 text-white"
                                                                            : status2 === "Cancel"
                                                                                ? "bg-orange-400 text-white"
                                                                                : status2 === "Complete"
                                                                                    ? "bg-purple-500 text-white"
                                                                                    : "bg-gray-500 text-white"
                                                                        }`}
                                                                >
                                                                    {status2}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus2(key)}
                                                                aria-label="Select status2"
                                                            >
                                                                <DropdownItem key="Pending" className="bg-gray-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                                <DropdownItem key="Approve" className="bg-green-500 text-white">
                                                                    Approve
                                                                </DropdownItem>
                                                                <DropdownItem key="Reject" className="bg-red-500 text-white">
                                                                    Reject
                                                                </DropdownItem>
                                                                <DropdownItem key="Cancel" className="bg-orange-400 text-white">
                                                                    Cancel
                                                                </DropdownItem>
                                                                <DropdownItem key="Complete" className="bg-purple-500 text-white">
                                                                    Complete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </p>
                                )}
                                {activeTab === "Reject" && (
                                    <p className="text-gray-700">
                                        <Table
                                            removeWrapper
                                            aria-label="Responsive Table Example"
                                            className="min-w-full overflow-x-auto"
                                        >
                                            <TableHeader>
                                                <TableColumn className="text-center">NAME</TableColumn>
                                                <TableColumn className="text-center">Email</TableColumn>
                                                <TableColumn className="text-center">Contact number</TableColumn>
                                                <TableColumn className="text-center">Optional contact</TableColumn>
                                                <TableColumn className="text-center">Total Day</TableColumn>
                                                <TableColumn className="text-center">Pick up?</TableColumn>
                                                <TableColumn className="text-center">Where to Pick up</TableColumn>
                                                <TableColumn className="text-center">Price</TableColumn>
                                                <TableColumn className="text-center">contact host?</TableColumn>
                                                <TableColumn className="text-center">Status</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow key="1">
                                                    <TableCell className="text-center">Omer</TableCell>
                                                    <TableCell className="text-center">CEO2024@gmail.com</TableCell>
                                                    <TableCell className="text-center">0999999999</TableCell>
                                                    <TableCell className="text-center">0888888888</TableCell>
                                                    <TableCell className="text-center">2</TableCell>
                                                    <TableCell className="text-center">1</TableCell>
                                                    <TableCell className="text-center">4</TableCell>
                                                    <TableCell className="text-center">3999</TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status === "Yes"
                                                                        ? "bg-green-500 text-white"
                                                                        : status === "Pending"
                                                                            ? "bg-red-500 text-white"
                                                                            : "bg-gray-500 text-black"
                                                                        }`}
                                                                >
                                                                    {status}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus(key)}
                                                                aria-label="Select status"
                                                            >
                                                                <DropdownItem key="Yes" className="bg-green-500 text-white">
                                                                    Yes
                                                                </DropdownItem>
                                                                <DropdownItem key="Pending" className="bg-red-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status2 === "Approve"
                                                                        ? "bg-green-500 text-white"
                                                                        : status2 === "Reject"
                                                                            ? "bg-red-500 text-white"
                                                                            : status2 === "Cancel"
                                                                                ? "bg-orange-400 text-white"
                                                                                : status2 === "Complete"
                                                                                    ? "bg-purple-500 text-white"
                                                                                    : "bg-gray-500 text-white"
                                                                        }`}
                                                                >
                                                                    {status2}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus2(key)}
                                                                aria-label="Select status2"
                                                            >
                                                                <DropdownItem key="Pending" className="bg-gray-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                                <DropdownItem key="Approve" className="bg-green-500 text-white">
                                                                    Approve
                                                                </DropdownItem>
                                                                <DropdownItem key="Reject" className="bg-red-500 text-white">
                                                                    Reject
                                                                </DropdownItem>
                                                                <DropdownItem key="Cancel" className="bg-orange-400 text-white">
                                                                    Cancel
                                                                </DropdownItem>
                                                                <DropdownItem key="Complete" className="bg-purple-500 text-white">
                                                                    Complete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </p>
                                )}
                                {activeTab === "Cancel" && (
                                    <p className="text-gray-700">
                                        <Table
                                            removeWrapper
                                            aria-label="Responsive Table Example"
                                            className="min-w-full overflow-x-auto"
                                        >
                                            <TableHeader>
                                                <TableColumn className="text-center">NAME</TableColumn>
                                                <TableColumn className="text-center">Email</TableColumn>
                                                <TableColumn className="text-center">Contact number</TableColumn>
                                                <TableColumn className="text-center">Optional contact</TableColumn>
                                                <TableColumn className="text-center">Total Day</TableColumn>
                                                <TableColumn className="text-center">Pick up?</TableColumn>
                                                <TableColumn className="text-center">Where to Pick up</TableColumn>
                                                <TableColumn className="text-center">Price</TableColumn>
                                                <TableColumn className="text-center">contact host?</TableColumn>
                                                <TableColumn className="text-center">Status</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow key="1">
                                                    <TableCell className="text-center">Anda</TableCell>
                                                    <TableCell className="text-center">CEO2024@gmail.com</TableCell>
                                                    <TableCell className="text-center">0999999999</TableCell>
                                                    <TableCell className="text-center">0888888888</TableCell>
                                                    <TableCell className="text-center">2</TableCell>
                                                    <TableCell className="text-center">1</TableCell>
                                                    <TableCell className="text-center">4</TableCell>
                                                    <TableCell className="text-center">3999</TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status === "Yes"
                                                                        ? "bg-green-500 text-white"
                                                                        : status === "Pending"
                                                                            ? "bg-red-500 text-white"
                                                                            : "bg-gray-500 text-black"
                                                                        }`}
                                                                >
                                                                    {status}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus(key)}
                                                                aria-label="Select status"
                                                            >
                                                                <DropdownItem key="Yes" className="bg-green-500 text-white">
                                                                    Yes
                                                                </DropdownItem>
                                                                <DropdownItem key="Pending" className="bg-red-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    variant="flat"
                                                                    className={`capitalize ${status2 === "Approve"
                                                                        ? "bg-green-500 text-white"
                                                                        : status2 === "Reject"
                                                                            ? "bg-red-500 text-white"
                                                                            : status2 === "Cancel"
                                                                                ? "bg-orange-400 text-white"
                                                                                : status2 === "Complete"
                                                                                    ? "bg-purple-500 text-white"
                                                                                    : "bg-gray-500 text-white"
                                                                        }`}
                                                                >
                                                                    {status2}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                onAction={(key: any) => setStatus2(key)}
                                                                aria-label="Select status2"
                                                            >
                                                                <DropdownItem key="Pending" className="bg-gray-500 text-white">
                                                                    Pending
                                                                </DropdownItem>
                                                                <DropdownItem key="Approve" className="bg-green-500 text-white">
                                                                    Approve
                                                                </DropdownItem>
                                                                <DropdownItem key="Reject" className="bg-red-500 text-white">
                                                                    Reject
                                                                </DropdownItem>
                                                                <DropdownItem key="Cancel" className="bg-orange-400 text-white">
                                                                    Cancel
                                                                </DropdownItem>
                                                                <DropdownItem key="Complete" className="bg-purple-500 text-white">
                                                                    Complete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </p>
                                )}
                                {activeTab === "Complete" && (
                                    <p className="text-gray-700"><Table
                                        removeWrapper
                                        aria-label="Responsive Table Example"
                                        className="min-w-full overflow-x-auto"
                                    >
                                        <TableHeader>
                                            <TableColumn className="text-center">NAME</TableColumn>
                                            <TableColumn className="text-center">Email</TableColumn>
                                            <TableColumn className="text-center">Contact number</TableColumn>
                                            <TableColumn className="text-center">Optional contact</TableColumn>
                                            <TableColumn className="text-center">Total Day</TableColumn>
                                            <TableColumn className="text-center">Pick up?</TableColumn>
                                            <TableColumn className="text-center">Where to Pick up</TableColumn>
                                            <TableColumn className="text-center">Price</TableColumn>
                                            <TableColumn className="text-center">contact host?</TableColumn>
                                            <TableColumn className="text-center">Status</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                                <TableCell className="text-center">Peter</TableCell>
                                                <TableCell className="text-center">CEO2024@gmail.com</TableCell>
                                                <TableCell className="text-center">0999999999</TableCell>
                                                <TableCell className="text-center">0888888888</TableCell>
                                                <TableCell className="text-center">2</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">4</TableCell>
                                                <TableCell className="text-center">3999</TableCell>
                                                <TableCell className="text-center">
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="flat"
                                                                className={`capitalize ${status === "Yes"
                                                                    ? "bg-green-500 text-white"
                                                                    : status === "Pending"
                                                                        ? "bg-red-500 text-white"
                                                                        : "bg-gray-500 text-black"
                                                                    }`}
                                                            >
                                                                {status}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            onAction={(key: any) => setStatus(key)}
                                                            aria-label="Select status"
                                                        >
                                                            <DropdownItem key="Yes" className="bg-green-500 text-white">
                                                                Yes
                                                            </DropdownItem>
                                                            <DropdownItem key="Pending" className="bg-red-500 text-white">
                                                                Pending
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="flat"
                                                                className={`capitalize ${status2 === "Approve"
                                                                    ? "bg-green-500 text-white"
                                                                    : status2 === "Reject"
                                                                        ? "bg-red-500 text-white"
                                                                        : status2 === "Cancel"
                                                                            ? "bg-orange-400 text-white"
                                                                            : status2 === "Complete"
                                                                                ? "bg-purple-500 text-white"
                                                                                : "bg-gray-500 text-white"
                                                                    }`}
                                                            >
                                                                {status2}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            onAction={(key: any) => setStatus2(key)}
                                                            aria-label="Select status2"
                                                        >
                                                            <DropdownItem key="Pending" className="bg-gray-500 text-white">
                                                                Pending
                                                            </DropdownItem>
                                                            <DropdownItem key="Approve" className="bg-green-500 text-white">
                                                                Approve
                                                            </DropdownItem>
                                                            <DropdownItem key="Reject" className="bg-red-500 text-white">
                                                                Reject
                                                            </DropdownItem>
                                                            <DropdownItem key="Cancel" className="bg-orange-400 text-white">
                                                                Cancel
                                                            </DropdownItem>
                                                            <DropdownItem key="Complete" className="bg-purple-500 text-white">
                                                                Complete
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table></p>
                                )}
                            </div>
                        </>
                    )}

                    {/* Chat */}
                    {activeTab2 === "Chat" && (
                        <p className="text-gray-700">ข้อมูล: Chat</p>
                    )}
                </div>
            </div>
        </div>
    );
}
