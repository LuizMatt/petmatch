import { Request, Response } from "express";
import { contatoService } from "../services/contatoService";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";

export const criarContato = async (req: Request, res: Response)=> {
  try {
    const { nome, email, telefone, mensagem } = req.body;

    if (!nome || !email || !telefone || !mensagem) {
      return res.status(400).json({
        success: false,
        message: ErrorMissingContent,
      });
    }

    const novoContato = await contatoService.createContato({
      nome,
      email,
      telefone,
      mensagem,
    });

    return res.status(201).json({
      success: true,
      message: "Contato criado com sucesso",
      data: novoContato,
    });
  } catch (error) {
    console.error("Erro ao criar contato:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

export const listarContatos = async (_req: Request, res: Response) => {
  try {
    const contatos = await contatoService.getAllContatos();

    return res.status(200).json({
      success: true,
      data: contatos,
    });
  } catch (error) {
    console.error("Erro ao listar contatos:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};

/**
 * Busca contatos por email
 */
export const buscarPorEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email é obrigatório",
      });
    }

    const contatos = await contatoService.getContatosByEmail(email);

    return res.status(200).json({
      success: true,
      data: contatos,
    });
  } catch (error) {
    console.error("Erro ao buscar contatos por email:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};
