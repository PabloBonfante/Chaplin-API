export class CierreCajaTotales {
    CantCortes: number;
    PrecioNeto: number;
    MontoCobrar: number;

    constructor() {
        this.CantCortes = 0;
        this.PrecioNeto = 0;
        this.MontoCobrar = 0;
    }
}

export class CierreCajaLineas {
    nombreApellido: string;
    descServicio: string;
    precioNeto: number;
    descFormaPago: string;
    fecha: Date;
    comentario: string;
    montoACobrar?: number;
    nroCorte: number;

    constructor(
        nombreApellido: string,
        descServicio: string,
        precioNeto: number,
        descFormaPago: string,
        fecha: Date,
        comentario: string,
        nroCorte: number,
        montoACobrar?: number
    ) {
        this.nombreApellido = nombreApellido;
        this.descServicio = descServicio;
        this.precioNeto = precioNeto;
        this.descFormaPago = descFormaPago;
        this.fecha = fecha;
        this.comentario = comentario;
        this.nroCorte = nroCorte;
        this.montoACobrar = montoACobrar;
    }
}

export class CierreCajaEmpleado {
    nombreApellido: string;
    lineasDia: CierreCajaLineas[];
    totalesEmpleado: CierreCajaTotales;

    constructor(nombreApellido: string) {
        this.nombreApellido = nombreApellido;
        this.lineasDia = [];
        this.totalesEmpleado = new CierreCajaTotales();
    }
}

export class CierreCajaDia {
    dia: string;
    empleados: CierreCajaEmpleado[];
    totalDia: CierreCajaTotales;
    totalDiaJefe: CierreCajaTotales;

    constructor(dia: string) {
        this.dia = dia;
        this.empleados = [];
        this.totalDia = new CierreCajaTotales();
        this.totalDiaJefe = new CierreCajaTotales();
    }
}

export class CierreCajaPeriodo {
    desde: string;
    hasta: string;
    dias: CierreCajaDia[];
    totalPeriodo: CierreCajaTotales;
    totalPeriodoJefe: CierreCajaTotales;

    constructor(desde: string, hasta: string) {
        this.desde = desde;
        this.hasta = hasta;
        this.dias = [];
        this.totalPeriodo = new CierreCajaTotales();
        this.totalPeriodoJefe = new CierreCajaTotales();
    }
}
