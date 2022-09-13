import { Pet, User } from '../models/index';
import { sendgrid } from './lib/sendgrid';
const userInfomation = async (userId) => {
	const meInfo: any = await User.findByPk(userId);
	const { user_name, name, last_name, email } = meInfo;
	const response = {
		user_name,
		name,
		last_name,
		email,
	};
	return response;
};
const changesInformation = async (userId: number, changes: object) => {
	const changePostgre = await User.update(changes, {
		where: { id: userId },
	});
	return changePostgre;
};
const sendTheMessage = async (idPet, courierName, phone, description) => {
	const user = await Pet.findByPk(idPet);
	const petName = user.get('name');
	const userId = user.get('userId') as number;
	const response = await User.findByPk(userId as number);
	const email = response.get('email') as string;
	const ownerName = response.get('name');

	const msg = {
		to: email,
		from: 'marcosjuako@hotmail.com',
		subject: 'Tienes una notificacion sobre tu mascota',
		text: 'un poco de texto',
		html: '<strong>mensaje random</strong>',
		templateId: 'd-335e52415820400e8eb0c7391fbd670a',
		dynamicTemplateData: {
			owner: ownerName,
			name: courierName,
			phone,
			message: description,
			pet: petName,
		},
	};

	try {
		const res = await sendgrid.send(msg);
		return res;
	} catch (err) {
		return err;
	}
};
export { userInfomation, changesInformation, sendTheMessage };
