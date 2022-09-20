import {
	enterDataForAuthorization,
	emailExist,
	changePassword,
} from './authorization';
import { generateToken } from './authentication';
import { findPetsNearMe, findAllMyPets } from './searchPets';
import {
	registerANewPet,
	changesInformationPet,
	deleteOnePet,
} from './updatePet';
import {
	userInfomation,
	changesInformation,
	sendTheMessage,
} from './user-info';

// Adjunto todas las funciones de los controllers
// y las exporto a la view

export {
	enterDataForAuthorization,
	generateToken,
	findAllMyPets,
	findPetsNearMe,
	registerANewPet,
	userInfomation,
	changesInformation,
	changesInformationPet,
	emailExist,
	deleteOnePet,
	sendTheMessage,
	changePassword,
};
