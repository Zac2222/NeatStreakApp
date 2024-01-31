import React, { useState } from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";
import AppText from "../components/AppText";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddChoreItem } from "../services/DataService";

const Setup = ({ onPress, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [inputTexts, setInputTexts] = useState({
    Monday: { task1: "", task2: "", task3: "" },
    Tuesday: { task1: "", task2: "", task3: "" },
    Wednesday: { task1: "", task2: "", task3: "" },
    Thursday: { task1: "", task2: "", task3: "" },
    Friday: { task1: "", task2: "", task3: "" },
    Saturday: { task1: "", task2: "", task3: "" },
    Sunday: { task1: "", task2: "", task3: "" },
  });
  const [selectedCategory, setSelectedCategory] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });
  const [selectedTimes, setSelectedTimes] = useState({
    Monday: new Date(),
    Tuesday: new Date(),
    Wednesday: new Date(),
    Thursday: new Date(),
    Friday: new Date(),
    Saturday: new Date(),
    Sunday: new Date(),
  });

  const [isPickerVisible, setPickerVisible] = useState(false);

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handlePress = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };
  const handleClose = () => {
    const choreItem = {
      day: selectedDay,
      tasks: inputTexts[selectedDay],
      category: selectedCategory[selectedDay],
      time: selectedTimes[selectedDay],
    };
  
    AddChoreItem(choreItem)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  
    setModalVisible(false);
  };

  const handleCategorySelect = (itemValue) => {
    setSelectedCategory({
      ...selectedCategory,
      [selectedDay]: itemValue,
    });
    setPickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTimePickerVisible(Platform.OS === "ios");
      setSelectedTime(selectedTime);
      setSelectedTimes({
        ...selectedTimes,
        [selectedDay]: selectedTime,
      });
    } else {
      setTimePickerVisible(false);
    }
  };

  const handleTextChange = (text, inputNumber) => {
    setInputTexts({
      ...inputTexts,
      [selectedDay]: {
        ...inputTexts[selectedDay],
        [`task${inputNumber}`]: text,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={defaultStyles.options}
        onPress={() => navigation.navigate("Main")}
      >
        <AppText style={{ color: colors.dark }}>Return</AppText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedDay && (
              <>
                {isPickerVisible ? (
                  <Picker
                    style={styles.picker}
                    selectedValue={selectedCategory[selectedDay]}
                    onValueChange={handleCategorySelect}
                  >
                    <Picker.Item label="Bedroom" value="bedroom" />
                    <Picker.Item label="Kitchen" value="kitchen" />
                    <Picker.Item label="Bathroom" value="bathroom" />
                    <Picker.Item label="Living Room" value="Living Room" />
                    <Picker.Item label="Yard" value="yard" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                ) : (
                  <TouchableOpacity onPress={() => setPickerVisible(true)}>
                    <View style={styles.pickerBtn}>
                      <AppText style={defaultStyles.text}>
                        {selectedCategory[selectedDay] || "Select a category"}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                )}

                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => handleTextChange(text, 1)}
                  value={inputTexts[selectedDay].task1}
                  placeholder="Enter Task"
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => handleTextChange(text, 2)}
                  value={inputTexts[selectedDay].task2}
                  placeholder="Enter Task"
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => handleTextChange(text, 3)}
                  value={inputTexts[selectedDay].task3}
                  placeholder="Enter Task"
                />
                <View style={styles.timeContainer}>
                  <View style={styles.time}>
                    <AppText style={styles.timeText}>Set Time</AppText>
                  </View>
                  <View style={styles.pickerContainer}>
                    {Platform.OS === "ios" && (
                      <DateTimePicker
                        value={selectedTimes[selectedDay]}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                      />
                    )}
                    {Platform.OS !== "ios" && isTimePickerVisible && (
                      <DateTimePicker
                        value={selectedTimes[selectedDay]}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                      />
                    )}
                  </View>
                </View>
              </>
            )}
            <TouchableOpacity onPress={handleClose}>
              <View style={styles.doneBtn}>
                <AppText style={styles.doneText}>Done</AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => (
        <TouchableOpacity key={day} onPress={() => handlePress(day)}>
          <View style={styles.days}>
            <AppText style={{ fontSize: 35 }}>{day}</AppText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  days: {
    height: 80,
    width: 260,
    borderRadius: 60,
    backgroundColor: colors.primary,
    margin: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  doneBtn: {
    height: 70,
    width: 160,
    borderRadius: 60,
    backgroundColor: colors.dark,
    margin: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  doneText: {
    color: "azure",
    fontSize: 35,
    textAlign: "center",
  },
  pickerBtn: {
    height: 80,
    width: 300,
    backgroundColor: colors.primary,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "azure",
    fontSize: 45,
    textAlign: "center",
    marginTop: 40,
  },
  pickerContainer: {
    backgroundColor: colors.primary, 
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "end",
    alignItems: "center",
    marginTop: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: 700,
    width: 350,
  },
  textInput: {
    backgroundColor: colors.primary,
    height: 50,
    borderColor: colors.dark,
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    padding: 10,
  },
  picker: {
    height: 1000,
    width: "100%",
    marginBottom: 10,
  },
});

export default Setup;
