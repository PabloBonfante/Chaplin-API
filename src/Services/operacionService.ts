import Operacion from "../Models/operacion";

export const createOperacion = async (OperacionObj: Operacion): Promise<Operacion | null> => {

    const existe = await Operacion.findAll({
        where: {
            Nombre: OperacionObj.Nombre
        },
    });

    if (existe.length === 0) {
        const operacion = await Operacion.create(OperacionObj);
        return operacion;
    } else {
        return null;
    }
};

export const getAllOperacion = async (): Promise<Operacion[]> => {
    const operaciones = await Operacion.findAll();
    return operaciones;
};

export const getOperacionById = async (id: number): Promise<Operacion | null> => {
    const operacion = await Operacion.findByPk(id);
    return operacion;
};

export const updateOperacion = async (id: number, newOperacion: Operacion): Promise<Operacion | null> => {
    const operacion = await Operacion.findByPk(id);
    if (operacion !== null) {
        await operacion.update(newOperacion);
        return operacion;
    }
    return null;
};

export const deleteOperacion = async (id: number): Promise<boolean> => {
    const operacion = await Operacion.findByPk(id);
    if (operacion !== null) {
        await operacion.destroy();
        return true;
    }
    return false;
};
