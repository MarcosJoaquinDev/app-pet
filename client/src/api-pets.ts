const port = process.env.PORT || 'http://localhost:3002';
const sendInitialDataForRegistration = async (email: string) => {
	const response = await fetch(port + '/auth-email', {
		method: 'POST',
		body: JSON.stringify({ email }),
		headers: {
			'content-type': 'application/json',
		},
	});
	return response;
};
const authorizationUpdate = async (
	name,
	last_name,
	user_name,
	email,
	password
) => {
	const response = await fetch(port + '/auth', {
		method: 'POST',
		body: JSON.stringify({ name, last_name, user_name, email, password }),
		headers: {
			'content-type': 'application/json',
		},
	});
	return response;
};
const getToken = async (email: string, password: string) => {
	try {
		const response = await fetch(port + '/auth/token', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'content-type': 'application/json',
			},
		});
		const resJson = await response.json();
		return resJson;
	} catch (err) {
		return err;
	}
};
const getMyInformation = async (token) => {
	try {
		const resp = await fetch(port + '/me', {
			method: 'GET',
			headers: { Authorization: `bearer ${token}` },
		});
		const user: Response = await resp.json();
		return user;
	} catch (err) {
		return 'Error en los Datos';
	}
};
const getTheCurrentDataOfMyPets = async (token) => {
	try {
		const resp = await fetch(port + '/me/pets', {
			method: 'GET',
			headers: { Authorization: `bearer ${token}` },
		});
		const pets: Response = await resp.json();
		return pets;
	} catch (err) {
		return 'Error en los Datos';
	}
};
const pushPetInDataBase = async (token: string, data) => {
	const { name, type, race, url_picture, description, location, lat, lng } =
		data;
	try {
		const resp = await fetch(port + '/me/pet', {
			method: 'POST',
			body: JSON.stringify({
				name,
				type,
				race,
				url_picture,
				description,
				location,
				lat,
				lng,
			}),
			headers: {
				Authorization: `bearer ${token}`,
				'content-type': 'application/json',
			},
		});
		const pets: Response = await resp.json();
		return pets;
	} catch (err) {
		return 'Error en los Datos';
	}
};
const updateChangesPet = async (infoPet, petId: number, token: string) => {
	const response = await fetch(port + `/me/pet/${petId}`, {
		method: 'PUT',
		body: JSON.stringify(infoPet),
		headers: {
			Authorization: `bearer ${token}`,
			'content-type': 'application/json',
		},
	});
	return response;
};
const deleteAPetInTheDataBase = async (petId: number, token: string) => {
	const response = await fetch(port + `/me/pet/${petId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `bearer ${token}`,
			'content-type': 'application/json',
		},
	});
	return response;
};
const getAllPetsNearMe = async (lat, lng) => {
	try {
		const resp = await fetch(port + `/pets?lat=${lat}&lng=${lng}`, {
			method: 'GET',
		});
		const pets = await resp.json();
		return pets;
	} catch (err) {
		return 'Error';
	}
};
const sendInformationToOwner = async (
	idPet: number,
	name: string,
	phone: string,
	description: string
) => {
	try {
		const response = await fetch(port + '/send-mail', {
			method: 'POST',
			body: JSON.stringify({ idPet, name, phone, description }),
			headers: {
				'content-type': 'application/json',
			},
		});
		const resJson = await response.json();
		return resJson;
	} catch (err) {
		return err;
	}
};
export {
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
};
