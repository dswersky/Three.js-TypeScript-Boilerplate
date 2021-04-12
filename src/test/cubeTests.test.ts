import { cubeFace } from '../client/ledCube';
import { ledCube } from '../client/ledCube';

test('cubeFace is initialized', () => {
    var face = new cubeFace();
    expect(face.ledMatrix[0].length).toBe(8);
  });