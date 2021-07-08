import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import VideoItem from "../components/VideoItem";
import { Video } from "../src/models/";

const HomeScreen = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const fetchVideos = async () => {
    const response = await DataStore.query(Video);
    setVideos(response);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchVideos();
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  console.log(videos);
  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoItem video={item} />}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#272727" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
