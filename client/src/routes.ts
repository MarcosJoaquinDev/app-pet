import { Router } from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
	{ path: '/', component: 'x-home' },
	{ path: '/home', component: 'x-my-home' },
	{ path: '/profile', component: 'x-user-info' },
	{ path: '/search-pets', component: 'x-pets-near-me' },
	{ path: '/sign-up', component: 'x-sign-up' },
	{ path: '/sign-up-auth', component: 'x-sign-up-auth' },
	{ path: '/sign-in-email', component: 'x-sign-in-email' },
	{ path: '/sign-in-auth', component: 'x-sign-in-password' },
	{ path: '/edit', component: 'x-edit-report' },
	{ path: '/edit-my-info', component: 'x-edit-user-info' },
	{ path: '/report', component: 'x-report-pet' },
	{ path: '/my-pets', component: 'x-my-reports' },
]);
