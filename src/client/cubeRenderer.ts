import * as THREE from 'three'
import { SphereGeometry } from 'three';
import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';

class cubeRenderer {
    scene: THREE.Scene;
    ledSpacing: number;
    cube: ledCube;
    sphereMatrix: Array<Array<Array<THREE.Mesh>>>;
    

    constructor(cube:ledCube, scene:THREE.Scene, ledSpacing:number) {
        this.scene = scene;
        this.cube = cube;
        this.ledSpacing = ledSpacing;
        var x;
        //Init sphereMatrix
        this.sphereMatrix = new Array<Array<Array<THREE.Mesh>>>();
        for (x=0; x<=7; x++){
            //Init face matrices
            this.sphereMatrix.push(new Array<Array<THREE.Mesh>>());
        }
        this.renderCube();
    }

    renderCube() {
        //initialize ledSpheres matrix
        var f, x, y, z
        //Iterate through faces
        for (f = 0; f <= 7; f++) {
            //Build an 8x8 matrix for each face
            for (x = 0; x <= 7; x++) {
                //Add an array for each face column
                this.sphereMatrix[f].push(new Array<THREE.Mesh>());
                for (y = 0; y <= 7; y++) {
                    var material = new THREE.MeshBasicMaterial( {color: this.cube.faces[f].ledMatrix[x][y]});
                    var geometry = new THREE.SphereGeometry(.5, 32, 32);
                    var s = new THREE.Mesh(geometry, material);
                    x *= this.ledSpacing;
                    y *= this.ledSpacing;
                    z = (f + 1) * -4;
                    s.position.set(x,y,z)
                    this.sphereMatrix[f][x].push(s);
                    this.scene.add(s);
                }
            }
        }
    }

    updateCube(cubeFrame:ledCube) {
        this.cube = cubeFrame;        
        var f, x, y, z
        //Iterate through faces
        for (f = 0; f <= 7; f++) {
            //Iterate through columns
            for (x = 0; x <= 7; x++) {
                //Update leds
                this.sphereMatrix[f].push(new Array<THREE.Mesh>());
                for (y = 0; y <= 7; y++) {
                    this.sphereMatrix[f][x][y].material = new THREE.MeshBasicMaterial( {color: this.cube.faces[f].ledMatrix[x][y]});
                }
            }
        }
    }
}

export { cubeRenderer }