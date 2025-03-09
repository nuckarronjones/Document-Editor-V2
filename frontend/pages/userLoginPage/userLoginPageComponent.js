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

  _loginError = false;

  events = [
    {
      id: "loginButton",
      eventType: "click",
      action: async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        this._loginError = !(await this.userAuthenticationService.login(
          username,
          password
        ));

        this._detectLoginState();
      },
    },
  ];

  _detectLoginState() {
    if (this._loginError === false) {
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
        <div class="container">

            <h1>Flow Document Editor</h1>
            <h3>Enter your login credentials</h3>

            <form class='loginForm' method="post" action="/login">
                <label for="username">
                    Username:
                </label> 

                <input id="username" type="text" name="username" 
                    placeholder="Enter your Username" required>

                <label for="password">
                    Password:
                </label>

                <input id="password" type="password" name="password" 
                    placeholder="Enter your Password" required>

                ${
                  this._loginError
                    ? "<small class='errorText'> Invalid login </small> "
                    : ""
                }

                <div>
                    <button id="loginButton" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        `;
  }
}
