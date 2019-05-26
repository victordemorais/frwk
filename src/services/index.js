// @flow

import { API_URL } from "../config/constants";

const POST_METHOD = "POST";
const PUT_METHOD = "PUT";
const DELETE_METHOD = "DELETE";

export default class BaseService {
  get(path: string) {
    console.log("GET", `${API_URL}${path}`);
    return fetch(`${API_URL}${path}`)
      .then(this.checkUnauthorized)
      .then(response => {
        return response.json();
      });
  }

  post(path: string, form: Object) {
    return fetch(`${API_URL}${path}`, this.body(POST_METHOD, form))
      .then(this.checkStatus)
      .then(response => {
        if (
          path.includes("accept") ||
          path.includes("conclude") ||
          path.includes("cancel") ||
          path.includes("signup") ||
          response.status === 422
        ) {
          return response.text();
        }

        return response.json();
      });
  }

  put(path: string, form: Object) {
    return fetch(`${API_URL}${path}`, this.body(PUT_METHOD, form))
      .then(this.checkStatus)
      .then(response => {
        return response.json();
      });
  }

  del(path: string, form: Object) {
    return fetch(`${API_URL}${path}`, this.body(DELETE_METHOD, form))
      .then(this.checkStatus)
      .then(response => {
        return response.json();
      });
  }

  body(method: string, form: Object) {
    return {
      method,
      body: JSON.stringify(form)
    };
  }

  checkUnauthorized = (response: Object) => {
    if (response.status === 401) {
      throw new Error(response.status);
    } else {
      return response;
    }
  };

  checkStatus = (response: Object) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error: Object = new Error(response.status);
      error.response = response.json();
      throw error;
    }
  };
}
