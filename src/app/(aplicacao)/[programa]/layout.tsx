"use client"

import { LateralSideBar } from "@/components/LateralSideBar";
import { useMenu } from "@/hooks/useMenu";
import { Spin } from "antd";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data: menu, isLoading, isError } = useMenu();


    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    }

    if (isError) return <div className="p-8 text-red-500">Erro ao carregar menu</div>;

    return (
        <section className="relative min-h-screen flex">
            <LateralSideBar
                menu={menu}
            />
            <main className="flex-1 ml-64">
                {children}
            </main>
        </section>
    );
}