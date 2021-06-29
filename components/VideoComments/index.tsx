import React, {useState} from 'react';
import { View , Text, TextInput, Pressable } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import VideoComment from '../VideoComment';
import { Ionicons } from '@expo/vector-icons';
import { DataStore, Auth } from 'aws-amplify';
import { Comment, User } from '../../src/models';

interface VideoCommentProp {
  comments: Comment[]
  videoID: string
}
const VideoComments = ({comments, videoID}: VideoCommentProp) => {
  const [newComment, setNewComment] = useState('')
  const createComment= async() => {
    const userInfo = await Auth.currentAuthenticatedUser()
    const userID= userInfo.attributes.sub
    console.log(await Auth.currentAuthenticatedUser())
    const user = (await DataStore.query(User)).find(user => user.
      userID === userID)
    if(!user) console.error("no user found")
    await DataStore.save(
      new Comment({
        comment: newComment, 
        likes: 0, 
        dislikes: 0,
        replies: 0,
        videoID,
        userID: user.id
      })
    )
    setNewComment('')
    console.log(await Auth.currentAuthenticatedUser())

  }
  return(
      <View style={{flexGrow: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TextInput placeholder="Enter new comment.."
        value = {newComment}
        onChangeText={setNewComment}
        placeholderTextColor='grey'
        
        style={{width: '90%',backgroundColor: '#272727', padding: 10, color: 'white'}}
         />
         <Pressable onPress={createComment}><Ionicons name="send-sharp" size={24} color="white" /></Pressable>
         </View>
          <BottomSheetFlatList 
          data={comments}
          renderItem={({item}) => <VideoComment comment={item}/>}
          showsHorizontalScrollIndicator={false}
          />

      </View>
  )
}

export default VideoComments;