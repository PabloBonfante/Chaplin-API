import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface FormaPagoAttributes {
    Id?: number,
    Codigo: string,
    Nombre: string,
    Descripcion: string,
    Activo: boolean,
    FechaCreacion: Date,
}

interface FormaPagoCreationAttributes extends Optional<FormaPagoAttributes, 'Id'> { }

class FormaPago extends Model<FormaPagoAttributes, FormaPagoCreationAttributes> implements FormaPagoAttributes {
    public Codigo!: string;
    public Nombre!: string;
    public Descripcion!: string;
    public Activo!: boolean;
    public FechaCreacion!: Date;
}

FormaPago.init({
    Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Nombre: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    Codigo: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Activo: {
        type: new DataTypes.TINYINT,
        allowNull: false,
    },
    FechaCreacion: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'formapago',
    sequelize,
    timestamps: false,
});

export default FormaPago;

