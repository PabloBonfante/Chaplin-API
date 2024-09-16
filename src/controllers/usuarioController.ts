import { Request, Response } from 'express';
import * as usuarioService from '../Services/usuarioService';
import { UsuarioSchema } from '../schemas/chaplin';
import UsuarioCreationAttributes from '../Models/usuario';

export const InsertUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = UsuarioSchema.safeParse(req.body);

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
            res.status(400).json({ message: errorMessage });
        }

        const newUsuario: UsuarioCreationAttributes = parsedResult.data as UsuarioCreationAttributes;
        const usuario = await usuarioService.insertUsuario(newUsuario);
        if (usuario === null) {
            res.status(409).json({ message: "El usuario ya existe" });
        } else {
            res.status(201).json(usuario);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllUsuario = async (_req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await usuarioService.getAllUsuario();
        res.status(200).json(usuarios);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuario = await usuarioService.getUsuarioById(parseInt(req.params.id));
        if (usuario !== null) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'usuario no encontrado' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = UsuarioSchema.safeParse(req.body);

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
            res.status(400).json({ message: errorMessage });
        }

        const newUsuario: UsuarioCreationAttributes = parsedResult.data as UsuarioCreationAttributes;

        const usuario = await usuarioService.updateUsuario(parseInt(req.params.id), newUsuario);
        if (usuario !== null) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await usuarioService.deleteUsuario(parseInt(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const LoginUsuario = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Validar que alias y password se hayan ingresado
        const alias = _req.query.alias as string ?? '';
        const pass = _req.query.password as string ?? '';

        // Verificar que alias y password no estén vacíos
        if (alias.trim() === '' || pass.trim() === '') {
            res.status(400).json({ message: "Se requiere el alias y la contraseña" });
            return; // Salir de la función si faltan parámetros
        }

        // Intentar iniciar sesión con alias y contraseña
        const usuario = await usuarioService.loginUsuario(alias, pass);

        if (usuario === null) {
            res.status(401).json({ message: "Usuario o contraseña incorrecto" });
        } else {
            res.status(200).json(usuario); // Inicio de sesión exitoso
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
