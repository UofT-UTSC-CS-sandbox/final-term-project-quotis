import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  input: {
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 10,
  },
});

export default styles;
