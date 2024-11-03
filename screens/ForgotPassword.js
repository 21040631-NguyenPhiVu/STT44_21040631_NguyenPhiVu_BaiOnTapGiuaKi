import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Screen_01() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleForgotPassword = async () => {
        if (username === '') {
            setModalMessage('Please enter your user name!');
            return setModalVisible(true);
        }

        if (password === '') {
            setModalMessage('Please enter your password!');
            return setModalVisible(true);
        }

        if (rePassword === '') {
            setModalMessage('Please enter your re-password!');
            return setModalVisible(true);
        }

        if (password !== rePassword) {
            setModalMessage('Password and re-password do not match!');
            return setModalVisible(true);
        }

        try {
            const response = await fetch('http://localhost:4000/update', {
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
            } else {
                setModalMessage(data.message);
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/baiTH4/back3.jpg')} style={styles.backgroundImage} />

            <View style={styles.wrapper}>
                <Text style={styles.helloText}>Forgot Password</Text>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder="User Name"
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        value={username}
                        onChangeText={setUserName}
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
                        <Image source={showPassword ? require('../assets/baiTH4/hide.png') : require('../assets/baiTH4/show.png')} style={styles.icon} />
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
                        <Image source={showRePassword ? require('../assets/baiTH4/hide.png') : require('../assets/baiTH4/show.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnCreateAccount}
                    onPress={handleForgotPassword}
                >
                    <Text style={styles.textCreateAccount}>Reset Password</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.modalBtnOK}
                            onPress={() => setModalVisible(false)}
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
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 70,
    },
    rowContainer: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 25,
        opacity: 0.9,
        marginBottom: 15,
        alignItems: 'center'
    },
    input: {
        fontSize: 20,
        width: '80%',
        height: 55,
        paddingLeft: 20,
    },
    btnCreateAccount: {
        backgroundColor: '#024CAA',
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
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
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
        color: 'black',
    },
    modalBtnOK: {
        backgroundColor: '#00bdd6',
        width: '50%',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBtnText: {
        color: '#fff',
        fontSize: 16,
    },
});
