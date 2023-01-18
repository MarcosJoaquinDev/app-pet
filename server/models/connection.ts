import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.URL_DATA_BASE_ELEPHANT)

export { sequelize };
