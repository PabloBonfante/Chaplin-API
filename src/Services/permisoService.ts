import Permiso from "../Models/permiso";

export const createPermiso = async (PermisoObj: Permiso): Promise<Permiso | null> => {

    const existe = await Permiso.findAll({
        where: {
            IdUsuario: PermisoObj.IdUsuario,
            IdOperacion: PermisoObj.IdOperacion,
        },
    });

    if (existe.length === 0) {
        const permiso = await Permiso.create(PermisoObj);
        return permiso;
    } else {
        return null;
    }
};

export const getAllPermiso = async (): Promise<Permiso[]> => {
    const Permisoes = await Permiso.findAll();
    return Permisoes;
};

export const getPermisoById = async (id: number): Promise<Permiso | null> => {
    const Permisoes = await Permiso.findByPk(id);
    return Permisoes;
};

export const updatePermiso = async (id: number, newPermiso: Permiso): Promise<Permiso | null> => {
    const permiso = await Permiso.findByPk(id);
    if (permiso !== null) {
        await permiso.update(newPermiso);
        return permiso;
    }
    return null;
};

export const deletePermiso = async (id: number): Promise<boolean> => {
    const permiso = await Permiso.findByPk(id);
    if (permiso !== null) {
        await permiso.destroy();
        return true;
    }
    return false;
};
