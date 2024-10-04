import { Request, Response } from 'express';
import * as OperacionService from '../Services/operacionService';
import { OperacionSchema } from '../schemas/chaplin';
import OperacionCreationAttributes from '../Models/operacion';

export const createOperacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = OperacionSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newOperacion: OperacionCreationAttributes = parsedResult.data as OperacionCreationAttributes;
    const Operacion = await OperacionService.createOperacion(newOperacion);
    if (Operacion === null) {
      res.status(409).json({ message: "The Operacion already exists" });
    } else {
      res.status(201).json(Operacion);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllOperacion = async (_req: Request, res: Response): Promise<void> => {
  try {
    const Operaciones = await OperacionService.getAllOperacion();
    res.status(200).json(Operaciones);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getOperacionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const Operacion = await OperacionService.getOperacionById(parseInt(req.params.id));
    if (Operacion !== null) {
      res.status(200).json(Operacion);
    } else {
      res.status(404).json({ error: 'Operacion not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOperacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = OperacionSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newOperacion: OperacionCreationAttributes = parsedResult.data as OperacionCreationAttributes;

    const Operacion = await OperacionService.updateOperacion(parseInt(req.params.id), newOperacion);
    if (Operacion !== null) {
      res.status(200).json(Operacion);
    } else {
      res.status(404).json({ error: 'Operacion not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOperacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await OperacionService.deleteOperacion(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Operacion not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
