const imgIcon = require('url:./icons/pet-logo.png');
import { state } from '../state';
export function initPetsNearMe() {
	customElements.define(
		'x-pets-near-me',
		class PetsLosts extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			login;
			pets;
			constructor() {
				super();
				this.login = sessionStorage.getItem('token');
				this.pets = state.data.pets_near_me;
				this.render();
			}
			render() {
				this.shadow.innerHTML = `
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
					${
						!this.login
							? `<header class='header'>
					<div class='icon-container'>
						<img class='icon-image' src='${imgIcon}'/>
					</div>
					<x-button-out></x-button-out>
				</header>`
							: `<x-header></x-header>`
					}
					<h1 class="title is-1">Mascotas perdidas cerca tuyo</h1>
					<h1 class="title is-3 none-title">No se encontraron mascotas cerca de esta ubicacion<h1>
					<section class='container-pets'>
						<div class='pets'>
						${this.pets.map((pet) => {
							return `<x-pet-card
								petId='${pet.id}'
								name='${pet.name}'
								location='${pet.location}'
								description='${pet.description}'
								url='${pet.url_picture}'
								date='${pet.createdAt}'>
								</x-pet-card>`;
						})}
						</div>
					</section>
			`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
			.container-pets{
				margin:5px auto;
				padding:20px;
			}
			.pets{
				display:flex;
				flex-wrap:wrap;
				justify-content: center;
				align-items:center;
			}
			.header{
				display:flex;
				height:80px;
				justify-content: space-between;
				padding: 10px;
			}
			.title{
				padding: 20px;
				text-align:center;
			}
			.icon-image{
				width: 60px;
			}
			.information-container{
				position: absolute;
				left: 0;
				top: 0px;
				right: 0px;
				bottom: 0;
				background-color: #000000bd;
				display: flex;
				flex-direction: column;
				padding: 40px;
				justify-content: center;
			}
			.info-none{
				display:none
			}
			.form-container{
				background-color:white;
				padding:15px;
			}
			.none-title{
				display:none;
			}
			`;
				this.shadow.appendChild(styleEl);
				if (this.pets.length == 0) {
					const titleEl = this.shadow.querySelector('.is-3') as Element;
					const petContainerEl = this.shadow.querySelector(
						'.container-pets'
					) as Element;
					titleEl.setAttribute('class', 'title is-3');
					petContainerEl.setAttribute('class', '');
				}
			}
		}
	);
}
