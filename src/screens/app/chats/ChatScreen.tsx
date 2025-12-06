import React, { useCallback, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/RootStackParamsList';
import ScreenName from '../../../constants/ScreenNames';
import styles from './styles';

type ChatScreenRouteProp = RouteProp<RootStackParamList, ScreenName.ChatScreen>;

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { data: otherUser, currentUserId } = route.params;
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const chatId =
    currentUserId < otherUser.userId
      ? `${currentUserId}_${otherUser.userId}`
      : `${otherUser.userId}_${currentUserId}`;

  const tabbarHeight = 50;
  const keyboardTopToolbarHeight = Platform.select({ ios: 44, default: 0 });
  const keyboardVerticalOffset =
    insets.bottom + tabbarHeight + keyboardTopToolbarHeight;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMessages: IMessage[] = querySnapshot.docs.map(doc => {
          const data = doc.data();

          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : new Date(),
            user: {
              _id: data.sentBy,
              name: data.userName ?? '',
            },
          };
        });

        setMessages(allMessages);
      });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!newMessages.length) return;

      const msg = newMessages[0];

      const myMessage = {
        text: msg.text,
        createdAt: firestore.FieldValue.serverTimestamp(),
        sentBy: currentUserId,
        sentTo: otherUser.userId,
        userName: otherUser.name,
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: msg._id,
            text: msg.text,
            createdAt: new Date(),
            user: { _id: currentUserId },
          },
        ]),
      );

      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(myMessage);
    },
    [chatId, currentUserId, otherUser.userId, otherUser.name],
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={msgs => onSend(msgs)}
        user={{ _id: currentUserId }}
        keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: styles.rightBubble,
              left: styles.leftBubble,
            }}
            textStyle={{
              right: styles.rightText,
              left: styles.leftText,
            }}
          />
        )}
      />
    </View>
  );
};

export default ChatScreen;
