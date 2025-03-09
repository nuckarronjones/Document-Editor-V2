class UserAuthenticationService {
  constructor() {}
  
  loginState = false;
  sessionToken = "";

  async login(username, password) {
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.loginState = true
        this.sessionToken = data.token;
      })
      .catch(() => this.loginState = false);

    return this.loginState;
  }
}

export const userAuthenticationService = new UserAuthenticationService();
