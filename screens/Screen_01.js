import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
export default function Screen_01() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image source={require('../assets/baiTH4/back5.jpg')} style={styles.backgroundImage} />

                <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')} style={styles.btnCreateAccount}>
                    <Text style={styles.textCreateAccount}>Create an account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.btnLogin}>
                    <Text style={styles.textLogin}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        position: 'relative',
        width: '100%',
        alignItems: 'center'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.8,
    },
    btnCreateAccount: {
        position: 'absolute',
        bottom: 170,
        backgroundColor: '#00bdd6',
        width: 270,
        padding: 15,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCreateAccount: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25
    },
    btnLogin: {
        position: 'absolute',
        bottom: 90,
        backgroundColor: '#ecf6fc',
        width: 270,
        padding: 15,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogin: {
        color: '#313341',
        fontWeight: 'bold',
        fontSize: 25
    },
});
