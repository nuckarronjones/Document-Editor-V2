class UserAuthenticationService {
  constructor() {}

  authenticatedUser = {
    username: "",
    jwtToken: "",
  };

  login(username, password) {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          this._setUserName(username);
          this._setJwtToken(data.token);

          return { loginError: false };
        } else {
          return { loginError: true };
        }
      })
      .catch(() => {
        return { loginError: true };
      });
  }

  _setJwtToken(token) {
    this.authenticatedUser.jwtToken = token;
  }

  _setUserName(username) {
    this.authenticatedUser.username = username;
  }

  getUser() {
    return this.authenticatedUser;
  }
}

export const userAuthenticationService = new UserAuthenticationService();
