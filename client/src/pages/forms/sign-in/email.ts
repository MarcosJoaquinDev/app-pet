import { state } from '../../../state';
import { Router } from '@vaadin/router';
const iconPet = require('url:../../icons/pet-logo.png');
export function initSignInEmail() {
	customElements.define(
		'x-sign-in-email',
		class SignInEmail extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			checkEmailInDataBase() {
				const form = this.shadow.querySelector('.form') as Element;
				form.addEventListener('submit', async (e) => {
					e.preventDefault();
					const target = e.target as any;
					const email = target.email.value;
					const fieldIsEmpty = email == '';
					let messageEl = this.shadow.getElementById('msg-warning') as Element;
					let inputEl = this.shadow.querySelector('.input') as Element;

					if (fieldIsEmpty) {
						messageEl.innerHTML = 'Campo obligatorio';
						messageEl.setAttribute('class', 'help is-danger');
						inputEl.setAttribute('class', 'input is-danger');
						console.log('campo vacio');
					} else {
						const checkEmail = await state.initAuthEmail(email);
						if (checkEmail) {
							state.data.user.email = email;
							Router.go('/sign-in-auth');
						} else {
							console.log('email invalido');
							messageEl.innerHTML = 'Este mail es invalido';
							messageEl.setAttribute('class', 'help is-danger');
							inputEl.setAttribute('class', 'input is-danger');
						}
					}
				});
			}
			render() {
				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<header class='header'>
					<div class='icon-container'>
						<img class='icon-image' src='${iconPet}'/>
					</div>
					<div class="buttons">
					<x-button-out></x-button-out>
					</div>
				</header>
				<section class='form-container'>
					<h1 class="title is-1">Ingresar</h1>
					<form class='form'>
						<div class="field">
							<label class="label">Email</label>
							<div class="control">
								<input class="input" type="email" name='email' placeholder="Example@gmail.com">
							</div>
							<p id='msg-warning' class="email-none help is-danger"></p>
						</div>
						<button class="button is-medium is-fullwidth">Siguiente</button>
					</form>
				</section>
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.header{
					display:flex;
					width: 100%; 
					justify-content: space-between;
					padding: 10px;
				}
				.icon-image{
					width: 60px;
				}
				.title{
					text-align:center;
				}
				.form-container{
					display:flex;
					flex-direction:column;
					justify-content: center;
					align-items:center;
				}
				.form{
					min-width:350px;
					height: 500px;
					padding: 30px;
				}
				@media(min-width:600px){
						.form{
							width: 500px;
						}
				}
				.input{
					width: 100%;
				}
				.email-none{
					display:none;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.checkEmailInDataBase();
			}
		}
	);
}
