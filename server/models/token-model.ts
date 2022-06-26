import sequelize from '../db'
import { DataTypes, Model,  CreationOptional, ForeignKey, InferAttributes } from 'sequelize'
import { User } from './user-model';

class Token extends Model<InferAttributes<Token>> {
	declare user: ForeignKey<User['id']>;
	declare refreshToken: string;
}

Token.init(
	{
		user: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'tokens',
		sequelize
	}
)