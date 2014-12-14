// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(50, 50, 400, 400);
paper.canvas.style.backgroundColor = '#f8f8ff';


var nc=5;
var ns=8;
var rad=100;
// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(200, 200, rad);
// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#ffd700");

for (i=0;i<nc;i++)
{
    var a=i*360/nc;
    var elements = paper.set();
    var r1 = paper.rect(200-rad,200-rad,2*rad,2*rad,0);
    //var r2 = paper.rect(50,200,100,15,5);
    
    
    for (j=0;j<ns;j++)
    {
        var line = paper.path( ["M", 200-rad, 200-rad+j*2*rad/ns, "L", 200+rad, 200-rad+j*2*rad/ns ] );
        elements.push(line);

    }
    
    elements.push(r1);

    elements.rotate(a,200,200)  // deprecated

}


