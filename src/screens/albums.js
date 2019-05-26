import React, { Component } from "react";
import { Text, Card, CardItem } from "native-base";
import { View, StyleSheet, FlatList } from "react-native";
import { retrieveData } from "../config/storage";
import TabbarHeader from "../components/tabbarheader";

export default class Postagens extends Component {
  state = {
    albums: [],
    users: []
  };
  async componentDidMount() {
    await this.setState({
      albums: JSON.parse(await retrieveData("albums")),
      users: JSON.parse(await retrieveData("users"))
    });
  }

  render() {
    const keyExtractor = (item, index) => `${index} - ${item.toString()}`;
    return (
      <View style={styles.container}>
        <TabbarHeader navigation={this.props.navigation} title={"Albums"} />
        <FlatList
          keyExtractor={keyExtractor}
          data={this.state.albums}
          ListFooterComponent={<View style={styles.footer} />}
          renderItem={({ item }) => (
            <Card>
              <CardItem header>
                <Text>{item.title}</Text>
              </CardItem>
              <CardItem footer>
                <Text style={{ fontSize: 10 }}>
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
