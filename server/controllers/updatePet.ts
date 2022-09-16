import { Pet } from '../models/index';
import { index } from './lib/algolia';
import { cloudinary } from './lib//cloudinary';

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
async function uploadTheURLToCloudinary(url: string) {
	console.log(url.length);

	try {
		const respuesta = await cloudinary.uploader.upload(url, {
			resource_type: 'image',
			discard_original_filename: true,
			width: 1000,
		});
		return respuesta.secure_url;
	} catch (err) {
		return 'Error: cloudynary';
	}
}
const registerANewPet = async (dataPet, userId) => {
	const dataIncomplete = checkBody(dataPet);
	if (dataIncomplete) {
		throw 'Error: Datos incompletos';
	} else {
		const { name, type, race, description, url_picture, location, lat, lng } =
			dataPet;
		const urlParsed = await uploadTheURLToCloudinary(url_picture);
		const newPet = await Pet.create({
			name,
			type,
			race,
			description,
			url_picture: urlParsed,
			location,
			lat,
			lng,
			userId,
		});

		const newIndexPet = await index.saveObject({
			objectID: newPet.get('id'),
			name,
			location,
			_geoloc: {
				lat,
				lng,
			},
		});
		return newPet;
	}
};
function parseObjectAlgolia(body, id) {
	const response: any = {};
	response.objectID = id;
	if (body.name) {
		response.name = body.name;
	}
	if (body.location) {
		response.location = body.location;
	}
	if (body.lat && body.lng) {
		response._geoloc = {
			lat: body.lat,
			lng: body.lng,
		};
	}
	return response;
}

const changesInformationPet = async (petId, data) => {
	const changesAlgolia = parseObjectAlgolia(data, petId);

	const updateInAlgolia = await index.partialUpdateObject(changesAlgolia);
	if (data.url_picture) {
		const urlParsed = await uploadTheURLToCloudinary(data.url_picture);
		data.url_picture = urlParsed;
	}

	const changePostgre = await Pet.update(data, {
		where: { id: petId },
	});

	return changePostgre;
};
const deleteOnePet = async (petId, userId) => {
	const res = await Pet.destroy({
		where: { id: petId, userId },
	});
	return res;
};

export { registerANewPet, changesInformationPet, deleteOnePet };
