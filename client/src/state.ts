import { Router } from '@vaadin/router';
import {
	sendInitialDataForRegistration,
	authorizationUpdate,
	getToken,
	getMyInformation,
	getTheCurrentDataOfMyPets,
	pushPetInDataBase,
	updateChangesPet,
	deleteAPetInTheDataBase,
	getAllPetsNearMe,
	sendInformationToOwner,
	changeMyInformation,
} from './api-pets';

const state = {
	data: {
		user: {
			user_name: '',
			name: '',
			last_name: '',
			email: '',
			token: 0,
		},
		pets_near_me: [],
		pets: [],
		idForChanges: 0,
	},
	async initAuthEmail(email: string) {
		const result = await sendInitialDataForRegistration(email);
		return result.json();
	},
	async initAuth(data) {
		const { name, last_name, user_name, email, password } = data;
		const result = await authorizationUpdate(
			name,
			last_name,
			user_name,
			email,
			password
		);
		console.log(result, 'init auth');

		return result.json();
	},
	async loadMyToken(email: string, psw: string) {
		const response = await getToken(email, psw);

		if (response.token) {
			sessionStorage.setItem('token', response.token);
			return true;
		} else {
			return false;
		}
	},
	loadMyData() {
		const token = sessionStorage.getItem('token');
		getMyInformation(token).then((info) => {
			this.data.user = info;
			getTheCurrentDataOfMyPets(token).then((petInfo) => {
				this.data.pets = petInfo;
				Router.go('/home');
			});
		});
	},
	async publishedNewPet(petInfo) {
		const token: string = sessionStorage.getItem('token') as string;
		const response = await pushPetInDataBase(token, petInfo);
	},
	async updateChangesPet(infoPet, idPet) {
		const token: string = sessionStorage.getItem('token') as string;
		const res = await updateChangesPet(infoPet, idPet, token);
		this.loadMyData();
	},
	async dropAPet(petFoundId) {
		try {
			const token: string = sessionStorage.getItem('token') as string;
			const respose = await deleteAPetInTheDataBase(petFoundId, token);
			return respose;
		} catch (err) {
			return 'Error: delete';
		}
	},
	async findPets(lat, lng) {
		const pets = await getAllPetsNearMe(lat, lng);
		return pets;
	},
	async sendInfo(idPet, name, phone, description) {
		const res = await sendInformationToOwner(idPet, name, phone, description);
		return res;
	},
	async changesMydata(data) {
		const token: string = sessionStorage.getItem('token') as string;
		const put = await changeMyInformation(token, data);
		return put;
	},
};
export { state };
