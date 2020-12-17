
const color_pallets = {
    scene : 'skyblue',

}


/**
 * Initial values for the perspective camera settings
 *
 * @type {{far: number, aspect: number, x: number, y: number, z: number, near: number, fov: number}}
 */
export const persCam_conf = {
    fov:35, aspect:1.3, near:0.1, far: 100,
    x:10,y:10,z:10
};

export const scene_conf = {
    background : 'skyblue'
}



export const grid_conf = {
    size: 50, divisions: 50, colorCenterLine : 0x888888, colorGrid : 0x444444,
}