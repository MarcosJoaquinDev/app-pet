import { state } from '../../../state';
export function initFormSecurityData() {
	customElements.define(
		'x-form-security',
		class FormSecurity extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			listener() {
				const inputTopEl = this.shadow.querySelector('.input-top') as any;
				const inputBtmEl = this.shadow.querySelector('.input-bottom') as any;
				const button = this.shadow.querySelector('.button') as any;
				inputBtmEl.addEventListener('input', () => {
					if (inputBtmEl.value === inputTopEl.value) {
						button.disabled = false;
					} else {
						button.disabled = true;
					}
				});
				const elementForm = this.shadow.querySelector('.form') as Element;
				elementForm.addEventListener('submit', async (e) => {
					e.preventDefault();
					const target = e.target as any;
					const values = {
						email: target.email.value,
						password: target.pass.value,
						newPassword: target.newpass.value,
					};
					const checkEmail = await state.initAuthEmail(values.email);
					if (checkEmail) {
						const checkPass = await state.loadMyToken(
							values.email,
							values.password
						);
						checkPass
							? this.changesData(values.newPassword)
							: this.warningPassword();
					} else {
						this.warningEmail();
					}
				});
			}
			warningEmail() {
				const input = this.shadow.querySelector('.input-email') as Element;
				const message = this.shadow.querySelector(
					'.msg-warning-email'
				) as Element;
				input.setAttribute('class', 'input input-email is-danger');
				message.setAttribute('class', 'msg-warning-email help is-danger');
			}
			warningPassword() {
				const input = this.shadow.querySelector('.input-pass') as Element;
				const message = this.shadow.querySelector(
					'.msg-warning-pass'
				) as Element;
				input.setAttribute('class', 'input input-pass is-danger');
				message.setAttribute('class', 'msg-warning-pass help is-danger');
			}
			async changesData(newPass: string) {
				const showMessage = window.confirm(
					'¿Esta seguro que desea cambiar la sus datos?'
				);
				if (showMessage) {
					await state.changeMyPass({ password: newPass });
				}
			}
			render() {
				this.shadow.innerHTML = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet">
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <x-header item='dates'></x-header>
			<main class='main'>	
        <form class='box form'>

          <div class="field">
          <h2 class="title is-3">Verificar tus Datos</h2>
            <p class="control has-icons-left has-icons-right">
              <input class="input input-email" type="email" placeholder="Email" name='email'>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
            <p class="msg-warning-email help is-danger none">Este email es invalido</p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input class="input input-pass" type="password" placeholder="Contraseña actual" name='pass'>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
            <p class="msg-warning-pass help is-danger none">Esta constraseña es invalida</p>
          </div>

          <h2 class="title is-3">Cambiar Contraseña</h2>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input input-top" type="password" placeholder="Nueva contraseña" name='newpass'>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input class="input input-bottom" type="password" placeholder="Repite la nueva contraseña">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <p class="control">
            <button class="button is-link" disabled>
              Guardar cambios
            </button>
          </p>

        </form>
      </main>
      `;
				const style = document.createElement('style');
				style.innerHTML = `
      .main{
        width:100%;
        display: flex;
        justify-content: center;
      }
      .form{
        width: 500px;
        margin: 20px;
      } 
      .none{
        display:none;
      } 
      `;
				this.shadow.appendChild(style);
				this.listener();
			}
		}
	);
}
