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
  profilePicContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    padding: 20,
    margin: 10,
    borderRadius: 20,
    width: "90%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
  submit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: "auto",
    marginLeft: "auto",
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
    fontWeight: "bold",
    marginBottom: 4,
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
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
});
