import * as THREE from 'three'
import { SphereGeometry } from 'three';
import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';

class cubeRenderer {
    scene: THREE.Scene;
    ledSpacing: number;
    cube: ledCube;
    sphereMatrix: Array<Array<Array<THREE.SphereGeometry>>>;
    

    constructor(cube:ledCube, scene:THREE.Scene, ledSpacing:number) {
        this.scene = scene;
        this.cube = cube;
        this.ledSpacing = ledSpacing;
        var x;
        this.sphereMatrix = new Array<Array<Array<THREE.SphereGeometry>>>();
        for (x=0; x<=7; x++){
            this.sphereMatrix.push(new Array<Array<THREE.SphereGeometry>>());
        }
        
    }

    render() {
        //initialize ledSpheres matrix
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
        var geometry = new THREE.SphereGeometry(.5, 32, 32);
        var f, x, y, z
        //Iterate through faces
            for (f = 0; f <= 7; f++) {
                //Build an 8x8 matrix for each face
                for (x = 0; x <= 7; x++) {
                    //Add an array for each face column
                    this.sphereMatrix[f].push(new Array<THREE.SphereGeometry>());
                    for (y = 0; y <= 7; y++) {
                        var s = new THREE.Mesh(geometry, material);
                        x *= this.ledSpacing;
                        y *= this.ledSpacing;
                        z = (f + 1) * -4;
                        s.position.set(x,y,z)
                        this.sphereMatrix[f][x].push(new SphereGeometry());
                        this.scene.add(s);
                    }
                }
            }

    }

    

    // initSphereMatrix() {
    //     //initialize ledSpheres matrix
    //     var material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    //     var geometry = new THREE.SphereGeometry(.5, 32, 32);
    //     var f, x, y, z
        
    //     //Iterate through faces
    //     for (f = 0; f <= 7; f++) {
    //         //Build an 8x8 matrix for each face
    //         for (x = 0; x <= 7; x++) {
    //             this.ledSpheres[f].push(new Array<THREE.Mesh>());
    //             for (y = 0; y <= 7; y++) {
    //                 var s = new THREE.Mesh(geometry, material);
    //                 x *= this.ledSpacing;
    //                 y *= this.ledSpacing;
    //                 z = (f + 1) * -4;
    //                 s.position.set(x,y,z)
    //                 this.ledSpheres[f][x].push(s);
    //                 this.scene.add(s);
    //             }
    //         }
    //     }
    // }
}

export { cubeRenderer }