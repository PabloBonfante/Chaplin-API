import { Request, Response } from 'express';
import { getAllEmpleados, getEmpleado, insertEmpleado, updateEmpleado, deleteEmpleado } from '../Services/empleadoService';
import { Empleado } from '../Models/types';
import { EmpleadoSchema } from '../schemas/chaplin';

export async function GetAllEmpleado(
    _req: Request,
    res: Response,
): Promise<Response> {
    try {
        const empleados = await getAllEmpleados();
        return res.json(empleados);
    } catch (error) {
        console.error('Error fetching empleados:', error);
        return res.status(500).json({ message: 'Error fetching empleados' });
    }
}

export async function GetEmpleado(
    req: Request,
    res: Response,
): Promise<Response> {
    const idEmpleado = parseInt(req.params.id, 10);

    try {
        const empleados = await getEmpleado(idEmpleado);

        if(empleados === null) return res.status(404).json({ message: 'Empleado no encontrado' });
        return res.json(empleados);
    } catch (error) {
        console.error('Error getEmpleadoempleados:', error);
        return res.status(500).json({ message: 'Error getEmpleado empleados' });
    }
}

export async function InsertEmpleado(
    req: Request,
    res: Response,
): Promise<Response> {
    const parsedResult = EmpleadoSchema.safeParse(req.body);

    if (!parsedResult.success) {
        const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
        return res.status(400).json({ message: errorMessage });
    }

    const newEmpleado: Empleado = parsedResult.data;

    try {
        const insertedEmpleado = await insertEmpleado(newEmpleado);
        return res.status(201).json(insertedEmpleado);
    } catch (err: any) {
        console.error('Error al insertar empleado:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res
                .status(400)
                .json({ message: 'El empleado ya existe. Verifique el DNI.' });
        }
        return res.status(500).json({
            message:
                'Error al insertar empleado. Por favor, inténtelo de nuevo más tarde.',
        });
    }
}


export async function UpdateEmpleado(
    req: Request,
    res: Response,
): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const parsedResult = EmpleadoSchema.partial().safeParse(req.body);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    if (!parsedResult.success) {
        const errorMessage = parsedResult.error.errors.map((err) => err.message).join(', ');
        return res.status(400).json({ message: errorMessage });
    }

    const updatedEmpleado: Partial<Empleado> = parsedResult.data;

    try {
        await updateEmpleado(id, updatedEmpleado);
        return res.json({
            message: 'Empleado actualizado correctamente',
        });
    } catch (err: any) {
        console.error('Error al actualizar empleado:', err);
        return res.status(500).json({
            message:
                'Error al actualizar empleado. Por favor, inténtelo de nuevo más tarde.',
        });
    }
}

export async function DeleteEmpleado(
    req: Request,
    res: Response,
): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const respuesta: boolean = await deleteEmpleado(id);

        if(respuesta)
        {
            return res.json({
                message: 'Empleado eliminado correctamente',
            }); 
        }else
        {
            return res.status(500).json({
                message:
                    'Error al eliminar empleado. Por favor, inténtelo de nuevo más tarde.',
            });
        }
       
    } catch (err: any) {
        console.error('Error al eliminar empleado:', err);
        return res.status(500).json({
            message:
                'Error al eliminar empleado. Por favor, inténtelo de nuevo más tarde.',
        });
    }
}