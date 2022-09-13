import { sequelize } from './connection';
import { Model, DataTypes } from 'sequelize';

export class Pet extends Model {}

Pet.init(
	{
		name: DataTypes.STRING,
		type: DataTypes.STRING,
		race: DataTypes.STRING,
		description: DataTypes.STRING,
		url_picture: DataTypes.STRING,
		location: DataTypes.STRING,
		lat: DataTypes.FLOAT,
		lng: DataTypes.FLOAT,
	},
	{ sequelize, modelName: 'pet' }
);
