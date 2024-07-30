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
    fontFamily: "Serif", // Modern and professional font
    color: "#333", // Darker color for better contrast
  },
  postContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1, // Add this line
    borderColor: "black", // Add this line
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postTime: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  actualPostTime: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  sendQuoteButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  sendQuoteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default styles;
