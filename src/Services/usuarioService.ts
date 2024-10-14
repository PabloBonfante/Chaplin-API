import Rol from "../Models/rol";
import Usuario, { UsuarioDTO } from "../Models/usuario";
import bcrypt from 'bcryptjs';

export const insertUsuario = async (usuarioObj: Usuario): Promise<Usuario | null> => {

    const existe = await Usuario.findAll({
        where: {
            DNI: usuarioObj.DNI
        },
    });

    if (existe.length === 0) {
        // Encriptar la contraseña antes de crear el usuario
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuarioObj.Password, saltRounds);

        // Reemplazar la contraseña en el objeto usuario por la encriptada
        usuarioObj.Password = hashedPassword;

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

// Función para iniciar sesión con Alias y Password
export const loginUsuario = async (alias: string, password: string): Promise<UsuarioDTO | null> => {
    // Buscar el usuario por Alias
    const usuario = await Usuario.findOne({
        include: [
            {
                model: Rol,
                as: 'Rol',
                attributes: ['Id', 'NombreRol']
            }
        ],
        where: {
            Alias: alias
        },
    });

    // Si el usuario no existe, devolver null
    if (usuario === null || usuario === undefined) return null;

    // Comparar la contraseña ingresada con el hash almacenado
    const isMatch: boolean = await bcrypt.compare(password, usuario.Password);
    if (!isMatch) return null;

    // Crear el objeto DTO
    const usuarioDTO: UsuarioDTO = {
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Alias: usuario.Alias,
        DNI: usuario.DNI,
        Email: usuario.Email,
        Rol: {
            Id: usuario.Rol?.Id ?? 0,
            NombreRol: usuario.Rol?.NombreRol ?? ''
        }
    };

    return usuarioDTO;
};

export const updateUsuario = async (id: number, newUsuario: Usuario): Promise<Usuario | null> => {
    const usuario = await Usuario.findByPk(id);

    if (usuario !== null) {
        // Verificar si se ha proporcionado una nueva contraseña y si es diferente de la actual
        if (newUsuario.Password !== '' && newUsuario.Password !== usuario.Password) {
            // Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newUsuario.Password, salt);
            newUsuario.Password = hashedPassword; // Reemplazar la contraseña con la encriptada
        }

        // Actualizar el usuario con los nuevos datos
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
