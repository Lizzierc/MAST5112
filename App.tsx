import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SecondPage from './secondpage';         // Ensure this path is correct
import AddDishPage from './adddish';           // Ensure this path is correct
import CourseDetailPage from './course details'; // Ensure this path is correct
import AddMenuPage from './addmenu';           // Ensure this path is correct

// Define the stack's route names and their associated parameters
type RootStackParamList = {
  SecondPage: undefined;
  AddDishPage: undefined;
  CourseDetailPage: { dishName: string; description: string; price: number };
  AddMenuPage: { course: string };
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [courses, setCourses] = useState([
    {
      course: 'Starters',
      dishes: [{ name: 'Salad', description: 'Fresh green salad', price: 30 }],
    },
    {
      course: 'Main Course',
      dishes: [{ name: 'Steak', description: 'Juicy steak with veggies', price: 150 }],
    },
  ]);

  // Function to add a new dish to a specific course
  const addDishToCourse = (courseName: string, dish: { name: string; description: string; price: number }) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.course === courseName
          ? { ...course, dishes: [...course.dishes, dish] }
          : course
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SecondPage">
        <Stack.Screen 
          name="SecondPage" 
          component={SecondPage} 
          options={{ title: 'Select Course' }} 
        />
        <Stack.Screen 
          name="AddDishPage" 
          component={AddDishPage} 
          options={{ title: 'Add Dish' }} 
        />
        <Stack.Screen 
          name="CourseDetailPage" 
          component={CourseDetailPage} 
          options={{ title: 'Course Details' }} 
        />
        <Stack.Screen
          name="AddMenuPage"
          options={{ title: 'Add Menu' }}
        >
          {(props) => <AddMenuPage {...props} addDishToCourse={addDishToCourse} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
