import { Camera } from "expo-camera";

export interface CamViewProps {
  camRef: React.RefObject<Camera>;
  isRecording: boolean;
  onRecording: () => void;
  onStopRecording: () => void;
}
