import { index } from './lib/algolia';
import { Pet } from '../models/index';
const findPetsNearMe = async (lat: number, lng: number) => {
	const cords = `${lat},${lng}`;
	const response: any = await index.search('', {
		aroundLatLng: cords,
		aroundRadius: 10000,
	});
	let hits = [];
	for (const hit of response.hits) {
		hits.push(hit.objectID);
	}
	const resultsFound = hits.length > 0;
	if (resultsFound) {
		const result = await Pet.findAll({
			where: { id: hits },
		});
		return result;
	}
};

const findAllMyPets = async (userId) => {
	const all = Pet.findAll({
		where: { userId },
	});
	return all;
};
export { findPetsNearMe, findAllMyPets };
