import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Ensure this package is installed

const AddDishPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Mains'); // Default selected course

  // Get the onDishAdded function from route.params
  const onDishAdded = route.params?.onDishAdded;

  const handleSelect = () => {
    // Validation
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newDish = {
      name: dishName,
      description,
      price: parseFloat(price),
      category: course,
    };

    // Call the onDishAdded callback with the new dish
    if (onDishAdded) {
      onDishAdded(newDish);
    }

    // Displaying the added dish information
    Alert.alert('Dish Added', `Dish Name: ${dishName}\nDescription: ${description}\nPrice: R${parseFloat(price).toFixed(2)}\nCategory: ${course}`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleCancel = () => {
    // Clear the input fields
    setDishName('');
    setDescription('');
    setPrice('');
    // Navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      {/* Course Selection Dropdown */}
      <Text style={styles.label}>Select Course:</Text>
      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelect}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDishPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    width: '48%', // Adjusting to fit two buttons in the row
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});