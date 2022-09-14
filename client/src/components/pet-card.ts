import { Router } from '@vaadin/router';
import { state } from '../state';
export function initCardPet() {
	customElements.define(
		'x-pet-card',
		class PetCard extends HTMLElement {
			petId;
			name: string;
			race: string;
			location: string;
			description: string;
			url: string;
			date;
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
				this.vericationData();
				this.petId = this.getAttribute('petId');
			}
			listener() {
				const linkInfoEl = this.shadow.querySelector('.info-report') as Element;
				const cancelEl = this.shadow.querySelector('.info-cancel') as Element;
				const formSendEl = this.shadow.querySelector(
					'.form-information'
				) as Element;
				const element = this.shadow.querySelector(
					'.information-container'
				) as Element;
				linkInfoEl.addEventListener('click', (e) => {
					e.preventDefault();
					element.setAttribute('class', 'information-container');
				});
				cancelEl.addEventListener('click', (e) => {
					e.preventDefault();
					element.setAttribute('class', 'information-container info-none');
				});
				formSendEl.addEventListener('submit', (e) => {
					e.preventDefault();
					const target = e.target as any;
					const name = target.name.value;
					const phone = target.phone.value;
					const description = target.description.value;
					state.sendInfo(this.petId, name, phone, description).then((res) => {
						Router.go('/');
					});
				});
			}
			editInfo() {
				const linkInfoEl = this.shadow.querySelector('.info-report') as Element;
				linkInfoEl.addEventListener('click', (e) => {
					e.preventDefault();
					console.log('edita mascota');
					state.data.idForChanges = this.petId;
					Router.go('/edit');
				});
			}
			vericationData() {
				if (this.getAttribute('data') == 'me') {
					const linkInfo = this.shadow.querySelector('.info-link') as Element;
					linkInfo.innerHTML = 'Editar';
					this.editInfo();
				} else {
					this.listener();
					const linkInfo = this.shadow.querySelector('.info-link') as Element;
					linkInfo.innerHTML = 'Reportar Informacion';
					const iElement = this.shadow.querySelector(
						'.fa-pen-to-square'
					) as Element;
					iElement.setAttribute('class', 'fa-regular fa-pen-to-square none');
				}
			}
			render() {
				this.name = this.getAttribute('name') as string;
				this.location = this.getAttribute('location') as string;
				this.description = this.getAttribute('description') as string;
				this.url = this.getAttribute('url') as string;
				let date = new Date(this.getAttribute('date') as string);
				this.date = date.toLocaleDateString(undefined, {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});

				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<div class="card">
							<div class="card-image">
								<figure class="image is-4by3">
									<img src='${this.url}' alt="Placeholder image" class='img-pet'/>
								</figure>
							</div>
					<div class="card-content">
							<div class="media">
								<div class="media-left">
									<figure class="image is-48x48">
										<img src=${this.url} alt="Placeholder image">
									</figure>
								</div>
								<div class="media-content">
									<p class="title is-4">${this.name}</p>
									<p class="subtitle is-6">${this.location}</p>
								</div>
							</div>

							<div class="content">
								<p>${this.description}</p>
								<br>
								<a href='/' class='info-report'> <spam class='info-link'></spam> <i class="fa-regular fa-pen-to-square"></i></a>
								<br>
								<time datetime="2016-1-1">${this.date}</time>
								</div>
					</div>
				</div>
				<section class='information-container info-none'>
						<div class='form-container'>
							<h2 class="subtitle">Reportar info de ${this.name}</h2>
							<form class='form-information'>
								<div class="field">
								<label class="label">Tu nombre</label>
									<div class="control">
										<input class="input" type="text" name='name'>
									</div>
								</div>
							<div class="field">
								<label class="label">Tu Telefono</label>
								<div class="control">
									<input class="input" type="text" name='phone'>
								</div>
							</div>
							<div class="field">
								<label class="label">¿Donde Lo Viste?</label>
								<div class="control">
									<textarea class="textarea" name='description'></textarea>
								</div>
							</div>
							<div class="field is-grouped">
								<div class="control">
									<button class="button is-link info-send">Enviar</button>
								</div>
								<div class="control">
									<button class="button is-link is-light info-cancel" >Cancelar</button>
								</div>
							</div>
						</form>
					</div>
				</section>

				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.card{
					width: 350px;
					margin:20px;
					border-radius: 5%;
					max-height: 500px;
				}
				.none{
					display:none;
				}
				.information-container{
					position: fixed;
					z-index:1000;
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
			}
		}
	);
}
