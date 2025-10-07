"use client"

import { IMenuItem } from "@/interface/IMenu";
import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import { useState } from 'react';
import { DollarOutlined, ContainerOutlined, PieChartOutlined, ProfileOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

interface LateralSideBarProps {
    menu: IMenuItem[];
}

const getIcon = (programa: string) => {
    switch (programa.toLowerCase()) {
        case 'financeiro':
            return <DollarOutlined />;
        case 'estoque':
            return <ContainerOutlined />;
        default:
            return <PieChartOutlined />;
    }
}

const getActionIcon = (acao: string) => {
    switch (acao.toLowerCase()) {
        case 'listar':
            return <ProfileOutlined />;
        default:
            return null;
    }
}


export function LateralSideBar({ menu = [] }: LateralSideBarProps) {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems: MenuItem[] = menu.map((menuItem: IMenuItem) => {
        const programaKey = menuItem.programa;

        return {
            key: programaKey,
            label: menuItem.programa.toUpperCase(),
            icon: getIcon(programaKey),
            children: menuItem.acoes?.map((acao) => {
                const path = `/${programaKey}/${menuItem.modulo}/${acao}`;

                return {
                    key: path,
                    label: (
                        <Link href={path} className="block p-2">
                            {menuItem.modulo} / {acao}
                        </Link>
                    ),
                }
            }),
        }
    });

    const onClick: MenuProps['onClick'] = () => { };

    return (
        <Layout.Sider
            width={256}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint="lg"
            collapsedWidth={0}
            style={{
                height: '100vh',
                position: 'relative',
                left: 0,
                top: 0,
                zIndex: 10,
                backgroundColor: 'darkorange',
            }}
        >
            <Menu
                onClick={onClick}
                style={{
                    width: '100%',
                    height: "100%",
                    borderRight: 0,
                    backgroundColor: "transparent",
                }}
                mode="inline"
                items={menuItems}
            />
        </Layout.Sider>
    );
}