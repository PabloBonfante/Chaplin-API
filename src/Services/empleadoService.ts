import Empleado from "../Models/empleado";

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
