import { eventListenerService } from "../../services/eventService.js";
import { userAuthenticationService } from "../../services/api/userAuthenticationService.js";
import { ComponentRefreshService } from "../../services/componentRefreshService.js";
import { routingService } from "../../services/routingService.js";

export class UserRegistrationPageComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.userAuthenticationService = userAuthenticationService;
    this.routingService = routingService;

    this.componentRefreshService = new ComponentRefreshService(
      this.eventListenerService
    );
  }

  errorMessage = "";

  registrationSuccessful = false;

  events = [
    {
      id: "registrationButton",
      eventType: "click",
      action: async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        this._manageRegistrationState(username, password);
      },
    }
  ];

  _manageRegistrationState(username, password) {
    this.userAuthenticationService
      .register(username, password)
      .then((response) => {

        if (response.success) {
          this.errorMessage = "";
          this.registrationSuccessful = true;

        } else {
          this.errorMessage = response.message;
        }

        this.componentRefreshService.refreshComponent(this.render.bind(this));
      });
  }

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
        <div class="loginPage">

          <img class="main-logo-corner" src="assets/images/flow-logo.png" />

          <div class="loginContainer">

          ${
            this.registrationSuccessful
              ? 
              `
                <div class="successContainer">
                  <h1>Success!</h1>
                  
                  <i class="bi bi-check-circle"></i>

                  <a href="/login" >Return to login</a>
                </div>
              `
              : 
                `
                  <h1 class="label">Flow Editor</h1>
                  <h3>Sign Up</h3>

                  <form class="loginForm" method="post" action="/login">
                    <label class="label" for="username"> Username: </label>

                    <input
                      class="w-100"
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your Username"
                      required
                    />

                    <label class="label" for="password"> Password: </label>

                    <input
                      class="w-100"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      required
                    />

                    ${
                      this.errorMessage
                        ? `<small class='errorText'>${this.errorMessage}</small>`
                        : ""
                    }              

                    <button class="w-100 btnPrimary" id="registrationButton" type="submit">
                      Register
                    </button>

                  </form>
                `
          }
          </div>

        </div>
        `;
  }
}
