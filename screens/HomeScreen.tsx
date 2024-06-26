import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceScreen from './ServicersScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();
const initialAppointments = [
    { id: 1, customerName: 'Dilina Chira', time: '10:00 AM', service: 'Haircut 1', price: '$5', mobile: '07123456789', disabled: false },
    { id: 2, customerName: 'Nirmala Shantha', time: '11:30 AM', service: 'Haircut 2', price: '$5', mobile: '07123456789', disabled: false },
    { id: 3, customerName: 'Thilina Hewage', time: '02:00 PM', service: 'Haircut 3', price: '$5', mobile: '07123456789', disabled: false },
];

const HomeTab: React.FC = () => {
    const [appointments, setAppointments] = useState(initialAppointments);

    const confirmAppointment = (id: number) => {
        console.log(`Confirm appointment with id: ${id}`);
    };

    const deleteAppointment = (id: number) => {
        setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
                appointment.id === id ? { ...appointment, disabled: true } : appointment
            )
        );
        console.log(`Delete appointment with id: ${id}`);
    };

    const doneJob = (id: number) => {
        console.log(`Job done for appointment with id: ${id}`);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Barber Shop App</Text>
            <Text>Total Appointments: {appointments.length}</Text>
            {appointments.map(appointment => (
                <Card key={appointment.id} style={{ width: '100%', marginBottom: 20, opacity: appointment.disabled ? 0.5 : 1 }}>
                    <Card.Title
                        title={appointment.customerName}
                        subtitle={`Time: ${appointment.time}`}
                        left={(props) => <Avatar.Icon {...props} icon="calendar-clock" />}
                    />
                    <Card.Content>
                        <Text>Service: {appointment.service}</Text>
                        <Text>Price: {appointment.price}</Text>
                        <Text>Mobile: {appointment.mobile}</Text>
                    </Card.Content>
                    <Card.Actions style={{ justifyContent: 'space-around', marginTop: 10 }}>
                        <Button
                            mode="contained"
                            onPress={() => confirmAppointment(appointment.id)}
                            style={{ backgroundColor: 'green' }}
                            disabled={appointment.disabled}
                        >
                            Confirm
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => deleteAppointment(appointment.id)}
                            style={{ backgroundColor: 'red' }}
                            disabled={appointment.disabled}
                        >
                            Delete
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => doneJob(appointment.id)}
                            style={{ backgroundColor: 'blue' }}
                            disabled={appointment.disabled}
                        >
                            Done
                        </Button>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
};

const HomeScreen: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Services') {
                        iconName = 'scissors-cutting';
                    } else if (route.name === 'Profile') {
                        iconName = 'store';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeTab} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Services" component={ServiceScreen} options={{ tabBarLabel: 'Services' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
