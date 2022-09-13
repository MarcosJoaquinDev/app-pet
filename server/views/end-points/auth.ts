import * as express from 'express';
import {
	enterDataForAuthorization,
	generateToken,
	emailExist,
} from '../../controllers/index';

const endPointAuth = express.Router();

endPointAuth.post('/auth', async (req, res) => {
	try {
		const initialUserData = req.body;
		const response = await enterDataForAuthorization(initialUserData);
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});
endPointAuth.post('/auth-email', async (req, res) => {
	const { email } = req.body;
	const response = await emailExist(email);
	res.json(response);
});
endPointAuth.post('/auth/token', async (req, res) => {
	try {
		const response = await generateToken(req.body);
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});
export { endPointAuth as auth };
