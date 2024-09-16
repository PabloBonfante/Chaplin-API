import Usuario from "../Models/usuario";

export const insertUsuario = async (usuarioObj: Usuario): Promise<Usuario | null> => {

    const existe = await Usuario.findAll({
        where: {
            DNI: usuarioObj.DNI
        },
    });

    if (existe.length === 0) {
        const servicio = await Usuario.create(usuarioObj);
        return servicio;
    } else {
        return null;
    }
};

export const getAllUsuario = async (): Promise<Usuario[]> => {
    const usuarios = await Usuario.findAll();
    return usuarios;
};

export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
    const usuario = await Usuario.findByPk(id);
    return usuario;
};

export const updateUsuario = async (id: number, newUsuario: Usuario): Promise<Usuario | null> => {
    const usuario = await Usuario.findByPk(id);
    if (usuario !== null) {
        await usuario.update(newUsuario);
        return usuario;
    }
    return null;
};

export const deleteUsuario = async (id: number): Promise<boolean> => {
    const usuario = await Usuario.findByPk(id);
    if (usuario !== null) {
        await usuario.destroy();
        return true;
    }
    return false;
};
