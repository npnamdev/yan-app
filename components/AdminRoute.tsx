"use client";

import React, { useEffect, useState } from "react";
import { Loader } from 'lucide-react';
import { useRouter } from "@/i18n/routing";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) { router.push('/login'); return; }
                
                setTimeout(() => {
                    setIsAuthorized(true);
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error("Error checking admin access:", error);
                window.location.replace("/login");
            }
        };

        checkAdminAccess();
    }, []);

    if (loading) {
        return <div className="w-full h-dvh bg-blue-800 flex justify-center items-center text-white ">
<Loader size={70} strokeWidth={1.75} className="animate-spin"/>
</div>;
    }

    return <>{children}</>;
};

export default AdminRoute;