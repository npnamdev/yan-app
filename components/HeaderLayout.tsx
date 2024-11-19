"use client";

import * as React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { AlignLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import LocalSwitcher from "./LocalSwitcher";

export default function HeaderLayout() {
    const {
        toggleSidebar,
    } = useSidebar();

    const pathname = usePathname();
    let pathSegments = pathname.split('/').filter(segment => segment !== '');

    // Bỏ qua ngôn ngữ nếu nằm ở phần đầu tiên
    const supportedLanguages = ["vi", "en"]; // Danh sách các ngôn ngữ hỗ trợ
    if (supportedLanguages.includes(pathSegments[0])) {
        pathSegments = pathSegments.slice(1); // Bỏ qua mã ngôn ngữ
    }

    // Mapping đường dẫn tới label tiếng Việt
    const segmentLabels: Record<string, string> = {
        "manage": "Quản lý",
        "courses": "Danh sách khóa học",
        "categories": "Thể loại khoá học",
        "tags": "Thẻ khoá học",
        "activate-course": "Mã kích hoạt",
        "user-accounts": "Danh sách người dùng",
        "account-groups": "Nhóm người dùng",
        "roles-permissions": "Vai trò và phân quyền",
        "promo-codes": "Mã khuyến mãi",
        "email-marketing": "Chiến dịch Email",
        "popups": "Cửa Sổ Pop-up",
        "liblarys": "Quản lý thư viện",
    };

    const formatSegment = (segment: string) => {
        return segmentLabels[segment] || segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <header className="flex justify-between h-[60px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b w-full px-2 sticky top-0 bg-white z-50">
            <div className="flex items-center gap-2 px-2.5">
                <Button className="lg:hidden mr-1 w-8 h-8" variant="outline" size="icon" onClick={() => toggleSidebar()}>
                    <AlignLeft strokeWidth={1.5} />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-4 block md:hidden" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {/* Phần tử đầu tiên là "manage" */}
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${pathSegments[0]}`}>{formatSegment(pathSegments[0])}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* Các phần tử tiếp theo */}
                        {pathSegments.slice(1).map((segment, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {formatSegment(segment)}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <LocalSwitcher />
        </header>
    );
}
