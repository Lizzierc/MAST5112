import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

type AddMenuPageProps = {
  route: any;
  navigation: any;
  addDishToCourse: (courseName: string, dish: { name: string; description: string; price: number }) => void;
};

const AddMenuPage: React.FC<AddMenuPageProps> = ({ route, navigation }) => {
  const { selectedDishes, totalPrice, course } = route.params;

  // Handle adding selected dishes to the menu
  const handleConfirmMenu = () => {
    // Perform some action with selected dishes (e.g., saving them)
    navigation.goBack(); // Navigate back after confirmation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Menu for {course}</Text>
      <FlatList
        data={selectedDishes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishDescription}>{item.description}</Text>
            <Text style={styles.dishPrice}>Price: R{item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total Price: R{totalPrice.toFixed(2)}</Text>
      <Button title="Confirm Menu" onPress={handleConfirmMenu} />
    </View>
  );
};

export default AddMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  dishContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    backgroundColor: '#1a1a1a',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  dishDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  dishPrice: {
    fontSize: 16,
    color: '#808080',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
