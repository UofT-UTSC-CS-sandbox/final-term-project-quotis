import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    zIndex: 1,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  distanceButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 2,
  },
  distanceDropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 50, // Adjust left to place it correctly beside the filter dropdown
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 2,
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
  distanceContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  distanceText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
