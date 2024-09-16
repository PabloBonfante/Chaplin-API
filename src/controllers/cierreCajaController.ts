import { Request, Response } from 'express';
import * as cierreCajaService from '../Services/cierreCajaService';

export const getCierreCaja = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Extraer parámetros de consulta y asegurar que sean números válidos
        const desde = new Date(_req.query.desde as string);
        const hasta = new Date(_req.query.hasta as string);

        // Verificar si las fechas son válidas
        if (isNaN(desde.getTime()) || isNaN(hasta.getTime())) {
            res.status(400).json({ error: 'Fechas inválidas proporcionadas. Ingrese fechas (desde, hasta)' });
            return;
        }

        // Verificar que 'hasta' sea posterior a 'desde'
        if (hasta < desde) {
            res.status(400).json({ error: 'La fecha (hasta) no puede ser anterior a la fecha de (desde).' });
            return;
        }

        const empleados = await cierreCajaService.getCierreCaja(desde, hasta);
        res.status(200).json(empleados);

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
