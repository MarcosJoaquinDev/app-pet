import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.URL_DATA_BASE_ELEPHANT)
/*
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
*/
export { sequelize };
