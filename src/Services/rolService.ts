import Rol from "../Models/rol";

export const createRol = async (RolObj: Rol): Promise<Rol | null> => {

    const existe = await Rol.findAll({
        where: {
            NombreRol: RolObj.NombreRol
        },
    });

    if (existe.length === 0) {
        const rol = await Rol.create(RolObj);
        return rol;
    } else {
        return null;
    }
};

export const getAllRol = async (): Promise<Rol[]> => {
    const roles = await Rol.findAll();
    return roles;
};

export const getRolById = async (id: number): Promise<Rol | null> => {
    const roles = await Rol.findByPk(id);
    return roles;
};

export const updateRol = async (id: number, newRol: Rol): Promise<Rol | null> => {
    const rol = await Rol.findByPk(id);
    if (rol !== null) {
        await rol.update(newRol);
        return rol;
    }
    return null;
};

export const deleteRol = async (id: number): Promise<boolean> => {
    const rol = await Rol.findByPk(id);
    if (rol !== null) {
        await rol.destroy();
        return true;
    }
    return false;
};
