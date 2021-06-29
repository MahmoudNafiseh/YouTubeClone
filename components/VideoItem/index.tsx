import React from 'react'
import { View, Text, Image , Pressable} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styles from './styles'
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { Video } from '../../src/models';
interface VideoItem {
    video: Video
}
const VideoItem = ({video}) => {

    const vidMinutes = Math.floor(video.duration / 60)
    const vidSeconds = video.duration % 60
    const navigation = useNavigation()
    const openVideoPage = () => {
        navigation.navigate("VideoScreen", {id: video.id})
    }
    let viewString = video.views.toString()
    if(video.views > 1000000) {
        viewString = (video.views / 1000000).toFixed(1) + 'M'
    } else if (video.views > 1000){
        viewString =(video.views / 1000).toFixed(1).slice(0,(video.views / 1000).toFixed(1).toString().indexOf('.')) + 'K'
    }
    return ( 
        <Pressable onPress={openVideoPage} style={styles.videoCard}>
            <View>
                <Image style={styles.thumbnail} source={{uri: video.thumbnail}} />
                <View style = {styles.timeContainer}>
                    <Text style= {styles.timeText}> {vidMinutes}:{vidSeconds.toFixed(2).slice(0,2)} </Text>
                </View>
            </View>

            <View style={styles.titleRow}>
                <View style={styles.imageCol}>
                    <Avatar rounded size={38} source={{uri: video.User?.image}} />
                </View>
                <View style={styles.textContainer}>
                    <Text style= {styles.title}>
                        {video?.title}
                    </Text>
                    <Text style= {styles.subtitle}>
                        {video.User?.username} · {viewString} · {video?.createdAt}
                    </Text>
                </View>
                <View style={styles.threeDotsContainer}>
                    <Entypo style={styles.threeDots}name="dots-three-vertical" size={12} color="black" />
                </View>
            </View>
        </Pressable>
    )
}



export default VideoItem;