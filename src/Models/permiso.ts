import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';
import Operacion from './operacion';

interface PermisoAttributes {
    id?: number,
    IdUsuario: number,
    IdOperacion: number
}

interface PermisoCreationAttributes extends Optional<PermisoAttributes, 'id'> { }

class Permiso extends Model<PermisoAttributes, PermisoCreationAttributes> implements PermisoAttributes {
    public id!: number;
    public IdUsuario!: number;
    public IdOperacion!: number;
}

Permiso.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    IdUsuario: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    IdOperacion: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'permiso',
    sequelize,
    timestamps: false,
});

Permiso.belongsTo(Operacion, {
    foreignKey: {
        name: 'IdFormaPago',
        allowNull: false,
    },
});

Permiso.belongsTo(Usuario, {
    foreignKey: {
        name: 'IdUsuario',
        allowNull: false,
    },
});

export default Permiso;
