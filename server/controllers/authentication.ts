import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Auth } from '../models/index';
const SECRET_KEY_TOKEN = process.env.JSONWEBTOKEN_KEY_TOKEN;

function getSHA256ofJSON(text) {
	return crypto.createHash('sha256').update(text).digest('hex');
}
function checkBody(body) {
	let incomplete = false;
	for (const property in body) {
		incomplete = body[property] == '' ? true : false;
	}
	return incomplete;
}

const generateToken = async (body) => {
	const incompleteData = checkBody(body);
	let findAuthUser;

	if (incompleteData) {
		throw 'Error: faltan datos';
	} else {
		const { email, password } = body;
		const passwordCript = getSHA256ofJSON(password);
		findAuthUser = await Auth.findOne({
			where: {
				email,
				password: passwordCript,
			},
		});
	}
	if (findAuthUser) {
		const token = jwt.sign(
			{ id: findAuthUser.get('userId') },
			SECRET_KEY_TOKEN
		);
		return { token };
	} else {
		throw 'Error: Datos incorrectos';
	}
};

export { generateToken };
