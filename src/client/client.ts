import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'three/examples/jsm/libs/dat.gui.module'
import { cubeRenderer } from './cubeRenderer' 
import { ledCube } from './ledCube'
import { TestPattern } from './animations'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)


camera.position.x = 1.8;
camera.position.y = .5;
camera.position.z = 13;

camera.lookAt(new THREE.Vector3(0,0,0));

var l = new ledCube();
var r = new cubeRenderer(l, scene, 4);
console.log(scene.children.length);

const gui = new GUI()


const cubeFolder = gui.addFolder("Cube");
const cameraFolder = gui.addFolder("Camera");
cubeFolder.open();
cameraFolder.open();
cubeFolder.add(r.ledGroup.position, 'x', -50, 50)
cubeFolder.add(r.ledGroup.position, 'y', -50, 50)
cubeFolder.add(r.ledGroup.position, 'z', -50, 50)
cameraFolder.add(camera.position, 'x', -20, 20)
cameraFolder.add(camera.position, 'y', -20, 20)
cameraFolder.add(camera.position, 'z', -20, 20)


var startFrameUpdate = function () {
    var frameID = setInterval(simpleTestPattern, 250);
}

var simpleTest = function () {
    var c = new ledCube();
    c.faces[1].ledMatrix[7][7] = new THREE.Color(0xFF0000);
    r.loadCubeFrame(c);
}

var basicTestPattern = function() {
    var t = new TestPattern();
    t.BasicPattern(scene);
    var c = 0;
} 

var simpleTestPattern = function () {
    r.ledGroup.children.forEach((item, i) => {
        setTimeout(() => {
            var m = item as THREE.Mesh;
            m.material = new THREE.MeshBasicMaterial({color:0xFF0000});
        }, i * 250);
    });



    // var led = scene.getObjectByName('1_' + x + '_0') as THREE.Mesh;
    // var prevled = scene.getObjectByName('1_' + (x-1).toString() + '_0') as THREE.Mesh;
    
    // if (x <= 7) {
    //     led.material = new THREE.MeshBasicMaterial({color: 0xFF0000});
    //     if (prevled) {
    //         prevled.material = new THREE.MeshBasicMaterial({color:0xFFFFFF});
    //     }
    //     x++;
    // }
    // else {
    //     x = 0;
    //     prevled.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    // }
}


var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
};

var x = 0;
function render() {
    renderer.render(scene, camera)     
}
animate();
//simpleTest();
//startFrameUpdate();
//simpleTestPattern();