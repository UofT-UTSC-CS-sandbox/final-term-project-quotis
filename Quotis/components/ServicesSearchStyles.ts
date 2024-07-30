import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align filter button to the left
    marginBottom: 20,
    zIndex: 1, // Ensure buttons are displayed in front of other content
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50, // Adjust as needed based on your design
    left: 0, // Align with the left edge of the filter button
    width: 200, // Adjust width as needed
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 2, // Ensure dropdown is above other content
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  noProvidersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  providerItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  providerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
