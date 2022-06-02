import * as THREE from "three";
import SetupScene from "./SetupScene";

export function initGame() {
  const gameWindow = document.getElementById("game") as HTMLCanvasElement;
  const width = gameWindow.offsetWidth;
  const height = gameWindow.offsetHeight;
  const renderer = new THREE.WebGLRenderer({
    canvas: gameWindow,
    antialias: true,
  });
  renderer.setSize(width, height);

  const mainCamera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    400,
    -1700
  );
  mainCamera.position.set(4, 2, 4);
  mainCamera.lookAt(0, 0, 0);

  const game = new SetupScene(renderer, mainCamera);
  game.background = new THREE.Color("#1d1d1d");

  renderer.render(game, mainCamera);
}
