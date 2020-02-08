import * as THREE from 'three';
import { Mesh } from 'three';

export function addPlane(scene) {
  const plane = new THREE.PlaneGeometry(200, 200, 50, 50);
  const material = new THREE.MeshBasicMaterial({ wireframe: true });
  const mesh = new THREE.Mesh(plane, material);

  scene.add(mesh);

  return plane;
}

export function addTetrahedrons(scene) {
  let boxes: Mesh[] = [];
  let object = new THREE.Object3D();

  for (let i = 0; i < 200; i++) {
    const plane = new THREE.TetrahedronGeometry(5, 0);
    const material = new THREE.MeshBasicMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(plane, material);

    mesh.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize();
    mesh.position.multiplyScalar(90 + Math.random() * 800);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

    boxes.push(mesh);
    object.add(mesh);
  }

  scene.add(object);

  return {
    object,
    boxes
  };
}
