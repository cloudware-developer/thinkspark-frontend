import { Contato } from "./Contato";

export class Pessoa {
    pessoaId!: number;
    nome?: string;
    emailConfirmado?: boolean;
    celular?: string;
    celularConfirmado!: string;
    nascimento!: Date;
    contato!: Contato[];
    cpf?: string;
    rg?: string;
    senha?: string;
    foto?: string;
    status?: number;
    criadoEm!: Date;
    editadoEm?: string;
}