import { Router } from '@vaadin/router';
import { state } from '../../../state';
export function initEditMyInformationPage() {
	customElements.define(
		'x-edit-user-info',
		class EditUserInfo extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			listenerChanges() {
				const formEl = this.shadow.querySelector('.container') as Element;
				const inputs = this.shadow.querySelectorAll('.input');
				formEl.addEventListener('submit', (e) => {
					e.preventDefault();
					const target = e.target as any;
					const info = {
						user_name: target.username.value,
						name: target.name.value,
						last_name: target.lastname.value,
						email: target.email.value,
					};
					const complete = this.checkFields(info);
					const confirm = window.confirm('¿Seguro desea modificar sus datos?');
					if (confirm) {
						state.changesMydata(complete).then((r) => {
							state.loadMyData();
						});
					}
				});
				for (const i of inputs) {
					i.addEventListener('input', () => {
						const button = this.shadow.querySelector('.btn-changes') as any;
						button.disabled = false;
					});
				}
				const btnPassEl = this.shadow.querySelector('.btn-pass') as Element;
				btnPassEl.addEventListener('click', (e) => {
					e.preventDefault();
					Router.go('/edit-my-info/verify');
				});
			}
			checkFields(info) {
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
			render() {
				this.shadow.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet">
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
				<main class='main'>
          <x-header item='dates'></x-header>
          <br/>
          <br/>
          <h1 class='title is-1'><i class="fa-solid fa-user"></i>  Mis Datos</h1>
          <form class='container'>
            <section class='box info'>
              <h1 class='title is-4'>
                <spam>Usuario: </spam>
                <input  class="input is-primary" placeholder='${state.data.user.user_name}' name='username'/>
              </h1>
              <h1 class='title is-4'>
                <spam>Nombre: </spam>
                <input  class="input is-primary" placeholder='${state.data.user.name}' name='name'/>
              </h1>
              <h1 class='title is-4'>
                <spam>Apellido: </spam>
                <input class="input is-primary" placeholder='${state.data.user.last_name}' name='lastname'/>
              </h1>
              <h1 class='title is-4'>
                <spam>Email: </spam>
                <input class="input is-primary" placeholder='${state.data.user.email}' name='email' />
              </h1>
              <section class='container-btn'>
                <button class="button is-success btn-changes" disabled>Guardar cambios</button>
                <button class="button is-warning btn-pass" >Cambiar contraseña</button>
              </section>
            </section>
          </form>
        </main>
        `;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
        .main{
          height:100vh;
        }
        .is-1{
          text-align:center;
        }
        .container{
          margin:0 auto;
          display:flex;
          justify-content:center;
        }
        .info{
          margin:0 20px;
          width:600px;
        }
        .text{
          color: #00d1b2;
          font-family: 'Roboto', sans-serif;
          font-size: 24px;
          width:70%;
        }
        .is-4{
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          gap:5px;
        }
        @media(max-width:400px){
          .is-4{
            flex-direction:column;
          }
        }
        .container-btn{
          display:flex;
          justify-content:space-between;
        }
        `;
				this.shadow.appendChild(styleEl);
				this.listenerChanges();
			}
		}
	);
}
