import { initHomePage } from './pages/home';
import { initMyHomePage } from './pages/my-home';
import { searchPetLocationsButton } from './components/search-button';
import { outButton } from './components/button-out';
import { initMyInformationPage } from './pages/forms/user-info/my-data';
import { initEditMyInformationPage } from './pages/forms/user-info/edit-my-data';
import { initFormSecurityData } from './pages/forms/user-info/pass-form';
import { initSignInEmail } from './pages/forms/sign-in/email';
import { initSignInPassword } from './pages/forms/sign-in/password';
import { initSignUp } from './pages/forms/sign-up/sign-up';
import { initSignUpAuth } from './pages/forms/sign-up/sing-up-auth';
import { initReportInfoPetPage } from './pages/forms/pets-info/report';
import { initReportEditInfoPage } from './pages/forms/pets-info/edit';
import { initMyPetsPublishedPage } from './pages/my-reported-pets';
import { initPetsNearMe } from './pages/pets-near-me';
import { initCardPet } from './components/pet-card';
import { initHeaderComponent } from './components/header';

import './routes';
function main() {
	initHomePage();
	initMyHomePage();
	initMyInformationPage();
	initEditMyInformationPage();
	initCardPet();
	initPetsNearMe();
	initSignInEmail();
	initSignInPassword();
	initSignUp();
	initSignUpAuth();
	initReportInfoPetPage();
	initReportEditInfoPage();
	initMyPetsPublishedPage();
	initHeaderComponent();
	searchPetLocationsButton();
	outButton();
	initFormSecurityData();
}
main();
