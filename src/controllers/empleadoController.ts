import { Request, Response } from 'express';
import * as empleadoService from '../Services/empleadoService';
import { EmpleadoSchema } from '../schemas/chaplin';
import EmpleadoCreationAttributes from '../Models/empleado';

export const InsertEmpleado = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = EmpleadoSchema.safeParse(req.body);

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
            res.status(400).json({ message: errorMessage });
        }

        const newEmpleado: EmpleadoCreationAttributes = parsedResult.data as EmpleadoCreationAttributes;
        const empleado = await empleadoService.insertEmpleado(newEmpleado);
        if (empleado === null) {
            res.status(409).json({ message: "El empleado ya existe" });
        } else {
            res.status(201).json(empleado);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllEmpleado = async (_req: Request, res: Response): Promise<void> => {
    try {
        const servicios = await empleadoService.getAllEmpleado();
        res.status(200).json(servicios);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getEmpleadoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const empleado = await empleadoService.getEmpleadoById(parseInt(req.params.id));
        if (empleado !== null) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ error: 'empleado no encontrado' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateEmpleado = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = EmpleadoSchema.safeParse(req.body);

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
            res.status(400).json({ message: errorMessage });
        }

        const newEmpleado: EmpleadoCreationAttributes = parsedResult.data as EmpleadoCreationAttributes;

        const empleado = await empleadoService.updateEmpleado(parseInt(req.params.id), newEmpleado);
        if (empleado !== null) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEmpleado = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await empleadoService.deleteEmpleado(parseInt(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
