import * as THREE from "three";

export default class BlasterScene extends THREE.Scene {
  gameStarted = false;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;

  stack: {
    threejs: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    width: number;
    depth: number;
    direction: string;
  }[] = [];
  overhangs: {
    threejs: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    width: number;
    depth: number;
  }[] = [];
  boxHeight = 0.5;

  constructor(renderer: THREE.WebGLRenderer, camera: THREE.OrthographicCamera) {
    super();

    this.renderer = renderer;
    this.camera = camera;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    super.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    super.add(directionalLight);

    const geometry = new THREE.BoxGeometry(2.5, 0.5, 2.5);
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -4, 0);
    super.add(mesh);

    const firstBox = {
      threejs: mesh,
      width: 2.5,
      depth: 2.5,
      direction: "x",
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
      const material = new THREE.MeshLambertMaterial({ color: color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-10, -3.5, 0);
      super.add(mesh);

      const secondBox = {
        threejs: mesh,
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
    const nextZ = direction === "y" ? topLayer.threejs.position.z : -10;
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

    const layer = this.generateBox(x, y, z, width, depth, direction);
    // @ts-ignore
    this.stack.push(layer);
  }

  addOverhang(x: number, z: number, width: number, depth: number) {
    const y = this.boxHeight + (this.stack.length - 1);
    const overhang = this.generateBox(x, y, z, width, depth, "x");
    this.overhangs.push(overhang);
  }

  generateBox(
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    direction?: string
  ) {
    const geometry = new THREE.BoxGeometry(width, this.boxHeight, depth);

    const color = new THREE.Color(
      `hsl(${30 + this.stack.length * 4}, 100%, 50%)`
    );
    const meterial = new THREE.MeshLambertMaterial({ color });

    const mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.set(x, y + this.boxHeight, z);

    super.add(mesh);

    if (direction) {
      return {
        threejs: mesh,
        width,
        depth,
        direction: direction,
      };
    } else {
      return {
        threejs: mesh,
        width,
        depth,
      };
    }
  }

  animation() {
    const speed = 0.15;

    const topLayer = this.stack[this.stack.length - 1];
    // @ts-ignore
    topLayer.threejs.position[topLayer.direction] += speed;

    if (this.camera.position.y < this.boxHeight * this.stack.length - 1) {
      this.camera.position.y += speed;
    }
    this.renderer.render(this, this.camera);
  }
}
