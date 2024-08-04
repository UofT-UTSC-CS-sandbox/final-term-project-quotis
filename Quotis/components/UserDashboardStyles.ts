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
  jobButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  jobButtonText: {
    color: "#fff",
    textAlign: "center",
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
  viewButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  viewButtonText: {
    color: "#fff",
    textAlign: "center",
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
  quoteContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000", // Black border around the quote
  },
  pendingQuote: {
    backgroundColor: "#fff", // White background for pending quotes
  },
  acceptedQuote: {
    backgroundColor: "#cce5ff", // Light blue background for accepted quotes
  },
  declinedQuote: {
    backgroundColor: "#dcdcdc", // Gray background for declined quotes
  },
  quoteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap", // This ensures text wrapping within the container
  },
  quoteText: {
    fontSize: 16,
    flex: 1, // This ensures each text element takes equal space
  },
  quoteDetails: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  postButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  postButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  acceptButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000", // Black border around the button
  },
  declineButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#dc3545",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000", // Black border around the button
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  notificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    flexWrap: "wrap", // Add this line
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  notificationText: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  notificationDate: {
    fontSize: 14,
    color: "#666",
  },
});

export default styles;
