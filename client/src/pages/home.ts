const iconPet = require('url:./icons/pet-logo.png');
import { Router } from '@vaadin/router';
export function initHomePage() {
	customElements.define(
		'x-home',
		class Home extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			home: string;
			constructor() {
				super();
				this.render();
			}
			listener() {
				const singUpEl = this.shadow.querySelector('.sign-up') as Element;
				const singInEl = this.shadow.querySelector('.sing-in') as Element;
				singUpEl.addEventListener('click', () => {
					Router.go('/sign-up');
				});
				singInEl.addEventListener('click', () => {
					Router.go('/sign-in-email');
				});
			}
			render() {
				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<main class='main'>
					<header class='header'>
						<div class='icon-container'>
							<img class='icon-image' src='${iconPet}'/>
						</div>
						<div class="buttons">
							<a class="button is-primary sign-up">
								<strong>Registrarte</strong>
							</a>
							<a class="button is-primary is-outlined sing-in">
								Ingresar
							</a>
						</div>
					</header>
					<br/>
					<br/>
					<h1 class="title is-1">Mascotas perdidas cerca tuyo</h1>
					<br/>
					<div class="box">
						<h2 class="subtitle">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</h2>
						<x-button-search></x-button-search>
					</div>
				</main>
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.main{
					height: 100vh;
				}
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
				.box{
					margin: 50px auto;
					max-width:700px;
				}
				@media (max-width: 500px) {
					.box {
						max-width:350px;
					}
				}
				`;
				this.shadow.appendChild(styleEl);
				this.listener();
			}
		}
	);
}
