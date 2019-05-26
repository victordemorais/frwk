import React, { Component } from "react";
import {
  Button,
  Text,
  Content,
  ListItem,
  Left,
  Right,
  Icon,
  Body,
  Switch
} from "native-base";
import { View, StyleSheet, FlatList, NetInfo } from "react-native";
import BaseService from "../services";
import { storeData, retrieveData } from "../config/storage";
import TabbarHeader from "../components/tabbarheader";

export default class Home extends Component {
  state = {
    todos: []
  };
  async componentDidMount() {
    await this.setState({
      todos: JSON.parse(await retrieveData("todos"))
    });
  }

  render() {
    const keyExtractor = (item, index) => `${index} - ${item.toString()}`;
    return (
      <View style={styles.container}>
        <TabbarHeader navigation={this.props.navigation} title={"Tarefas"} />
        <FlatList
          keyExtractor={keyExtractor}
          data={this.state.todos}
          ListFooterComponent={<View style={styles.footer} />}
          renderItem={({ item }) => (
            <ListItem style={{ marginLeft: 0 }}>
              <Body>
                <Text>{item.title}</Text>
              </Body>
              {item.completed && (
                <Right>
                  <Icon
                    name="ios-checkmark-circle-outline"
                    style={{ fontSize: 20, color: "#091" }}
                  />
                </Right>
              )}
            </ListItem>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
