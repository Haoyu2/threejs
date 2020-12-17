import {
    Clock,
    Color,
    DirectionalLight,
    PerspectiveCamera,
    Scene, WebGLRenderer
} from '../vendor/three/build/three.module.js';


export const createRenderer  = () =>{
    const renderer = new WebGLRenderer({antialias: true});
    renderer.physicallyCorrectLights = true;
    return renderer;
}

export const createCamera = () =>{
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(10, 10, 10);
    return camera;
}
export const createScene = () =>{
    const scene = new Scene();
    scene.background = new Color('skyblue');
    return scene;
}

export const createLight = () =>{
    const light = new DirectionalLight('white', 8);
    light.position.set(100, 100, 100);
    return light;
}

export const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};
const clock = new Clock();
class Global{
    constructor(container) {
        this.container = container;
        this.renderer = createRenderer();
        this.camera = createCamera();
        this.scene = createScene();
        this.light = createLight();
        this.scene.add(this.light);
        this.updatables = [];
        window.addEventListener('resize', ()=>{
            setSize(this.container,this.camera, this.renderer);
        })
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();
            this.updatables.forEach(obj => obj.tick(delta));
            this.render();
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
}

export default {Global};
