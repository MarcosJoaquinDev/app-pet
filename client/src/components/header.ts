const iconPet = require('url:../pages/icons/pet-logo.png');
const iconNav = require('url:../pages/icons/nav-burger.png');
import { Router } from '@vaadin/router';
export function initHeaderComponent() {
	customElements.define(
		'x-header',
		class Header extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			listener() {
				const closeItemsBar = this.shadow.querySelector(
					'.fa-circle-xmark'
				) as Element;
				closeItemsBar.addEventListener('click', () => {
					const navBar = this.shadow.querySelector('.menu-nav') as Element;
					navBar.setAttribute('class', 'menu-nav none');
				});
				const buttonBurgerBar = this.shadow.querySelector(
					'.nav-burger'
				) as Element;
				buttonBurgerBar.addEventListener('click', () => {
					const navBar = this.shadow.querySelector('.menu-nav') as Element;
					navBar.setAttribute('class', 'menu-nav');
				});
			}
			routesPages() {
				const r = this.shadow;
				(r.querySelector('.icon-image') as Element).addEventListener(
					'click',
					() => {
						Router.go('/home');
					}
				);
				(r.querySelector('.my-dates') as Element).addEventListener(
					'click',
					() => {
						Router.go('/profile');
					}
				);
				(r.querySelector('.my-pets') as Element).addEventListener(
					'click',
					() => {
						Router.go('/my-pets');
					}
				);
				(r.querySelector('.my-reports') as Element).addEventListener(
					'click',
					() => {
						Router.go('/report');
					}
				);
				(r.querySelector('.close-sesion') as Element).addEventListener(
					'click',
					() => {
						const alertConfirm = window.confirm(
							'¿Esta seguro que desea salir?'
						);
						if (alertConfirm) {
							sessionStorage.removeItem('token');
							Router.go('/');
						}
					}
				);

				//---------------
				(r.querySelector('.response-my-dates') as Element).addEventListener(
					'click',
					() => Router.go('/profile')
				);
				(r.querySelector('.response-my-pets') as Element).addEventListener(
					'click',
					() => Router.go('/my-pets')
				);
				(r.querySelector('.response-my-reports') as Element).addEventListener(
					'click',
					() => Router.go('/report')
				);
				(r.querySelector('.response-close-sesion') as Element).addEventListener(
					'click',
					() => {
						const alertConfirm = window.confirm(
							'¿Esta seguro que desea salir?'
						);
						if (alertConfirm) {
							sessionStorage.removeItem('token');
							Router.go('/');
						}
					}
				);
			}
			render() {
				this.shadow.innerHTML = `
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<header class='header'>
					<div class='icon-container'>
						<img class='icon-image' src='${iconPet}'/>
					</div>

					<div class='nav-burger'>
						<img class='icon-image-nav' src='${iconNav}'/>
					</div>

					<div class="tabs is-small">
						<ul class='nav-items'>
							<li class='dates'> <a class='my-dates '>Mis Datos</a> </li>
							<li class='pets'> <a class='my-pets' >Mis mascotas reportadas</a> </li>
							<li class='reports'> <a class='my-reports'>Reportar mascota</a> </li>
							<li> <a class='close-sesion'>Cerrar sesion</a> </li>
						</ul>
					</div>

					<nav class='menu-nav none'>
						<i class="fa-solid fa-circle-xmark"></i>
						<ul class='menu-nav-items'>
							<li><a class='title is-6 response-my-dates' >Mis Datos</a></li>
							<li><a class='title is-6 response-my-pets' >Mis mascotas reportadas</a></li>
							<li><a class='title is-6 response-my-reports' >Reportar mascota</a></li>
							<li><a class='title is-6 response-close-sesion' >Cerrar sesion</a></li>
						</ul>
					</nav>
				</header>
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.header{
					display:flex;
					min-width: 300px; 
					justify-content: space-between;
					align-items:center;
					padding: 10px;
				}
				.tabs.is-small{
					font-size: .95rem;
				}
				.tabs >ul{
					border:none;
				}
				.tabs ul li a:hover{
					color:#485fc7;
				}
				.icon-image{
					width: 60px;
				}
				.icon-image-nav{
					width:50px;
				}
				.nav-burger{
					display:none;
				}
				@media(max-width:768px){
					.nav-burger{
						display:block;
					}
					.tabs{
						display:none;
					}
				}

				.menu-nav{
					position:absolute;
					width: 300px;
					height:50vh;
					top:1px;
					right:1px;
					background-color:#2c2c2c;
					border:0.5px solid #97EA00;
					z-index:1000;
				}
				.menu-nav-items{
					display:flex;
					flex-direction: column;
					justify-content:space-between;
					height:80%;
					padding-left:40px;
				}
				.title.is-6{
					color: #97EA9F;
					font-size:1.2rem;
				}
				.title.is-6:hover{
					color: #97EA00;
				}
				.fa-circle-xmark{
					font-size:30px;
					margin-top:5px;
					margin-left:5px;
				}
				.fa-circle-xmark:hover{
					color:#97EA00;
				}
				.none{
					display:none;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.listener();
				this.routesPages();
			}
		}
	);
}
