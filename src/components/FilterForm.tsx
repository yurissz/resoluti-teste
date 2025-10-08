"use client";
import { IFilter } from "@/interface/IMenu";
import { Form, Input, Select, Button, Space, ConfigProvider } from "antd";
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

    const formContainerStyle = {
        padding: '20px 24px',
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f0f0f0',
        width: '80%',
        display: 'flex',
        gap: '16px',
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 8,
                    colorPrimary: '#001e3c',
                },
            }}
        >
            <Form
                form={form}
                layout="inline"
                style={formContainerStyle}
                onFinish={handleFinish}
            >
                {filters.map((filter) => {
                    if (filter.type === "input") {
                        return (
                            <Form.Item
                                key={filter.name}
                                name={filter.name}
                                label={filter.label}
                                style={{ flexGrow: 1, minWidth: '200px', marginInlineEnd: 0 }}
                            >
                                <Input placeholder={`Digite o ${filter.label.toLowerCase()}`} />
                            </Form.Item>
                        );
                    }

                    if (filter.type === "select") {
                        return (
                            <Form.Item
                                key={filter.name}
                                name={filter.name}
                                label={filter.label}
                                style={{ flexGrow: 1, minWidth: '200px', marginInlineEnd: 0 }}
                            >
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

                <Form.Item style={{ marginInlineEnd: 0, flexShrink: 0, marginTop: '24px' }}>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Filtrar
                        </Button>
                        <Button onClick={handleReset}>Limpar</Button>
                    </Space>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}