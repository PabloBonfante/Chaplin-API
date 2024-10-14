import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface RolAttributes {
    Id?: number,
    NombreRol: string,
}

interface RolCreationAttributes extends Optional<RolAttributes, 'Id'> { }

class Rol extends Model<RolAttributes, RolCreationAttributes> implements RolAttributes {
    public Id!: number;
    public NombreRol!: string;
}

Rol.init({
    Id: {
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
