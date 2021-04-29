import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';
import { cubeRenderer } from '../client/cubeRenderer'
import * as fs from 'fs'
import * as THREE from 'three'

class animationFileReader {
    public frames:Array<ledCube>;
    public fileString:string;

    constructor(){
        this.frames = new Array<ledCube>();
        this.fileString = '';
    }

    openFile(fileName:string) {
        this.fileString = fs.readFileSync(fileName, 'utf8');
        return this.fileString.length;
    }

    loadFrames() {
        var fc = 0;
        var x;
        //Get frame count
        fc = this.fileString.length / 3072;
        for (x = 0; x < fc; x++) {
            var l = new ledCube();
            //x * 3072 + x <> x * 3072 + x + 6
            //x * 3072 to x * 3072 + ()
            var frameStr = this.fileString.substring(x * 3072, (x * 3072 + 3072));
            this.frames.push(l);
        }
    }

    loadFrame(index:number) {
        var fc = 0;
        var x;
        //Get frame count
        fc = this.fileString.length / 3072;
        var l = new ledCube();
        if (index <= fc) {
            var frameStr = this.fileString.substring(index * 3072, ((index * 3072) + 3072));
            var x,y,z;
            var ledIndex = 0;
            for (z = 0; z <=7; z++) {
                for (y = 0; y <=7; y++ ) {
                    for (x = 0; x <=7; x++) {
                        //get six characters, convert to hex value
                        //var hex = parseInt(Number('0xF00000').toString(), 10)
                        var hexString = frameStr.substring(ledIndex * 6, (ledIndex * 6) + 6);
                        var hex = parseInt(Number('0x' + hexString).toString(), 10);
                        l.faces[z].ledMatrix[x][y] = new THREE.Color(hex);
                        ledIndex++;
                    }
                }
            }
            this.frames.push(l);
        }
        else { 
            //throw error
        }
        // for (x = 0; x < fc; x++) {
        //     var l = new ledCube();
        //     //x * 3072 + x <> x * 3072 + x + 6
        //     //x * 3072 to x * 3072 + ()
        //     var frameStr = fileBuffer.substring(x * 3072, (x * 3072 + 3072));
        //     this.frames.push(l);
        // }
    }

    ascii_to_hexa(str:string)
    {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n ++) 
        {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }
}

export { animationFileReader }