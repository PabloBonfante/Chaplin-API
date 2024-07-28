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
    DNI: z.number({
        required_error: "DNI is required",
        invalid_type_error: "DNI must be a number",
    }).positive({ message: 'DNI must be a positive number' }),
    Edad: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
    }).positive({ message: 'Age must be a positive number' }),
    FechaContratacion: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
        return null;
    }, z.date({ message: 'Invalid hiring date' })),
});


export type Empleado = z.infer<typeof EmpleadoSchema>;
