import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "../components/VideoPlayer";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Storage, DataStore, Auth } from "aws-amplify";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Video, User } from "../src/models";

type ImagePickerResult = {
  duration: number;
};
const UploadScreen = ({ navigation }) => {
  const [video, setVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(0);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          navigation.navigate("Home");
        }
      }
    })();
  }, []);

  const generateThumbnail = async () => {
    if (!video) return;
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(video, {
        time: duration / 2,
      });
      const response = await fetch(uri);
      const blob = await response.blob();
      const key = uuidv4() + ".jpg";
      await Storage.put(key, blob);
      return key;
    } catch (e) {
      console.warn(e);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    console.log("results", result);

    if (!result.cancelled) {
      setVideo(result.uri);
      setDuration(result.duration);
      setUploading(false);
    }
  };

  const uploadVideo = async () => {
    if (!video) {
      return;
    }
    try {
      const response = await fetch(video);
      const blob = await response.blob();
      let key = uuidv4() + ".mp4";
      await Storage.put(key, blob, {
        progressCallback: (p) => {
          setProgress(p.loaded / p.total);
        },
      });
      return key;
    } catch (err) {
      console.warn("error uploading file: ", err);
    }
  };
  const upload = async () => {
    if (!video) {
      return alert("Please select a video");
    }
    const userInfo = await Auth.currentAuthenticatedUser();
    const userId = userInfo.attributes.sub;
    const user = (await DataStore.query(User)).find(
      (user) => user.userID === userId
    );
    if (!user) console.warn("user not found");
    const key = await uploadVideo();
    const thumbKey = await generateThumbnail();
    await DataStore.save(
      new Video({
        title: title,
        thumbnail: thumbKey,
        videoUrl: key,
        duration: Math.floor(duration / 100),
        views: 0,
        tags: tags,
        likes: 0,
        dislikes: 0,
        userID: user.id,
      })
    );
    setVideo(null);
    setDuration(0);
    setTitle("");
    setTags("");
    navigation.navigate("Home");
    setUploading(false);
    setProgress(0);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "95%",
      }}
    >
      <Button title="Pick a video from camera roll" onPress={pickVideo} />
      {video && <VideoPlayer videoUri={video} />}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ color: "#000", backgroundColor: "white", width: "50%" }}
      />
      <TextInput
        placeholder="Tags separated by comma"
        value={tags}
        onChangeText={setTags}
        style={{ color: "#000", backgroundColor: "white", width: "50%" }}
      />
      <Button
        title="Upload"
        onPress={() => {
          upload();
          setUploading(true);
          Keyboard.dismiss();
        }}
        disabled={uploading}
      />
      <View
        style={{
          width: `${100 * progress}%`,
          height: 5,
          backgroundColor: "lightblue",
        }}
      />
    </View>
  );
};

export default UploadScreen;
