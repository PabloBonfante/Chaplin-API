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
    dia: Date;
    empleados: CierreCajaEmpleado[];
    totalDia: CierreCajaTotales;
    totalDiaJefe: CierreCajaTotales;

    constructor(dia: Date) {
        this.dia = dia;
        this.empleados = [];
        this.totalDia = new CierreCajaTotales();
        this.totalDiaJefe = new CierreCajaTotales();
    }
}

export class CierreCajaPeriodo {
    desde: Date;
    hasta: Date;
    dias: CierreCajaDia[];
    totalPeriodo: CierreCajaTotales;
    totalPeriodoJefe: CierreCajaTotales;

    constructor(desde: Date, hasta: Date) {
        this.desde = desde;
        this.hasta = hasta;
        this.dias = [];
        this.totalPeriodo = new CierreCajaTotales();
        this.totalPeriodoJefe = new CierreCajaTotales();
    }
}
