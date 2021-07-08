import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "./styles";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Video, User } from "../../src/models";
import { Storage } from "aws-amplify";
interface VideoItem {
  video: Video;
}
const VideoItem = ({ video }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  useEffect(() => {
    if (video.thumbnail.startsWith("http")) setThumbnail(video.thumbnail);
    else Storage.get(video.thumbnail).then(setThumbnail);
  }, [video]);
  console.log("IDEO", video.duration);
  const vidMinutes = Math.floor(video.duration / 10 / 60);
  const vidSeconds = (Math.floor(video.duration / 10) / 10) % 6;
  const navigation = useNavigation();
  const openVideoPage = () => {
    navigation.navigate("VideoScreen", { id: video.id });
  };
  let viewString = video.views.toString();
  if (video.views > 1000000) {
    viewString = (video.views / 1000000).toFixed(1) + "M";
  } else if (video.views > 1000) {
    viewString =
      (video.views / 1000)
        .toFixed(1)
        .slice(0, (video.views / 1000).toFixed(1).toString().indexOf(".")) +
      "K";
  }
  return (
    <Pressable onPress={openVideoPage} style={styles.videoCard}>
      <View>
        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {" "}
            {vidMinutes}:{vidSeconds.toFixed(1).replace(".", "")}{" "}
          </Text>
        </View>
      </View>

      <View style={styles.titleRow}>
        <View style={styles.imageCol}>
          <Avatar rounded size={38} source={{ uri: video.User?.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{video?.title}</Text>
          <Text style={styles.subtitle}>
            {video.User?.username} · {viewString} · {video?.createdAt}
          </Text>
        </View>
        <View style={styles.threeDotsContainer}>
          <Entypo
            style={styles.threeDots}
            name="dots-three-vertical"
            size={12}
            color="black"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default VideoItem;
