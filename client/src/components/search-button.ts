import { Router } from '@vaadin/router';
import { state } from '../state';

export function searchPetLocationsButton() {
	customElements.define(
		'x-button-search',
		class SearchButton extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			searchLocation() {
				const btn = this.shadow.querySelector('.btn-location') as Element;
				btn.addEventListener('click', () => {
					try {
						this.getPetsNearMe();
					} catch (err) {
						console.log('para avanzar tiene que permitir la localizacion');
					}
				});
			}
			getPetsNearMe() {
				var options = {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				};
				function success(pos) {
					var crd = pos.coords;
					state.findPets(crd.latitude, crd.longitude).then((r) => {
						const pets = r;
						if (pets.response) {
							state.data.pets_near_me = pets.response;
						} else {
							state.data.pets_near_me = [];
						}
						Router.go('/search-pets');
					});
				}
				function error(err) {
					console.warn('ERROR(' + err.code + '): ' + err.message);
				}
				navigator.geolocation.getCurrentPosition(success, error, options);
			}
			render() {
				this.shadow.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <button class="button is-large is-fullwidth is-responsive is-dark btn-location">Dar mi ubicacion</button>
        `;
				this.searchLocation();
			}
		}
	);
}
