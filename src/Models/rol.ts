import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RolAttributes {
    id?: number,
    NombreRol: string,
}

interface RolCreationAttributes extends Optional<RolAttributes, 'id'> { }

class Rol extends Model<RolAttributes, RolCreationAttributes> implements RolAttributes {
    public id!: number;
    public NombreRol!: string;
}

Rol.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    NombreRol: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'rol',
    sequelize,
    timestamps: false,
});

export default Rol;
