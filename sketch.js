
import Boid from './Boid.js';
console.log(Boid);

const flock = [];

let alignmentSlider, cohesionSlider, separationSlider;

function setup() {

    createCanvas(640, 480);

    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }

    alignmentSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

}

  
function draw() {

    background(51);

    for (let boid of flock) {
        boid.edges();
        boid.flock(boids);
        boid.update();
        boid.show();

    }

  }