import { Router } from '@vaadin/router';
export function outButton() {
	customElements.define(
		'x-button-out',
		class OutButton extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			out() {
				const btn = this.shadow.querySelector('.button') as Element;
				btn.addEventListener('click', () => {
					Router.go('/');
				});
			}
			render() {
				this.shadow.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <a class="button is-primary is-outlined">Volver</a>
        `;
				this.out();
			}
		}
	);
}
