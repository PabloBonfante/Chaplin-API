import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EmpleadoAttributes {
    Id?: number,
    Nombre: string,
    Apellido: string,
    DNI: string,
    Edad: number,
    FechaContratacion: Date,
    IdRol: number
}

interface EmpleadoCreationAttributes extends Optional<EmpleadoAttributes, 'Id'> { }

class Empleado extends Model<EmpleadoAttributes, EmpleadoCreationAttributes> implements EmpleadoAttributes {
    public Id!: number;
    public Nombre!: string;
    public Apellido!: string;
    public DNI!: string;
    public Edad!: number;
    public FechaContratacion!: Date;
    public IdRol!: number;
}

Empleado.init({
    Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Nombre: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    Apellido: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    DNI: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Edad: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    FechaContratacion: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    IdRol: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'empleado',
    sequelize,
    timestamps: false,
});

export default Empleado;
export { EmpleadoAttributes, EmpleadoCreationAttributes };

