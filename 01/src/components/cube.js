import {
    BoxBufferGeometry,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial
} from "../../vendor/three/build/three.module.js";


export const addCube = (global) => {

    const geometry = new BoxBufferGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({ color: 'purple' });
    const cube = new Mesh(geometry, material);

    // cube.rotation.set(-0.5, -0.1, 0.8);
    const radiansPerSecond = MathUtils.degToRad(30);

    global.scene.add(cube);


    // this method will be called once per frame
    cube.update = (delta) => {
        // increase the cube's rotation each frame
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
    };

    return cube;
}
