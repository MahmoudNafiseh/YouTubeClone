import React from 'react'
import { 
    View,
    Text, 
    Image, 
    SafeAreaView, 
    ScrollView, 
    FlatList
} from 'react-native'
import { Avatar } from 'react-native-elements';
import { Audio, Video } from 'expo-av';
import video from '../../assets/data/video.json'
import videos from '../../assets/data/videos.json'
import VideoItem from '../../components/VideoItem'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import VideoPlayer from '../../components/VideoPlayer';

const VideoScreen = () => {

    let viewString = video.views.toString()
    if(video.views > 1000000) {
        viewString = (video.views / 1000000).toFixed(1) + 'M'
    } else if (video.views > 1000){
        viewString =(video.views / 1000).toFixed(1).slice(0,(video.views / 1000).toFixed(1).toString().indexOf('.')) + 'K'
    }

    let likeString = video.likes.toString()
    if(video.likes > 1000000) {
        likeString = (video.likes / 1000000).toFixed(1) + 'M'
    } else if (video.likes > 1000){
        likeString =(video.likes / 1000).toFixed(1).slice(0,(video.likes / 1000).toFixed(1).toString().indexOf('.')) + 'K'
    }
    let dislikeString = video.dislikes.toString()
    if(video.dislikes > 1000000) {
        dislikeString = (video.dislikes / 1000000).toFixed(1) + 'M'
    } else if (video.dislikes > 1000){
        dislikeString =(video.dislikes / 1000).toFixed(1).slice(0,(video.dislikes / 1000).toFixed(1).toString().indexOf('.')) + 'K'
    }


    return (
        <View>



            <View style={styles.videoInfoContainer}>
                    <Text style= {styles.title}>
                        {video.title}
                    </Text>
                    <Text style= {styles.subtitle}>
                        {viewString} views · {video.createdAt}
                    </Text>
            </View>

            <View style={styles.actionListContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode={'never'} contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.actionListItem}>
                        <AntDesign name="like2" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>{likeString}</Text>

                    </View>

                    <View style={styles.actionListItem}>
                        <AntDesign name="dislike2" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>{dislikeString}</Text>

                    </View>

                    <View style={styles.actionListItem}>
                        <FontAwesome5 name="share" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>Share</Text>
                    </View>

                    <View style={styles.actionListItem}>
                        <AntDesign name="download" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>Download</Text>

                    </View>

                    <View style={styles.actionListItem}>
                        <MaterialIcons name="playlist-add" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>Save</Text>
                    </View>
                    <View style={styles.actionListItem}>
                        <MaterialIcons name="playlist-add" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>Live Chat</Text>
                    </View>
                    <View style={styles.actionListItem}>
                        <MaterialIcons name="playlist-add" size={20} color="lightgrey" />
                        <Text style={styles.actionText}>Save</Text>
                    </View>
                </ScrollView>
            </View>


            <View style={[styles.channelRowView, {alignItems:'center'}]}>
                    <Avatar containerStyle={styles.avatar} rounded size={32} source={{uri: video.user.image}} />

                    <View style={{marginHorizontal: 5, flexGrow: 1}}>
                        <Text style={[styles.channelRowTextName, {color: 'white'}]}>{video.user.name}</Text>
                        <Text style={[styles.channelRowTextSubs, {color: 'grey'}]}>{video.user.subscribers} subscribers</Text>
                    </View>

                <Text style={[styles.channelRowTextSub, {fontWeight: 'bold', padding: 10}]}>SUBSCRIBE</Text>
                
            </View>
            
            <View style={{paddingLeft:10, flex:1, borderBottomColor:'#333333', borderBottomWidth:7  }}>
                <Text style={{color: 'white', paddingBottom: 10}}>Comments 333</Text>
                <View style={styles.commentRowView}>
                    <Avatar containerStyle={[styles.avatar, {marginVertical: 10,}]} rounded size={27} source={{uri: video.user.image}} />
                    <Text style={[styles.commentRowText, {color: 'white'}]}>Testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</Text>
                </View>
            </View>


        </View>
    )
}

const fullVideoScreen = () => {
    return (
        <SafeAreaView style={{backgroundColor: '#272727', flex: 1}}>
            <VideoPlayer videoUri={video.videoUrl} thumbnailUri={video.thumbnail}/>

            <FlatList 
            data={videos}
            renderItem={({item}) => <VideoItem video={item} /> }
            ListHeaderComponent={VideoScreen}
            />
        </SafeAreaView>
    )
}
export default fullVideoScreen;
