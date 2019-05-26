import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "./screens/home";
import Postagens from "./screens/postagens";
import Albums from "./screens/albums";

const MainRoutes = {
  Home: {
    screen: Home
  },
  Postagens: {
    screen: Postagens
  },
  Albums: {
    screen: Albums
  }
};

const DrawerNavigator = createDrawerNavigator(MainRoutes);

const Routes = createAppContainer(DrawerNavigator);

export default Routes;
