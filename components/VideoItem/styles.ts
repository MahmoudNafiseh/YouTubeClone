import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    thumbnail: {
        width: "100%", 
        aspectRatio: 16/9
    },
    timeContainer : {
        backgroundColor: "#00000099",
        height: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 3, 
        position: 'absolute',
        right: 5, 
        bottom: 6,
    
    },
    timeText: {
        color: 'white',
        fontWeight: 'bold',
        bottom: 1,
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