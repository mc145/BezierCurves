let totWidth = 800; 
let totHeight = 800; 

let upTranslate = 30; 
let rightTranslate = 30; 

let totUnits = 20; 

let timeSlider; 

let p0 = new Point(1.5, 15, "P0"); 
let p1 = new Point(9.2, 4.3, "P1"); 
let p2 = new Point(17, 12, "P2"); 
let p3 = new Point(13.2, 18, "P3"); 

let copyQ0, copyQ1, copyQ2,copyR0,copyR1,copyS0; 

let derivativeS0, copyDS; 

let extremeTs = []; 

let extremePoints = []; 

copyDS = new Point(); 

let allTExtremes = []; 


let allPoints = [p0, p1, p2, p3]; 

function setup(){
    createCanvas(totWidth+100, totHeight+100); 
    timeSlider = createSlider(0,1,0.2, 0.01); 
    
}


function draw(){
    background(14,26,37,255); 

    timeSlider.position(10, totHeight+30); 

    fill(255); 
    noStroke();
    text("t = " + timeSlider.value(),55, totHeight+60); 
    
    //console.log(mouseX, mouseY);
    stroke(255);
    strokeWeight(50); 

    drawCoordinateAxes(); 


    p0.show(); 
    p1.show();
    p2.show(); 
    p3.show(); 

    stroke(255); 
    strokeWeight(2); 

    line(p0.xLoc, p0.yLoc, p1.xLoc, p1.yLoc); 
    line(p1.xLoc, p1.yLoc, p2.xLoc, p2.yLoc); 
    line(p2.xLoc, p2.yLoc, p3.xLoc, p3.yLoc); 

    
    
    strokeWeight(1); 
    cubicBezier(); 

    derivativeCubic(); 

    

    let t = timeSlider.value(); 
    

    copyQ0.x = (1-t)*p0.x + t*p1.x;
    copyQ0.y = (1-t)*p0.y + t*p1.y; 
    copyQ1.x = (1-t)*p1.x + t*p2.x; 
    copyQ1.y = (1-t)*p1.y + t*p2.y; 
    copyQ2.x = (1-t)*p2.x + t*p3.x; 
    copyQ2.y = (1-t)*p2.y + t*p3.y; 

    copyR0.x = (1-t)*copyQ0.x + t*copyQ1.x; 
    copyR0.y = (1-t) * copyQ0.y + t * copyQ1.y; 
    copyR1.x = (1-t)*copyQ1.x + t*copyQ2.x; 
    copyR1.y = (1-t) * copyQ1.y + t * copyQ2.y; 

    copyS0.x = (1-t)*copyR0.x + t * copyR1.x; 
    copyS0.y = (1-t)*copyR0.y + t * copyR1.y; 

    copyDS.x = p0.x * (-3*t*t + 6*t - 3) + p1.x * (3 - 12*t + 9*t*t) + p2.x * (6*t - 9*t*t) + 3*t*t*p3.x; 
    copyDS.y = p0.y * (-3*t*t + 6*t - 3) + p1.y * (3 - 12*t + 9*t*t) + p2.y * (6*t - 9*t*t) + 3*t*t*p3.y;
    copyDS.name = "DS"; 

    copyDS.secondUpdateCoord(); 


    copyQ0.secondUpdateCoord(); 
    copyR0.secondUpdateCoord(); 
    copyQ1.secondUpdateCoord(); 
    copyQ2.secondUpdateCoord(); 
    copyR1.secondUpdateCoord(); 
    copyS0.secondUpdateCoord(); 

    
    // copyQ0.show(); 
    // copyQ1.show();
    // copyQ2.show(); 
    // copyR0.show(); 
    // copyR1.show(); 
    copyS0.show(); 


    

    copyDS.show(); 

    
    extremeTs = computeExtremes(); 


    

    for(let i = 0; i<extremeTs.length; i++){
        let time = extremeTs[i]; 
        extremePoints.push(new Point()); 
        extremePoints[i].x = p0.x * (-3*time*time + 6*time - 3) + p1.x * (3 - 12*time + 9*time*time) + p2.x * (6*time - 9*time*time) + 3*time*time*p3.x; 
        extremePoints[i].y = p0.y * (-3*time*time + 6*time - 3) + p1.y * (3 - 12*time + 9*time*time) + p2.y * (6*time - 9*time*time) + 3*time*time*p3.y;
        
        // console.log(time, extremePoints[i].x, extremePoints[i].y); 
        // noLoop(); 
        extremePoints[i].secondUpdateCoord(); 
        //console.log("EXTREME ", extremeTs[i], extremePoints[i].x, extremePoints[i].y); 
        extremePoints[i].show([0,255,0]); 


    }

    for(let i = 0; i<extremeTs.length; i++){
        allTExtremes.push(new Point()); 
        let t2 = extremeTs[i]; 

        allTExtremes[i].x = (1-t2)*(1-t2)*(1-t2)*p0.x + 3*t2*(1-t2)*(1-t2)*p1.x + 3*t2*t2*(1-t2)*p2.x + t2*t2*t2*p3.x; 
        allTExtremes[i].y = (1-t2)*(1-t2)*(1-t2)*p0.y + 3*t2*(1-t2)*(1-t2)*p1.y + 3*t2*t2*(1-t2)*p2.y + t2*t2*t2*p3.y; 

        
        allTExtremes[i].secondUpdateCoord(); 

        allTExtremes[i].show([0,255,0]); 

    }

    let minx = new Point(1e10, 0), miny = new Point(0, 1e10);
    let maxx = new Point(-1e10, 0), maxy = new Point(0, -1e10);  


    for(let i = 0; i<extremeTs.length; i++){
        let curX = allTExtremes[i].x; 
        let curY = allTExtremes[i].y; 

        if(curX < minx.x){
            minx.x = curX; 
            minx.y = curY; 
        }
        if(curX > maxx.x){
            maxx.x = curX;
            maxx.y = curY; 
        }
        if(curY < miny.y){
            miny.y = curY; 
            miny.x = curX; 
        }
        if(curY > maxy.y){
            maxy.y = curY; 
            maxy.x = curX; 
        }

    }

    let valAtZero = [p0.x, p0.y]; 
    let valAtOne = [p3.x, p3.y]; 

    if(valAtZero[0] < minx.x){
        minx.x = valAtZero[0]; 
        minx.y = valAtZero[1]; 
    }
    if(valAtZero[0]> maxx.x ){
        maxx.x = valAtZero[0]; 
        maxx.y = valAtZero[1]; 
    } 
    if(valAtZero[1] < miny.y){
        miny.y = valAtZero[1]; 
        miny.x = valAtZero[0]; 
    }
    if(valAtZero[1] > maxy.y){
        maxy.y = valAtZero[1]; 
        maxy.x = valAtZero[0]; 
    }

    if(valAtOne[0] < minx.x){
        minx.x = valAtOne[0]; 
        minx.y = valAtOne[1]; 
    }
    if(valAtOne[0]> maxx.x ){
        maxx.x = valAtOne[0]; 
        maxx.y = valAtOne[1]; 
    } 
    if(valAtOne[1] < miny.y){
        miny.y = valAtOne[1]; 
        miny.x = valAtOne[0]; 
    }
    if(valAtOne[1] > maxy.y){
        maxy.y = valAtOne[1]; 
        maxy.x = valAtOne[0]; 
    }

    minx.secondUpdateCoord(); 
    maxx.secondUpdateCoord(); 
    miny.secondUpdateCoord(); 
    maxy.secondUpdateCoord(); 

    minx.show([221,226,59]); 
    miny.show([221,226,59]); 
    maxx.show([221,226,59]); 
    maxy.show([221,226,59]); 

    stroke(221,226,59); 
    strokeWeight(2); 

    line(minx.xLoc, miny.yLoc, minx.xLoc, maxy.yLoc); 
    line(minx.xLoc, miny.yLoc, maxx.xLoc, miny.yLoc); 
    line(minx.xLoc, maxy.yLoc, maxx.xLoc, maxy.yLoc); 
    line(maxx.xLoc, maxy.yLoc, maxx.xLoc, miny.yLoc); 


    
    






    
}

function computeExtremes(){
    let coeffX = [-3*p0.x + 9*p1.x - 9*p2.x + 3*p3.x, 6*p0.x - 12*p1.x + 6*p2.x, 3*p1.x - 3*p0.x]; 

    
    let coeffY = [-3*p0.y + 9*p1.y - 9*p2.y + 3*p3.y, 6*p0.y - 12*p1.y + 6*p2.y, 3*p1.y - 3*p0.y]; 

    //console.log(coeffX); 

    let solX = quadraticEquation(coeffX); 
     let solY = quadraticEquation(coeffY); // t vals 

   


    let allSol = []; 

    for(let i = 0; i<solX.length; i++){
      if(solX[i] >= 0  && solX[i] <= 1){
            let toAdd = solX[i].toFixed(5); 
            toAdd = parseFloat(toAdd); 
            allSol.push(toAdd); 
        } 
    }
    for(let i = 0; i<solY.length; i++){
       if(solY[i] >= 0 && solY[i] <= 1){
            let toAdd = solY[i].toFixed(5); 
            toAdd = parseFloat(toAdd); 
            allSol.push(toAdd); 
        } 
    }

    return allSol; 
    


}

function quadraticEquation(coeff){
    //works
    // -b +- sqrt(b^2 - 4ac)/(2a)

    // let a = coeff[0].toFixed(5);
    // a = parseFloat(a); 
    // let b = coeff[1].toFixed(5); 
    // b = parseFloat(b); 
    // let c = coeff[2].toFixed(5); 
    // c = parseFloat(c); 

    let a = coeff[0];
    let b = coeff[1]; 
    let c= coeff[2]; 

    //console.log(a,b,c); 
   

    return [(-1*b + sqrt(b*b - 4*a*c))/(2*a), (-1*b - sqrt(b*b - 4*a*c))/(2*a)];

}


function derivativeCubic(){

    derivativeS0 = new Point(0,0,"DS"); 
    for(let t = 0; t<=1; t+=0.001){

        derivativeS0.x = p0.x * (-3*t*t + 6*t - 3) + p1.x * (3 - 12*t + 9*t*t) + p2.x * (6*t - 9*t*t) + 3*t*t*p3.x; 
        derivativeS0.y = p0.y * (-3*t*t + 6*t - 3) + p1.y * (3 - 12*t + 9*t*t) + p2.y * (6*t - 9*t*t) + 3*t*t*p3.y;
        
       // console.log(derivativeS0.x, derivativeS0.y); 

        stroke(56,255,248); 
        strokeWeight(2); 
        derivativeS0.secondUpdateCoord(); 
        point(derivativeS0.xLoc, derivativeS0.yLoc); 

    }
}

function cubicBezier(){

    for(let t = 0; t<1; t+=0.001){

        let q0 = new Point((1-t)*p0.x + t*p1.x, (1-t)*p0.y + t*p1.y, "Q0"); 
        let q1 = new Point((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y, "Q1");
        let q2 = new Point((1-t)*p2.x + t*p3.x, (1-t)*p2.y + t*p3.y, "Q2");

        
        let r0 = new Point((1-t)*q0.x + t*q1.x, (1-t)*q0.y + t*q1.y, "R0"); 
        let r1 = new Point((1-t)*q1.x + t*q2.x, (1-t)*q1.y + t*q2.y, "R1"); 

        let s0 = new Point((1-t)*r0.x + t*r1.x, (1-t)*r0.y + t * r1.y, "S0"); 


        copyQ0 = new Point((1-t)*p0.x + t*p1.x, (1-t)*p0.y + t*p1.y, "Q0"); 
        copyQ1 = new Point((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y, "Q1");
        copyQ2 = new Point((1-t)*p2.x + t*p3.x, (1-t)*p2.y + t*p3.y, "Q2");
        copyR0 = new Point((1-t)*q0.x + t*q1.x, (1-t)*q0.y + t*q1.y, "R0"); 
        copyR1 = new Point((1-t)*q1.x + t*q2.x, (1-t)*q1.y + t*q2.y, "R1");
        copyS0 = new Point((1-t)*r0.x + t*r1.x, (1-t)*r0.y + t * r1.y, "S0");
        
        stroke(255,0,0); 
        point(coordToP([s0.x, s0.y])[0], coordToP([s0.x, s0.y])[1]); 



    }
}


function mouseDragged(){
    
    for(let i = 0; i<allPoints.length; i++){
        if(allPoints[i].mouseOn()){
            allPoints[i].xLoc = mouseX; 
            allPoints[i].yLoc = mouseY; 
            allPoints[i].updateCoord(); 
            return; 
        } 
        
    }
    
}



function coordToP(p){
    x = p[0]; 
    y = p[1]; 
    let pixelX = rightTranslate + Math.floor(totWidth/totUnits) * x; 
    let pixelY = (totHeight - upTranslate) - (y * Math.floor(totHeight/totUnits)); 
    
    return [pixelX, pixelY]; 
}





function drawCoordinateAxes(){

    

    stroke(255);
    strokeWeight(2); 

    line(rightTranslate, totHeight-upTranslate, totWidth, totHeight-upTranslate); 
    line(rightTranslate, totHeight-upTranslate, rightTranslate, 0); 
    strokeWeight(10); 
    point(rightTranslate, totHeight-upTranslate); 
    strokeWeight(2); 

    
    for(let i = rightTranslate+Math.floor(totWidth/totUnits); i<=totWidth; i+=(Math.floor(totWidth/totUnits))){

        stroke(255); 
        line(i, totHeight-upTranslate+10, i, totHeight-upTranslate-10); // x-axis unit lines
        let curLineNumber = (i-rightTranslate)/Math.floor(totWidth/totUnits); 
        if(curLineNumber % 5 == 0){
            textAlign(CENTER); 
            fill(255); 
            noStroke(); 
            text(curLineNumber, i, totHeight-upTranslate+22); 
        }

    }

    for(let i = totHeight-upTranslate - Math.floor(totHeight/totUnits); i>=0; i-=Math.floor(totHeight/totUnits)){
        stroke(255); 
        line(rightTranslate - 10, i, rightTranslate + 10, i); // y-axis unit lines
        let curLineNumber = -1* (i-totHeight+upTranslate)/Math.floor(totHeight/totUnits); 

        if(curLineNumber % 5 == 0){
            textAlign(CENTER,CENTER); 
            fill(255); 
            noStroke(); 
            text(curLineNumber, rightTranslate - 20, i); 
        }
    }


}

