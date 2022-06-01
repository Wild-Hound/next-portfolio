import * as THREE from "three";

export default class BlasterScene extends THREE.Scene {
  constructor() {
    super();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    super.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    super.add(directionalLight);

    const geometry = new THREE.BoxGeometry(225, 50, 225);
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -350, 0);
    super.add(mesh);
  }
}
