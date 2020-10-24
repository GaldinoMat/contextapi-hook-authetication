import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../context/auth';

const SignIn: React.FC = () => {
  //gets the  state
  //when changed, updates all components using said state as a dependency
  const {signed, signIn} = useAuth();

  //handles the signIn function from AuthContext
  async function handleSignIn() {
    signIn();
  }

  return (
    <View style={styles.container}>
      <Button
        title="Sign In"
        onPress={() => {
          handleSignIn();
        }}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: "center"},
});
