var things = [];
var dropping = false;

var counter = 0;

function setup() {
    createCanvas(600, 400);
    background(200);

    button = createButton('go');
    button.position(20, 20);
    button.mousePressed(go);
}

var go = function() {
    dropping = true;
    return false;
};

var thing = function() {
    var newThing = {
        id : counter++
    };

    addPositionProps(newThing);

    var diameter = random(10, 50);
    newThing.diameter = diameter;

    newThing.drawThing = drawThing.bind(newThing);
    newThing.updateThing = updateThing.bind(newThing);
    newThing.detectBorderCollision = detectBorderCollision.bind(newThing);
    newThing.detectThingCollision = detectThingCollision.bind(newThing);

    newThing.drawThing();

    things.push(newThing);
}

var updateThing = function() {
    this.x += this.vx * this.ax;
    this.y += this.vy * this.ay;

    this.detectThingCollision();
    this.detectBorderCollision();
}

function draw() {
    if (dropping) {
        background(200); // erases previously drawn things

        for (var x = 0; x < things.length; x++) {
            things[x].updateThing();
            things[x].drawThing();
        }
    }
}

function addPositionProps(thing) {
    thing.x = mouseX;
    thing.y = mouseY;

    thing.vx = random(-1, 1);
    thing.vy = random(-3, 3);

    thing.ax = 1;
    thing.ay = 1;
}

function detectThingCollision() {
    for (var x = 0; x < things.length; x ++) {
        if (things[x].id != this.id) {
            var thing = this;
            var otherThing = things[x];
    
            var dx = thing.x - otherThing.x;
            var dy = thing.y - otherThing.y;
            
            var distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < thing.diameter/2 + otherThing.diameter/2) {
                //debugger;
                thing.vy = -thing.vy;
                thing.vx = -thing.vx;

                otherThing.vy = -otherThing.vy;
                otherThing.vx = -otherThing.vx;

                thing.x += thing.vx;
                thing.y += thing.vy;

                otherThing.x += otherThing.vx;
                otherThing.y += otherThing.vy;
            }
        }
    }
}

function detectBorderCollision() {
    if (this.x < 0) {
        this.x = 0;
        this.vx = -this.vx;
    }

    if (this.y < 0) {
        this.y = 0;
        this.vy = -this.vy;
    }

    if (this.x > width - this.diameter) {
        this.x = width - this.diameter;
        this.vx = -this.vx;
    }

    if (this.y > height - this.diameter) {
        this.y = height - this.diameter;
        this.vy = -this.vy;
    }
}

function drawThing() {
    return ellipse(this.x, this.y, this.diameter, this.diameter);
}

function mousePressed() {
    if (!(mouseX < 50 && mouseY < 50)) {
        thing();
    }
}