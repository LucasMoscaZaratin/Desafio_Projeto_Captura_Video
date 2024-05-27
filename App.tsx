import React from "react";
import { useEffect, useState, useRef } from "react";
import { Text, View } from "react-native";

import { Camera, CameraRecordingOptions } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import CameraView from "./src/components/CamView";
import VideoPlayer from "./src/components/VideoPlayer";

export default function App() {
  const camRef = useRef<Camera>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>();
  const [hasCamPermission, setHasCamPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCamPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCamPermission === false || hasMicrophonePermission === false) {
    return (
      <View style={{ alignItems: "center" }}>
        <Text>Não tem permissão de acesso a camera ou audio </Text>
      </View>
    );
  }
  if (hasMediaLibraryPermission === false) {
    return <Text>Não tem permissão de acesso a biblioteca </Text>;
  }

  const recordVideo = () => {
    setIsRecording(true);

    const options: CameraRecordingOptions = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };

    if (camRef && camRef.current) {
      camRef.current.recordAsync(options).then((recordedVideo: any) => {
        setVideo(recordedVideo);
        setIsRecording(false);
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (camRef && camRef.current) {
      camRef.current.stopRecording();
    }
  };

  if (video) {
    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };
    const shereVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const discarVideo = () => {
      setVideo(undefined);
    };

    return (
      <VideoPlayer
        video={video}
        onShere={shereVideo}
        onSave={saveVideo}
        onDiscard={discarVideo}
      />
    );
  }

  return (
    <CameraView
      camRef={camRef}
      isRecording={isRecording}
      onRecording={recordVideo}
      onStopRecording={stopRecording}
    />
  );
}
