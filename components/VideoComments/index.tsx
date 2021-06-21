import React from 'react';
import { View , Text, FlatList} from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import VideoComment from '../VideoComment';
import comments from '../../assets/data/comments.json';

const VideoComments = () => {
  return(
      <View style={{flexGrow: 1}}>
          <BottomSheetFlatList 
          data={comments}
          renderItem={({item}) => <VideoComment comment={item}/>}
          showsHorizontalScrollIndicator={false}
          />

      </View>
  )
}

export default VideoComments;