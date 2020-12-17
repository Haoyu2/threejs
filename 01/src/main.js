import {addCube} from "./components/cube.js";
import {Global} from "./global.js";

const global = new Global(document.querySelector('#scene-container'));

function add2scene() {
    const components = [addCube];
    components.forEach(component =>component(global));
}

add2scene();

// global.render();
global.start();














