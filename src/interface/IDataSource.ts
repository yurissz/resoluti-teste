export interface IBaseItem {
    id: number | string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IClient extends IBaseItem {
    nome: string;
    email: string;
    status: 'Ativo' | 'Inativo' | 'Pendente';
}


export interface IProduct extends IBaseItem {
    produto: string;
    preco: number;
    estoque: number;
}