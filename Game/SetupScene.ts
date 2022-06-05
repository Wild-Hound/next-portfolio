import * as THREE from "three";
import * as CANNON from "cannon";

export default class BlasterScene extends THREE.Scene {
  gameStarted = false;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  world: CANNON.World;

  stack: {
    threejs: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    cannonjs: CANNON.Body;
    width: number;
    depth: number;
    direction: string;
  }[] = [];
  overhangs: {
    threejs: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    cannonjs: CANNON.Body;
    width: number;
    depth: number;
  }[] = [];
  boxHeight = 0.5;

  constructor(renderer: THREE.WebGLRenderer, camera: THREE.OrthographicCamera) {
    super();

    const world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 40;
    this.world = world;

    this.renderer = renderer;
    this.camera = camera;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    super.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    super.add(directionalLight);

    // threejs
    const geometry = new THREE.BoxGeometry(2.5, 0.5, 2.5);
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -4, 0);
    super.add(mesh);

    // cannonjs
    const shape = new CANNON.Box(
      new CANNON.Vec3(2.5 / 2, this.boxHeight / 2, 2.5 / 2)
    );
    const mass = 0;
    const body = new CANNON.Body({ mass, shape });
    body.position.set(0, -4, 0);
    this.world.addBody(body);

    const firstBox = {
      threejs: mesh,
      cannonjs: body,
      width: 2.5,
      depth: 2.5,
      direction: "z",
    };

    this.stack.push(firstBox);

    window.addEventListener("click", () => this.gameEvent());
  }

  gameEvent() {
    if (!this.gameStarted) {
      const geometry = new THREE.BoxGeometry(2.5, 0.5, 2.5);
      const color = new THREE.Color(
        `hsl(${30 + this.stack.length * 4}, 100%, 50%)`
      );
      // threejs
      const material = new THREE.MeshLambertMaterial({ color: color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-10, -3.5, 0);
      super.add(mesh);

      // cannonjs
      const shape = new CANNON.Box(
        new CANNON.Vec3(2.5 / 2, this.boxHeight / 2, 2.5 / 2)
      );
      const mass = 0;
      const body = new CANNON.Body({ mass, shape });
      body.position.set(-10, -3.5, 0);
      this.world.addBody(body);

      const secondBox = {
        threejs: mesh,
        cannonjs: body,
        width: 2.5,
        depth: 2.5,
        direction: "x",
      };
      this.stack.push(secondBox);

      this.renderer.setAnimationLoop(() => this.animation());
      this.gameStarted = true;
      return;
    }
    const topLayer = this.stack[this.stack.length - 1];
    const prevLayer = this.stack[this.stack.length - 2];
    const direction = topLayer.direction;

    const delta =
      // @ts-ignore
      topLayer.threejs.position[direction] -
      // @ts-ignore
      prevLayer.threejs.position[direction];
    const overHangSize = Math.abs(delta);
    const size = direction === "x" ? topLayer.width : topLayer.depth;
    const overLap = size - overHangSize;

    if (overLap <= 0) {
      // game over
      console.log("game over");
      return;
    }

    const newWidth = direction === "x" ? overLap : topLayer.width;
    const newDepth = direction === "z" ? overLap : topLayer.depth;

    topLayer.width = newWidth;
    topLayer.depth = newDepth;

    // @ts-ignore
    topLayer.threejs.scale[direction] = overLap / size;
    // @ts-ignore
    topLayer.threejs.position[direction] -= delta / 2;
    // update cannonjs model
    // @ts-ignore
    topLayer.cannonjs.position[direction] -= delta / 2;

    const shape = new CANNON.Box(
      new CANNON.Vec3(newWidth / 2, this.boxHeight / 2, newDepth / 2)
    );
    topLayer.cannonjs.shapes = [];
    topLayer.cannonjs.addShape(shape);

    // overhang
    const overhangShift = (overLap / 2 + overHangSize / 2) * Math.sign(delta);
    const overhangX =
      direction === "x"
        ? topLayer.threejs.position.x + overhangShift
        : topLayer.threejs.position.x;
    const overhangZ =
      direction === "z"
        ? topLayer.threejs.position.z + overhangShift
        : topLayer.threejs.position.z;
    const overhangWidth = direction === "x" ? overHangSize : newWidth;
    const overhangDepth = direction === "z" ? overHangSize : newDepth;

    this.addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

    const nextX = direction === "x" ? topLayer.threejs.position.x : -10;
    const nextZ = direction === "z" ? topLayer.threejs.position.z : -10;
    const nextDirection = direction === "x" ? "z" : "x";
    this.addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
  }

  addLayer(
    x: number,
    z: number,
    width: number,
    depth: number,
    direction: string
  ) {
    const y = this.boxHeight * this.stack.length - 4;

    const layer = this.generateBox(x, y, z, width, depth, false, direction);
    // @ts-ignore
    this.stack.push(layer);
  }

  addOverhang(x: number, z: number, width: number, depth: number) {
    let y = this.boxHeight * (this.stack.length - 1) - 4;
    if (this.stack.length === 2) {
      y = -4;
    }
    // const y = this.boxHeight + (this.stack.length - 1);
    const overhang = this.generateBox(x, y, z, width, depth, true);
    this.overhangs.push(overhang);
  }

  generateBox(
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    falls: boolean,
    direction?: string
  ) {
    // threejs
    const geometry = new THREE.BoxGeometry(width, this.boxHeight, depth);
    const color = new THREE.Color(
      `hsl(${30 + this.stack.length * 4}, 100%, 50%)`
    );
    const meterial = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.set(x, y + this.boxHeight, z);
    super.add(mesh);

    // cannonjs
    const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, this.boxHeight / 2, depth / 2)
    );
    const mass = falls ? 5 : 0;
    const body = new CANNON.Body({ mass, shape });
    body.position.set(x, y, z);
    this.world.addBody(body);

    if (direction) {
      return {
        threejs: mesh,
        cannonjs: body,
        width,
        depth,
        direction: direction,
      };
    }
    return {
      threejs: mesh,
      cannonjs: body,
      width,
      depth,
    };
  }

  animation() {
    const speed = 0.15;

    const topLayer = this.stack[this.stack.length - 1];
    // @ts-ignore
    topLayer.threejs.position[topLayer.direction] += speed;
    // @ts-ignore
    topLayer.cannonjs.position[topLayer.direction] += speed;

    if (this.camera.position.y < this.boxHeight * this.stack.length - 1) {
      this.camera.position.y += speed;
    }

    this.updatePhysics();
    this.renderer.render(this, this.camera);
  }

  updatePhysics() {
    this.world.step(1 / 60);
    this.overhangs.forEach((element) => {
      // @ts-ignore
      element.threejs.position.copy(element.cannonjs.position);
      // @ts-ignore
      element.threejs.quaternion.copy(element.cannonjs.quaternion);
    });
  }
}
