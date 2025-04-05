import { eventListenerService } from "../../services/eventService.js";
import { routingService } from "../../services/routingService.js";
import { userAuthenticationService } from "../../services/api/userAuthenticationService.js";
import { ComponentRefreshService } from "../../services/componentRefreshService.js";

export class UserLoginPageComponent {
  constructor() {
    this.eventListenerService = eventListenerService;
    this.routingService = routingService;
    this.userAuthenticationService = userAuthenticationService;

    this.componentRefreshService = new ComponentRefreshService(
      this.eventListenerService
    );
  }

  loginError = false;

  events = [
    {
      id: "loginButton",
      eventType: "click",
      action: async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        this.userAuthenticationService
          .login(username, password)
          .then((loginStatus) => {
            if (loginStatus.loginError) {
              this.loginError = true;
            } else {
              this.loginError = false;
            }
            this._detectLoginState();
          });
      },
    },
  ];

  _detectLoginState() {
    if (this.loginError === false) {
      //Login successful, change route to user documents
      this.routingService.setRoute("/allDocuments");
    } else {
      //Refresh component to ensure we now show error
      this.componentRefreshService.refreshComponent(this.render.bind(this));
    }
  }

  _pushEvents() {
    this.eventListenerService.events.push(...this.events);
  }

  render() {
    this._pushEvents();

    return `
        <div class="loginPage">
          <div class="loginContainer">
            <h1 class="label">Flow Editor</h1>
            <h3>Enter your login credentials</h3>

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
                this.loginError
                  ? "<small class='errorText'> The username or password you entered is incorrect </small> "
                  : ""
              }

              <button class="w-100 btnPrimary" id="loginButton" type="submit">
                Log In
              </button>

            </form>
          </div>
        </div>

        `;
  }
}
