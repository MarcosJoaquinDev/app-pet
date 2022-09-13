import { sequelize } from './connection';
import { Model, DataTypes } from 'sequelize';

export class Auth extends Model {}

Auth.init(
	{
		email: DataTypes.STRING,
		password: DataTypes.STRING,
	},
	{ sequelize, modelName: 'auth' }
);
