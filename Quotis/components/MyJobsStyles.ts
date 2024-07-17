import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#ffffff',
  },
  activeToggle: {
    backgroundColor: '#007bff',
  },
  toggleButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007bff', // Default text color
  },
  activeToggleText: {
    color: '#ffffff', // Text color for active toggle
  },
  noJobsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  jobItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles;
