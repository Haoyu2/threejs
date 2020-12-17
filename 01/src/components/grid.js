import {GridHelper} from "../../vendor/three/build/three.module.js";
import {grid_conf} from "../config.js";


export const addGrid = (global) => {
    const gridHelper = new GridHelper(
        grid_conf.size,
        grid_conf.divisions,
        grid_conf.colorCenterLine,
        grid_conf.colorGrid
    );

    global.scene.add(gridHelper);

}