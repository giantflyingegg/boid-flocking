export { Boid };

class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 2)); // Ensure this magnitude is enough to see movement
        this.acceleration = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); // Example random acceleration
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) { 
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d); // Weight by distance
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let separation = this.separation(boids);
        let cohesion = this.cohesion(boids);    

        alignment.mult(alignSlider.value());
        separation.mult(separateSlider.value());
        cohesion.mult(cohesionSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(separation);
        this.acceleration.add(cohesion);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(this.maxSpeed);

    }

    show() {    
        strokeWeight(16);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}

