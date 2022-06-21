import * as THREE from "three";
import * as CANNON from "cannon";

let camera: THREE.OrthographicCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer; // ThreeJS globals
let world: CANNON.World; // CannonJs world
let lastTime: number; // Last timestamp of animation
let stack: any[]; // Parts that stay solid on top of each other
let overhangs: any[]; // Overhanging parts that fall down
const boxHeight = 0.5; // Height of each layer
const originalBoxSize = 2.5; // Original width and height of a box
let gameEnded: boolean;
let initTrigger = true;
let score: number;
let updateScore: React.Dispatch<React.SetStateAction<number>>;
let rewardSound: HTMLAudioElement;
let updateGameState: React.Dispatch<React.SetStateAction<string>>;

export function initGame(
  gameScore: number,
  updateGameScore: React.Dispatch<React.SetStateAction<number>>,
  gameRewardSound: HTMLAudioElement,
  UpdateGameState: React.Dispatch<React.SetStateAction<string>>
) {
  gameEnded = false;
  lastTime = 0;
  stack = [];
  overhangs = [];
  score = gameScore;
  updateScore = updateGameScore;
  rewardSound = gameRewardSound;
  updateGameState = UpdateGameState;

  // Initialize CannonJS
  world = new CANNON.World();
  world.gravity.set(0, -10, 0); // Gravity pulls things down
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 40;

  const gameWindow = document.getElementById("game") as HTMLCanvasElement;
  const width = gameWindow.offsetWidth;
  const height = gameWindow.offsetHeight;

  const aspect = width / height;
  const widthX = 10;
  const heightX = widthX / aspect;

  camera = new THREE.OrthographicCamera(
    widthX / -2,
    widthX / 2,
    heightX / 2,
    heightX / -2,
    0,
    100
  );
  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  // Foundation
  addLayer(0, 0, originalBoxSize, originalBoxSize);

  // First layer
  // addLayer(-10, 0, originalBoxSize, originalBoxSize, "x");

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(10, 20, 0);
  scene.add(dirLight);

  renderer = new THREE.WebGLRenderer({
    canvas: gameWindow,
    antialias: true,
  });
  renderer.setClearColor("#1d1d1d");
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animation);

  // @ts-ignore
  document.getElementById("game").addEventListener("mousedown", eventHandler);
}

function addLayer(
  x: number,
  z: number,
  width: number,
  depth: number,
  direction?: string
) {
  const y = boxHeight * stack.length - 2.5; // Add the new box one layer higher
  const layer = generateBox(x, y, z, width, depth, false);
  if (direction) {
    // @ts-ignore
    layer.direction = direction;
  }

  stack.push(layer);
}

function addOverhang(x: number, z: number, width: number, depth: number) {
  const y = boxHeight * (stack.length - 1) - 2.5; // Add the new box one the same layer
  const overhang = generateBox(x, y, z, width, depth, true);
  overhangs.push(overhang);
}

function generateBox(
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number,
  falls: boolean
) {
  // ThreeJS
  const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
  const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  // CannonJS
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
  );
  let mass = falls ? 5 : 0; // If it shouldn't fall then setting the mass to zero will keep it stationary
  mass *= width / originalBoxSize; // Reduce mass proportionately by size
  mass *= depth / originalBoxSize; // Reduce mass proportionately by size
  const body = new CANNON.Body({ mass, shape });
  body.position.set(x, y, z);
  world.addBody(body);

  return {
    threejs: mesh,
    cannonjs: body,
    width,
    depth,
  };
}

function missedTheSpot() {
  updateGameState("game over");
  const topLayer = stack[stack.length - 1];

  // Turn to top layer into an overhang and let it fall down
  addOverhang(
    topLayer.threejs.position.x,
    topLayer.threejs.position.z,
    topLayer.width,
    topLayer.depth
  );
  world.remove(topLayer.cannonjs);
  scene.remove(topLayer.threejs);

  gameEnded = true;
}

function perfect(topLayer: any, prevLayer: any) {
  const topX = topLayer.threejs.position.x;
  const topZ = topLayer.threejs.position.z;
  const prevX = prevLayer.threejs.position.x;
  const prevZ = prevLayer.threejs.position.z;
  const direction = topLayer.direction;
  const diffTolarance = 0.00558;
  // 0.00058
  const diffrance =
    direction === "x" ? Math.abs(topX - prevX) : Math.abs(topZ - prevZ);

  if (diffrance < diffTolarance) {
    if (!rewardSound.paused) {
      rewardSound.currentTime = 0;
    }
    rewardSound.play();
  } else {
    console.log("not perfect :(");
  }
}

function splitBlockAndAddNextOneIfOverlaps() {
  if (gameEnded) return;

  const topLayer = stack[stack.length - 1];
  const previousLayer = stack[stack.length - 2];

  const direction = topLayer.direction;

  const size = direction == "x" ? topLayer.width : topLayer.depth;
  const delta =
    topLayer.threejs.position[direction] -
    previousLayer.threejs.position[direction];
  const overhangSize = Math.abs(delta);
  const overlap = size - overhangSize;

  perfect(topLayer, previousLayer);
  if (overlap > 0) {
    cutBox(topLayer, overlap, size, delta);

    // Overhang
    const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
    const overhangX =
      direction == "x"
        ? topLayer.threejs.position.x + overhangShift
        : topLayer.threejs.position.x;
    const overhangZ =
      direction == "z"
        ? topLayer.threejs.position.z + overhangShift
        : topLayer.threejs.position.z;
    const overhangWidth = direction == "x" ? overhangSize : topLayer.width;
    const overhangDepth = direction == "z" ? overhangSize : topLayer.depth;

    addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

    // Next layer
    const nextX = direction == "x" ? topLayer.threejs.position.x : -10;
    const nextZ = direction == "z" ? topLayer.threejs.position.z : -10;
    const newWidth = topLayer.width; // New layer has the same size as the cut top layer
    const newDepth = topLayer.depth; // New layer has the same size as the cut top layer
    const nextDirection = direction == "x" ? "z" : "x";

    addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
    updateScore(++score);
  } else {
    missedTheSpot();
  }
}

function cutBox(topLayer: any, overlap: number, size: any, delta: number) {
  const direction = topLayer.direction;
  const newWidth = direction == "x" ? overlap : topLayer.width;
  const newDepth = direction == "z" ? overlap : topLayer.depth;

  // Update metadata
  topLayer.width = newWidth;
  topLayer.depth = newDepth;

  // Update ThreeJS model
  topLayer.threejs.scale[direction] = overlap / size;
  topLayer.threejs.position[direction] -= delta / 2;

  // Update CannonJS model
  topLayer.cannonjs.position[direction] -= delta / 2;

  // Replace shape to a smaller one (in CannonJS you can't simply just scale a shape)
  const shape = new CANNON.Box(
    new CANNON.Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
  );
  topLayer.cannonjs.shapes = [];
  topLayer.cannonjs.addShape(shape);
}

export function startGame() {
  initTrigger = false;
  gameEnded = false;
  lastTime = 0;
  stack = [];
  overhangs = [];
  score = 0;
  updateGameState("started");

  if (world) {
    // Remove every object from world
    while (world.bodies.length > 0) {
      world.remove(world.bodies[0]);
    }
  }

  if (scene) {
    // Remove every Mesh from the scene
    while (scene.children.find((c) => c.type == "Mesh")) {
      const mesh = scene.children.find((c) => c.type == "Mesh");
      // @ts-ignore
      scene.remove(mesh);
    }

    // Foundation
    addLayer(0, 0, originalBoxSize, originalBoxSize);

    // First layer
    addLayer(-10, 0, originalBoxSize, originalBoxSize, "x");
  }

  if (camera) {
    // Reset camera positions
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
  }
}

function animation(time: number) {
  if (lastTime) {
    const timePassed = time - lastTime;
    const speed = 0.008;

    const topLayer = stack[stack.length - 1];

    // The top level box should move if the game has not ended AND
    // it's either NOT in autopilot or it is in autopilot and the box did not yet reach the robot position
    const boxShouldMove = !gameEnded;
    if (boxShouldMove) {
      // Keep the position visible on UI and the position in the model in sync
      topLayer.threejs.position[topLayer.direction] += speed * timePassed;
      topLayer.cannonjs.position[topLayer.direction] += speed * timePassed;

      // If the box went beyond the stack then show up the fail screen
      if (topLayer.threejs.position[topLayer.direction] > 10) {
        missedTheSpot();
      }
    }

    // 4 is the initial camera height
    if (camera.position.y < boxHeight * (stack.length - 2) + 1) {
      camera.position.y += speed * timePassed;
    }

    updatePhysics(timePassed);
    renderer.render(scene, camera);
  }
  lastTime = time;
}

function updatePhysics(timePassed: number) {
  world.step(timePassed / 1000); // Step the physics world

  // Copy coordinates from Cannon.js to Three.js
  overhangs.forEach((element) => {
    element.threejs.position.copy(element.cannonjs.position);
    element.threejs.quaternion.copy(element.cannonjs.quaternion);
  });
}

function eventHandler() {
  if (initTrigger) startGame();
  else splitBlockAndAddNextOneIfOverlaps();
}
