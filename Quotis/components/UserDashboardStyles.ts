import { CurrentRenderContext } from "@react-navigation/native";
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
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20, // Added margin
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Center buttons
    marginBottom: 20, // Added margin
  },
  upcomingJob: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000", // Black border around the upcoming job
    marginTop: 10, // Added margin
  },

  upcomingJobText: {
    fontSize: 16,
  },
  jobTime: {
    fontSize: 16,
    fontWeight: "bold",
  },
  jobPostTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  jobPostTitleHighlight: {
    fontSize: 16,
    textDecorationLine: "underline", // Underline the job title text
  },
  jobButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignSelf: "center", // Center the button
  },
  jobButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  noUpcomingJobsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  postContainer: {
    flexDirection: "column", // Ensure posts are in a column
    alignItems: "center", // Center posts horizontally
    width: "100%",
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  post: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    width: "96%", // Ensure posts take full width
    borderWidth: 1,
    borderColor: "#000", // Add black border around the post
    position: "relative", // For absolute positioning of delete button
    marginTop: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  viewButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: "50%",
    margin: "auto",
    borderColor: "black",
    borderWidth: 1,
  },
  viewButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  deletePostButton: {
    position: "absolute",
    top: -5,
    right: -5,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deletePostButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch", // Ensure button takes full width
    marginTop: 10, // Add margin top for spacing
    width: "80%",
    margin: "auto",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
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
    position: "relative", // Add this line for absolute positioning of the delete button
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
  deleteQuoteButton: {
    position: "absolute",
    top: -18,
    right: -12,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteQuoteButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  postDate: {
    fontSize: 15,
    color: "black",
    marginBottom: 10, // Adjust the margin as needed
  },
});

export default styles;
