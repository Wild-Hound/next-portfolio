import * as THREE from "three";
import SetupScene from "./SetupScene";

export function initGame() {
  const gameWindow = document.getElementById("game") as HTMLCanvasElement;
  const width = gameWindow.offsetWidth;
  const height = gameWindow.offsetHeight;

  const aspect = width / height;
  const widthX = 12;
  const heightX = widthX / aspect;

  const mainCamera = new THREE.OrthographicCamera(
    widthX / -2,
    widthX / 2,
    heightX / 2,
    heightX / -2,
    0,
    100
  );
  mainCamera.position.set(4, 4, 4);
  mainCamera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: gameWindow,
    antialias: true,
  });

  const game = new SetupScene(renderer, mainCamera);
  game.background = new THREE.Color("#1d1d1d");
  renderer.setSize(width, height);
  renderer.render(game, mainCamera);
}
