import Empleado, { EmpleadoExtendedAttributes } from "../Models/empleado";
import Rol from "../Models/rol";

export const insertEmpleado = async (empleadoObj: Empleado): Promise<Empleado | null> => {

    const existe = await Empleado.findAll({
        where: {
            DNI: empleadoObj.DNI
        },
    });

    if (existe.length === 0) {
        const servicio = await Empleado.create(empleadoObj);
        return servicio;
    } else {
        return null;
    }
};

export const getAllEmpleado = async (): Promise<Empleado[]> => {
    const empleados = await Empleado.findAll();
    return empleados;
};

export const getAllExtended = async (): Promise<EmpleadoExtendedAttributes[]> => {
    const registrosExtendidos: EmpleadoExtendedAttributes[] = [];

    const empleados = await Empleado.findAll({
        include: [
            {
                model: Rol,
                as: 'Rol',
                attributes: ['NombreRol'], // selecciona las columnas que necesitas
            },
        ],
        raw: true, // devuelve los datos en formato de objeto plano
    });

    // Procesar los registros extendidos
    registrosExtendidos.push(...empleados.map((registro: any) => ({
        Id: registro.Id,
        Nombre: registro.Nombre,
        Apellido: registro.Apellido,
        DNI: registro.DNI,
        Edad: registro.Edad,
        FechaContratacion: registro.FechaContratacion,
        IdRol: registro.IdRol,
        NombreRol: String(registro['Rol.NombreRol']),
    })));

    return registrosExtendidos;
};

export const getEmpleadoById = async (id: number): Promise<Empleado | null> => {
    const empleado = await Empleado.findByPk(id);
    return empleado;
};

export const updateEmpleado = async (id: number, newEmpleado: Empleado): Promise<Empleado | null> => {
    const empleado = await Empleado.findByPk(id);
    if (empleado !== null) {
        await empleado.update(newEmpleado);
        return empleado;
    }
    return null;
};

export const deleteEmpleado = async (id: number): Promise<boolean> => {
    const empleado = await Empleado.findByPk(id);
    if (empleado !== null) {
        await empleado.destroy();
        return true;
    }
    return false;
};
