import { Request, Response } from 'express';
import * as empleadoPorsentajeService from '../Services/empleadoPorsentajeService';
import { EmpleadoPorsentajeSchema } from '../schemas/chaplin';
import EmpleadoPorsentajeCreationAttributes from '../Models/empleadoporsentaje';

export const createempleadoPorsentaje = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = EmpleadoPorsentajeSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newempleadoPorsentaje: EmpleadoPorsentajeCreationAttributes = parsedResult.data as EmpleadoPorsentajeCreationAttributes;
    const empleadoPorsentaje = await empleadoPorsentajeService.createEmpleadoPorsentaje(newempleadoPorsentaje);
    res.status(201).json(empleadoPorsentaje);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllempleadoPorsentaje = async (_req: Request, res: Response): Promise<void> => {
  try {
    const empleadoPorsentajes = await empleadoPorsentajeService.getAllEmpleadoPorsentaje();
    res.status(200).json(empleadoPorsentajes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getempleadoPorsentajeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const empleadoPorsentaje = await empleadoPorsentajeService.getEmpleadoPorsentajeById(parseInt(req.params.id));
    if (empleadoPorsentaje !== null) {
      res.status(200).json(empleadoPorsentaje);
    } else {
      res.status(404).json({ error: 'Empleado Porsentaje not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateempleadoPorsentaje = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = EmpleadoPorsentajeSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newempleadoPorsentaje: EmpleadoPorsentajeCreationAttributes = parsedResult.data as EmpleadoPorsentajeCreationAttributes;

    const empleadoPorsentaje = await empleadoPorsentajeService.updateEmpleadoPorsentaje(parseInt(req.params.id), newempleadoPorsentaje);
    if (empleadoPorsentaje !== null) {
      res.status(200).json(empleadoPorsentaje);
    } else {
      res.status(404).json({ error: 'EmpleadoPorsentaje not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteempleadoPorsentaje = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await empleadoPorsentajeService.deleteEmpleadoPorsentaje(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'EmpleadoPorsentaje not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
