import * as THREE from "three";
import { setup } from "./setup";
import { initDebug } from "./debug";
import { initAudio } from "./audio";
import { addPlane, addTetrahedrons } from "./objects";
import { animate } from "./animate";
import { btn, overlay, btnWrapper, links } from "./selectors";

async function start() {
  const { scene, renderer, camera, controls } = setup();
  const stats = initDebug(scene);
  const audio = await initAudio(camera, scene);
  const tetrahedons = addTetrahedrons(scene);
  const plane = addPlane(scene);
  const analyser = new THREE.AudioAnalyser(audio, 512);

  btnWrapper.classList.remove("hidden");
  btn.focus();

  btn.addEventListener("click", () => {
    overlay.classList.add("active");
    btnWrapper.classList.add("hidden");
    links.classList.remove("hidden");

    audio.play();

    animate(
      analyser,
      stats,
      tetrahedons,
      plane,
      renderer,
      controls,
      camera,
      scene
    );
  });
}

start();
