import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Avatar } from "react-native-elements";

import VideoItem from "../../components/VideoItem";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import VideoPlayer from "../../components/VideoPlayer";
import VideoComments from "../../components/VideoComments";
import VideoComment from "../../components/VideoComment";
import { Video, Comment, User } from "../../src/models";
import { useRoute, RouteProp } from "@react-navigation/native";
import { DataStore, Storage } from "aws-amplify";
import videos from "../../assets/data/videos.json";

type AppRouteParamList = {
  Home: undefined; // undefined means Home route doesn't have route parameters
  Video: { id: string } | undefined;
  User: { image: string; subscribers: number; userID: string };
};

const VideoScreen = ({ User }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const route = useRoute<RouteProp<AppRouteParamList, "Video">>();
  const videoId = route.params?.id;

  useEffect(() => {
    DataStore.query(Video, videoId).then(setVideo);
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!video) {
        return;
      }
      const videoComments = (await DataStore.query(Comment)).filter(
        (comment) => comment.videoID === video.id
      );
      setComments(videoComments);
      console.log("Comments Log", videoComments);
    };
    fetchComments();
  }, [video]);

  const commentsRef = useRef<BottomSheetModal>(null);

  const openComments = () => {
    commentsRef.current?.present();
  };

  if (video === null) {
    return <ActivityIndicator />;
  }

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

  let likeString = video.likes.toString();
  if (video.likes > 1000000) {
    likeString = (video.likes / 1000000).toFixed(1) + "M";
  } else if (video.likes > 1000) {
    likeString =
      (video.likes / 1000)
        .toFixed(1)
        .slice(0, (video.likes / 1000).toFixed(1).toString().indexOf(".")) +
      "K";
  }
  let dislikeString = video.dislikes.toString();
  if (video.dislikes > 1000000) {
    dislikeString = (video.dislikes / 1000000).toFixed(1) + "M";
  } else if (video.dislikes > 1000) {
    dislikeString =
      (video.dislikes / 1000)
        .toFixed(1)
        .slice(0, (video.dislikes / 1000).toFixed(1).toString().indexOf(".")) +
      "K";
  }
  return (
    <View style={{ flex: 1 }}>
      {/*title*/}
      <View style={styles.videoInfoContainer}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.subtitle}>
          {viewString} views · {video.createdAt}
        </Text>
      </View>
      {/*like/dislike/etc*/}

      <View style={[styles.actionListContainer, { flex: 1 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode={"never"}
          contentContainerStyle={styles.scrollViewContainer}
        >
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

      {/*channel uploader/subscribe */}

      <View style={[styles.channelRowView, { alignItems: "center", flex: 1 }]}>
        <Avatar
          containerStyle={styles.avatar}
          rounded
          size={32}
          source={{ uri: User?.image }}
        />

        <View style={{ marginHorizontal: 5, flexGrow: 1 }}>
          <Text style={[styles.channelRowTextName, { color: "white" }]}>
            {video.User?.username}
          </Text>
          <Text style={[styles.channelRowTextSubs, { color: "grey" }]}>
            {User?.subscribers} subscribers
          </Text>
        </View>

        <Text
          style={[
            styles.channelRowTextSub,
            { fontWeight: "bold", padding: 10 },
          ]}
        >
          SUBSCRIBE
        </Text>
      </View>

      {/*comments*/}

      <Pressable
        onPress={openComments}
        style={{
          paddingLeft: 10,
          flex: 1,
          borderBottomColor: "#333333",
          borderBottomWidth: 7,
        }}
      >
        <Text style={{ color: "white", paddingBottom: 10 }}>
          Comments {comments.length}
        </Text>
        {comments.length > 0 && (
          <VideoComment comment={comments[comments.length - 1]} />
        )}
      </Pressable>

      {/*comment page*/}
      <BottomSheetModal
        style={{ flexGrow: 1 }}
        backgroundComponent={({ style }) => (
          <View style={[style, { backgroundColor: "#272727", flexGrow: 1 }]} />
        )}
        handleComponent={() => (
          <View>
            <Text
              style={{
                color: "white",
                padding: 15,
                fontSize: 16,
                paddingBottom: 0,
              }}
            >
              Comments 333
            </Text>
          </View>
        )}
        ref={commentsRef}
        snapPoints={["65%"]}
        enableFlashScrollableIndicatorOnExpand={false}
        index={0}
      >
        <VideoComments comments={comments} videoID={videoId} />
      </BottomSheetModal>
    </View>
  );
};

const fullVideoScreen = () => {
  const [videoKey, setVideoKey] = useState<string | null>(null);

  const [video, setVideo] = useState<Video | undefined>(undefined);

  const route = useRoute<RouteProp<AppRouteParamList, "Video">>();
  const videoId = route.params?.id;

  useEffect(() => {
    DataStore.query(Video, videoId).then(setVideo);
  }, [videoId]);
  useEffect(() => {
    if (!video) return;
    Storage.get(video.videoUrl).then(setVideoKey);
  }, [video]);

  if (!video) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#272727",
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <VideoPlayer videoUri={videoKey} thumbnailUri={video.thumbnail} />

      <BottomSheetModalProvider>
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideoItem video={item} />}
          ListHeaderComponent={VideoScreen}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};
export default fullVideoScreen;
