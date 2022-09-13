const iconPet = require('url:../../icons/pet-logo.png');
import { state } from '../../../state';
import { Router } from '@vaadin/router';
export function initSignInPassword() {
	customElements.define(
		'x-sign-in-password',
		class SignInPassword extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			email: string;
			constructor() {
				super();
				this.email = state.data.user.email;
				this.render();
			}
			listenerForm() {
				const form = this.shadow.querySelector('.form') as Element;
				form.addEventListener('submit', async (e) => {
					e.preventDefault();
					const target = e.target as any;
					const response = await state.loadMyToken(
						this.email,
						target.key.value
					);
					console.log(response);

					if (response) {
						state.loadMyData();
					} else {
						let messageEl = this.shadow.getElementById(
							'msg-warning'
						) as Element;
						let inputEl = this.shadow.querySelector('.input') as Element;
						messageEl.setAttribute('class', 'help is-danger');
						inputEl.setAttribute('class', 'input is-danger');
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
							<label class="label">Contraseña</label>
							<div class="control">
								<input name='key' class="input" type="password" placeholder="*********">
							</div>
							<p id='msg-warning' class="email-none help is-danger">contraseña invalida</p>
						</div>
						<button class="button is-medium is-fullwidth">Ingresar</button>
					</form>
				</section>
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.header{
					display:flex;
					min-width: 300px; 
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
				this.listenerForm();
			}
		}
	);
}
