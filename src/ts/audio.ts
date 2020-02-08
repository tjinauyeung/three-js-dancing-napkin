import * as THREE from "three";
import { Camera, Scene, Audio } from "three";

const AUDIO_URI = '../static/audio/audio.mp3';

export function initAudio(camera: Camera, scene: Scene) {
  const audioListener = new THREE.AudioListener();
  const audio = new THREE.Audio(audioListener);
  const loader = new THREE.AudioLoader();

  camera.add(audioListener);
  scene.add(audio);

  return new Promise<Audio>((resolve) => {
    loader.load(AUDIO_URI, audioBuffer => {
      audio.setBuffer(audioBuffer);
      resolve(audio);
    });
  })
}
