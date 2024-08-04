import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20, // Space between title and image
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20, // Space between image and banner
  },
  banner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    width: "90%",
  },
  name: {
    padding: 10,
    fontWeight: "bold",
  },
  buttonHolder: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20, // Space between banner and info
  },
  infoTitle: {
    fontWeight: "normal",
  },
  infoCont: {
    fontWeight: "bold",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: 1,
    width: "100%",
    marginVertical: 10,
  },
});
