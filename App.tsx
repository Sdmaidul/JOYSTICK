// App.js
import React from 'react';
import { View } from 'react-native';
import JoystickComponent from './JoystickComponent'; // Ensure this import path is correct
import axios from 'axios';

const App = () => {
 const handleDirectionChange = (x: any, y: any) => {
    // Handle joystick direction change
    console.log('Direction changed:', x, y);
    // Send the direction data to your drone control API
    sendDirectionToDroneAPI(x, y);
 };

 // Function to send direction to a drone control API
 const sendDirectionToDroneAPI = async (x: any, y: any) => {
    try {
        const response = await axios.post('http://YOUR_API_HOST:YOUR_API_PORT/direction', { x, y });
        console.log('API response:', response.data);
    } catch (error) {
        console.error('Error sending direction to API:', error);
    }
 };

 return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <JoystickComponent onDirectionChange={handleDirectionChange} />
    </View>
 );
};

export default App;

