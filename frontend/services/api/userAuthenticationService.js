class UserAuthenticationService {
  constructor() {}

  authenticatedUser = {
    username: "",
    jwtToken: ""
  }

  async login(username, password) {
    let loginState;
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
        loginState = true;
        this._setUserName(username);
        this._setJwtToken(data.token);
      })
      .catch(() => loginState = false);

    return loginState;
  }

  _setJwtToken(token){
    this.authenticatedUser.jwtToken = token;
  }

  _setUserName(username){
    this.authenticatedUser.username = username;
  }

  getUser(){
    return this.authenticatedUser;
  }

}

export const userAuthenticationService = new UserAuthenticationService();
