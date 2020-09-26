import config from "../config";
import TokenService from "./token-service";

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    .then((res) =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then((res) => {
      TokenService.saveAuthToken(res.authToken, res.userId);
      return res;
    });
  },
};

export default AuthApiService;
