import React, { FC, useEffect, useState } from 'react';
import { Text, FlatList, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/RootStackParamsList';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import firestore from '@react-native-firebase/firestore';
import CustomLoader from '../../../components/globals/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, resetAndNavigate } from '../../../utils/NavigationUtils';
import ScreenName from '../../../constants/ScreenNames';
import GradientButton from '../../../components/globals/GradientButton';
import styles from './syles';

type Props = NativeStackScreenProps<RootStackParamList>;

interface UserData {
  userId: string;
  name: string;
  email: string;
}

const UsersScreen: FC<Props> = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('USERID');
      const loggedInEmail = await AsyncStorage.getItem('EMAIL');

      setCurrentUserId(storedUserId);

      const snapshot = await firestore().collection<UserData>('users').get();
      const allUsers = snapshot.docs.map(doc => doc.data() as UserData);

      const filteredUsers = loggedInEmail
        ? allUsers.filter(u => u.email !== loggedInEmail)
        : allUsers;

      setUsers(filteredUsers);
    } catch (error) {
      console.log('Firestore fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    resetAndNavigate(ScreenName.LoginScreen);
  };

  return (
    <ScreenWrapper>
      {loading ? (
        <CustomLoader visible={loading} />
      ) : (
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Users</Text>

            <View style={styles.logoutButtonWrapper}>
              <GradientButton
                containerStyle={styles.logoutButton}
                onPress={handleLogout}
                title="Logout"
              />
            </View>
          </View>

          {users.length === 0 ? (
            <Text style={styles.noUsersText}>No users found.</Text>
          ) : (
            <FlatList
              data={users}
              keyExtractor={item => item.userId}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigate(ScreenName.ChatScreen, {
                      data: {
                        userId: item.userId,
                        name: item.name,
                        email: item.email,
                      },
                      currentUserId: currentUserId!,
                    })
                  }
                  style={styles.userItem}
                >
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </Pressable>
              )}
            />
          )}
        </View>
      )}
    </ScreenWrapper>
  );
};

export default UsersScreen;
