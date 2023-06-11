import React, {useState} from 'react'
import { View, TextInput, StyleSheet, Button, ScrollView } from 'react-native'
import { database } from '../database/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const UserDetailScreen = (props) => {
  const { usuario } = props.route.params;
  const [name, setName] = useState(usuario.name);
  const [email, setEmail] = useState(usuario.email);
  const [phone, setPhone] = useState(usuario.phone);

  const handleNameChange = (text) => {
    setName(text);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  
  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const actualizarUsuario = async () => {
    const userRef = doc(database, 'usuarios', usuario.id);
  
    try {
      await updateDoc(userRef, {
        name: name,
        email: email,
        phone: phone,
      });
      console.log('Usuario actualizado exitosamente');
      props.navigation.navigate('UserList')
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
        <View style= {styles.inputGroup}>
          <TextInput placeholder='Name User' value={name} onChangeText={handleNameChange} />
        </View>
        <View style= {styles.inputGroup}>
          <TextInput placeholder='Email User' value={email} onChangeText={handleEmailChange} />
        </View>
        <View style= {styles.inputGroup}>
          <TextInput placeholder='Phone User' value={phone} onChangeText={handlePhoneChange} />
        </View>
        <View>
          <Button title='Save user' onPress={actualizarUsuario} />
        </View>
    </ScrollView>
  );
};

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
  }
})

export default UserDetailScreen