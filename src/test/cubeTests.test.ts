import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';
import { cubeRenderer } from '../client/cubeRenderer'
import { TestPattern } from '../client/animations'
import { animationFileReader } from '../client/filereader'
import * as fs from 'fs'

import * as THREE from 'three'
import { FileLoader } from 'three';

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
  var color = new THREE.Color(0xFFFFFF);
  expect(c.faces[0].ledMatrix[7][7]).toEqual(color);
});

test('set cube color', ()=>{
  var c = new ledCube();
  var ledColor = 0xFFFFFF;
  c.setColor(ledColor);
  var color = new THREE.Color(ledColor);
  expect(c.faces[7].ledMatrix[7][7]).toEqual(color);
});

test('cubeRenderer loads scene', ()=> {
  var c = new ledCube();
  var s = new THREE.Scene();
  var r = new cubeRenderer(c, s, 4);
  expect(s.children.length).toBe(1);
});

test('animations testpattern loads', ()=> {
  var t = new TestPattern();
  var s = new THREE.Scene();
  t.BasicPattern(s);
  expect(t.frames.length).toBe(512);
});

test('animations testpattern color assignment correct', ()=> {
  var t = new TestPattern();
  var s = new THREE.Scene();
  t.BasicPattern(s);
  var c = new THREE.Color(0xFF0000);
  expect(t.frames[511].faces[7].ledMatrix[7][7]).toEqual(c)
});

test('renderer loads ledCube frame', () => {
  var s = new THREE.Scene();
  var r = new cubeRenderer(new ledCube(), s, 4);
  var l = new ledCube();
  l.faces[7].ledMatrix[7][7] = new THREE.Color(0xFF0000);
  r.loadCubeFrame(l);
  var led = s.getObjectByName("7_7_7") as THREE.Mesh;
  expect(led.name).toBe("7_7_7");
});

test('fileReader reads file', async() =>{
  var f = new animationFileReader();
  expect(f.openFile(__dirname + '/test.rgbCUBE8')).toBe(307200);  
});

test('filereader loads frame', ()=>{
  var f = new animationFileReader();
  f.frames = new Array<ledCube>(); //clear frames collection
  f.openFile(__dirname + '/test.rgbCUBE8');
  f.loadFrame(0);
  expect(f.frames[0].faces[0].ledMatrix[0][0]).toEqual(new THREE.Color(0xF00000));
  expect(f.frames[0].faces[0].ledMatrix[1][0]).toEqual(new THREE.Color(0x000000));
});

test('filereader loads all frames', () => {
  var f = new animationFileReader();
  f.openFile(__dirname + '/test.rgbCUBE8');
  f.loadFrames();
  expect(f.frames.length).toBe(100);
});