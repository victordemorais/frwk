import React, { Component } from "react";
import { Text, ListItem, Right, Icon, Body, Card, CardItem } from "native-base";
import { View, StyleSheet, FlatList, NetInfo } from "react-native";
import BaseService from "../services";
import { storeData, retrieveData } from "../config/storage";
import TabbarHeader from "../components/tabbarheader";

export default class Albums extends Component {
  state = {
    posts: [],
    users: []
  };
  async componentDidMount() {
    await this.setState({
      posts: JSON.parse(await retrieveData("posts")),
      users: JSON.parse(await retrieveData("users"))
    });
  }

  render() {
    const keyExtractor = (item, index) => `${index} - ${item.toString()}`;
    return (
      <View style={styles.container}>
        <TabbarHeader navigation={this.props.navigation} title={"Postagens"} />
        <FlatList
          keyExtractor={keyExtractor}
          data={this.state.posts}
          ListFooterComponent={<View style={styles.footer} />}
          renderItem={({ item }) => (
            <Card>
              <CardItem header>
                <Text>{item.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{item.body}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>
                  Posted By{" "}
                  {this.state.users.map(user => {
                    if (user.id === item.userId) return user.name;
                  })}
                </Text>
              </CardItem>
            </Card>
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
