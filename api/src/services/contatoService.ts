import Contato from "../models/Contato";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";

export const contatoService = {

  createContato: async (body: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
  }) => {
    try {
      if (!body) {
        throw ErrorMissingContent;
      } else if (!body.nome || body.nome === null) {
        console.error("Por favor, insira o nome");
        throw new Error("Nome é obrigatório");
      } else if (!body.email || body.email === null) {
        console.error("Por favor, insira o email");
        throw new Error("Email é obrigatório");
      } else if (!body.telefone || body.telefone === null) {
        console.error("Por favor, insira o telefone");
        throw new Error("Telefone é obrigatório");
      } else if (!body.mensagem || body.mensagem === null) {
        console.error("Por favor, insira a mensagem");
        throw new Error("Mensagem é obrigatória");
      }

      const contato = await Contato.create(body);
      console.log(`Contato criado: ${contato}`);
      return contato;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Erro: ${err.message}`);
        throw err;
      } else {
        throw new Error("Erro desconhecido");
      }
    }
  },


  getAllContatos: async () => {
    try {
      const contatos = await Contato.findAll();
      if (contatos.length === 0) {
        console.log("Nenhum contato encontrado");
      }
      return contatos;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`ERRO: ${err.message}`);
        throw err;
      } else {
        throw new Error("Erro desconhecido");
      }
    }
  },

  
  getContatosByEmail: async (email: string) => {
    try {
      if (!email || email === null) {
        console.error("Por favor, insira o email");
        throw new Error("Email é obrigatório");
      }

      const contatos = await Contato.findAll({ where: { email } });
      if (contatos.length === 0) {
        console.log("Nenhum contato encontrado com este email");
      }
      return contatos;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Erro: ${err.message}`);
        throw err;
      } else {
        throw new Error("Erro desconhecido");
      }
    }
  },

 
};
