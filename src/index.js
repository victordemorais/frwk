import React, { Component } from "react";
import { NetInfo } from "react-native";
import Routes from "./Routes";
import { storeData } from "./config/storage";
import BaseService from "./services";

export default class App extends Component {
  componentWillMount() {
    NetInfo.getConnectionInfo().then(async connectionInfo => {
      if (connectionInfo.type !== "none") {
        const base = new BaseService();
        base.get("/todos").then(async todos => {
          await storeData("todos", JSON.stringify(todos));
        });
        base.get("/albums").then(async albums => {
          await storeData("albums", JSON.stringify(albums));
        });
        base.get("/posts").then(async posts => {
          await storeData("posts", JSON.stringify(posts));
        });
        base.get("/users").then(async users => {
          await storeData("users", JSON.stringify(users));
        });
      }
    });
  }
  render() {
    return <Routes />;
  }
}
