import { Sequelize } from 'sequelize';
/*
const sequelize = new Sequelize({
	dialect: 'postgres',
	username: 'sddwtkjuvzlgbw',
	password: 'f24fad81bc0636fac4a6c6253f4c7b0903f35276b66e84e71975bcd7150d2028',
	database: 'dd0kg1l433gtbh',
	port: 5432,
	host: 'ec2-44-205-64-253.compute-1.amazonaws.com',
	ssl: true,
	// esto es necesario para que corra correctamente
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});*/
const sequelize = new Sequelize({
	dialect: 'postgres',
	username: process.env.SEQUELIZE_USER_NAME,
	password: process.env.SEQUELIZE_PASSWORD,
	database: process.env.SEQUELIZE_DATA_BASE,
	port: 5432,
	host: process.env.SEQUELIZE_HOST,
	ssl: true,
	// esto es necesario para que corra correctamente
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});
export { sequelize };
