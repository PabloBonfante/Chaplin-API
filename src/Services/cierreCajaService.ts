import { CierreCajaPeriodo, CierreCajaTotales, CierreCajaLineas, CierreCajaDia, CierreCajaEmpleado } from "../Models/cierreCaja";
import * as empleadoService from '../Services/empleadoService';
import * as empleadoPorsentajeService from '../Services/empleadoPorsentajeService';
import * as registroDeBarberiaService from '../Services/registroDeBarberiaService';
import { RegistroDeBarberiaExtendedAttributes } from "../Models/registrodebarberia";

export async function getCierreCaja(desde: Date, hasta: Date): Promise<CierreCajaPeriodo> {
    const respuesta: CierreCajaPeriodo = {
        desde,
        hasta,
        dias: [],
        totalPeriodo: new CierreCajaTotales(),
        totalPeriodoJefe: new CierreCajaTotales()
    };

    let registros: RegistroDeBarberiaExtendedAttributes[] = [];

    // Inicializa tieneRegistros como true
    let tieneRegistros = true;
    let currentPage = 1;

    while (tieneRegistros) {
        const reg = await registroDeBarberiaService.getAllRegistroDeBarberiaExtended(desde, hasta, currentPage, 1000);
        tieneRegistros = reg.length > 0;

        if (tieneRegistros) registros = [...registros, ...reg];

        currentPage++;
    }

    const porcentajes = await empleadoPorsentajeService.getAllEmpleadoPorsentaje();
    const empleados = await empleadoService.getAllExtended();
    const jefe = empleados.find(e => e.NombreRol.toLowerCase() === "jefe");

    if (registros.length > 0) {
        let currentDate: Date = new Date(desde);

        while (currentDate <= hasta) {
            const cccDia: CierreCajaDia = {
                dia: currentDate,
                empleados: [],
                totalDia: new CierreCajaTotales(),
                totalDiaJefe: new CierreCajaTotales()
            };

            let existeDias = false;

            for (const emp of empleados) {
                const currentEmpleado: CierreCajaEmpleado = {
                    nombreApellido: `${emp.Nombre} - ${emp.Apellido}`,
                    lineasDia: [],
                    totalesEmpleado: new CierreCajaTotales()
                };

                let nroCorte = 1;
                let existeLineas = false;

                const registrosDelDia = registros.filter(r => r.IdEmpleado === emp.Id && r.Fecha.toDateString() === currentDate.toDateString());

                for (const reg of registrosDelDia) {
                    const linea: CierreCajaLineas = {
                        nombreApellido: reg.NombreApellidoEmpleado,
                        descServicio: reg.DescServicio,
                        precioNeto: reg.PrecioNeto,
                        descFormaPago: reg.DescripcionFormaPago,
                        fecha: reg.Fecha,
                        comentario: reg.Comentario,
                        montoACobrar: 0,
                        nroCorte
                    };

                    // Suma total
                    cccDia.totalDia.PrecioNeto += Math.round(reg.PrecioNeto * 100) / 100;
                    cccDia.totalDia.CantCortes++;

                    // Suma total Empleado
                    currentEmpleado.totalesEmpleado.PrecioNeto += Math.round(reg.PrecioNeto * 100) / 100;
                    currentEmpleado.totalesEmpleado.CantCortes++;

                    // Obtengo el porcentaje en base a la cantidad de cortes
                    const porcentajeActual = porcentajes.find(p => p.IdEmpleado === emp.Id && p.Cantidad <= cccDia.totalDia.CantCortes)?.Porcentaje ?? 0;
                    const porcentaje = (reg.PrecioNeto * porcentajeActual) / 100;
                    linea.montoACobrar = Math.round(porcentaje * 100) / 100;

                    currentEmpleado.totalesEmpleado.MontoCobrar += linea.montoACobrar;

                    currentEmpleado.lineasDia.push(linea);

                    // Jefe
                    if (reg.IdEmpleado !== jefe?.Id ?? 0) {
                        cccDia.totalDiaJefe.CantCortes++;
                        cccDia.totalDiaJefe.PrecioNeto += Math.round(reg.PrecioNeto * 100) / 100;
                        cccDia.totalDiaJefe.MontoCobrar += Math.round((reg.PrecioNeto - linea.montoACobrar) * 100) / 100; // Es la plata que le queda al jefe
                        cccDia.totalDia.MontoCobrar += linea.montoACobrar;
                    } else {
                        cccDia.totalDiaJefe.MontoCobrar += Math.round(linea.montoACobrar * 100) / 100; // Es un corte que hizo el jefe
                    }

                    existeLineas = true;
                    nroCorte++;
                }

                if (existeLineas) {
                    existeDias = true;
                    cccDia.empleados.push(currentEmpleado);
                }
            }

            if (existeDias) respuesta.dias.push(cccDia);

            // Incremento el día
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }

        // Cálculos Totales del periodo
        if (respuesta.dias.length > 0) {
            for (const item of respuesta.dias) {
                // Jefe
                respuesta.totalPeriodoJefe.CantCortes += item.totalDiaJefe.CantCortes;
                respuesta.totalPeriodoJefe.PrecioNeto += item.totalDiaJefe.PrecioNeto;
                respuesta.totalPeriodoJefe.MontoCobrar += item.totalDiaJefe.MontoCobrar;

                // Total
                respuesta.totalPeriodo.CantCortes += item.totalDia.CantCortes;
                respuesta.totalPeriodo.PrecioNeto += item.totalDia.PrecioNeto;
                respuesta.totalPeriodo.MontoCobrar += item.totalDia.MontoCobrar;
            }
        }
    }

    return respuesta;
}