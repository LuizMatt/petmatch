import { Request, Response } from "express";
import { ContatoService } from "../services/ContatoServce";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { FailedOnCreate } from "../utils/CreateError";
import { UnknowError } from "../utils/Unkown";
import { UUIDNotFoundError } from "../utils/Uuid";
import { NotFound } from "../utils/NotFoundError";
import { EmptyArrayError } from "../utils/EmptyArrayError";
import { FailedToDelete } from "../utils/FailedToDelete";

export class ContatoController {

    constructor() {}

    createContatoController = async (req: Request, res: Response): Promise<void> => {
        const { nome, email, telefone, texto } = req.body;
        try {
            if (!nome || !email || !telefone || !texto) {
                res.status(400).json({ message: ErrorMissingContent });
                return;
            }

            const contatoCreate = await ContatoService.createContato({ nome, email, telefone, texto });
            if (!contatoCreate) {
                res.status(400).json({ message: `${FailedOnCreate}` });
                return;
            }

            console.log(`Contato Criado: ${contatoCreate?.dataValues}`);
            res.status(201).json({
                sucess: true,
                message: "Sucess, Contato Created",
                contatoCreate,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err}` });
            } else {
                res.status(400).json({ message: `Error: ${UnknowError}` });
            }
        }
    }

    getAllContatosController = async (req: Request, res: Response): Promise<void> => {
        try {
            const contatos = await ContatoService.getAllContatos();
            if (!contatos || contatos.length === 0) {
                res.status(404).json({
                    sucess: false,
                    message: EmptyArrayError,
                });
                return;
            }

            console.log(`All Contatos: ${contatos}`);
            res.status(200).json({
                sucess: true,
                message: "All Contatos: ",
                contatos,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err}` });
            } else {
                res.status(400).json({ message: `Error: ${UnknowError}` });
            }
        }
    }

    getContatoByIdController = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            if (!id || id === null) {
                res.status(400).json({
                    sucess: false,
                    message: UUIDNotFoundError,
                });
                return;
            }

            const contato = await ContatoService.getContatoById(id);
            if (!contato) {
                res.status(404).json({
                    sucess: false,
                    message: `Error: ${NotFound}`,
                });
                return;
            }

            console.log(`Contato encontrado: ${contato}`);
            res.status(200).json({
                sucess: true,
                message: "Sucess, Contato Found",
                contato,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err}` });
            } else {
                res.status(400).json({ message: `Error: ${UnknowError}` });
            }
        }
    }

    updateContatoController = async (req: Request, res: Response): Promise<void> => {
        const { nome, email, telefone, texto } = req.body;
        const { id } = req.params;
        try {
            if (!id || id === null) {
                res.status(400).json({
                    sucess: false,
                    message: UUIDNotFoundError || "This is not an ID",
                });
                return;
            }

            if (!nome || !email || !telefone || !texto) {
                res.status(400).json({
                    sucess: false,
                    message: ErrorMissingContent || "Please insert all content",
                });
                return;
            }

            const contatoUpdate = await ContatoService.updateContatoById(id, { nome, email, telefone, texto });
            if (!contatoUpdate) {
                res.status(400).json({
                    sucess: false,
                    message: `${FailedOnCreate}`,
                });
                return;
            }

            console.log(`Contato Atualizado: ${contatoUpdate}`);
            res.status(201).json({
                sucess: true,
                message: "Contato Updated!",
                contatoUpdate,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({
                    sucess: false,
                    message: `Error: ${err}`,
                });
            } else {
                res.status(400).json({
                    sucess: false,
                    message: `${UnknowError}`,
                });
            }
        }
    }

    deleteContatoByIdController = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            if (!id || id === null) {
                res.status(400).json({
                    sucess: false,
                    message: UUIDNotFoundError || "This is not an ID",
                });
                return;
            }

            const contatoDeleted = await ContatoService.deleteContatoById(id);
            if (!contatoDeleted) {
                res.status(400).json({
                    sucess: false,
                    message: FailedToDelete,
                });
                return;
            }

            res.status(200).json({
                sucess: true,
                message: `Sucess! Contato Deleted on ${id}`,
                contatoDeleted,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err}` });
            } else {
                res.status(400).json({ message: `Error: ${UnknowError}` });
            }
        }
    }
}
