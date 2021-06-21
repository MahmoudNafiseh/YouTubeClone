import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements'
import styles from './styles'
import comments from '../../assets/data/comments.json';

type VideoCommentProp= {
    comment:{
        id: string;
        createdAt: string;
        comment: string;
        likes: number;
        dislikes: number;
        replies: number;
        user: {
            name: string;
            image: string;
        }
    }
}


const VideoComment = ({comment}: VideoCommentProp) => {
  return (
    <View style={styles.commentRowView}>
        <Avatar containerStyle={[styles.avatar, {marginVertical: 10,}]} rounded size={27} source={{uri: comment.user.image}} />
        <Text style={[styles.commentRowText, {color: 'white'}]}>{comment.comment}</Text>
    </View>
)
}

export default VideoComment;