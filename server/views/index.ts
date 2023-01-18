import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { auth, user, pets } from './end-points';
import { Auth } from '../models/Auth';

const APP = express();
const PORT = process.env.PORT || 3000;

APP.use(express.json({ limit: '50mb' }));
APP.use(
	express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
APP.use(cors());
(function () {
	APP.listen(PORT, () => {
		console.log('todo ok en el puerto', PORT);
	});
	/*
	const res = Auth.findAll();
	res.then(result=>{
		console.log(result,'asdad');
	})
	*/
	APP.use(auth);
	APP.use(user);
	APP.use(pets);

	const route = path.resolve(__dirname, '../../dist');
	APP.use(express.static(route));
	APP.get('*', (req, res) => {
		res.sendFile(route, +'/index.html');
	});
})();
