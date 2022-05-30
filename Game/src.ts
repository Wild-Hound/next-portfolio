import * as THREE from "three";
import BlasterScene from "./SetupScene";

export function initGame() {
  const gameWindow = document.getElementById("game") as HTMLCanvasElement;
  const width = gameWindow.offsetWidth;
  const height = gameWindow.offsetHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: gameWindow,
  });
  renderer.setSize(width, height);

  const mainCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  const scene = new BlasterScene(mainCamera);
  scene.init();

  function tick() {
    scene.update();
    renderer.render(scene, mainCamera);
    requestAnimationFrame(tick);
  }
  tick();
}
