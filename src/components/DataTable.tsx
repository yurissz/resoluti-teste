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
                token: {
                    colorPrimary: "#001e3c",
                    borderRadius: 8,
                },

                components: {
                    Pagination: {
                        colorPrimary: "#001e3c",
                    },
                    Table: {
                        colorBgContainer: "#ffffff",
                        colorTextHeading: "#001e3c",
                        colorBorder: "#e0e0e0",
                        controlItemBgHover: "#e6f7ff",
                        padding: 12,
                    },
                },
            }}
        >
            <Table
                dataSource={dataSource.map((item, index) => ({
                    ...item,
                    key: item.id ?? index,
                }))}
                columns={columns}
                style={{
                    width: "90%",
                    marginBlock: "30px",
                }}
            />
        </ConfigProvider>
    )
}