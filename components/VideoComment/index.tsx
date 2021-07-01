import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements'
import styles from './styles'
import {Comment, User} from '../../src/models'
import { DataStore } from 'aws-amplify';
interface VideoCommentProp {
    comment: Comment
}


const VideoComment = ({comment}: VideoCommentProp) => {
    const [user, setUser] = useState <User | null>(null)
    useEffect(() => {
        DataStore.query(User, comment.userID).then(setUser)
    }, [])
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Avatar containerStyle={[styles.avatar]} rounded size={27} source={{uri: comment.User?.image}} />
        <View> 
            <Text style={{color: 'white',}} >{user?.username}</Text>
            <Text style={[styles.commentRowText, {color: 'white', }]}>{comment.comment}</Text>
        </View>
    </View>
)
}

export default VideoComment;