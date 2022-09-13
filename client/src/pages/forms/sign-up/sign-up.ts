const iconPet = require('url:../../icons/pet-logo.png');
import { Router } from '@vaadin/router';
import { state } from '../../../state';
export function initSignUp() {
	customElements.define(
		'x-sign-up',
		class SignUp extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			name: string;
			last_name: string;
			user_name: string;
			email: string;
			constructor() {
				super();
				this.render();
			}
			listener() {
				const formEl = this.shadow.querySelector('.form') as Element;
				formEl.addEventListener('submit', (e) => {
					e.preventDefault();
					const target = e.target as any;
					this.user_name = target['user-nik'].value;
					this.email = target['user-email'].value;
					this.name = target['user-name'].value;
					this.last_name = target['user-lastname'].value;
					const fieldsCompleted = this.checkFields(
						this.name,
						this.last_name,
						this.user_name,
						this.email
					);

					if (fieldsCompleted) {
						this.checkTheEmailInTheDatabase(this.email);
					}
				});
			}
			checkFields(name: string, lastName: string, nik: string, email: string) {
				let fieldsAreCompleted: boolean = true;
				if (!name) {
					const messageEl = this.shadow.querySelector('.name-none') as Element;
					const inputEl = this.shadow.querySelector('.input-name') as Element;
					messageEl.setAttribute('class', 'user help is-danger');
					inputEl.setAttribute('class', 'input input-name is-danger');
					fieldsAreCompleted = false;
				}
				if (!lastName) {
					const messageEl = this.shadow.querySelector(
						'.lastname-none'
					) as Element;
					const inputEl = this.shadow.querySelector(
						'.input-lastname'
					) as Element;
					messageEl.setAttribute('class', 'user help is-danger');
					inputEl.setAttribute('class', 'input user-lastname is-danger');
					fieldsAreCompleted = false;
				}
				if (!nik) {
					const messageEl = this.shadow.querySelector('.nik-none') as Element;
					const inputEl = this.shadow.querySelector('.input-nik') as Element;
					messageEl.setAttribute('class', 'help is-danger');
					inputEl.setAttribute('class', 'input input-nik is-danger');
					fieldsAreCompleted = false;
				}
				if (!email) {
					const messageEl = this.shadow.querySelector('.email-none') as Element;
					const inputEl = this.shadow.querySelector('.input-email') as Element;
					messageEl.setAttribute('class', 'help is-danger');
					inputEl.setAttribute('class', 'input input-email is-danger');
					messageEl.innerHTML = 'Este Campo es obligatorio';
					fieldsAreCompleted = false;
				}
				return fieldsAreCompleted;
			}
			async checkTheEmailInTheDatabase(email: string) {
				const checkEmail = await state.initAuthEmail(email);
				if (!checkEmail) {
					state.data.user.name = this.name;
					state.data.user.last_name = this.last_name;
					state.data.user.user_name = this.user_name;
					state.data.user.email = this.email;
					Router.go('/sign-up-auth');
				} else {
					const messageEl = this.shadow.querySelector('.email-none') as Element;
					const inputEl = this.shadow.querySelector('.input-email') as Element;
					messageEl.setAttribute('class', 'help is-danger');
					inputEl.setAttribute('class', 'input input-email is-danger');
					messageEl.innerHTML = 'Este email ya esta registrado';
				}
			}
			render() {
				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<header class='header'>
					<div class='icon-container'>
						<img class='icon-image' src='${iconPet}'/>
					</div>
					<div class="buttons ">
					<x-button-out></x-button-out>
					</div>
				</header>
				<h1 class="title is-1">Mis Datos</h1>
				<section class='form-container'>
					<form class='form'>
						<div class="field">
  						<label class="label">Nombre</label>
							<div class="control">
								<input class="input input-name" type="text" placeholder="Name" name='user-name'>
							</div>
							<p class="name-none help is-danger">Campo obligatorio</p>
						</div>
						<div class="field">
  						<label class="label">Apellido</label>
							<div class="control">
								<input class="input input-lastname" name='user-lastname' type="text" placeholder="Lastname">
							</div>
							<p class="lastname-none help is-danger">Campo obligatorio</p>
						</div>

						<div class="field">
							<label class="label">Usuario</label>
							<div class="control has-icons-left has-icons-right">
								<input class="input input-nik" name='user-nik' type="text" placeholder="Name478">
								<span class="icon is-small is-left">
									<i class="fas fa-user"></i>
								</span>
								<span class="icon is-small is-right">
									<i class="fas fa-check"></i>
								</span>
							</div>
							<p class="nik-none help is-danger">Campo obligatorio</p>
						</div>

						<div class="field">
  						<label class="label">Email</label>
  						<div class="control has-icons-left has-icons-right">
								<input class="input input-email" name='user-email' type="email" placeholder="Ej@gmail.com">
								<span class="icon is-small is-left">
									<i class="fas fa-envelope"></i>
								</span>
								<span class="icon is-small is-right">
									<i class="fas fa-exclamation-triangle"></i>
								</span>
							</div>
  						<p class="email-none help is-danger"></p>
						</div>
						<div class="control">
							<button class="button is-link">Continuar</button>
						</div>
					</form>
				</section>
				`;
				// is-danger is-success
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
				p.name-none,
				p.lastname-none,
				p.nik-none,
				p.email-none{
					display:none;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.listener();
			}
		}
	);
}
