import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 100, // Make the description box height longer
  },
  dateTimePickerContainer: {
    alignItems: "center", // Center the DateTimePicker
    marginBottom: 20,
  },
  alternativeSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  alternativeSwitchText: {
    marginRight: 10, // Add right margin between text and switch
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, // Add black border around the submit button
    borderColor: "#000",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default styles;
