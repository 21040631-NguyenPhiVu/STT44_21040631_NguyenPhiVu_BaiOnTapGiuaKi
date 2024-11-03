import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Modal,
} from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();
    const [username, setUsername] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        if (route.params?.username) {
            setUsername(route.params.username);
        }
    }, [route.params?.username]);

    const handleScroll = ({ nativeEvent }) => {
        const isCloseToBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
        setShowDeleteButton(isCloseToBottom);
        setShowLogoutButton(isCloseToBottom);
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('http://localhost:4000/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            const data = await response.json();
            setModalMessage(data.message);
            setConfirmDelete(false);
            setModalVisible(true);
            if (response.status === 200) {
                await AsyncStorage.removeItem('username');
            }
        } catch (error) {
            setModalMessage('Network error. Please try again.');
            setConfirmDelete(false);
            setModalVisible(true);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('username');
        navigation.navigate('LoginScreen');
    };

    const confirmLogoutAction = async () => {
        await AsyncStorage.removeItem('username');
        navigation.navigate('LoginScreen');
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <AntDesign
                style={{ marginLeft: 10 }}
                name="arrowleft"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.headerProfile}>
                    <Image source={require('../assets/baiTH4/personicon.png')} style={styles.avatarIcon} />
                    <View style={styles.headerRight}>
                        <Text style={styles.userName}>{username}</Text>
                        <TouchableOpacity style={styles.btnEdit}
                            onPress={() => navigation.navigate('UpdateProfile')}
                        >
                            <Text style={styles.textEdit}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.recentContainer}>
                    <Text style={styles.recentText}>Recent Destinations</Text>
                    <Image source={require('../assets/baiTH4/history.png')} style={styles.iconHistory} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.destinationContainer}
                >
                    <Image source={require('../assets/baiTH4/photo1.png')} style={styles.itemDestination} />
                    <Image source={require('../assets/baiTH4/photo2.png')} style={[styles.itemDestination, styles.item2]} />
                    <Image source={require('../assets/baiTH4/photo3.png')} style={styles.itemDestination} />
                </ScrollView>

                <Text style={styles.recommendText}>Recommended Location</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recommendContainer}
                >
                    <Image source={require('../assets/baiTH4/ThaiLand.jpg')} style={styles.itemrecommend} />
                    <Image source={require('../assets/baiTH4/Maldives.jpg')} style={[styles.itemrecommend, styles.items2]} />
                    <Image source={require('../assets/baiTH4/London.jpg')} style={styles.itemrecommend} />
                </ScrollView>

                <Text style={styles.recommendText}>Recommended Post</Text>
                <View style={styles.recommendPostContainer}>
                    <Image source={require('../assets/baiTH4/beaches.jpg')} style={styles.itemPost} />
                    <View style={styles.overlay}>
                        <Text style={styles.postText}>Top 10 Beaches In Thailand</Text>
                    </View>
                </View>
                <View style={styles.recommendPostContainer}>
                    <Image source={require('../assets/baiTH4/woman-mountain-peak.jpg')} style={styles.itemPost} />
                    <View style={styles.overlay}>
                        <Text style={styles.postText}>Europe's Most Amazing Views</Text>
                    </View>
                </View>
            </ScrollView>

            {showDeleteButton && (
                <TouchableOpacity style={styles.btnDelete}
                    onPress={() => setConfirmDelete(true)}
                >
                    <Text style={styles.deleteText}>Delete Account</Text>
                </TouchableOpacity>
            )}

            {showLogoutButton && (
                <TouchableOpacity style={styles.btnLogout}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmDelete}
                onRequestClose={() => setConfirmDelete(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.confirmBox}>
                        <Text style={styles.confirmText}>Are you sure you want to delete your account?</Text>
                        <View style={styles.confirmButtons}>
                            <TouchableOpacity style={styles.btnCancel}
                                onPress={() => setConfirmDelete(false)}
                            >
                                <Text style={styles.confirmTextCancel}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnConfirm}
                                onPress={handleDeleteAccount}
                            >
                                <Text style={styles.confirmTextDelete}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmLogout}
                onRequestClose={() => setConfirmLogout(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.confirmBox}>
                        <Text style={styles.confirmText}>Do you want to logout?</Text>
                        <View style={styles.confirmButtons}>
                            <TouchableOpacity style={styles.btnCancel}
                                onPress={() => setConfirmLogout(false)}
                            >
                                <Text style={styles.confirmTextCancel}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnConfirm}
                                onPress={confirmLogoutAction} // Confirm logout
                            >
                                <Text style={styles.confirmTextDelete}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.messageBox}>
                        <Text style={styles.messageText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.btnClose}
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.confirmTextDelete}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        width: '100%',
        height: 600
    },
    avatarIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    headerProfile: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    headerRight: {
        paddingLeft: 10,
        paddingTop: 7,
    },
    userName: {
        fontWeight: '600',
        fontSize: 25,
    },
    btnEdit: {
        marginTop: 10,
        backgroundColor: '#3592e7',
        width: 110,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    textEdit: {
        color: '#fff',
        fontSize: 18,
    },
    recentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    recentText: {
        fontWeight: '600',
        fontSize: 23,
        marginRight: 10,
    },
    iconHistory: {
        width: 30,
        height: 30,
    },
    destinationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginVertical: 10,
    },
    itemDestination: {
        width: 200,
        height: 150,
        borderRadius: 22,
    },
    item2: {
        marginHorizontal: 10,
    },
    recommendText: {
        paddingHorizontal: 20,
        fontWeight: '600',
        fontSize: 23,
        marginVertical: 10,
    },
    recommendContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginVertical: 10,
    },
    itemrecommend: {
        width: 200,
        height: 150,
        borderRadius: 22,
    },
    items2: {
        marginHorizontal: 10,
    },
    btnDelete: {
        marginHorizontal: 20,
        backgroundColor: 'red',
        padding: 15,
        alignItems: 'center',
        borderRadius: 12,
    },
    recommendPostContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemPost: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        opacity: 0.8,
    },
    postText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 35,
        textAlign: 'center',
    },
    deleteText: {
        fontSize: 23,
        color: '#fff',
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmBox: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    confirmButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    btnCancel: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 8,
    },
    btnConfirm: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    confirmTextCancel: {
        color: '#333',
        fontWeight: '600',
    },
    confirmTextDelete: {
        color: '#fff',
        fontWeight: '600',
    },
    messageBox: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    btnClose: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    btnLogout: {
        marginHorizontal: 20,
        backgroundColor: 'blue',
        padding: 15,
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 10,
    },
    logoutText: {
        fontSize: 23,
        color: '#fff',
        fontWeight: '600',
    },
});