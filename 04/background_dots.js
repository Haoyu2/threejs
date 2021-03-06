import * as THREE from "three";

export const createBGDots = (parent) =>{
    const vertices = [];

    for ( let i = 0; i < 10000; i ++ ) {

        const x = THREE.MathUtils.randFloatSpread( 200000 );
        const y = THREE.MathUtils.randFloatSpread( 200000 );
        const z = THREE.MathUtils.randFloatSpread( 200000 );

        vertices.push( x, y, z );

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const material = new THREE.PointsMaterial( { color: 0x888888 } );

    const points = new THREE.Points( geometry, material );

    parent.add(points);
}