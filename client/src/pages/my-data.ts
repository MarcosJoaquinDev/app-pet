import { state } from '../state';
export function initMyInformationPage() {
	customElements.define(
		'x-user-info',
		class UserInfo extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
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
          <div class='container'>
            <section class='box info'>
              <h1 class='title is-4'>
                <spam>Usuario: </spam>
                <spam class='text' >${state.data.user.user_name}</spam>
              </h1>
              <h1 class='title is-4'>
                <spam>Nombre: </spam>
                <spam class='text' >${state.data.user.name}</spam>
              </h1>
              <h1 class='title is-4'>
                <spam>Apellido: </spam>
                <spam class='text' >${state.data.user.last_name}</spam>
              </h1>
              <h1 class='title is-4'>
                <spam>Email: </spam>
                <spam class='text' >${state.data.user.email}</spam>
              </h1>
            </section>
          </div>
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
          justify-content:space-between;
        }
        @media(max-width:400px){
          .is-4{
            flex-direction:column;
          }
        }
        `;
				this.shadow.appendChild(styleEl);
			}
		}
	);
}
