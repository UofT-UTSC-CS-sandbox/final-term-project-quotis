import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000', // Black color for the header text
  },
  button: {
    backgroundColor: '#fff', // White background for the buttons
    borderColor: '#555', // Darker black border color for the buttons
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#007bff', // Blue text for button labels
    fontSize: 18,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', // White background for the navbar
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Light border color for the top of the navbar
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    color: '#007bff', // Blue text for the navbar items
  },
});

export default styles;
