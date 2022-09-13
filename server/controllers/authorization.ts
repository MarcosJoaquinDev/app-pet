import { User, Auth } from '../models/index';
import * as crypto from 'crypto';

function getSHA256ofJSON(text) {
	return crypto.createHash('sha256').update(text).digest('hex');
}
function checkBody(body) {
	let incomplete = false;
	for (const property in body) {
		incomplete = body[property] == '' ? true : false;
		if (incomplete) {
			return incomplete;
		}
	}
	return incomplete;
}
const emailExist = async (email: string) => {
	const findUser = await User.findOne({
		where: { email },
	});
	return findUser ? true : false;
};
const enterDataForAuthorization = async (body) => {
	const dataIncomplete = checkBody(body);
	if (dataIncomplete) {
		throw 'Error: Datos incompletos';
	} else {
		const { user_name, name, last_name, email } = body;
		const [newUser, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				user_name,
				name,
				last_name,
				email,
			},
		});
		if (created) {
			const passwd = getSHA256ofJSON(body.password);
			const newAuth = await Auth.create({
				userId: newUser.get('id'),
				email,
				password: passwd,
			});
			return `${email} creado!`;
		} else {
			throw 'Error: Este email ya esta registrado';
		}
	}
};
export { enterDataForAuthorization, emailExist };
