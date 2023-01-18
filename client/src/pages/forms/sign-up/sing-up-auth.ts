import { Router } from '@vaadin/router';
import { state } from '../../../state';
const iconPet = require('url:../../icons/pet-logo.png');
export function initSignUpAuth() {
	customElements.define(
		'x-sign-up-auth',
		class SignUpAuth extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
				console.log(state.data.user.token);
			}
			checkInputs() {
				const inputTopEl = this.shadow.querySelector('.input-top') as any;
				const inputBtmEl = this.shadow.querySelector('.input-bottom') as any;
				const button = this.shadow.querySelector('.btn-form') as any;
				inputBtmEl.addEventListener('input', () => {
					if (inputBtmEl.value === inputTopEl.value) {
						button.disabled = false;
					} else {
						button.disabled = true;
					}
				});
				const form = this.shadow.querySelector('.form') as Element;
				form.addEventListener('submit', async (e) => {
					e.preventDefault();
					const target = e.target as any;
					const psw = target.bottom.value;
					const authData = {
						name: state.data.user.name,
						last_name: state.data.user.last_name,
						user_name: state.data.user.user_name,
						email: state.data.user.email,
						password: psw,
					};
					
					await state.initAuth(authData);
					const loadToken = await state.loadMyToken(
						authData.email,
						authData.password
					);
					if (loadToken) {
						state.loadMyData();
					}
				});
			}
			render() {
				this.shadow.innerHTML = `
				<div class='container'>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<header class='header'>
					<div class='icon-container'>
						<img class='icon-image' src='${iconPet}'/>
					</div>
					<div class="buttons">
						<x-button-out></x-button-out>
					</div>
				</header>
				<h1 class="title is-1">Mis Datos</h1>
				<section class='form-container'>
					<form class='form'>
						<div class="field">
							<label class="label">Contraseña</label>
							<div class="control">
								<input class="input input-top" name='top' type="password" placeholder="********">
							</div>
						</div>
						<div class="field">
							<label class="label">Repeti tu contraseña</label>
							<div class="control">
								<input class="input input-bottom" name='bottom' type="password" placeholder="********">
							</div>
						</div>
						<button class="button btn-form is-medium is-fullwidth is-primary" disabled>
							<img class='btn-icon-image' src='${iconPet}'/>
							<spam class='btn-text' >Guardar</spam>
							<img class='btn-icon-image' src='${iconPet}'/>
						</button>
					</form>	
				</section>
				</div>		
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.container{
					height:100vh;
				}
				.header{
					display:flex;
					width: 100%; 
					justify-content: space-between;
					padding: 10px;
				}
				img.icon-image{
					width: 60px;
				}
				.btn-icon-image{
					width: 20px;
				}
				.title.is-1{
					text-align:center;
					margin-top: 50px;
					margin-bottom: 50px;

				}
				.form-container{
					width: 100%;
					padding:20px;
					display:flex;
					justify-content: center;
				}
				.form{
					min-width: 450px;
					border:solid 1px #a7a7b0;
					border-radius:10px;
					padding: 10px;
				}
				@media(max-width:480px){
					.form{
						min-width:350px;
					}
				}
				.button{
					display:flex;
					justify-content:space-between;
				}
				.btn-text{
					color:#2c2c2c;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.checkInputs();
			}
		}
	);
}
