import * as mapboxgl from 'mapbox-gl';
import * as MapboxClient from 'mapbox';
import { Dropzone } from 'dropzone';
import { state } from '../../../state';
import { Router } from '@vaadin/router';
const MAPBOX_TOKEN = process.env.MAP_BOX_TOKEN;

const mapClient = new MapboxClient(MAPBOX_TOKEN);
mapboxgl.accessToken = MAPBOX_TOKEN;
let LAT: number = 0;
let LNG: number = 0;
export function initReportInfoPetPage() {
	customElements.define(
		'x-report-pet',
		class Report extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			urlPicturePet: string;
			constructor() {
				super();
				this.render();
			}
			checkFields(fields): boolean {
				let fieldEmpty;
				for (const property in fields) {
					fieldEmpty = fields[property] == '' || 0 ? true : false;
					if (fieldEmpty) {
						return fieldEmpty;
					}
				}
				return fieldEmpty;
			}
			listener() {
				const formEl = this.shadow.querySelector('.form') as Element;
				formEl.addEventListener('submit', (e) => {
					e.preventDefault();
					const target = e.target as any;
					const newPet = {
						name: target.name.value,
						type: target.type.value,
						race: target.race.value,
						url_picture: this.urlPicturePet,
						description: target.description.value,
						location: target.location.value,
						lat: LAT,
						lng: LNG,
					};
					const fieldsIncomplete = this.checkFields(newPet);
					if (!fieldsIncomplete) {
						state.publishedNewPet(newPet).then((res) => {
							state.loadMyData();
						});
					} else {
						this.showNotificationFields();
					}
				});
				const btnCancel = this.shadow.querySelector('.btn-cancel') as Element;
				btnCancel.addEventListener('click', (e) => {
					e.preventDefault();
					Router.go('/home');
				});
			}
			mapSearch() {
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
								console.log(data);
								if (!err) callback(data.features);
							}
						);
					});
				}

				(function () {
					let map = mapboxgl.window;
					map = initMap();
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
			getPicture() {
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
					urlPicture = file.dataURL;
					console.log(file.dataURL.length);
					this.urlPicturePet = urlPicture;

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
						this.urlPicturePet = '';
					});
				});
				const defultButton = this.shadow.querySelector('.dz-button') as Element;
				defultButton.innerHTML = 'Carga una foto aqui';
			}
			deleteNotification() {
				const btnEl = this.shadow.querySelector('.delete') as Element;
				const notificationEl = this.shadow.querySelector(
					'.notification'
				) as Element;
				btnEl.addEventListener('click', (e) => {
					e.preventDefault();
					notificationEl.setAttribute('class', 'none');
				});
			}
			showNotificationFields() {
				const notification = this.shadow.querySelector(
					'.warning-fields'
				) as Element;
				notification.setAttribute('class', 'help is-danger warning-fields');
			}
			render() {
				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<link href="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet"/>
				<x-header item='reports'></x-header>
				<h1 class='title is-1'>Reportar mascota perdida</h1>
				<section class='form-container'>
					<form class='box form'>

						<div class="field">
							<label class='label'>Nombre</label>
							<input class="input is-info" type="text" name='name' placeholder='Ej: Bobby' >
						</div>

						<div class="field">
							<label class='label'>Tipo</label>
							<input class="input is-info" type="text" placeholder='Ej: Perro, Gato' name='type' >
						</div>

						<div class="field">
							<label class='label'>Raza</label>
							<input class="input is-info" type="text" name='race' placeholder='Ej: Labrador'>
						</div>

						<div class="box dropzone">
						</div>
						
						<div class='field'>
							<textarea name='description' class="textarea is-info" placeholder="Descripcion"></textarea>
						</div>

						<div class="field">
							<label class='label'>Barrio o Lugar de referencia</label>
							<input class="input is-info" type="text" name='location' placeholder='Ej: Villa Devoto'/>
						</div>

						<div class='box ubication'>
							<div class="notification is-warning is-light">
								<button class="delete"></button>
								Buscá un punto de <strong>referencia para reportar a tu mascota.</strong> Puede ser una dirección, un barrio o una ciudad.
							</div>
							<input class="input is-info input-map" type="text" placeholder='Ingresar la ubicacion' />
							<div id="map" class='map is-info' style="width:100%"></div>
							<div class='button-map-container'>
								<button class="button is-info btn-map">Buscar Direccion</button>
							</div>
						</div>
						
						<p class="none help is-danger warning-fields">
							<span class="icon has-text-danger"><i class="fas fa-ban"></i></span>
							Completar todos los campos
						</p>
						<button class="button is-success">Reportar como perdido</button>
						<button class="button is-danger btn-cancel">Cancelar</button>

					</form>
				</section>
				
                `;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
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
					width:450px;
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
				.button-map-container{
					width:100%;
					display:flex;
					justify-content:space-between;
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
					display:none;
				}
				.warning-fields{
					font-size: 18px;
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
				`;
				this.shadow.appendChild(styleEl);
				this.listener();
				this.mapSearch();
				this.getPicture();
				this.deleteNotification();
			}
		}
	);
}
