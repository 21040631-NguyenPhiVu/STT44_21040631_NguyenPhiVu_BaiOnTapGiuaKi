import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Screen_01() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleRegister = async () => {
        if (!username || !password) {
            setModalMessage('Please fill all fields!');
            setModalVisible(true);
            return;
        }

        if (password !== rePassword) {
            setModalMessage('Password and Re-Password do not match!');
            setModalVisible(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                setModalMessage(data.message);
                setModalVisible(true);
                setTimeout(() => { navigation.navigate('LoginScreen'); }, 2000);
            }
        } catch (error) {
            console.error(error);
            setModalMessage(error.message);
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/baiTH4/back2.jpg')} style={styles.backgroundImage} />

            <View style={styles.wrapper}>
                <Text style={styles.helloText}>Hello, Register to get started!</Text>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="User Name"
                        placeholderTextColor={'gray'}
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                    <Image source={require('../assets/baiTH4/user.png')} style={styles.icon} />
                </View>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={showPassword ? require('../assets/baiTH4/hide.png') : require('../assets/baiTH4/show.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="Re Password"
                        secureTextEntry={!showRePassword}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        value={rePassword}
                        onChangeText={setRePassword}
                    />
                    <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
                        <Image
                            source={showRePassword ? require('../assets/baiTH4/hide.png') : require('../assets/baiTH4/show.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnCreateAccount} onPress={handleRegister}>
                    <Text style={styles.textCreateAccount}>Register</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.loginText}> Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.modalBtnOK}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.modalBtnText}>OK</Text>
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
    },
    helloText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        marginBottom: 30,
    },
    uploadButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        width: '30%',
        height: '13%',
        alignSelf: 'flex-end',
        marginRight: 40,
        borderWidth: 3,
        borderColor: 'gray',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconCamera: {
        width: 40,
        height: 40,
    },
    uploadedImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 25,
        opacity: 0.9,
        marginBottom: 15,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        width: '80%',
        height: 55,
        paddingLeft: 20,
    },
    icon: {
        width: 30,
        height: 30,
    },
    btnCreateAccount: {
        backgroundColor: '#313341',
        width: '80%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textCreateAccount: {
        color: '#ecf6fc',
        fontWeight: 'bold',
        fontSize: 25,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    alreadyHaveAccountText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'black',
    },
    loginText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'blue',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalWrapper: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    modalBtnOK: {
        backgroundColor: '#313341',
        width: '50%',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBtnText: {
        color: '#ecf6fc',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
