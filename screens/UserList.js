import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { database } from '../database/firebase'
import { QuerySnapshot, collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import Usuarios from './Usuarios'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserList = (props) => {
  const [users, setUsers] = useState([])

  useEffect( () => {
    const collectionRef = collection(database, 'usuarios')
    const q = query(collectionRef, orderBy('name', 'desc'))
    const unsuscribe = onSnapshot(q, querySnapshot => {
      setUsers(
        querySnapshot.docs.map(doc => ({
          id:doc.id,
          email:doc.data().email,
          name:doc.data().name,
          phone: doc.data().phone
        })
        )
      )
    })
    return unsuscribe
  },[])

  const verDetalleUsuario = (usuario) => {
    props.navigation.navigate('UserDetailScreen', {usuario});
  };

  const eliminarUsuario = (id) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            try {
              await deleteDoc(doc(database, 'usuarios', id));
              console.log('Usuario eliminado correctamente');
            } catch (error) {
              console.error('Error al eliminar el usuario:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.lista}>

        {users.map((usuario) => (
          
          <View key={usuario.id} style={styles.itemContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{usuario.name}</Text>
              <Text style={styles.email}>{usuario.email}</Text>
              <Text style={styles.phone}>{usuario.phone}</Text>
            </View>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button2} onPress={() => verDetalleUsuario(usuario)}>
                <MaterialCommunityIcons name="eye" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => eliminarUsuario(usuario.id)}>
                <MaterialCommunityIcons name="trash-can" size={20} color="white" />
              </TouchableOpacity>
              
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.2,

  },
  detailsContainer: {
    flex: 1,
  },
  buttonsContainer: {
    marginLeft: 10,
  },
  lista: {
    padding: 16,
  },
  button: {
    backgroundColor: '#FF5050',
    borderRadius: 20,
    padding: 10,
    margin:2,
    marginHorizontal: 5,
  },
  button2: {
    backgroundColor: '#268AF7',
    borderRadius: 20,
    padding: 10,
    margin:2,
    marginHorizontal: 5,
  },
  name: {
    fontSize:20,
    color: '#333333'
  },
  email: {
    fontWeight: 'bold',
    color: '#333333'
  },
  phone: {
    color: '#333333'
  }

});

export default UserList