import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ServicoAttributes{
    id?: number,
    CodServicio: string,
    DescServicio: string,
    PrecioNeto: number,
}

interface ServicoCreationAttributes extends Optional<ServicoAttributes, 'id'> {}

class Servicio extends Model<ServicoAttributes, ServicoCreationAttributes> implements ServicoAttributes {
  public id!: number;
  public CodServicio!: string;
  public DescServicio!: string;
  public PrecioNeto!: number;
}

Servicio.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  CodServicio: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  DescServicio: {
    type: new DataTypes.STRING(255),
    allowNull: false,
    unique: false,
  },
  PrecioNeto: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
}, {
  tableName: 'servicio',
  sequelize,
  timestamps: false,
});

export default Servicio;
