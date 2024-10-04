import { Request, Response } from 'express';
import * as formaPagoService from '../Services/formaPagoService';
import { FormaPagoSchema } from '../schemas/chaplin';
import FormaPagoCreationAttributes from '../Models/formapago';

export const InsertFormaPago = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = FormaPagoSchema.safeParse(req.body);

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
            res.status(400).json({ message: errorMessage });
        }

        const newFormaPago: FormaPagoCreationAttributes = parsedResult.data as FormaPagoCreationAttributes;
        const formaPago = await formaPagoService.insertFormaPago(newFormaPago);
        if (formaPago === null) {
            res.status(409).json({ message: "La forma de pago ya existe" });
        } else {
            res.status(201).json(formaPago);
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllFormaPago = async (_req: Request, res: Response): Promise<void> => {
    try {
        let activo: boolean | undefined;
        const inActivo = _req.query.activo as string;

        if (inActivo !== undefined) {
            activo = Boolean(JSON.parse(inActivo));
        }

        const formasDePago = await formaPagoService.getAllFormaPago(activo);
        res.status(200).json(formasDePago);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getFormaPagoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const formaPago = await formaPagoService.getFormaPagoById(parseInt(req.params.id));
        if (formaPago !== null) {
            res.status(200).json(formaPago);
        } else {
            res.status(404).json({ error: 'Forma de pago no encontrada' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateFormaPago = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = FormaPagoSchema.safeParse(req.body);

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
            res.status(400).json({ message: errorMessage });
        }

        const newFormaPago: FormaPagoCreationAttributes = parsedResult.data as FormaPagoCreationAttributes;

        const formaPago = await formaPagoService.updateFormaPago(parseInt(req.params.id), newFormaPago);
        if (formaPago !== null) {
            res.status(200).json(formaPago);
        } else {
            res.status(404).json({ error: 'Forma de pago no encontrada' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteFormaPago = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await formaPagoService.deleteFormaPago(parseInt(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Forma pago no encontrada' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
