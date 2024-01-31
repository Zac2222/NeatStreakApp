import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[style, styles.content]}>
        {children}
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});

export default Screen;
