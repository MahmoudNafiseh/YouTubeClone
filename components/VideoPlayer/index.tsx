import React, {useRef} from 'react'
import { View, Text } from 'react-native'
import { Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation';

interface VideoPlayerType {
    videoUri: string;
    thumbnailUri: string;

}
const VideoPlayer = ({videoUri, thumbnailUri}: VideoPlayerType) => {
    const videoRef = useRef<Video>(null)
    const onFullscreenUpdate = async ({fullscreenUpdate}) => {
        switch (fullscreenUpdate) {
            case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                await ScreenOrientation.unlockAsync() // only on Android required
                break;
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // only on Android required
                break;
        }
    }
    
    const onRefAssign = (vidElement: Video) => {
        videoRef.current = vidElement
        console.warn("video is mounted")
        const playbackObject = vidElement
        const source = {uri: videoUri}
        playbackObject.loadAsync(source)
    }
    return (
        <View>
            <Video
            source={{uri: videoUri}}
            style={{width: '100%', aspectRatio: 16/9}}
            posterSource={{uri: thumbnailUri}}
            usePoster={true}
            posterStyle={{
                resizeMode: "cover"
            }}
            resizeMode="contain"
            onFullscreenUpdate={onFullscreenUpdate}            
            useNativeControls={true}
            />
        </View>
    )
}

export default VideoPlayer
