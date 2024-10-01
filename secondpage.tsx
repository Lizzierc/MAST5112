// SecondPage.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from './App';

type SecondPageNavigationProp = DrawerNavigationProp<RootStackParamList, 'SecondPage'>;

const defaultDishes = {
  Mains: [
    { name: 'Fish Tacos', description: 'Grilled fish in soft tortillas with fresh salsa and avacado', price: 100 },
    { name: 'Prawn Curry', description: 'spicy prawn curry served with gragrant rice or roti', price: 180 },
    { name: 'Buffalo cauliflower wings', description:'deep-fried unbreaded chicken wings', price: 320}
  ],
  Starters: [
    { name: 'Prawn and sweetcorn fritters', description: 'crispy prawn and sweetcorn fritters bursting with flavor', price: 80 },
    { name: 'Cheese Platter', description: 'Selection of cheeses with crackers, fruits and nuts', price: 120 },
    { name: 'Caprese Skewers', description: 'Fresh mozarella, cherry tomatoes, and basil drizzled with olive oil', price: 70 },
  ],
  Desserts: [
    { name: 'Chese Cake', description: 'Creamy cheese cake on a graham cracker crust, topped with berry compote', price: 60 },
    { name: 'Ice Cream Sundae', description: 'Creamy ice cream topped with chocolate sauce, nuts, and a cherry', price: 50 },
    { name: 'Panna Cotta', description: 'Silky vanilla panna cotta with a fruit coulis', price: 70 },
  ],
};

const SecondPage: React.FC = () => {
  const navigation = useNavigation<SecondPageNavigationProp>();

  const [dishes, setDishes] = useState(defaultDishes);
  const [selectedCourse, setSelectedCourse] = useState<string>('Mains'); // Default selected course

  const handleAddDish = (newDish: { name: string; description: string; price: number; category: string }) => {
    const { name, description, price, category } = newDish;

    setDishes((prevDishes) => ({
      ...prevDishes,
      [category]: [...prevDishes[category], { name, description, price: parseFloat(price) }],
    }));

    Alert.alert('Dish Added', `${name} has been added to ${category}.`);
  };

  const navigateToAddDish = () => {
    navigation.navigate('AddDishPage', {
      onDishAdded: handleAddDish,
    });
  };

  const handleCourseSelect = (course: string) => {
    navigation.navigate('CourseDetailPage', {
      course,
      dishes: dishes[course],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddDish}>
        <Ionicons name="add-circle" size={40} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Explore Our Courses</Text>

      {/* Dropdown for course selection */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => {
            setSelectedCourse(itemValue);
            handleCourseSelect(itemValue);
          }}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          {Object.keys(dishes).map((course, index) => (
            <Picker.Item key={index} label={course} value={course} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SecondPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // Light background color for clean look
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#28A745', // Accent color for the Add button
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Drop shadow for the button
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#28A745', // Background color of dropdown
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4, // Drop shadow for the picker container
  },
  picker: {
    color: '#fff', // Text color inside the picker
    fontSize: 18,
    height: 50,
  },
});

