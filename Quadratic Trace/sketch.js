let totWidth = 800; 
let totHeight = 800; 

let upTranslate = 30; 
let rightTranslate = 30; 

let totUnits = 20; 

let timeSlider; 

let p0 = new Point(1.5, 15, "P0"); 
let p1 = new Point(9.2, 4.3, "P1"); 
let p2 = new Point(17, 12, "P2"); 

let q0,q1,r0; 

let copyQ0, copyQ1, copyR0; 

let allPoints = [p0, p1, p2]; 

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

    stroke(255); 
    strokeWeight(2); 

    line(p0.xLoc, p0.yLoc, p1.xLoc, p1.yLoc); 
    line(p1.xLoc, p1.yLoc, p2.xLoc, p2.yLoc); 

    
    
    strokeWeight(1); 
    quadraticBezier(); 

    

    let t = timeSlider.value(); 
    

    copyQ0.x = (1-t)*p0.x + t*p1.x;
    copyQ0.y = (1-t)*p0.y + t*p1.y; 
    copyQ1.x = (1-t)*p1.x + t*p2.x; 
    copyQ1.y = (1-t)*p1.y + t*p2.y; 

    copyR0.x = (1-t)*copyQ0.x + t*copyQ1.x; 
    copyR0.y = (1-t) * copyQ0.y + t * copyQ1.y; 

    copyQ0.secondUpdateCoord(); 
    copyR0.secondUpdateCoord(); 
    copyQ1.secondUpdateCoord(); 
    
    copyQ0.show(); 
    copyQ1.show();
    copyR0.show(); 


    strokeWeight(1); 
    stroke(255); 
    line(copyQ0.xLoc, copyQ0.yLoc, copyQ1.xLoc, copyQ1.yLoc); 

    
}

function quadraticBezier(){

    for(let t = 0; t<1; t+=0.001){

        let q0 = new Point((1-t)*p0.x + t*p1.x, (1-t)*p0.y + t*p1.y, "Q0"); 
        let q1 = new Point((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y, "Q1");
        let r0 = new Point((1-t)*q0.x + t*q1.x, (1-t)*q0.y + t*q1.y, "R0"); 

        copyQ0 = new Point((1-t)*p0.x + t*p1.x, (1-t)*p0.y + t*p1.y, "Q0"); 
        copyQ1 = new Point((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y, "Q1");
        copyR0 = new Point((1-t)*q0.x + t*q1.x, (1-t)*q0.y + t*q1.y, "R0"); 
        
        point(coordToP([r0.x, r0.y])[0], coordToP([r0.x, r0.y])[1]); 



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

