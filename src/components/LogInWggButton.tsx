import React from "react";
import { Button, View, StyleSheet, Linking } from "react-native";
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
      <Button
        title="Login with Google"
        onPress={() => promptAsync()} // You can still use promptAsync if you want to use expo-auth-session
        disabled={!request}
      />
      {/* Optional: Manually trigger Linking for custom handling */}
      {/* <Button
        title="Open Google Login Link"
        onPress={handleLinking}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default GoogleLoginButton;
