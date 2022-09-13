import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { auth, user, pets } from './end-points';

const APP = express();
const PORT = process.env.PORT || 3002;
APP.use(express.json());
APP.use(cors());

(function () {
	APP.listen(PORT, () => {
		console.log('todo ok en el puerto', PORT);
	});

	APP.use(auth);
	APP.use(user);
	APP.use(pets);

	const route = path.resolve(__dirname, '../../dist');
	APP.use(express.static(route));
	APP.get('*', (req, res) => {
		res.sendFile(route, +'/index.html');
	});
})();