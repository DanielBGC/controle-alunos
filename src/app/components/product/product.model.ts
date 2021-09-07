export interface Product {
    id?: number
    name: string
    price: number
    // deletado: boolean
}

export interface Aluno {
    id?: number
    nome: string
    idade?: number
    turma?: string
    aulas?: Array<Object>
}