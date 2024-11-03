import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Screen_01() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            setModalMessage('Please enter username and password');
            return setModalVisible(true);
        }

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('avatar', data.avatar);
                setModalMessage(data.message);
                setModalVisible(true);
                setTimeout(() => { navigation.navigate('Screen_02'); }, 2000);
            } else {
                setModalMessage(data.message);
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image source={require('../assets/baiTH4/back.jpg')} style={styles.backgroundImage} />

            {/* Content wrapper */}
            <View style={styles.wrapper}>
                <Text style={styles.welcomeText}>Welcome back!, Glad to see you, Again!</Text>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="Enter User name"
                        placeholderTextColor="gray"
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="Enter Password"
                        secureTextEntry
                        placeholderTextColor="gray"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity style={styles.forgot}
                    onPress={() => navigation.navigate('Forgot')}
                >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnLogin}
                    onPress={handleLogin}
                >
                    <Text style={styles.textLogin}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={styles.signUpText}> Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.8,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    welcomeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        marginBottom: 30,
    },
    rowContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 25,
        opacity: 0.8,
        marginBottom: 15,
    },
    input: {
        fontSize: 20,
        width: '80%',
        height: 55,
        paddingLeft: 20,
    },
    forgot: {
        alignSelf: 'flex-end',
        marginRight: 25,
        marginTop: 10,
    },
    forgotPasswordText: {
        color: '#FF204E',
        fontSize: 20,
        fontWeight: '400',
    },
    btnLogin: {
        backgroundColor: '#00bdd6',
        width: '90%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        opacity: 0.8,
    },
    textLogin: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    dontHaveAccountText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'black',
    },
    signUpText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'blue',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        backgroundColor: '#00bdd6',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginTop: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
