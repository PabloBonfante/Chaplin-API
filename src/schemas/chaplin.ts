import { z } from 'zod';

export const EmpleadoSchema = z.object({
    Nombre: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(1, { message: 'Name is required' }),
    Apellido: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
    }).min(1, { message: 'Last name is required' }),
    DNI: z.string({
        required_error: "DNI is required",
        invalid_type_error: "DNI must be a string",
    }).min(1, { message: 'DNI is required' }),
    Edad: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
    }).positive({ message: 'Age must be a positive number' }),
    FechaContratacion: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
        return null;
    }, z.date({ message: 'Invalid hiring date' })),
    IdRol: z.number({
        required_error: "IdRol is required",
        invalid_type_error: "IdRol  must be a number",
    }).positive({ message: 'IdRol  must be a positive number' }),
});

export const UsuarioSchema = z.object({
    Nombre: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(1, { message: 'Name is required' }),
    Apellido: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
    }).min(1, { message: 'Last name is required' }),
    Alias: z.string({
        required_error: "Alias is required",
        invalid_type_error: "Alias must be a string",
    }).min(1, { message: 'Alias is required' }),
    DNI: z.number({
        required_error: "DNI is required",
        invalid_type_error: "DNI must be a number",
    }).min(1, { message: 'DNI is required' }),
    Email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).min(1, { message: 'Email is required' }),
    Password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(1, { message: 'Password is required' }),
    FechaCreacion: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
        return null;
    }, z.date({ message: 'Invalid Fecha Creacion' })),
    IdRol: z.number({
        required_error: "IdRol is required",
        invalid_type_error: "IdRol  must be a number",
    }).positive({ message: 'IdRol  must be a positive number' }),
});

export const EmpleadoPorsentajeSchema = z.object({
    IdEmpleado: z.number({
        required_error: "IdEmpleado is required",
        invalid_type_error: "IdEmpleado must be a number",
    }).positive({ message: 'IdEmpleado must be a positive number' }),
    Porcentaje: z.number({
        required_error: "Porcentaje is required",
        invalid_type_error: "Porcentaje must be a number",
    }).positive({ message: 'Porcentaje must be a positive number' }),
    Cantidad: z.number({
        required_error: "Cantidad is required",
        invalid_type_error: "Cantidad must be a number",
    }).positive({ message: 'Cantidad must be a positive number' })
});

export const ServicioSchema = z.object({
    CodServicio: z.string({
        required_error: "CodServicio is required",
        invalid_type_error: "CodServicio must be a string",
    }).min(1, { message: 'CodServicio is required' }),
    DescServicio: z.string({
        required_error: "DescServicio name is required",
        invalid_type_error: "DescServicio name must be a string",
    }).min(1, { message: 'DescServicio name is required' }),
    PrecioNeto: z.number({
        required_error: "PrecioNeto is required",
        invalid_type_error: "PrecioNeto must be a number",
    }).positive({ message: 'PrecioNeto must be a positive number' })
});

export const RegistroDeBarberiaSchema = z.object({
    IdEmpleado: z.number({
        required_error: "IdEmpleado is required",
        invalid_type_error: "IdEmpleado must be a number",
    }).positive({ message: 'IdEmpleado must be a positive number' }),
    IdServicio: z.number({
        required_error: "IdServicio is required",
        invalid_type_error: "IdServicio must be a number",
    }).positive({ message: 'IdServicio must be a positive number' }),
    IdFormaPago: z.number({
        required_error: "IdFormaPago is required",
        invalid_type_error: "IdFormaPago must be a number",
    }).positive({ message: 'IdFormaPago must be a positive number' }),
    Fecha: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
        return null;
    }, z.date({ message: 'Invalid Fecha' })),
    Duracion: z.number({
        required_error: "Duracion is required",
        invalid_type_error: "Duracion must be a number",
    }).positive({ message: 'Duracion must be a positive number' }),
    Comentario: z.string({
        required_error: "Comentario is required",
        invalid_type_error: "Comentario must be a string",
    }),
    PrecioNeto: z.number({
        required_error: "PrecioNeto is required",
        invalid_type_error: "PrecioNeto must be a number",
    }).positive({ message: 'PrecioNeto must be a positive number' }),
    CreateBy: z.string({
        required_error: "CreateBy is required",
        invalid_type_error: "CreateBy must be a string",
    }).min(1, { message: 'CreateBy is required' }),
});

export const RegistroDeBarberiaSchemaUpdate = z.object({
    IdEmpleado: z.number({
        required_error: "IdEmpleado is required",
        invalid_type_error: "IdEmpleado must be a number",
    }).positive({ message: 'IdEmpleado must be a positive number' }),
    IdServicio: z.number({
        required_error: "IdServicio is required",
        invalid_type_error: "IdServicio must be a number",
    }).positive({ message: 'IdServicio must be a positive number' }),
    IdFormaPago: z.number({
        required_error: "IdFormaPago is required",
        invalid_type_error: "IdFormaPago must be a number",
    }).positive({ message: 'IdFormaPago must be a positive number' }),
    Fecha: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
        return null;
    }, z.date({ message: 'Invalid Fecha' })),
    Duracion: z.number({
        required_error: "Duracion is required",
        invalid_type_error: "Duracion must be a number",
    }).positive({ message: 'Duracion must be a positive number' }),
    Comentario: z.string({
        required_error: "Comentario is required",
        invalid_type_error: "Comentario must be a string",
    }),
    PrecioNeto: z.number({
        required_error: "PrecioNeto is required",
        invalid_type_error: "PrecioNeto must be a number",
    }).positive({ message: 'PrecioNeto must be a positive number' }),
    UpdateBy: z.string({
        required_error: "UpdateBy is required",
        invalid_type_error: "UpdateBy must be a string",
    }).min(1, { message: 'UpdateBy is required' })
});

export const FormaPagoSchema = z.object({
    Codigo: z.string({
        required_error: "Codigo is required",
        invalid_type_error: "Codigo must be a string",
    }).min(1, { message: 'Codigo is required' }),
    Nombre: z.string({
        required_error: "Nombre is required",
        invalid_type_error: "Nombre must be a string",
    }).min(1, { message: 'Nombre is required' }),
    Descripcion: z.string({
        required_error: "Descripcion is required",
        invalid_type_error: "Descripcion must be a string",
    }).min(1, { message: 'Descripcion is required' }),
    Activo: z.boolean({
        required_error: "Activo is required",
        invalid_type_error: "Activo must be a bool",
    }),
    FechaCreacion: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
        return null;
    }, z.date({ message: 'Invalid FechaCreacion' })),
});

export const RolSchema = z.object({
    NombreRol: z.string({
        required_error: "NombreRol is required",
        invalid_type_error: "NombreRol must be a string",
    }).min(1, { message: 'NombreRol is required' }),
});

export const OperacionSchema = z.object({
    Nombre: z.string({
        required_error: "Nombre is required",
        invalid_type_error: "Nombre must be a string",
    }).min(1, { message: 'Nombre is required' }),
    Descripcion: z.string({
        required_error: "Descripcion is required",
        invalid_type_error: "Descripcion must be a string",
    }).min(1, { message: 'Descripcion is required' }),
    IdModulo: z.number({
        required_error: "IdModulo is required",
        invalid_type_error: "IdModulo must be a number",
    }).positive({ message: 'IdModulo must be a positive number' }),
});

export const ModuloSchema = z.object({
    NombreModulo: z.string({
        required_error: "NombreModulo is required",
        invalid_type_error: "NombreModulo must be a string",
    }).min(1, { message: 'NombreModulo is required' }),
    URL: z.string({
        required_error: "URL is required",
        invalid_type_error: "URL must be a string",
    }).min(1, { message: 'URL is required' }),
});

export const PermisoSchema = z.object({
    IdUsuario: z.number({
        required_error: "IdUsuario is required",
        invalid_type_error: "IdUsuario must be a number",
    }).positive({ message: 'IdUsuario must be a positive number' }),
    IdOperacion: z.number({
        required_error: "IdOperacion is required",
        invalid_type_error: "IdOperacion must be a number",
    }).positive({ message: 'IdOperacion must be a positive number' }),
});

export type Empleado = z.infer<typeof EmpleadoSchema>;
export type Servicio = z.infer<typeof ServicioSchema>;
export type EmpleadoPorsentaje = z.infer<typeof EmpleadoPorsentajeSchema>;
export type RegistroDeBarberia = z.infer<typeof RegistroDeBarberiaSchema>;
export type RegistroDeBarberiaUpdate = z.infer<typeof RegistroDeBarberiaSchemaUpdate>;
export type FormaPago = z.infer<typeof FormaPagoSchema>;
export type Usuario = z.infer<typeof UsuarioSchema>;
export type Rol = z.infer<typeof RolSchema>;
export type Operacion = z.infer<typeof OperacionSchema>;
export type Modulo = z.infer<typeof ModuloSchema>;
export type Permiso = z.infer<typeof PermisoSchema>;
