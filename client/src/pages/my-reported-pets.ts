import { state } from '../state';
export function initMyPetsPublishedPage() {
	customElements.define(
		'x-my-reports',
		class MyReportPets extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			pets = [];
			constructor() {
				super();
				this.pets = state.data.pets;
				this.render();
			}
			render() {
				console.log(this.pets);

				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<main class='main'>
					<x-header item='reports'></x-header>
						<h1 class='title is-1'>Mis mascotas  reportadas</h1>
						<section class='container-pets'>
							${
								this.pets.length == 0
									? `<p class='title is-3'>No se encontraron mascotas publicadas</p>`
									: this.pets.map((pet: any) => {
											return `<x-pet-card data=me url='${pet.url_picture}' petId=${pet.id} name='${pet.name}' location='${pet.location}' description='${pet.description}' ></x-pet-card>  `;
									  })
							}
						</section>
				</main>		
        `;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.main{
					height:100vh;
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
				.container-pets{
					display:flex;
					flex-wrap:wrap;
					justify-content:space-evenly;
				}
				@media(max-width:768px){
					.container-pets{
						justify-content:center;
					}
				}
				`;
				this.shadow.appendChild(styleEl);
			}
		}
	);
}
