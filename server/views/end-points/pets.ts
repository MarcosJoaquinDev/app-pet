import * as express from 'express';
import { middelwareVerify } from './middleware-security';
import {
	findAllMyPets,
	registerANewPet,
	changesInformationPet,
	deleteOnePet,
	findPetsNearMe,
} from '../../controllers/index';

const endPointPet = express.Router();

endPointPet.post('/me/pet', middelwareVerify, async (req, res) => {
	try {
		const userId = req._user.id;
		const newPetData = await registerANewPet(req.body, userId);
		res.json(newPetData);
	} catch (err) {
		res.json(err);
	}
});
endPointPet.put('/me/pet/:id', middelwareVerify, async (req, res) => {
	const petId = req.params.id;
	try {
		const updateDataPet = await changesInformationPet(petId, req.body);
		res.json(updateDataPet);
	} catch (err) {
		res.json(err);
	}
});

endPointPet.get('/me/pets', middelwareVerify, async (req, res) => {
	const userId = req._user.id;
	try {
		const allMyPets = await findAllMyPets(userId);
		res.json(allMyPets);
	} catch (err) {
		res.json(err);
	}
});
endPointPet.delete('/me/pet/:id', middelwareVerify, async (req, res) => {
	const petId = req.params.id;
	const userId = req._user.id;
	try {
		const updateDataPet = await deleteOnePet(petId, userId);
		res.json(updateDataPet);
	} catch (err) {
		res.json(err);
	}
});
endPointPet.get('/pets', async (req, res) => {
	const { lat, lng } = req.query;
	const response = await findPetsNearMe(lat, lng);
	res.json({ response });
});

export { endPointPet as pets };
