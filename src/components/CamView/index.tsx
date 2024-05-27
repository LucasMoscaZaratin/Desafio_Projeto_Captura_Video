import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

import { CamViewProps } from "./props";
import { styles } from "./styles";

export default function CameraView({
  camRef,
  isRecording,
  onRecording,
  onStopRecording,
}: CamViewProps) {
  return (
    <Camera style={styles.container} ref={camRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRecord}
          onPress={isRecording ? onStopRecording : onRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? "Stop Recording" : "Start Record"}
          </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
