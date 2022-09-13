import * as express from 'express';
import {
	userInfomation,
	changesInformation,
	sendTheMessage,
} from '../../controllers/index';
import { middelwareVerify } from './middleware-security';

const endPointUser = express.Router();

endPointUser.get('/me', middelwareVerify, async (req, res) => {
	const userId = req._user.id;
	try {
		const meInfo = await userInfomation(userId);
		res.json(meInfo);
	} catch (err) {
		res.json(err);
	}
});
endPointUser.put('/me', middelwareVerify, async (req, res) => {
	try {
		const userId = req._user.id;
		const updateMeInfo = await changesInformation(userId, req.body);
		res.json(updateMeInfo);
	} catch (err) {
		res.json(err);
	}
});

endPointUser.post('/send-mail', async (req, res) => {
	const { idPet, name, phone, description } = req.body;
	try {
		const response = await sendTheMessage(idPet, name, phone, description);
		res.json(response);
	} catch (err) {
		return err;
	}
});

export { endPointUser as user };
