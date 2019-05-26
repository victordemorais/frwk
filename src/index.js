import React, { Component } from "react";
import { NetInfo } from "react-native";
import Routes from "./Routes";

export default class App extends Component {
  componentDidMount() {
    NetInfo.getConnectionInfo().then(async connectionInfo => {
      console.log(await retrieveData("posts"));
      if (connectionInfo.type !== "none") {
        const base = new BaseService();
        base.get("/todos").then(async todos => {
          this.setState({ todos });
          await storeData("todos", JSON.stringify(todos));
        });
        base.get("/albums").then(async albums => {
          this.setState({ albums });
          await storeData("albums", JSON.stringify(albums));
        });
        base.get("/posts").then(async posts => {
          this.setState({ posts });
          await storeData("posts", JSON.stringify(posts));
        });
        base.get("/users").then(async users => {
          this.setState({ users });
          await storeData("users", JSON.stringify(users));
        });
      }
    });
  }
  render() {
    return <Routes />;
  }
}
