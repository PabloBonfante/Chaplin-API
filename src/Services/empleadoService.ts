import { connect } from '../db';
import { Empleado } from '../Models/types';

export async function getAllEmpleados(): Promise<Empleado[]> {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM empleado');
    return rows as Empleado[];
}

export async function getEmpleado(id: number): Promise<Empleado | null> {
    const conn = await connect();
    try {
        const query = `
            SELECT Id, Nombre, Apellido, DNI, Edad, FechaContratacion
            FROM db_chaplin.empleado
            WHERE Id = ?
            LIMIT 1
        `;
        const [rows] = await conn.query(query, [id]);
        
        const empleados = rows as Empleado[]; // Realizamos el cast para que TypeScript lo reconozca como array de Empleado
        
        if (empleados.length === 0) return null;

        return empleados[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function insertEmpleado(newEmpleado: Empleado): Promise<Empleado> {
    const conn = await connect();
    await conn.execute(
        'INSERT INTO empleado (Nombre, Apellido, DNI, Edad, FechaContratacion) VALUES (?, ?, ?, ?, ?)',
        [
            newEmpleado.Nombre,
            newEmpleado.Apellido,
            newEmpleado.DNI,
            newEmpleado.Edad,
            newEmpleado.FechaContratacion,
        ]
    );
    
    // Obtener el ID del empleado recién insertado
    const [result] = await conn.execute('SELECT LAST_INSERT_ID() as id');
    const insertedId = (result as any)[0].id;

    // Devolver el empleado insertado
    return {
        ...newEmpleado,
        id: insertedId,
    };
}

export async function updateEmpleado(id: number, empleado: Partial<Empleado>): Promise<boolean> {
    try {
        const conn = await connect();
        const query = 'UPDATE empleado SET ? WHERE id = ?';
        const [result] = await conn.query(query, [empleado, id]);

        const updateResult = result as any; // Puedes tipar esto mejor según el tipo específico que devuelva mysql2

        return updateResult.affectedRows > 0;
    } catch (error) {
        return false;
    }
}

export async function deleteEmpleado(id: number): Promise<boolean> {
    try {
        console.log(id);
        const conn = await connect();
        const query = 'DELETE FROM empleado WHERE id = ?';
        const [result] = await conn.execute(query, [id]);

        const deleteResult = result as any; // Puedes tipar esto mejor según el tipo específico que devuelva mysql2

        return deleteResult.affectedRows > 0;
    } catch (error) {
        console.log('ERROR:')
        return false;
    }
}