import {
    AmbientLight, AxesHelper,
    AxisHelper,
    BoxBufferGeometry,
    Clock,
    Color,
    DirectionalLight, GridHelper, Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from '../vendor/three/build/three.module.js';
import {OrbitControls} from "../vendor/three/examples/jsm/controls/OrbitControls.js";
import {persCam_conf, scene_conf} from "./config.js";

/**
 *
 * @param container
 * @returns {WebGLRenderer}
 */
export const createRenderer = (container) => {
    const renderer = new WebGLRenderer({antialias: true});
    renderer.physicallyCorrectLights = true;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
}

/**
 *
 * @param container
 * @returns {PerspectiveCamera}
 */


export const createCamera = (container) => {
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new PerspectiveCamera(
        persCam_conf.fov, aspect, persCam_conf.near, persCam_conf.far);
    camera.position.set(persCam_conf.x, persCam_conf.y, persCam_conf.z);
    return camera;
}


/**
 *
 * @returns {Scene}
 */
export const createScene = () => {
    const scene = new Scene();
    // scene.background = new Color(scene_conf.background);
    return scene;
}

/**
 *
 * @returns {DirectionalLight}
 */

export const createLight = (scene) => {
    const light = new DirectionalLight('white', 5);
    // const light = new DirectionalLight('white', 8);
    light.position.set(1, 1, 1);
    scene.add(light);
    return light;
}

/**
 *
 * @param container
 * @param camera
 * @param renderer
 */

export const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

/**
 *
 * @returns {Mesh}
 */

export const createCube = () => {
    const geometry = new BoxBufferGeometry(2, 2, 2);

// create a default (white) Basic material
    const material = new MeshBasicMaterial();

// create a Mesh containing the geometry and material
    return new Mesh(geometry, material);
}


const clock = new Clock()

/**
 *
 * @type {Global}
 */
export const Global = class {
    constructor(container) {
        this.container = container;
        this.renderer = createRenderer(container);
        this.camera = createCamera(container);

        container.append(this.renderer.domElement);

        this.scene = createScene();
        createLight(this.scene);

        this.scene.add(new AxesHelper(20),
            new GridHelper(1000, 10, 0x888888, 0x444444));
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)


        this.updatables = [];
        window.addEventListener('resize', () => {
            setSize(this.container, this.camera, this.renderer);
        })
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();
            this.updatables.forEach(obj => obj.update(delta));
            this.render();
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
}

export default {Global};
