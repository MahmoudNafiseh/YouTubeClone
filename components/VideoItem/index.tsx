import React from 'react'
import { View, Text, Image , StyleSheet} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styles from './styles'
import { Avatar } from 'react-native-elements';

interface VideoItem {
    video:{
        id: string;
        createdAt: string; 
        title: string;
        thumbnail: string;
        videoUrl: string;
        duration: number; 
        views: number; 
        user: {
            name: string; 
            image?: string;
        }

    }
}
const VideoItem = ({video}: VideoItem) => {

    const vidMinutes = Math.floor(video.duration / 60)
    const vidSeconds = video.duration % 60

    let viewString = video.views.toString()
    if(video.views > 1000000) {
        viewString = (video.views / 1000000).toFixed(1) + 'M'
    } else if (video.views > 1000){
        viewString =(video.views / 1000).toFixed(1).slice(0,(video.views / 1000).toFixed(1).toString().indexOf('.')) + 'K'
    }
    return ( 
        <View>
            <View>
                <Image style={styles.thumbnail} source={{uri: video.thumbnail}} />
                <View style = {styles.timeContainer}>
                    <Text style= {styles.timeText}> {vidMinutes}:{vidSeconds.toFixed(2).slice(0,2)} </Text>
                </View>
            </View>

            <View style={styles.titleRow}>
                <View style={styles.imageCol}>
                <Avatar rounded size={50} source={{uri: video.user.image}} />
                </View>
                <View style={styles.textContainer}>
                    <Text style= {styles.title}>
                        {video.title}
                    </Text>
                    <Text style= {styles.subtitle}>
                    {video.user.name} · {viewString} · {video.createdAt}
                    </Text>
                </View>
                <View style={styles.threeDotsContainer}>
                    <Entypo style={styles.threeDots}name="dots-three-vertical" size={12} color="black" />
                </View>
            </View>
        </View>
    )
}



export default VideoItem;