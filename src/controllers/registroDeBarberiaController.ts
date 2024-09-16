import { Request, Response } from 'express';
import * as registroDeBarberiaService from '../Services/registroDeBarberiaService';
import { RegistroDeBarberiaSchema, RegistroDeBarberiaSchemaUpdate } from '../schemas/chaplin';
import RegistroDeBarberiaAttributes from '../Models/registrodebarberia';

export const createRegistroDeBarberia = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = RegistroDeBarberiaSchema.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newEmpleado: RegistroDeBarberiaAttributes = parsedResult.data as RegistroDeBarberiaAttributes;

    const empleadoPorsentaje = await registroDeBarberiaService.createRegistroDeBarberia(newEmpleado);
    res.status(201).json(empleadoPorsentaje);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRegistroDeBarberia = async (_req: Request, res: Response): Promise<void> => {
  try {
    const registrosBarberia = await registroDeBarberiaService.getAllRegistroDeBarberia();
    res.status(200).json(registrosBarberia);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRegistroDeBarberiaExtended = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Extraer parámetros de consulta y asegurar que sean números válidos
    const page = parseInt(_req.query.page as string, 10);
    const pageSize = parseInt(_req.query.pageSize as string, 10);
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

    // Validar y establecer valores predeterminados si es necesario
    const validPage = !isNaN(page) && page > 0 ? page : 1;
    const validPageSize = !isNaN(pageSize) && pageSize > 0 ? pageSize : 10;

    // Llamar al servicio con los parámetros de paginación
    const registrosBarberia = await registroDeBarberiaService.getAllRegistroDeBarberiaExtended(desde, hasta, validPage, validPageSize);

    // Contar la cantidad de registros en la página actual
    const Records = registrosBarberia.length;

    // Consultar el total de registros sin paginación
    const totalRecords = await registroDeBarberiaService.countRegistroDeBarberia();

    // Enviar la respuesta con datos de información adicionales
    res.status(200).json({
      filterInfo: {
        totalRecords,
        Records,
        page: validPage,
        pageSize: validPageSize
      },
      data: registrosBarberia
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRegistroDeBarberiaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const empleadoPorsentaje = await registroDeBarberiaService.getRegistroDeBarberiaById(parseInt(req.params.id));
    if (empleadoPorsentaje !== null) {
      res.status(200).json(empleadoPorsentaje);
    } else {
      res.status(404).json({ error: 'RegistroDeBarberia not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRegistroDeBarberia = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedResult = RegistroDeBarberiaSchemaUpdate.safeParse(req.body);

    if (!parsedResult.success) {
      const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({ message: errorMessage });
    }

    const newEmpleado: RegistroDeBarberiaAttributes = parsedResult.data as RegistroDeBarberiaAttributes;

    const empleadoPorsentaje = await registroDeBarberiaService.updateRegistroDeBarberia(parseInt(req.params.id), newEmpleado);
    if (empleadoPorsentaje !== null) {
      res.status(200).json(empleadoPorsentaje);
    } else {
      res.status(404).json({ error: 'RegistroDeBarberia not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRegistroDeBarberia = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await registroDeBarberiaService.deleteRegistroDeBarberia(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'RegistroDeBarberia not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
