import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function UpdateProfile() {
  const navigation = useNavigation();
  const [oldUsername, setOldUsername] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setOldUsername(storedUsername);
        setUsername(storedUsername);
      }
    };
    getUsername();
  }, []);

  const handleUpdateProfile = async () => {
    if (!username || !password || !rePassword) {
      setModalMessage("Please enter username and password");
      return setModalVisible(true);
    }
    if (password !== rePassword) {
      setModalMessage("Passwords do not match");
      return setModalVisible(true);
    }
    try {
      const response = await fetch("http://localhost:4000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldUsername, username, password }),
      });
      const data = await response.json();
      setModalMessage(data.message);
      setModalVisible(true);
      if (response.status === 200) {
        await AsyncStorage.setItem('username', username);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate("Profile", { username });
        }, 2000);
      }
    } catch (error) {
      setModalMessage("Network error. Please try again.");
      setModalVisible(true);
    }
  };

  return (
    <View>
      <AntDesign
        style={{ margin: 10 }}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Update Profile</Text>
        <Image
          source={require("../assets/baiTH4/boy.png")}
          style={styles.image}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.textField}>Username</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Text style={styles.textField}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Text style={styles.textField}>Re password</Text>
          <TextInput
            placeholder="Re Password"
            secureTextEntry
            value={rePassword}
            onChangeText={setRePassword}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
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
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 20,
  },
  textField: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#00bdd6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalWrapper: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#00bdd6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});