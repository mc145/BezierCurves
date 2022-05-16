function Point(x,y,name){
    this.x = x; 
    this.y = y; 
    this.name = name; 

    this.xLoc = coordToP([x,y])[0]; 
    this.yLoc = coordToP([x,y])[1]; 
    
}





Point.prototype.show = function(color){
    strokeWeight(10);
    if(!color){ 
    stroke(255);
    } 
    if(color){
        stroke(color[0], color[1], color[2]); 
    } 
    point(this.xLoc, this.yLoc);  
    noStroke(); 
    fill(255); 

    text(this.name, this.xLoc, this.yLoc + 15); 
    return; 
}

Point.prototype.mouseOn = function(){
    if(Math.abs(mouseX - this.xLoc) <= 30 && Math.abs(mouseY - this.yLoc) <= 30){
        return true; 
    }
}

Point.prototype.updateCoord = function(){
    this.x = (this.xLoc - rightTranslate)/Math.floor(totWidth/totUnits); 
    this.y = -1 * (this.yLoc - totHeight + upTranslate)/Math.floor(totHeight/totUnits); 
}

Point.prototype.secondUpdateCoord = function(){
    this.xLoc = coordToP([this.x,this.y])[0]; 
    this.yLoc = coordToP([this.x,this.y])[1]; 
}


// function coordToP(p){
//     x = p[0]; 
//     y = p[1]; 
//     let pixelX = rightTranslate + Math.floor(totWidth/totUnits) * x; 
//     let pixelY = (totHeight - upTranslate) - (y * Math.floor(totHeight/totUnits)); 
    
//     return [pixelX, pixelY]; 
// }
