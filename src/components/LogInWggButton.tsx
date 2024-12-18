import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../firebase/LoginWgg"; // Ensure you have configured Firebase in this file

interface GoogleLoginButtonProps {
  onSuccess?: (user: any) => void; // Callback when login is successful
  onError?: (error: any) => void; // Callback when login fails
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "399164063066-j1d1dco4e3tvhof233dirma7ebfjhb03.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          onSuccess?.(userCredential.user); // Trigger success callback
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          onError?.(error); // Trigger error callback
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed, // Hiệu ứng nhấn
        ]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Log in with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    borderRadius: 5,
    width:"43%",
    alignSelf: "center",
  },
  buttonPressed: {
    backgroundColor: "transparent", // Màu nền khi nhấn nút
  },
  buttonText: {
    color: "#248A50", 
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GoogleLoginButton;
