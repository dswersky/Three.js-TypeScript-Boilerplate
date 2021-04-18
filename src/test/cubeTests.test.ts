import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';
import { cubeRenderer } from '../client/cubeRenderer'
import * as THREE from 'three'

test('cubeFace is initialized', () => {
    var face = new cubeFace();
    expect(face.ledMatrix[7].length).toBe(8);
  });

test('cube is initialized', () =>{
  var cube = new ledCube();
  expect(cube.faces.length).toBe(8);
});

test('cube addressable led', ()=> {
  var c = new ledCube();
  var color = new THREE.Color(0x000000);
  expect(c.faces[0].ledMatrix[7][7]).toEqual(color);
});

test('set cube color', ()=>{
  var c = new ledCube();
  var ledColor = 0xFFFFFF;
  c.setColor(ledColor);
  var color = new THREE.Color(ledColor);
  expect(c.faces[7].ledMatrix[7][7]).toEqual(color);
});

test('cubeRenderer inits sphere matrix', ()=> {
  var c = new ledCube();
  var r = new cubeRenderer(c, null, 4);
  expect(r.ledSpheres[7].length).toBe(8);
});