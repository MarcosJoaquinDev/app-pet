import { sequelize } from './connection';
import { Model, DataTypes } from 'sequelize';

export class User extends Model {}

User.init(
	{
		user_name: DataTypes.STRING,
		name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		email: DataTypes.STRING,
	},
	{ sequelize, modelName: 'user' }
);
