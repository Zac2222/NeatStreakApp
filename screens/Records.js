import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import defaultStyles from "../config/defaultStyles";
import AppText from "../components/AppText";

const Records = ({ navigation }) => {
  const categories = [
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Living Room",
    "Yard",
    "Other",
  ];

  // Example data "" needed for space
  const streakData = {
    Bedroom: 12,
    Kitchen: 8,
    Bathroom: 15,
    "Living Room": 10,
    Yard: 5,
    Other: 20,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={defaultStyles.options}
        onPress={() => navigation.navigate("Main")}>
        <AppText style={{ color: "black" }}>Return</AppText>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((category, index) => (
          <View key={index} style={styles.circleContainer}>
            <View style={defaultStyles.streak}>
              <AppText style={defaultStyles.streakText}>{streakData[category]}</AppText>
            </View>
            <AppText style={styles.categoryText}>{category}</AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  circleContainer: {
    alignItems: "center",
    margin: 10,
  },
  categoryText: {
    fontSize: 18,
    color: "black",
  },
});

export default Records;

