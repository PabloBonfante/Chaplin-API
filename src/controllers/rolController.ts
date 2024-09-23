import { Request, Response } from 'express';
import * as rolService from '../Services/rolService';
import { RolSchema } from '../schemas/chaplin';
import RolCreationAttributes from '../Models/rol';

export const createRol = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = RolSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newRol: RolCreationAttributes = parsedResult.data as RolCreationAttributes;
    const rol = await rolService.createRol(newRol);
    if (rol === null) {
      res.status(409).json({ message: "The rol already exists" });
    } else {
      res.status(201).json(rol);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRol = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await rolService.getAllRol();
    res.status(200).json(roles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRolById = async (req: Request, res: Response): Promise<void> => {
  try {
    const rol = await rolService.getRolById(parseInt(req.params.id));
    if (rol !== null) {
      res.status(200).json(rol);
    } else {
      res.status(404).json({ error: 'Rol not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRol = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = RolSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newRol: RolCreationAttributes = parsedResult.data as RolCreationAttributes;

    const rol = await rolService.updateRol(parseInt(req.params.id), newRol);
    if (rol !== null) {
      res.status(200).json(rol);
    } else {
      res.status(404).json({ error: 'Rol not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRol = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await rolService.deleteRol(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Rol not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
