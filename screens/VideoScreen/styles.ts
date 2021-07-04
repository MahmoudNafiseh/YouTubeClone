import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  videoPlayer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 12,
    fontWeight: "500",
  },
  videoInfoContainer: {
    margin: 10,
  },
  tags: {
    color: "#0094e3",
    fontSize: 14,
    fontWeight: "500",
  },
  actionText: {
    color: "white",
    bottom: 10,
    fontSize: 12,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  actionListContainer: {
    marginVertical: 10,
    height: 70,
  },
  actionListItem: {
    width: 70,
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
  },
  avatar: {
    marginHorizontal: 10,
  },
  channelRowView: {
    flexDirection: "row",
    borderColor: "#666666",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    bottom: 15,
  },
  channelRowTextSubs: {
    fontSize: 14,
  },
  channelRowTextName: {
    fontSize: 16,
  },
  channelRowTextSub: {
    color: "red",
    fontSize: 18,
  },
  commentRowTextName: {
    fontSize: 16,
  },
  commentRowView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    flex: 1,
  },
  commentRowText: {
    fontSize: 14,
    flex: 1,
    paddingRight: 40,
  },
});

export default styles;
