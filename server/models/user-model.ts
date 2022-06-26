import sequelize from '../db'
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare email: string;
	declare isActivated: boolean;
	declare activationLink: string;
	declare password: string;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		isActivated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		activationLink: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		}
	},
	{
		tableName: 'users',
		sequelize
	}
)
