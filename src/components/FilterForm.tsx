"use client";
import { IFilter } from "@/interface/IMenu";
import { Form, Input, Select, Button, Space } from "antd";

interface FilterFormProps {
    filters: IFilter[],
    onFilter: (values: Record<string, string>) => void;
}

export function FilterForm({ filters, onFilter }: FilterFormProps) {
    const [form] = Form.useForm();

    const handleFinish = (values: Record<string, string>) => {
        onFilter(values);
    };

    const handleReset = () => {
        form.resetFields();
        onFilter({});
    };

    return (
        <Form
            form={form}
            layout="inline"
            style={{ marginBottom: 16 }}
            onFinish={handleFinish}
        >
            {filters.map((filter) => {
                if (filter.type === "input") {
                    return (
                        <Form.Item key={filter.name} name={filter.name} label={filter.label}>
                            <Input placeholder={`Digite o ${filter.label.toLowerCase()}`} />
                        </Form.Item>
                    );
                }

                if (filter.type === "select") {
                    return (
                        <Form.Item key={filter.name} name={filter.name} label={filter.label}>
                            <Select
                                allowClear
                                placeholder={`Selecione o ${filter.label.toLowerCase()}`}
                                options={filter.options?.map((opt) => ({
                                    label: opt,
                                    value: opt,
                                }))}
                            />
                        </Form.Item>
                    );
                }

                return null;
            })}

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" style={{ color: "white", backgroundColor: "orange" }}>
                        Filtrar
                    </Button>
                    <Button onClick={handleReset}>Limpar</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}