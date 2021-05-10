import * as THREE from 'three'

/// Contains the led colors for a single animation frame
class ledCube {
    faces:Array<cubeFace>;

    constructor() {
        var x;
        this.faces = new Array<cubeFace>();
        for (x = 0; x <= 7; x++) {
            this.faces.push(new cubeFace());
        }
        this.setColor(0x000000);
    }

    setColor(ledColor:number) {
        this.faces.forEach((item, index) => {
            item.setColor(ledColor);
        });
    }
}

class cubeFace {
    //Each face is an 8x8 matrix of led colors
    ledMatrix:Array<Array<THREE.Color>>

    constructor() {
        this.ledMatrix = new Array<Array<THREE.Color>>();
        this.initFace(0xFFFFFF);    
    }

    initFace(ledColor:number) {
        var x = 0;
        var y = 0;

        for (x = 0; x <= 7; x++) {
            this.ledMatrix.push(new Array<THREE.Color>());
            for (y = 0; y <= 7; y++) {
                this.ledMatrix[x].push(new THREE.Color(ledColor));
            }
        }
    }

    setColor(ledColor:number) {
        var x,y = 0;
        for (x = 0; x <= 7; x++) {
            for (y = 0; y <= 7; y++) {
                this.ledMatrix[x][y] = new THREE.Color(ledColor);
            }
        }
    }
}

export {ledCube}
export {cubeFace} 