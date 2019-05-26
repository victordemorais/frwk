// @flow

import { AsyncStorage } from "react-native";

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(`@frwk:${key}`, value);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
};

export const retrieveData = async (key: string): any => {
  try {
    console.log(key);

    return await AsyncStorage.getItem(`@frwk:${key}`);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeData = async (key: string): any => {
  try {
    await AsyncStorage.removeItem(`@frwk:${key}`);
    return true;
  } catch (error) {
    return false;
  }
};
