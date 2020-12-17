import {Clock, Scene, Vector3, WebGLRenderer} from "./vendor/three/build/three.module.js";
import * as THREE from "../01/vendor/three/build/three.module.js";
import {OrbitControls} from "../01/vendor/three/examples/jsm/controls/OrbitControls.js";
import {TransformControls} from "../01/vendor/three/examples/jsm/controls/TransformControls.js";


const container = document.querySelector('#scene-container');
const renderer = new WebGLRenderer({antialias: true});
renderer.physicallyCorrectLights = true;
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);


const aspect = window.innerWidth / window.innerHeight;

const cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
cameraPersp.position.set(3, 3, 3);
cameraPersp.lookAt(0, 0, 0);

let camera = cameraPersp;


const scene = new Scene();
scene.add(new THREE.GridHelper(4, 10, 0x888888, 0x444444));
scene.add(new THREE.AxesHelper(10));


// const transformControls = new TransformControls( camera, renderer.domElement );
//
//
// transformControls.attach( arrowHelper );
// scene.add( transformControls );
// transformControls.addEventListener('change', () => renderer.render(scene, camera));
// transformControls.setSpace('local');


const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1);
scene.add(light);


const updatables = [];
const orbit = new OrbitControls(camera, renderer.domElement);
updatables.push(orbit);
// updatables.push(arrowHelper);

const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    // color: 0xffff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    // wireframeLinewidth: 10
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
const box = new THREE.Box3();
box.setFromCenterAndSize(new THREE.Vector3(0, -1, -1), new THREE.Vector3(0, 1, 1));

const helper = new THREE.Box3Helper(box, 0xffff00);
scene.add(helper);

const origin = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.05, 32, 32),
    new THREE.MeshBasicMaterial({color: 0xffff00}));
scene.add(origin);

window.origin = origin;
const arrowHelper = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    2, 0xffff00);

// origin.update = (delta) => {
//     origin.setRotationFromAxisAngle(
//         new Vector3(0,1,0),
//         degToRad()
//     )
// }


origin.add(arrowHelper);
// scene.add(origin);
// scene.add(arrowHelper);
window.arrow = arrowHelper;
window.scene = scene;
const clock = new Clock();
renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    updatables.forEach(obj => obj.update(delta));
    renderer.render(scene, camera);
})