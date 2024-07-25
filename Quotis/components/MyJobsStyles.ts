import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
  },
  toggleButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007bff",
    backgroundColor: "#ffffff",
  },
  activeToggle: {
    backgroundColor: "#007bff",
  },
  toggleButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#007bff",
  },
  activeToggleText: {
    color: "#ffffff",
  },
  noJobsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  jobItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  completeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  completeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 30,
    width: "110%",
    backgroundColor: "#fff",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
