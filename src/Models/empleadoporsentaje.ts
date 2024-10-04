import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EmpleadoPorsentajeAttributes{
    id?: number,
    IdEmpleado: number,
    Porcentaje: number,
    Cantidad: number,
}

interface EmpleadoPorsentajeCreationAttributes extends Optional<EmpleadoPorsentajeAttributes, 'id'> {}

class EmpleadoPorsentaje extends Model<EmpleadoPorsentajeAttributes, EmpleadoPorsentajeCreationAttributes> implements EmpleadoPorsentajeAttributes {
  public id!: number;
  public IdEmpleado!: number;
  public Porcentaje!: number;
  public Cantidad!: number;
}

EmpleadoPorsentaje.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  IdEmpleado: {
    type: new DataTypes.INTEGER,
    allowNull: false,
  },
  Porcentaje: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  Cantidad: {
    type: new DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'empleadoporsentaje',
  sequelize,
  timestamps: false,
});

export default EmpleadoPorsentaje;
