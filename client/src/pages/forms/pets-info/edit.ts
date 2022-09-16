import * as mapboxgl from 'mapbox-gl';
import { Dropzone } from 'dropzone';
import { state } from '../../../state';
import * as MapboxClient from 'mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.MAP_BOX_TOKEN;
const mapClient = new MapboxClient(MAPBOX_TOKEN);

let LAT: number;
let LNG: number;
export function initReportEditInfoPage() {
	customElements.define(
		'x-edit-report',
		class EditReport extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			pet;
			petID;
			name: string;
			type: string;
			race: string;
			description: string;
			url_picture: string;
			location: string;
			constructor() {
				super();
				this.petID = state.data.idForChanges;
				this.render();
			}
			enabledReportButton() {
				const button = this.shadow.querySelector('.btn-save') as any;
				button.disabled = false;
			}
			filterFields(info) {
				let incomplete = false;
				let parse = {};
				for (const property in info) {
					incomplete = info[property] ? true : false;
					if (incomplete) {
						const key = property;
						const value = info[property];
						parse[key] = value;
					}
				}
				return parse;
			}
			updateData() {
				const form = this.shadow.querySelector('.form') as Element;
				form.addEventListener('submit', (e) => {
					e.preventDefault();
					const target = e.target as any;
					const petInfo = {
						name: target.name.value,
						type: target.type.value,
						race: target.race.value,
						description: target.description.value,
						url_picture: this.url_picture,
						location: target.location.value,
						lat: LAT,
						lng: LNG,
					};
					const fieldsWithChanges = this.filterFields(petInfo);
					state.updateChangesPet(fieldsWithChanges, this.petID).then((res) => {
						console.log('ok');
					});
				});
				const deleteReport = this.shadow.querySelector(
					'.btn-cancel'
				) as Element;
				deleteReport.addEventListener('click', (e) => {
					e.preventDefault();
					const confirm = window.confirm('¿Estas seguro que desea Eliminar?');
					if (confirm) {
						state.dropAPet(this.petID).then((res) => {
							state.loadMyData();
						});
					}
				});
			}
			listenerPic() {
				const button = this.shadow.querySelector('.btn-picture') as Element;
				button.addEventListener('click', (e) => {
					e.preventDefault();
					this.updatePicture();
				});
			}
			updatePicture() {
				const mePicture = this.shadow.querySelector(
					'.actual-picture'
				) as Element;
				const button = this.shadow.querySelector('.btn-picture') as Element;
				button.setAttribute('class', 'button is-warning btn-picture none');
				const containerPicture = this.shadow.querySelector(
					'.picture-container'
				) as Element;
				mePicture.setAttribute('class', 'actual-picture none');
				containerPicture.setAttribute(
					'class',
					'box dropzone picture-container'
				);
				const container = this.shadow.querySelector('.dropzone');
				let urlPicture = '';
				let myDropzone = new Dropzone(container, {
					url: '/',
					maxFilesize: 1000,
					maxFiles: 1000,
					minSize: '300',
					acceptedFiles: 'image/jpeg, image/png',
					addRemoveLinks: true,
					dictRemoveFile: 'Quitar',
				});
				myDropzone.on('thumbnail', (file) => {
					this.enabledReportButton();
					this.url_picture = file.dataURL;

					const containerDropzone = this.shadow.querySelector(
						'.dropzone'
					) as Element;
					containerDropzone.setAttribute('class', 'box dropzone');

					const divDropzone = this.shadow.querySelector(
						'.dz-message'
					) as Element;
					divDropzone.setAttribute('class', 'dz-default dz-message none');

					const dzRemove = this.shadow.querySelector('.dz-remove') as Element;
					dzRemove.addEventListener('click', () => {
						divDropzone.setAttribute('class', 'dz-default dz-message');
						containerDropzone.setAttribute(
							'class',
							'box dropzone dz-clickable dz-started dz-max-files-reached'
						);
					});
				});
				const defultButton = this.shadow.querySelector('.dz-button') as Element;
				defultButton.innerHTML = 'Carga una foto aqui';
			}
			changeData() {
				const inputs = this.shadow.querySelectorAll('.input');
				const inputLocation = this.shadow.querySelector(
					'.input-location'
				) as Element;
				const boxMapElement = this.shadow.querySelector('.box-map') as Element;
				inputLocation.addEventListener('input', () => {
					boxMapElement.setAttribute('class', 'box ubication box-map');
				});

				const buttonMap = this.shadow.querySelector('.btn-map') as Element;
				buttonMap.addEventListener('click', (e) => {
					e.preventDefault();
					this.enabledReportButton();
				});
				for (const i of inputs) {
					if (
						!i.className.includes('input-map') &&
						!i.className.includes('input-location')
					) {
						i.addEventListener('input', () => {
							this.enabledReportButton();
						});
					}
				}
			}
			mapSearch(initLat: number, initLng: number) {
				const container = this.shadow.querySelector('.map');
				function initMap() {
					mapboxgl.accessToken = MAPBOX_TOKEN;
					return new mapboxgl.Map({
						container: container,
						style: 'mapbox://styles/mapbox/streets-v11',
					});
				}

				const buttonEl = this.shadow.querySelector('.btn-map') as Element;
				const input = this.shadow.querySelector('.input-map') as any;
				function initSearchForm(callback) {
					buttonEl.addEventListener('click', (e) => {
						e.preventDefault();
						const search = input.value;
						mapClient.geocodeForward(
							search,
							{
								country: 'ar',
								autocomplete: true,
								language: 'es',
							},
							function (err, data, res) {
								if (!err) callback(data.features);
							}
						);
					});
				}

				let map = mapboxgl.window;
				map = initMap();
				const initMarker = new mapboxgl.Marker()
					.setLngLat([initLng, initLat])
					.addTo(map);
				map.setCenter([initLng, initLat]);
				map.setZoom(14);

				(function () {
					initSearchForm((results) => {
						const firstResult = results[0];
						const marker = new mapboxgl.Marker()
							.setLngLat(firstResult.geometry.coordinates)
							.addTo(map);
						const [lng, lat] = firstResult.geometry.coordinates;
						LAT = lat;
						LNG = lng;
						const coordinates = firstResult.geometry.coordinates;
						map.setCenter(firstResult.geometry.coordinates);
						map.setZoom(14);
					});
				})();
			}
			async render() {
				const pet: any = state.data.pets.find((p: any) => {
					return p.id === parseInt(this.petID);
				});
				this.shadow.innerHTML = `
				<link defer href="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet"/>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<x-header></x-header>
				<h1 class='title is-1'>Editar Mascota</h1>
				<section class='form-container'>
					<form class='box form'>

						<div class="field">
							<label class='label'>Nombre
							<i class="fa-regular fa-pen-to-square"></i>
							</label>
							<input class="input is-info input-name" type="text" value='${pet.name}' name='name'/>
						</div>

						<div class="field">
							<label class='label'>Tipo
							<i class="fa-regular fa-pen-to-square"></i>
							</label>
							<input class="input is-info" type="text" value='${pet.type}' name='type' >
						</div>

						<div class="field">
							<label class='label'>Raza
							<i class="fa-regular fa-pen-to-square"></i>
							</label>
							<input class="input is-info" type="text" value='${pet.race}' name='race'>
						</div>

						<div class='box picture-container'>
							<img class='actual-picture' src='${pet.url_picture}'/>
							<button class="button is-warning btn-picture">Cambiar foto</button>
						</div>

						<div class='field'>
							<textarea name='description' class="textarea is-info">${pet.description}</textarea>
							<i class="fa-regular fa-pen-to-square"></i>
						</div>

						<div class="field">
							<label class='label'>Barrio o Lugar de referencia</label>
							<input class="input is-info input-location" type="text" name='location' placeholder='${pet.location}'/>
						</div>

						<div class='box ubication box-map none'>
							<input class="input is-info input-map" type="text" placeholder='Cambiar tu ubicacion' />
							<i class="fa-regular fa-pen-to-square"></i>
							<div id="map" class='map is-info' style="width:100%"></div>
							<div class="notification is-primary is-light">
								<button class="delete"></button>
								Buscá un punto de <strong>referencia para reportar a tu mascota.</strong> Puede ser una dirección, un barrio o una ciudad.
							</div>
							<div class='button-map-container'>
								<button class="button is-info btn-map">Buscar Direccion</button>
							</div>
						</div>

						<button class="button is-success btn-save" disabled>Guardar cambios</button>
						<button class="button is-danger btn-cancel">Reportar como encontrado</button>
					</form>
				</section>
				
                `;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.input{
					position: inherit;
				}
				.title{
					text-align:center;
				}
				.ubication{
					display:flex;
					flex-direction:column;
					gap:10px;
					justify-content-center;
					align-items:center;
				}
				.map{
					width:100%;
					height:200px;
					border: solid 0.5px #00009b;
					border-radius: 5px;
				}
				.form-container{
					width:100%;
					padding:20px;
					display:flex;
					justify-content:center;
				}
				.form{
					min-width:350px;
					display:flex;
					flex-direction:column;
					gap:15px;

				}
				.input-map{
					align-self:flex-start;
				}
				@media(min-width:768px){
					.form{
						width:500px;
					}
					.input,
					.textarea{
						width:400px;
					}
				}
				.field{
					padding-left:20px;
					padding-right:20px;
				}
				.marker{
					width:100px;
					border-radius:50%;
					color:red;
				}
				.dz-size,
				.dz-filename,
				.dz-error-message,
				.dz-success-mark,
				.dz-error-mark{
				display: none;
				}
				.dropzone{
					display:flex;
					background: white;
					border-radius: 5px;
					border: 2px dashed rgb(0, 135, 247);
					border-image: none;
					max-width: 300px;
					margin-left: auto;
					margin-right: auto;
				}
				.dz-button{
					height:65px;
					width:100%;
					padding:15px;
					border:none;
					border-radius:4px;
					background-color:#47cf73;
					color:#2c2c2c;
					font-size:24px;
				}
				.none{
					display :none;
				}
				.dropzone{
					padding:0;
				}
				.dz-image>img{
					width:200px;
				}
				.dz-remove{
					margin-left: 20px;
					color: red;
				}
				.fa-bars{
					width:30px;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.changeData();
				this.mapSearch(pet.lat, pet.lng);
				this.listenerPic();
				this.updateData();
			}
		}
	);
}
