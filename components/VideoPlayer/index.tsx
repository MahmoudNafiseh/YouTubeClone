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
                await ScreenOrientation.unlockAsync() // we use this on Android since video will not automatically rotate when we change screen orientation
                break;                               //video will not automatically rotate when we change screen orientation
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // we use this on Android since 
                break;                                                                      //video will not automatically rotate when we change screen orientation
        }
    }

    return (
        <View>
            <Video
            source={{uri: videoUri}}
            ref={videoRef}
            style={{width: '100%', aspectRatio: 16/9}}
            posterSource={{uri: thumbnailUri}}
            usePoster={true}
            posterStyle={{
                resizeMode: "cover"
            }}
            resizeMode="contain"
            onFullscreenUpdate={onFullscreenUpdate}            
            useNativeControls={true}
            onLoad={()=>videoRef.current.playAsync()}
            />
        </View>
    )
}

export default VideoPlayer
