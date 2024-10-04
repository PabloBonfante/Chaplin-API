import { Request, Response } from 'express';
import * as PermisoService from '../Services/permisoService';
import { PermisoSchema } from '../schemas/chaplin';
import PermisoCreationAttributes from '../Models/permiso';

export const createPermiso = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = PermisoSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newPermiso: PermisoCreationAttributes = parsedResult.data as PermisoCreationAttributes;
    const Permiso = await PermisoService.createPermiso(newPermiso);
    if (Permiso === null) {
      res.status(409).json({ message: "The Permiso already exists" });
    } else {
      res.status(201).json(Permiso);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPermiso = async (_req: Request, res: Response): Promise<void> => {
  try {
    const Permisoes = await PermisoService.getAllPermiso();
    res.status(200).json(Permisoes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPermisoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const Permiso = await PermisoService.getPermisoById(parseInt(req.params.id));
    if (Permiso !== null) {
      res.status(200).json(Permiso);
    } else {
      res.status(404).json({ error: 'Permiso not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePermiso = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = PermisoSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newPermiso: PermisoCreationAttributes = parsedResult.data as PermisoCreationAttributes;

    const Permiso = await PermisoService.updatePermiso(parseInt(req.params.id), newPermiso);
    if (Permiso !== null) {
      res.status(200).json(Permiso);
    } else {
      res.status(404).json({ error: 'Permiso not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePermiso = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await PermisoService.deletePermiso(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Permiso not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
