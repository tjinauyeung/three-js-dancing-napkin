import { Scene } from "three";
import * as THREE from "three";

const Stats = require("stats.js");

export function initDebug<Stats>(scene: Scene) {
  // setup stats
  const stats = new Stats();
  // stats.showPanel(0);
  // document.body.appendChild(stats.dom);

  // axes helper
  // const axesHelper = new THREE.AxesHelper(100);
  // scene.add(axesHelper);
  return stats;
}
