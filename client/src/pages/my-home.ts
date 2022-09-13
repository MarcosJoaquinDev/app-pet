const iconPet = require('url:./icons/pet-logo.png');
import { Router } from '@vaadin/router';
export function initMyHomePage() {
	customElements.define(
		'x-my-home',
		class MyHome extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			home: string;
			constructor() {
				super();
				this.render();
			}
			render() {
				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<main class='main'>
					<x-header item=''></x-header>
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
					height:100vh;
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
			}
		}
	);
}
