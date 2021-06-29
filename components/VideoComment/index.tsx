import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements'
import styles from './styles'
import {Comment} from '../../src/models'
interface VideoCommentProp {
    comment: Comment
}


const VideoComment = ({comment}: VideoCommentProp) => {
  return (
    <View style={styles.commentRowView}>
        <Avatar containerStyle={[styles.avatar, {marginVertical: 10,}]} rounded size={27} source={{uri: comment.User?.image}} />
        <Text style={[styles.commentRowText, {color: 'white'}]}>{comment.comment}</Text>
    </View>
)
}

export default VideoComment;