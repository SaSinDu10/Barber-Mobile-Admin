import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DataTable, TextInput, Modal, Portal, Provider } from 'react-native-paper';

interface Service {
    key: number;
    service: string;
    time: string;
    price: string;
}

const ServiceScreen: React.FC = () => {
    const [items, setItems] = useState<Service[]>([
        { key: 1, service: 'Hair cut 1', time: '20min', price: '$2' },
        { key: 2, service: 'Hair cut 2', time: '30min', price: '$3' },
        { key: 3, service: 'Hair cut 3', time: '10min', price: '$1' },
        { key: 4, service: 'Hair cut 4', time: '40min', price: '$5' },
    ]);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [newService, setNewService] = useState({ service: '', time: '', price: '' });

    const addItem = () => {
        const newItem = { key: items.length + 1, ...newService };
        setItems([...items, newItem]);
        setAddModalVisible(false);
        setNewService({ service: '', time: '', price: '' });
    };

    const updateItem = () => {
        if (selectedService) {
            const updatedItems = items.map(item =>
                item.key === selectedService.key ? selectedService : item
            );
            setItems(updatedItems);
            setUpdateModalVisible(false);
            setSelectedService(null);
        }
    };

    const openAddModal = () => setAddModalVisible(true);
    const closeAddModal = () => setAddModalVisible(false);
    const openUpdateModal = (item: Service) => {
        setSelectedService(item);
        setUpdateModalVisible(true);
    };
    const closeUpdateModal = () => setUpdateModalVisible(false);

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.title}>Service Screen</Text>
                <Button title="Add Service" onPress={openAddModal} />
                <DataTable style={styles.table}>
                    <DataTable.Header>
                        <DataTable.Title>Service</DataTable.Title>
                        <DataTable.Title>Time</DataTable.Title>
                        <DataTable.Title>Price</DataTable.Title>
                    </DataTable.Header>
                    {items.map((item) => (
                        <DataTable.Row key={item.key} onPress={() => openUpdateModal(item)}>
                            <DataTable.Cell>{item.service}</DataTable.Cell>
                            <DataTable.Cell>{item.time}</DataTable.Cell>
                            <DataTable.Cell>{item.price}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
                <Portal>
                    <Modal
                        visible={addModalVisible}
                        onDismiss={closeAddModal}
                        contentContainerStyle={styles.modalContainer}
                    >
                        <Text style={styles.modalTitle}>Add New Service</Text>
                        <TextInput
                            label="Service Name"
                            value={newService.service}
                            onChangeText={(text) => setNewService({ ...newService, service: text })}
                            style={styles.input}
                        />
                        <TextInput
                            label="Time"
                            value={newService.time}
                            onChangeText={(text) => setNewService({ ...newService, time: text })}
                            style={styles.input}
                        />
                        <TextInput
                            label="Price"
                            value={newService.price}
                            onChangeText={(text) => setNewService({ ...newService, price: text })}
                            style={styles.input}
                        />
                        <Button title="Submit" onPress={addItem} />
                    </Modal>
                    {selectedService && (
                        <Modal
                            visible={updateModalVisible}
                            onDismiss={closeUpdateModal}
                            contentContainerStyle={styles.modalContainer}
                        >
                            <Text style={styles.modalTitle}>Update Service</Text>
                            <TextInput
                                label="Service Name"
                                value={selectedService.service}
                                onChangeText={(text) => setSelectedService({ ...selectedService, service: text })}
                                style={styles.input}
                            />
                            <TextInput
                                label="Time"
                                value={selectedService.time}
                                onChangeText={(text) => setSelectedService({ ...selectedService, time: text })}
                                style={styles.input}
                            />
                            <TextInput
                                label="Price"
                                value={selectedService.price}
                                onChangeText={(text) => setSelectedService({ ...selectedService, price: text })}
                                style={styles.input}
                            />
                            <Button title="Update" onPress={updateItem} />
                        </Modal>
                    )}
                </Portal>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    table: {
        width: '100%',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 10,
    },
});

export default ServiceScreen;
