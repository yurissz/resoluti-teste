export interface IColumn {
    title: string;
    dataIndex: string;
}

export interface IFilter {
    type: "input" | "select";
    name: string;
    label: string;
    options?: string[]
}

export interface IMenuItem {
    programa: 'financeiro' | 'estoque';
    modulo: string;
    acoes: string[];
    columns: IColumn[];
    filters: IFilter[]
}

