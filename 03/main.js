import {Clock, MathUtils, Scene, Vector3, WebGLRenderer} from "three";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {createPlanet, createPoints, createSun} from "./planets.js";
import {createBGDots} from "./background_dots.js";
import {addBall} from "./square.js";


const container = document.querySelector('#scene-container');
const renderer = new WebGLRenderer({antialias: true});
renderer.physicallyCorrectLights = true;
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);


const aspect = window.innerWidth / window.innerHeight;

const cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
cameraPersp.position.set(100, 100, 100);
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
let a = 2, b = 1;
let c = Math.sqrt(a*a - b*b);

window.origin = origin;
const arrowHelper = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    a-c, 0xffff00);

updatables.push(origin);
origin.update = function (delta) {

    this.rotation.y += MathUtils.degToRad(30) * delta;
    arrowHelper.setLength((b*b) / (a - c*Math.cos(this.rotation.y)));



    // let ro = (b*b) / (a - c*Math.cos(this.rotation.y));
    // this.scale.set(ro,ro,ro);
    // this.setRotationFromAxisAngle(
    //     new Vector3(0,1,0),
    //     MathUtils.degToRad(30) * delta
    // )
}

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


const path = new THREE.Path();

path.lineTo( 0, 0.8 );
path.quadraticCurveTo( 0, 1, 0.2, 1 );
path.lineTo( 1, 1 );

const points = path.getPoints();

const geometry_l = new THREE.BufferGeometry().setFromPoints( points );
const material_l = new THREE.LineBasicMaterial( { color: 0xffffff } );

const line = new THREE.Line( geometry_l, material_l );
scene.add( line );


const curve = new THREE.EllipseCurve(
    0,  0,            // ax, aY
    10, 15,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);

const points_e = curve.getPoints( 50 );
const geometry_e = new THREE.BufferGeometry().setFromPoints( points_e );

const material_e = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const ellipse = new THREE.Line( geometry_e, material_e );

scene.add(ellipse);
createBGDots(scene);
createPoints(scene);


// soloar_group.position.set(-50,-50,-50);
const galaxy_group = new THREE.Group();


scene.add(galaxy_group);
// scene.add(soloar_group);

const sun = createSun(galaxy_group, updatables);

const soloar_group = new THREE.Group();
sun.add(soloar_group);

const earth = createPlanet(soloar_group, updatables);
soloar_group.rotateZ(Math.PI / 2);
window.earth = earth;
console.log(earth.position);
const wordp = new THREE.Vector3();
console.log(earth.getWorldPosition(wordp));
console.log(wordp);
galaxy_group.rotateZ(Math.PI / 2);

addBall(scene,camera, updatables);

window.Vector3 = THREE.Vector3;