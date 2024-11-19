"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Clipboard, Download, ScanEye, Search, SquarePen, Trash, Upload } from "lucide-react";
import Papa from 'papaparse';
import axios from 'axios';
import Image from "next/image";
import moment from 'moment';
import { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusFilter } from "@/components/StatusFilter";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { UserActionMenu } from "@/components/UserActionMenu";
import { ActionBtn } from "@/components/ActionBtn";

export default function UserAccountsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("10");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const fetcher = async (url: string): Promise<any> => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'An error occurred');
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const { data, error, isLoading } = useSWR(
        `https://api.rock.io.vn/api/v1/users?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const handleCreateUser = async (userData: any) => {
        try {
            const response = await axios.post("https://api.rock.io.vn/api/v1/users", userData);
            if (response) {
                mutate(`https://api.rock.io.vn/api/v1/users?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                console.log('User created successfully:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await axios.delete(`https://api.rock.io.vn/api/v1/users/${userId}`);
            if (response) {
                mutate(`https://api.rock.io.vn/api/v1/users?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                console.log('User deleted successfully:', response);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const users: User[] = data?.data;
    const totalPages = data?.pagination?.totalPages;
    const totalUsers = data?.pagination?.totalUsers;

    const handleNext = () => { if (currentPage < data?.pagination?.totalPages) setCurrentPage(currentPage + 1); };
    const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(data?.pagination?.totalPages);

    const handleLimitChange = (newLimit: any) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleSelectUser = (user: any) => {
        setSelectedUsers((prevSelected: any) =>
            prevSelected.includes(user) ? prevSelected.filter((u: any) => u !== user) : [...prevSelected, user]
        );
    };

    const handleSelectAllUsers = () => {
        const allSelected = users.every((user: any) => selectedUsers.includes(user));
        const updatedSelectedUsers = allSelected
            ? selectedUsers.filter((u) => !users.includes(u))
            : Array.from(new Set([...selectedUsers, ...users]));
        setSelectedUsers(updatedSelectedUsers);
    };


    const itemsPerPageOptions = [
        { value: "5", label: "5", action: () => handleLimitChange(5) },
        { value: "10", label: "10", action: () => handleLimitChange(10) },
        { value: "15", label: "15", action: () => handleLimitChange(15) },
        { value: "30", label: "30", action: () => handleLimitChange(30) },
    ];

    const statusOptions = [
        { value: "default", label: "Default", action: () => console.log("Default clicked") },
        { value: "active", label: "Active", action: () => console.log("active clicked") },
        { value: "inactive", label: "Inactive", action: () => console.log("inactive clicked") },
    ];

    const roleOptions = [
        { value: "default", label: "Default", action: () => console.log("Default clicked") },
        { value: "admin", label: "Admin", action: () => console.log("Admin clicked") },
        { value: "editor", label: "Editor", action: () => console.log("Editor clicked") },
        { value: "user", label: "User", action: () => console.log("User clicked") },
    ];

    const dateOptions = [
        { value: "default", label: "Default", action: () => console.log("Default clicked") },
        { value: "ascending", label: "Ascending", action: () => console.log("Ascending clicked") },
        { value: "descending", label: "Descending", action: () => console.log("Descending clicked") },
    ];

    const actionOptions = [
        { value: "import", label: "Import", icon: <Upload size={15} strokeWidth={1.5} />, action: () => console.log("Import clicked") },
        { value: "export", label: "Export", icon: <Download size={15} strokeWidth={1.5} />, action: () => exportToCSV() },
        { value: "delete", label: "Delete", icon: <Trash size={15} strokeWidth={1.5} />, action: () => console.log("Delete User clicked") },
    ];

    useEffect(() => {
        console.log("Selected users: ", selectedUsers);
    }, [selectedUsers]);

    const menuOptions = [
        { icon: <Clipboard size={16} strokeWidth={1.5} />, value: "copy", label: "Copy ID người dùng", action: (userID: string) => console.log("Details clicked", userID) },
        { icon: <ScanEye size={16} strokeWidth={1.5} />, value: "details", label: "Chi tiết người dùng", action: (userID: string) => console.log("Details clicked", userID) },
        { icon: <SquarePen size={16} strokeWidth={1.5} />, value: "edit", label: "Chỉnh sửa người dùng", action: (userID: string) => console.log("Update clicked", userID) },
        {
            icon: <Trash size={16} strokeWidth={1.5} />, value: "delete", label: "Xóa người dùng",
            action: (userID: any) => handleDeleteUser(userID)
        },
    ];

    const exportToCSV = () => {
        if (selectedUsers.length === 0) {
            alert("Vui lòng chọn ít nhất một người dùng để xuất.");
            return;
        }

        const csv = Papa.unparse(selectedUsers.map(user => ({
            "Full Name": user.username,
            "Email": user.email,
            "Status": user.isActive,
            "Role": user.role,
            "Date Created": user.createdAt,
        })));

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Selected_Users.csv');
        a.click();
    };

    return (
        <div className="px-4 py-2 md:py-4 w-full">
            <div className="text-black shadow rounded-md overflow-auto border select-none w-full bg-white">
                <div className="h-[55px] md:h-[60px] px-5 md:flex justify-between items-center w-full">
                    <div className="relative hidden md:flex items-center">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input
                            className="w-[360px] px-5 pl-10"
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full h-full justify-between lg:justify-end">
                        <ActionBtn label="Hành động" options={actionOptions} selectedUsers={selectedUsers} />
                    </div>
                </div>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100 hover:bg-gray-20">
                            <TableHead className="text-black px-4 h-[50px] font-bold pl-5">
                                <Checkbox onCheckedChange={handleSelectAllUsers} checked={users?.every(user => selectedUsers.includes(user))} />
                            </TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Tên người dùng</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px]">Email</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px]">
                                <StatusFilter label="Trạng thái" options={statusOptions} />
                            </TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px]">
                                <StatusFilter label="Vai trò" options={roleOptions} />
                            </TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px]">
                                <StatusFilter label="Thời gian" options={dateOptions} />
                            </TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[50px] text-center font-medium">
                                    Đang tải...
                                </TableCell>
                            </TableRow>
                        ) : users?.length > 0 ? (
                            users.map((user: User) => (
                                <TableRow key={user.username}>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap pl-5">
                                        <Checkbox checked={selectedUsers.includes(user)} onCheckedChange={() => handleSelectUser(user)} />
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Image className="w-7 h-7 rounded-full" src="https://lineone.piniastudio.com/images/avatar/avatar-1.jpg" width={50} height={50} alt="dev" />
                                            <h3 className="font-bold text-[13px] whitespace-nowrap mr-4">{user.username}</h3>
                                        </div>
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{user.email}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <div className={`rounded-lg px-2 py-1 text-xs w-min text-primary-foreground ${user.isActive ? 'bg-[#3eca65]' : 'bg-[#f45d5d]'}`}>
                                            {user.isActive ? "Hoạt động" : "Không hoạt động"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        {user?.role?.name === 'admin' ? 'Quản trị viên' : user?.role?.name === 'user' ? 'Học viên' : user?.role?.name}
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{moment(user.createdAt).subtract(10, 'days').calendar()}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <UserActionMenu options={menuOptions} userID={user?._id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[50px] text-center font-medium">
                                    Không có người dùng nào
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="h-[55px] px-5 flex justify-between items-center border-t w-full">
                    <div className="hidden md:flex flex-1 text-sm font-semibold">Đã chọn {selectedUsers.length} / {totalUsers} hàng</div>
                    <div className="flex gap-2 items-center justify-center text-sm font-medium mr-4">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[70px] items-center justify-between font-medium px-2.5 h-8">
                                    {value}
                                    <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[70px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {itemsPerPageOptions.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.value}
                                                    onSelect={() => {
                                                        if (option.value === value) {
                                                            setOpen(false);
                                                        } else {
                                                            setValue(option.value);
                                                            setOpen(false);
                                                            option.action && option.action();
                                                        }
                                                    }}
                                                >
                                                    {option.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="hidden md:flex w-[100px] items-center justify-center text-sm font-medium mr-4">Trang {currentPage} / {totalPages}</div>
                    <Pagination className="w-min mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleFirstPage} disabled={currentPage === 1}>
                                    <ChevronsLeft size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handlePrevious} disabled={currentPage === 1}>
                                    <ChevronLeft size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleNext} disabled={currentPage === totalPages}>
                                    <ChevronRight size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleLastPage} disabled={currentPage === totalPages}>
                                    <ChevronsRight size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}