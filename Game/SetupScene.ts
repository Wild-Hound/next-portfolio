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
      this.renderer.setAnimationLoop(() => this.animation());
      this.gameStarted = true;
    } else {
      const topLayer = this.stack[this.stack.length - 1];
      const direction = topLayer.direction;

      const nextX = direction === "x" ? 0 : -10;
      const nextZ = direction === "z" ? 0 : -10;
      const newWidth = 2.5;
      const newHeight = 2.5;
      const nextDirection = direction === "x" ? "z" : "x";

      this.addLayer(nextX, nextZ, newWidth, newHeight, nextDirection);
    }
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
    this.stack.push(layer);
  }

  generateBox(
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    direction: string
  ) {
    const geometry = new THREE.BoxGeometry(width, this.boxHeight, depth);

    const color = new THREE.Color(
      `hsl(${30 + this.stack.length * 4}, 100%, 50%)`
    );
    const meterial = new THREE.MeshLambertMaterial({ color });

    const mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.set(x, y + this.boxHeight, z);

    super.add(mesh);

    return {
      threejs: mesh,
      width,
      depth,
      direction: direction,
    };
  }

  animation() {
    if (!this.gameStarted) {
      return;
    }
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
