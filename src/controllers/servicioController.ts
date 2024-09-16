import { Request, Response } from 'express';
import * as servicioService from '../Services/servicioService';
import { ServicioSchema } from '../schemas/chaplin';
import ServicoCreationAttributes from '../Models/Servicio';

export const createServicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = ServicioSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newServicio: ServicoCreationAttributes = parsedResult.data as ServicoCreationAttributes;
    const servicio = await servicioService.createServicio(newServicio);
    if (servicio === null) {
      res.status(409).json({ message: "The service already exists" });
    } else {
      res.status(201).json(servicio);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllServicio = async (_req: Request, res: Response): Promise<void> => {
  try {
    const servicios = await servicioService.getAllServicio();
    res.status(200).json(servicios);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getServicioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const servicio = await servicioService.getServicioById(parseInt(req.params.id));
    if (servicio !== null) {
      res.status(200).json(servicio);
    } else {
      res.status(404).json({ error: 'Servicio not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateServicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = ServicioSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newServicio: ServicoCreationAttributes = parsedResult.data as ServicoCreationAttributes;

    const servicio = await servicioService.updateServicio(parseInt(req.params.id), newServicio);
    if (servicio !== null) {
      res.status(200).json(servicio);
    } else {
      res.status(404).json({ error: 'Servicio not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteServicio = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await servicioService.deleteServicio(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Servicio not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
