import { Request, Response } from 'express';
import * as registroDeBarberiaService from '../Services/RecaudacionCajaService';
import DateTimeToString from '../Utils/Util';


export const getRecaudacionCaja = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Extraer los parámetros
    const desde = new Date((_req.query.desde as string));
    const hasta = new Date((_req.query.hasta as string));

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

    // Llamar al servicio con los parámetros
    const registrosBarberia = await registroDeBarberiaService.getRecaudacionCaja(DateTimeToString(desde), DateTimeToString(hasta));

    // Contar la cantidad de registros
    const Records = registrosBarberia.length;

    // Enviar la respuesta con datos e información adicionales
    res.status(200).json({
      filterInfo: {
        Records,
        desde: DateTimeToString(desde),
        hasta: DateTimeToString(hasta)
      },
      data: registrosBarberia
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
