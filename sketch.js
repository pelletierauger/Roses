var canvas;
var ctx;
var r, a, n, theta, x, y;
var al, sc;
var drawCount = 0;
var osc = 0;
var looping = true;
var exporting = false;
var cols = [{
    offset: 0,
    r: 255,
    g: 150,
    b: 0
}, {
    offset: 0.25,
    r: 255,
    g: 150,
    b: 55
}, {
    offset: 0.8,
    r: 55,
    g: 250,
    b: 0
}];

function setup() {
    canvas = createCanvas(550, 550);
    // canvas = createCanvas(min(windowHeight * 16 / 9, min(1440, windowWidth)), min(windowHeight, min(1440, windowWidth) * 9 / 16));
    ctx = canvas.drawingContext;
    background(240, 240, 190);
    noStroke();
    scale(0.1, 0.1);
    // noLoop();
    // stroke(155, 100, 100);
    fill(170, 200, 90, 150);
    n = 1;
    a = 250;
    if (!looping) {
        noLoop();
    }
}

function draw() {
    var magicValue = sin(2 / 100) - sin(1 / 100);
    // background(240, 240, 190);
    // background(0);
    osc = sin(frameCount / 50);
    var al2 = map(10 - (drawCount / 2), 10, 0, 255, 0);
    var sc2 = map(al2, 255, 0, 1, 0.01);
    var blue2 = map(abs(osc), 0, 1, 0, 255);
    var dif2 = map(al2, 0, 255, 255, 0);

    var osc3 = cos(frameCount / 50);
    var al3 = map(10 - (drawCount / 2), 10, 0, 255, 0);
    var sc3 = map(al3, 255, 0, 1, 0.01);
    var blue3 = map(abs(osc3), 0, 1, 0, 255);
    var dif3 = map(al3, 0, 255, 155, 0);


    translate(width / 2, height / 2);

    // rotate(frameCount / 100);

    cols = [{
        offset: 0,
        r: min(round(al2 * 2), 255),
        g: min(round(dif2 * 2), 255),
        b: round(blue2)
    }, {
        offset: 0.25,
        r: round(al2 * 2),
        g: round(dif2),
        b: round(blue2 * 2)
    }, {
        offset: 0.7,
        r: round(max(dif3 * 0.5, 255)) / 1.5,
        g: round(al3 / 4),
        b: round(blue3 / 2)
    }];
    for (var i = 0; i < cols.length; i++) {
        cols[i] = adjustLevels(-80, 0, 0, cols[i]);
        // cols[i] = adjustHsv(180, 0, 0, cols[i]);
    }

    printBackgroundGradient();

    var magicRotate2 = map(cos(frameCount / 50), -1, 1, 0, TWO_PI / n / 2);
    rotate(-magicRotate2);

    var noi = noise(frameCount / 100) * 280;
    noi = 0;
    // var scc = map(cos(frameCount / 25), -1, 1, 1.05, 1);
    // scale(scc, scc);
    for (var j = 0; j < 20; j++) {
        push();
        // rotate(drawCount * (frameCount * magicValue));
        // rotate(TWO_PI);
        var magicRotate = map(cos(frameCount / 50), -1, 1, 0, TWO_PI / n / 2);
        rotate(-magicRotate * drawCount);

        al = map(10 - (drawCount / 2), 10, 0, 155, 0);
        sc = map(al, 255, 0, 1, 0.01);
        var blue = map(abs(osc), 0, 1, 0, 155);
        var dif = map(al, 0, 255, 255, 0);

        scale(sc * 1.7, sc * 1.7);
        // fill(al, 200, blue, 255);

        var color = {
            r: dif,
            g: al,
            b: blue
        };
        var coll = map(j, 0, 5, 0.5, 1);
        coll = constrain(coll, 0.5, 1);
        color = adjustLevels(-80, 0, 0, color);
        // color = adjustHsv(-80, 0, 0, color);

        // fill(lerp(color.g, min(round(blue2 * 2), 255), coll), lerp(color.r, min(round(al2 * 2), 255), coll), lerp(color.b, round(dif2), coll), 255);
        fill(color.g, color.r, color.b, 255);
        // fill(blue, dif, al, 255);
        // var scala = 0.95;
        // stroke(al * scala, 200 * scala, blue * scala, 255);
        // blendMode(ADD);
        // stroke(155, 100, 100, al / 2);
        // noStroke();
        // if (alpha < 0) {
        //   noLoop();
        // }
        var total = 500;
        var num = TWO_PI / total;
        beginShape();
        for (var i = 0; i < TWO_PI * 1; i += num) {
            theta = i;
            r = a * sin(n * theta);
            x = r * cos(theta);
            y = r * sin(theta);
            // ellipse(x, y, 1, 1);
            // noi += noise(sin(theta))*100/1000;
            vertex(x + noi, y + noi);
        }
        endShape(CLOSE);
        pop();
        drawCount++;
    }
    drawCount = 0;
    if (exporting) {
        frameExport();
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
}

function printBackgroundGradient() {
    var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width);
    // var cols = globalValues.gradient;
    for (var i = 0; i < cols.length; i++) {
        gradient.addColorStop(cols[i].offset, "rgba(" + cols[i].r + ", " + cols[i].g + ", " + cols[i].b + ",1)");
    }
    ctx.fillStyle = gradient;
    rect(-width * 0.5, -height * 0.5, width, height);
}

function frameExport() {
    var formattedFrameCount = "" + frameCount;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    save("mathrose" + formattedFrameCount + ".png");
}
