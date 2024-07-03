import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  container: {
    width: "100%",
    alignItems: "center",
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  loginText: {
    color: "#333",
  },
  loginLinkText: {
    color: "#007BFF",
  },
  picker: {
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  registerText: {
    color: "#333",
  },
  registerLinkText: {
    color: "#007BFF",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  halfInput: {
    width: "48%",
  },
});

export default styles;
