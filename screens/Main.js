import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";
import AppText from "../components/AppText";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { GetChoreItems } from "../services/DataService";

const Main = ({ onPress, navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await GetChoreItems();
      const currentDay = new Date().getDay();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const filteredTasks = fetchedTasks.filter(
        (task) => task.day === days[currentDay]
      );
      setTasks(filteredTasks);
    };

    fetchTasks();
  }, []);

  const renderRightActions = (index) => {
    return (
      <RectButton
        style={styles.swipe}
        onPress={() => handleTaskCompletion(index)}
      >
        <AntDesign name="check" size={50} color="green" />
        <Text style={{ color: "green" }}>Done</Text>
      </RectButton>
    );
  };

  const handleTaskCompletion = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={defaultStyles.options}>
          <TouchableOpacity
            style={{ color: colors.dark }}
            onPress={() => navigation.navigate("Records")}
          >
            <AppText style={{ color: colors.dark }}>Records</AppText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={defaultStyles.options}
          onPress={() => navigation.navigate("Setup")}
        >
          <AppText style={{ color: colors.dark }}>Task SetUp</AppText>
        </TouchableOpacity>
      </View>

      {tasks.map((task, index) => (
        <Swipeable
          key={index}
          renderRightActions={() => renderRightActions(index)}
        >
          <TouchableOpacity onPress={onPress}>
            <View style={styles.task}>
              <AppText>{task.task}</AppText>
            </View>
          </TouchableOpacity>
        </Swipeable>
      ))}

      <View style={defaultStyles.streak}>
        <AppText style={defaultStyles.streakText}>12</AppText>
      </View>
      <AppText style={{color: colors.dark}}>Days in a row</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  task: {
    height: 100,
    width: 300,
    borderRadius: 60,
    backgroundColor: colors.primary,
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  swipe: {
    backgroundColor: colors.secondary,
    width: 100,
    height: 100,
    margin: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Main;
