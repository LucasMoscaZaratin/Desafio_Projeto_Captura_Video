import React from "react";
import { View, SafeAreaView, Button } from "react-native";

import { Video } from "expo-av";

import { VideoPlayerProps } from "./props";
import { styles } from "./styles";

export default function VideoPlayer({
  video,
  onShere,
  onSave,
  onDiscard,
}: VideoPlayerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Video
        style={styles.video}
        source={{ uri: video.uri }}
        useNativeControls
        isLooping
      />
      <View style={styles.menuButton}>
        <Button title="Share" onPress={onShere} />
        <Button title="Save" onPress={onSave} />
        <Button title="Discard" onPress={onDiscard} />
      </View>
    </SafeAreaView>
  );
}
