import * as THREE from 'three'
import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';
import { cubeRenderer } from './cubeRenderer' 

class TestPattern {
    frames:Array<ledCube>;

    constructor() {
        this.frames = new Array<ledCube>();
    }

    BasicPattern(scene:THREE.Scene) {
        var renderer: cubeRenderer;

        var f;
        for (f = 0; f < 512; f++) {
            this.frames.push(new ledCube());
        }

        var x, y, z, c;
        c = 0;
        for (x = 0; x < 8; x++) {
            for (y = 0; y < 8; y++) {
                for (z = 0; z < 8; z++) {
                    this.frames[c].faces[z].ledMatrix[x][y] = new THREE.Color(0xFF0000);
                    c++
                }
            }
        }

        renderer = new cubeRenderer(this.frames[0], scene, 4);
        this.frames.forEach(() => {
            
        });
    }
}

export { TestPattern }