"use client"

import { DataTable } from "@/components/DataTable";
import { FilterForm } from "@/components/FilterForm";
import { useClients } from "@/hooks/useClients";
import { useMenu } from "@/hooks/useMenu";
import { useProducts } from "@/hooks/useProducts";
import { IClient, IProduct } from "@/interface/IDataSource";
import { IColumn, IFilter, IMenuItem } from "@/interface/IMenu";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PageParams {
    program: string;
    module: string;
    action: string;
    [key: string]: string;

}

export default function Home() {

    const params = useParams<PageParams>();
    const { programa, modulo } = params;

    const activeModule = modulo;

    const { data: menu, isLoading, isError } = useMenu()

    const [clientFilters, setClientFilters] = useState<{ nome?: string; status?: string }>({});
    const { data: clientsData } = useClients(clientFilters);

    const [productFilters, setProductFilters] = useState<{ produto?: string }>({});
    const { data: productsData } = useProducts(productFilters);

    const [columns, setColumns] = useState<IColumn[]>([]);
    const [dataSource, setDataSource] = useState<IProduct[] | IClient[]>([]);
    const [filters, setFilters] = useState<IFilter[]>([])


    useEffect(() => {
        if (!menu || !programa) return;

        const menuItem = menu.find((item: IMenuItem) => item.programa === programa || item.modulo === activeModule);

        if (menuItem) {
            setFilters(menuItem.filters || []);
            setColumns(menuItem.columns || []);
        } else {
            setColumns([]);
            setFilters([]);
            setDataSource([]);
        }
    }, [menu, programa]);



    useEffect(() => {
        console.log(module)
        if (programa === "financeiro" && clientsData) {
            setDataSource(clientsData);
        } else if (programa === "estoque" && productsData) {
            setDataSource(productsData);
        }
    }, [programa, clientsData, productsData]);


    useEffect(() => {
        if (programa === "financeiro") {
            setProductFilters({});
        } else if (programa === "estoque") {
            setClientFilters({});
        }
    }, [programa]);



    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (isError) return <div>Erro ao carregar menu</div>;

    return (
        <section className="relative min-h-screen flex">
            <div className="flex-1 ml-64 flex justify-center items-center bg-gray flex-col">
                <FilterForm
                    filters={filters}
                    onFilter={(values) => {
                        if (programa === "financeiro") {
                            setClientFilters(values);
                        } else if (programa === "estoque") {
                            setProductFilters(values);
                        }
                    }}
                />
                <DataTable dataSource={dataSource} columns={columns} />
            </div>
        </section>
    );
}
