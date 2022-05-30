import * as THREE from "three";
// import { ObjectLoader } from "three";
// import { MaterialLoader } from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default class BlasterScene extends THREE.Scene {
  private readonly mtlLoader = new MTLLoader();
  private readonly objLoader = new OBJLoader();

  private readonly camara: THREE.PerspectiveCamera;

  constructor(camera: THREE.PerspectiveCamera) {
    super();
    this.camara = camera;
  }

  async init() {
    const targetMtl = await this.mtlLoader.loadAsync(
      "./Resource/gameResource/OBJ format/targetA.mtl"
    );
    targetMtl.preload();

    // create targets
    const t1 = await this.createTarget(targetMtl);
    t1.position.x = -1;
    t1.position.z = -3;

    const t2 = await this.createTarget(targetMtl);
    t2.position.x = -0.5;
    t2.position.z = -3;

    const t3 = await this.createTarget(targetMtl);
    t3.position.x = 1;
    t3.position.z = -3;

    const t4 = await this.createTarget(targetMtl);
    t4.position.x = 1.5;
    t4.position.z = -3;

    const blaster = await this.createBlaster();
    blaster.position.z = -1;
    blaster.position.x = 0.25;
    blaster.add(this.camara);

    this.add(t1, t2, t3, t4);
    this.add(blaster);

    this.camara.position.z = 1;
    this.camara.position.y = 0.5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 4, 2);

    this.add(light);
  }

  private async createTarget(mtl: MTLLoader.MaterialCreator) {
    this.objLoader.setMaterials(mtl);
    const modelRoot = await this.objLoader.loadAsync(
      "./Resource/gameResource/OBJ format/targetA.obj"
    );
    modelRoot.rotateY(Math.PI * 0.5);
    return modelRoot;
  }

  private async createBlaster() {
    const mtl = await this.mtlLoader.loadAsync(
      "./Resource/gameResource/OBJ format/blasterG.mtl"
    );
    mtl.preload();

    this.objLoader.setMaterials(mtl);
    const modelRoot = await this.objLoader.loadAsync(
      "./Resource/gameResource/OBJ format/blasterG.obj"
    );
    return modelRoot;
  }

  update() {}
}
