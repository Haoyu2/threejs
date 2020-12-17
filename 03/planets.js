import {MathUtils} from "three";
import * as THREE from 'three';


export const createSun = (parent, updatables) => {
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        size: 10,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.theta = 0.0;
    sphere.radius = 25;
    sphere.position.set(sphere.radius, 0, 0);
    parent.add(sphere);


    const traces = [], postions = [], num = 500;

    for (let i = 0; i < num; i++) {
        traces.push(createPoint(parent, [sphere.radius, 0, 0], 'red'));
        postions.push([sphere.radius, 0, 0]);
    }

    sphere.i = 0;
    let j = 2;
    sphere.update = (delta) => {
        sphere.theta += MathUtils.degToRad(30) * delta;
        let x = Math.cos(sphere.theta) * sphere.radius * 5,
            z = Math.sin(sphere.theta) * sphere.radius * 4;
        sphere.position.set(x, 0, z);
        sphere.i = (sphere.i + 1) % j;
        // console.log(sphere.i);
        if (sphere.i == j - 1) {

            postions.shift();
            postions.push([x, 0, z]);
            // console.log(sphere.position);
            for (let i = num - 1; i >= 0; i--) {
                traces[i].position.set(postions[i][0],
                    postions[i][1],
                    postions[i][2],
                );
                traces[i].translateX(-sphere.radius);
            }
        }

    }


    updatables.push(sphere);

    return sphere;
}


export const createPlanet = (parent, updatables) => {
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.theta = 0.0;
    sphere.radius = 5;
    sphere.position.set(sphere.radius, 0, 0);
    parent.add(sphere);


    const traces = [], postions = [], num = 100;

    for (let i = 0; i < num; i++) {
        traces.push(createPoint(parent, [sphere.radius, 0, 0], 'green'));
        postions.push([sphere.radius, 0, 0]);
    }


    const world_traces = [], world_positions = [], world_num = 100;
    for (let i = 0; i < num; i++) {
        world_traces.push(createPoint(parent.parent, [0, 0, 0], 'green'));
        world_positions.push([0, 0, 0]);
    }


    sphere.i = 0;
    let j = 5;
    sphere.update = (delta) => {
        sphere.theta += MathUtils.degToRad(20) * delta;
        let x = Math.cos(sphere.theta) * sphere.radius * 5,
            z = Math.sin(sphere.theta) * sphere.radius * 4;
        sphere.position.set(x, 0, z);
        sphere.i = (sphere.i + 1) % j;
        // console.log(sphere.i);

        const world_position = new THREE.Vector3();
        sphere.getWorldPosition(world_position);


        if (sphere.i == j - 1) {

            postions.shift();
            postions.push([x, 0, z]);
            // console.log(sphere.position);

            world_positions.shift();
            world_positions.push([world_position.x,
                world_position.y,
                world_position.z]);

            for (let i = num - 1; i >= 0; i--) {
                traces[i].position.set(postions[i][0],
                    postions[i][1],
                    postions[i][2],
                );
                traces[i].translateX(-sphere.radius);

                // world_traces[i].position.set(
                //     world_positions[i][0],
                //     world_positions[i][1],
                //     world_positions[i][2],
                //     );
                // // traces[i].translateX(-sphere.radius - 25);


            }
        }

    }

    window.sphere = sphere;

    updatables.push(sphere);
    return sphere;
}


const createPoint = (parent, vertice, color) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertice, 3));

    const material = new THREE.PointsMaterial({color: color});
    const point = new THREE.Points(geometry, material)
    parent.add(point);

    return point;

}

export const createPoints = (parent) => {
    const colorArray = [new THREE.Color(0xff0080), new THREE.Color(0xffffff), new THREE.Color(0x8000ff)];
    const positions = [];
    const colors = [];

    for (let i = 0; i < 100; i++) {

        positions.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);

        const clr = colorArray[Math.floor(Math.random() * colorArray.length)];

        colors.push(clr.r, clr.g, clr.b);

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({size: 4, vertexColors: true, depthTest: false, sizeAttenuation: false});

    const mesh = new THREE.Points(geometry, material);
    parent.add(mesh);
}

