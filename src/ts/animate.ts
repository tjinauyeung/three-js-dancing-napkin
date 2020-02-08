import {
  AudioAnalyser,
  Object3D,
  PlaneGeometry,
  Renderer,
  Mesh,
  Camera,
  Scene
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { body } from "./selectors";

const MAX_WAVE_HEIGHT = 100;
const MIN_WAVE_HEIGHT = -100;

let colorVal = 0;
function updateBackground() {
  const colorTopLeft = `rgb(0, 0, ${Math.floor(colorVal)})`;
  const colorBottomRight = `rgb(${Math.floor(colorVal)}, 0, 0)`;
  body.style.background = `linear-gradient(135deg, ${colorTopLeft}, ${colorBottomRight})`;
  colorVal += 0.05;
}

let j = 1;
let wave = (Math.PI * 2) / 50;
let waveHeight = 1;
let reverse = false;
let freq = 0; // TODO use for visual manipulation

export const animate = (
  analyser: AudioAnalyser,
  stats: any,
  tetrahedons: {
    boxes: Mesh[];
    object: Object3D;
  },
  plane: PlaneGeometry,
  renderer: Renderer,
  controls: OrbitControls,
  camera: Camera,
  scene: Scene
) => {
  // stats.begin();

  controls.update();

  freq = analyser.getAverageFrequency();

  for (let i = 0; i < tetrahedons.boxes.length; i++) {
    tetrahedons.boxes[i].rotateX(Math.PI * 0.5 * 0.01);
    tetrahedons.boxes[i].rotateY(Math.PI * 0.5 * 0.01);
    tetrahedons.boxes[i].rotateZ(Math.PI * 0.5 * 0.01);
  }

  tetrahedons.object.rotateX(Math.PI * 0.5 * 0.002);
  tetrahedons.object.rotateY(Math.PI * 0.5 * 0.002);
  tetrahedons.object.rotateZ(Math.PI * 0.5 * 0.002);

  plane.rotateX(Math.PI * 0.5 * 0.001);
  plane.rotateY(Math.PI * 0.5 * 0.001);
  plane.rotateZ(Math.PI * 0.5 * 0.001);

  // create wave
  for (let i = 0; i < plane.vertices.length; i++) {
    plane.vertices[i].z = (Math.sin(j) / 2) * waveHeight;
    plane.verticesNeedUpdate = true;
    j += wave;
  }

  if (waveHeight > MAX_WAVE_HEIGHT) {
    reverse = true;
  }

  if (waveHeight < MIN_WAVE_HEIGHT) {
    reverse = false;
  }

  if (reverse) {
    waveHeight = waveHeight - 0.01;
  } else {
    waveHeight = waveHeight + 0.01;
  }

  camera.position.x = camera.position.x - 0.2;
  camera.position.y = camera.position.y + 0.05;
  camera.position.z = camera.position.z - 0.02;

  renderer.render(scene, camera);

  updateBackground();

  // stats.end();

  requestAnimationFrame(() =>
    animate(
      analyser,
      stats,
      tetrahedons,
      plane,
      renderer,
      controls,
      camera,
      scene
    )
  );
};
