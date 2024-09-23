import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ModuloAttributes {
    id?: number,
    NombreModulo: string,
    URL: string
}

interface ModuloCreationAttributes extends Optional<ModuloAttributes, 'id'> { }

class Modulo extends Model<ModuloAttributes, ModuloCreationAttributes> implements ModuloAttributes {
    public id!: number;
    public NombreModulo!: string;
    public URL!: string;
}

Modulo.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    NombreModulo: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    URL: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'modulo',
    sequelize,
    timestamps: false,
});

export default Modulo;
