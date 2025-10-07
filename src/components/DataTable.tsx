import { IClient, IProduct } from "@/interface/IDataSource";
import { ConfigProvider, Table } from "antd";
import { ColumnsType } from "antd/es/table";


interface DataTableProps {
    dataSource: IClient[] | IProduct[];
    columns: ColumnsType;
}

export function DataTable({ dataSource, columns }: DataTableProps) {

    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        colorPrimary: "orange",
                    },
                },
            }}
        >
            <Table
                dataSource={dataSource.map((item, index) => ({
                    ...item,
                    key: item.id ?? index,
                }))} columns={columns}
                style={{
                    width: "90%",
                    marginBlock: "30px",
                    backgroundColor: "orange",
                    border: "2px gray solid"

                }}
            />
        </ConfigProvider>
    )

}