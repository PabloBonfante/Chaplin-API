
import sequelize from "../config/database";
import { RecaudacionCaja } from "../Models/recaudacionCaja"; // Asegúrate de importar la interfaz

export const getRecaudacionCaja = async (desde: string, hasta: string): Promise<RecaudacionCaja[]> => {
    try {
      // Consulta SQL
      const query = `
        SELECT CAST(RB.Fecha AS date) AS Fecha,
               FP.Codigo,
               FP.Descripcion,
               SUM(RB.PrecioNeto) AS Total
        FROM RegistroDeBarberia AS RB
        INNER JOIN FormaPago AS FP ON RB.IdFormaPago = FP.Id
        WHERE CAST(RB.Fecha AS date) BETWEEN :desde AND :hasta
        GROUP BY CAST(RB.Fecha AS date), FP.Codigo, FP.Descripcion
        ORDER BY SUM(RB.PrecioNeto)
      `;
  
      // Ejecutar la consulta
      const [results] = await sequelize.query(query, {
        replacements: { desde, hasta }, // Reemplaza los parámetros
      });
  
      // Mapear los resultados a la interfaz RecaudacionCaja
      return results.map((item: any) => ({
        Fecha: item.Fecha,
        CodigoFormaPago: item.Codigo,
        DescripcionFormaPago: item.Descripcion,
        Total: item.Total
      })) as RecaudacionCaja[]; // Castear el resultado final
    } catch (error) {
      console.error('Error fetching recaudacion:', error);
      throw error;
    }
  };