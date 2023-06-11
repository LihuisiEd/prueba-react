import React, {useState} from 'react'
import { View, Button, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { database } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'

const CreateUserScreen = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const saveNewUser = async () => {
        if (state.name === ''){
            alert('Por favor, ingresa un nombre')
        } else {
            await addDoc(collection(database,'usuarios'), state);
            props.navigation.navigate('UserList')
        }
    }

    const handleChangeText = (name,value) => {
        setState({...state, [name]: value})
    }

    const verLista = () => {
        props.navigation.navigate('UserList');
    };

  return (
    <ScrollView>
        <View style={styles.container}>
            <View style= {styles.inputGroup}>
                <TextInput placeholder='Name User'
                onChangeText={(value) => handleChangeText('name',value)}/>
            </View>
            <View style= {styles.inputGroup}>
                <TextInput placeholder='Email User'
                onChangeText={(value) => handleChangeText('email',value)}/>
            </View>
            <View style= {styles.inputGroup}>
                <TextInput placeholder='Phone User'
                onChangeText={(value) => handleChangeText('phone',value)}/>
            </View>
            <View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={() => saveNewUser()}>
                        <Text style={styles.buttonText}>Save user</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
        <View style={styles.containerButton2}>
            <TouchableOpacity style={styles.button} onPress={verLista}>
                <Text style={styles.buttonText}>Show users</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    containerButton: {
        bottom: 0,
        left: 0,
        right: 0,

        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
    },
    button: {
        backgroundColor: '#2589F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
       buttonText: {
        textAlign:'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerButton2: {
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal:35,
        backgroundColor: '#f2f2f2',
    },
})

export default CreateUserScreen