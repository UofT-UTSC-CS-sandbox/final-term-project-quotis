import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // Add extra space to avoid content being hidden behind the navbar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  upcomingJob: {
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    marginBottom: 20,
  },
  upcomingJobText: {
    fontSize: 16,
  },
  jobTime: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  post: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
