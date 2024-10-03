import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Empleado from './empleado';
import Servicio from './Servicio';
import FormaPago from './formapago';

interface RegistroDeBarberiaAttributes {
  Id?: number,
  IdEmpleado: number,
  IdServicio: number,
  IdFormaPago: number,
  Fecha: Date,
  Duracion: string,
  Comentario: string,
  PrecioNeto: number,
  CreateAt: Date,
  CreateBy: string,
  UpdateAt: Date,
  UpdateBy: string,
}

interface RegistroDeBarberiaCreationAttributes extends Optional<RegistroDeBarberiaAttributes, 'Id'> { }
interface RegistroDeBarberiaExtendedAttributes extends RegistroDeBarberiaAttributes {
  NombreApellidoEmpleado: string;
  CodigoFormaPago: string;
  DescripcionFormaPago: string;
  CodServicio: string;
  DescServicio: string;
}

class RegistroDeBarberia extends Model<RegistroDeBarberiaAttributes, RegistroDeBarberiaCreationAttributes> implements RegistroDeBarberiaAttributes {
  public Id!: number;
  public IdEmpleado!: number;
  public IdServicio!: number;
  public IdFormaPago!: number;
  public Fecha!: Date;
  public Duracion!: string;
  public Comentario!: string;
  public PrecioNeto!: number;
  public CreateAt!: Date;
  public CreateBy!: string;
  public UpdateAt!: Date;
  public UpdateBy!: string;
}

RegistroDeBarberia.init({
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  IdEmpleado: {
    type: new DataTypes.INTEGER,
    allowNull: false,
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  IdFormaPago: {
    type: new DataTypes.INTEGER,
    allowNull: false,
  },
  Fecha: {
    type: new DataTypes.DATE,
    allowNull: false,
  },
  Duracion: {
    type: new DataTypes.TIME,
    allowNull: false,
  },
  Comentario: {
    type: new DataTypes.TEXT,
    allowNull: false,
  },
  PrecioNeto: {
    type: new DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  CreateAt: {
    type: new DataTypes.DATE,
    allowNull: false,
  },
  CreateBy: {
    type: new DataTypes.TEXT,
    allowNull: false,
  },
  UpdateAt: {
    type: new DataTypes.DATE,
    allowNull: false,
  },
  UpdateBy: {
    type: new DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'registrodebarberia',
  sequelize,
  timestamps: false,
});

// Definir las asociaciones
RegistroDeBarberia.belongsTo(Empleado, {
  foreignKey: {
    name: 'IdEmpleado',
    allowNull: false,
  },
});

RegistroDeBarberia.belongsTo(Servicio, {
  foreignKey: {
    name: 'IdServicio',
    allowNull: false,
  },
});


RegistroDeBarberia.belongsTo(FormaPago, {
  foreignKey: {
    name: 'IdFormaPago',
    allowNull: false,
  },
});

export default RegistroDeBarberia;
export { RegistroDeBarberiaExtendedAttributes };

