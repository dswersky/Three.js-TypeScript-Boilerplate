import * as THREE from 'three'
import { BoxGeometry, BoxHelper, Mesh, MeshBasicMaterial, Object3D, SphereGeometry } from 'three';
import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';

///Renders an ledCube in a scene
class cubeRenderer {
    scene: THREE.Scene;
    ledSpacing: number;
    cubeFrame: ledCube;
    ledGroup: THREE.Group = new THREE.Group();
    boundingBox: THREE.Box3 = new THREE.Box3();
    boundingCube: THREE.Mesh;


    constructor(cubeFrame:ledCube, scene:THREE.Scene, ledSpacing:number) {
        this.scene = scene;
        this.cubeFrame = cubeFrame;
        this.ledSpacing = ledSpacing;
        var x;
        this.ledGroup.position.y = 0;
        this.ledGroup.position.x = 0;
        this.ledGroup.position.z = 0;

        
        var boundingGeometry = new THREE.BoxGeometry(8,8,8);
        this.boundingCube = new THREE.Mesh(boundingGeometry, new MeshBasicMaterial({color: 0xFF0000, wireframe:true}));
        this.boundingCube.position.x = 0
        this.boundingCube.position.y = 0
        this.boundingCube.position.z = 0
        this.renderCube();
        
        var bb = new BoxHelper(this.ledGroup, 0xFFFFFF);
        var box = new Mesh(bb.geometry, new MeshBasicMaterial({color: 0xFFFFFF}));
        box.visible = true;
        bb = new BoxHelper(box, 0xFFFFFF);
        this.ledGroup.add(bb);
        scene.add(this.ledGroup); 
        this.ledGroup.rotateZ(-Math.PI / 2);
    }

    renderCube() {
        //initialize ledSpheres matrix
        var f, x, y
        var xpos = 0
        var ypos = 0
        var zpos = 0
        //Iterate through faces
        for (f = 0; f <= 7; f++) {
            //Build an 8x8 matrix for each face
            for (x = 0; x <= 7; x++) {
                //Add an array for each face column
                for (y = 0; y <= 7; y++) {
                    var material = new THREE.MeshBasicMaterial( {color: this.cubeFrame.faces[f].ledMatrix[x][y]});
                    var geometry = new THREE.SphereGeometry(.1, 32, 32);
                    var s = new THREE.Mesh(geometry, material);
                    this.ledGroup.add(s);
                    xpos = x - this.ledSpacing;
                    ypos = y - this.ledSpacing;
                    zpos = (f - 4) * -1;
                    s.name = this.ledName(xpos + 4, ypos + 4, (zpos - 4) * -1);
                    s.position.set(xpos,ypos,zpos)
                }
            }
        }
    }


    ledName(x:number,y:number,z:number) {
        return x.toString() + '_' + y.toString() + '_' + z.toString();
    }

    loadCubeFrame(cubeFrame:ledCube) {
        this.cubeFrame = cubeFrame;        
        var f, x, y, z
        //Iterate through faces
        for (z = 0; z <= 7; z++) {
            //Iterate through columns
            for (x = 0; x <= 7; x++) {
                //Update leds
                for (y = 0; y <= 7; y++) {
                    var led = this.scene.getObjectByName(x + '_' + y + '_' + z) as THREE.Mesh;
                    led.material = new THREE.MeshBasicMaterial( {color: this.cubeFrame.faces[z].ledMatrix[x][y]});
                }
            }
        }
    }
}

export { cubeRenderer }