import React from 'react'
import { View, Text, Image , StyleSheet} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styles from './styles'

type VideoItem = {
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

    return ( 
        <View>
            <View>
                <Image style={styles.thumbnail} source={{uri: video.thumbnail}} />
                <View style = {styles.timeContainer}>
                    <Text style= {styles.timeText}>{video.duration}</Text>
                </View>
            </View>

            <View style={styles.titleRow}>
                <View style={styles.imageCol}>
                    <Image style={styles.avatar} source= {{uri: video.user.image}}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style= {styles.title}>
                        {video.title}
                    </Text>
                    <Text style= {styles.subtitle}>
                    {video.user.name} · {video.views} · {video.createdAt}
                    </Text>
                </View>
                <View style={styles.threeDotsContainer}>
                    <Entypo style={styles.threeDots}name="dots-three-vertical" size={16} color="black" />
                </View>
            </View>
        </View>
    )
}



export default VideoItem;