import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OperacionAttributes {
    id?: number,
    Nombre: string,
    Descripcion: string,
    IdModulo: number
}

interface OperacionCreationAttributes extends Optional<OperacionAttributes, 'id'> { }

class Operacion extends Model<OperacionAttributes, OperacionCreationAttributes> implements OperacionAttributes {
    public id!: number;
    public Nombre!: string;
    public Descripcion!: string;
    public IdModulo!: number;
}

Operacion.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Nombre: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    Descripcion: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    IdModulo: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'operacion',
    sequelize,
    timestamps: false,
});

export default Operacion;
