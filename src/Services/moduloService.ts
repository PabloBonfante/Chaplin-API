import Modulo from "../Models/modulo";

export const createModulo = async (ModuloObj: Modulo): Promise<Modulo | null> => {

    const existe = await Modulo.findAll({
        where: {
            NombreModulo: ModuloObj.NombreModulo
        },
    });

    if (existe.length === 0) {
        const modulo = await Modulo.create(ModuloObj);
        return modulo;
    } else {
        return null;
    }
};

export const getAllModulo = async (): Promise<Modulo[]> => {
    const Moduloes = await Modulo.findAll();
    return Moduloes;
};

export const getModuloById = async (id: number): Promise<Modulo | null> => {
    const Moduloes = await Modulo.findByPk(id);
    return Moduloes;
};

export const updateModulo = async (id: number, newModulo: Modulo): Promise<Modulo | null> => {
    const modulo = await Modulo.findByPk(id);
    if (modulo !== null) {
        await modulo.update(newModulo);
        return modulo;
    }
    return null;
};

export const deleteModulo = async (id: number): Promise<boolean> => {
    const modulo = await Modulo.findByPk(id);
    if (modulo !== null) {
        await modulo.destroy();
        return true;
    }
    return false;
};
