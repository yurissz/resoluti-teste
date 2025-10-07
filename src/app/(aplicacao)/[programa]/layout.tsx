"use client"

import { LateralSideBar } from "@/components/LateralSideBar";
import { useClients } from "@/hooks/useClients";
import { useMenu } from "@/hooks/useMenu";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data: menu, isLoading, isError } = useMenu()

    const [clientFilters] = useState<{ nome?: string; status?: string }>({});
    const { data: clientsData } = useClients(clientFilters);

    const [productFilters] = useState<{ produto?: string }>({});
    const { data: productsData } = useProducts(productFilters);
    return (
        <section className="relative min-h-screen flex">
            <LateralSideBar clients={clientsData} products={productsData}
                menu={menu} />
            <main className="flex-1 ml-64">
                {children}
            </main>
        </section>
    );
}