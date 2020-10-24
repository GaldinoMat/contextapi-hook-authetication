import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {useAuth} from '../../context/auth';

const Dashboard: React.FC = () => {
  //gets the  state
  //when changed, updates all components using said state as a dependency
  const {user, signOut} = useAuth();

  //handles the signOut function from AuthContext
  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Text>
        {user ?.name}
      </Text>
      <Button
        title="Sign Out"
        onPress={() => {
          handleSignOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: "center"},
});

export default Dashboard;
