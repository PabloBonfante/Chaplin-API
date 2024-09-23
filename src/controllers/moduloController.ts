import { Request, Response } from 'express';
import * as ModuloService from '../Services/moduloService';
import { ModuloSchema } from '../schemas/chaplin';
import ModuloCreationAttributes from '../Models/modulo';

export const createModulo = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = ModuloSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newModulo: ModuloCreationAttributes = parsedResult.data as ModuloCreationAttributes;
    const Modulo = await ModuloService.createModulo(newModulo);
    if (Modulo === null) {
      res.status(409).json({ message: "The Modulo already exists" });
    } else {
      res.status(201).json(Modulo);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllModulo = async (_req: Request, res: Response): Promise<void> => {
  try {
    const Moduloes = await ModuloService.getAllModulo();
    res.status(200).json(Moduloes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getModuloById = async (req: Request, res: Response): Promise<void> => {
  try {
    const Modulo = await ModuloService.getModuloById(parseInt(req.params.id));
    if (Modulo !== null) {
      res.status(200).json(Modulo);
    } else {
      res.status(404).json({ error: 'Modulo not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateModulo = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = ModuloSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newModulo: ModuloCreationAttributes = parsedResult.data as ModuloCreationAttributes;

    const Modulo = await ModuloService.updateModulo(parseInt(req.params.id), newModulo);
    if (Modulo !== null) {
      res.status(200).json(Modulo);
    } else {
      res.status(404).json({ error: 'Modulo not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteModulo = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await ModuloService.deleteModulo(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Modulo not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
