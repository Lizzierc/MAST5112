import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

type CourseDetailProps = {
  route: {
    params: {
      course: string;
      dishes: { name: string; description: string; price: number }[];
    };
  };
  navigation: any;
};

const CourseDetailPage: React.FC<CourseDetailProps> = ({ route, navigation }) => {
  const { course, dishes } = route.params;
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]); // Manage selected dishes

  // Toggle dish selection
  const handleSelectDish = (dishName: string) => {
    setSelectedDishes((prevSelected) =>
      prevSelected.includes(dishName)
        ? prevSelected.filter((name) => name !== dishName) // Deselect
        : [...prevSelected, dishName] // Select
    );
  };

  // Calculate total price for selected dishes
  const totalPrice = dishes
    .filter((dish) => selectedDishes.includes(dish.name))
    .reduce((sum, dish) => sum + dish.price, 0);

  // Handle navigation to AddMenuPage and pass selected dishes
  const handleAddToMenu = () => {
    const selectedDishObjects = dishes.filter((dish) => selectedDishes.includes(dish.name));
    navigation.navigate('AddMenuPage', { selectedDishes: selectedDishObjects, totalPrice, course });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course}</Text>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const isSelected = selectedDishes.includes(item.name);
          return (
            <TouchableOpacity
              style={[
                styles.dishContainer,
                isSelected && styles.selectedDishContainer, // Highlight if selected
              ]}
              onPress={() => handleSelectDish(item.name)}
            >
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDescription}>{item.description}</Text>
              <Text style={styles.dishPrice}>Price: R{item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.totalPrice}>Total Price: R{totalPrice.toFixed(2)}</Text>

      {selectedDishes.length > 0 && (
        <Button title="Add to Menu" onPress={handleAddToMenu} />
      )}

      {dishes.length === 0 && <Text style={styles.noDishesText}>No dishes added yet.</Text>}
    </View>
  );
};

export default CourseDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Title color
  },
  dishContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#808080', // Gray border color
    borderRadius: 5,
    backgroundColor: '#1a1a1a', // Darker background for dishes
  },
  selectedDishContainer: {
    backgroundColor: '#333', // Change background color when selected
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Dish name color
  },
  dishDescription: {
    fontSize: 14,
    color: '#ccc', // Lighter gray for description
  },
  dishPrice: {
    fontSize: 16,
    color: '#808080', // Gray for price
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff', // Total price color
  },
  noDishesText: {
    color: '#fff', // Color for no dishes message
    textAlign: 'center',
    marginTop: 20,
  },
});
