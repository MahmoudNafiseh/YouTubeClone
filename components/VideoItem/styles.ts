import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    thumbnail: {
        width: "100%", 
        aspectRatio: 16/9
    },
    timeContainer : {
        backgroundColor: "#00000099",
        height: 25, 
        width: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 4, 
        position: 'absolute',
        right: 5, 
        bottom: 5,
    
    },
    timeText: {
        color: 'white',
        fontWeight: 'bold'
    },
    avatar: {
        width: 50, 
        height: 50,
        borderRadius: 25
    },
    title:{
        color: "white",
        fontSize: 16, 
        fontWeight: '500',
    
    },
    subtitle:{
        color: "grey",
        fontSize: 13, 
    
    }, 
    titleRow: {
        flexDirection: "row", 
        padding: 11, 
    },
    
    textContainer: {
        marginHorizontal: 10,
        flex: 1
    },
    imageCol: {
        flexDirection: 'column'
    },
    threeDots: {
        color: 'white',
        
    },
    threeDotsContainer:{
        flexDirection: 'column'
    }
    })

    export default styles