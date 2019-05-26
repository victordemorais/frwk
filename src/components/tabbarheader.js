import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Button, Left, Right, Body, Icon } from "native-base";
import { DrawerActions } from "react-navigation-drawer";

const TabbarHeader = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <Left>
        <Button
          transparent
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Icon name="menu" style={{ color: "#fff" }} />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#7409ff",
    flexDirection: "row"
  }
});
export default TabbarHeader;
