import React, {useState, useEffect} from 'react'
import { View, StyleSheet, FlatList} from 'react-native'
import { DataStore } from '@aws-amplify/datastore';
import VideoItem from '../components/VideoItem';
import { Video } from '../src/models/'

const HomeScreen = () => {
    const [videos, setVideos] = useState<Video[]>([])

    useEffect(()=> {
        const fetchVideos = async () => {
            const response = await DataStore.query(Video);
            setVideos(response)
        } 
        fetchVideos()
    }, [])
    console.log(videos)
    return ( 
        <View>
            <FlatList 
            data={videos}
            renderItem={({item}) => <VideoItem video={item}
             /> }
             style={{backgroundColor: '#272727'}}
            />
        </View>
    )
}


const styles = StyleSheet.create({

})
export default HomeScreen;
