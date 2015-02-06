

  function draw_linear_array(paper,ns,nc,bl,fv,isdithered,isrand)
{
  var centr=paper.width/2;
  // Creates canvas
  //var paper = Raphael("raph", centr*2, centr*2);


  // Creates circle at x, y with radius rad
  //var circle = paper.circle(centr, centr, rad);
  // Sets the fill attribute of the circle to white
  //circle.attr("fill", "#a0ee90");

  var colors = ['red', 'green', 'blue', 'magenta', 'orange'];


  var locStart=centr-bl/2;
  var locEnd=centr+bl/2;

  //At least one cam?
  if (nc>=1)
  {
    draw_vertical_camera(paper,locStart,ns,fv,isdithered,colors[0])
  }
  //At least two?
  if (nc>=2)
  {
    draw_vertical_camera(paper,locEnd,ns,fv,isdithered,colors[1])
  }
  //The rest in between
  var spacing=bl/(nc-1);
  for (i=1;i<nc-1;i++)
  {
    if (isrand)
    {
      var loc=locStart+bl*Math.random();
    }
    else
    {

      var loc=locStart+i*spacing;
    }
    draw_vertical_camera(paper,loc,ns,fv,isdithered,colors[(i+1)%colors.length])


  }

  //Drawing the region of interest as a circular sector
  var a=Math.PI*fv/360;
  var tan_a=Math.tan(a);
  var zlow=(bl/2)/(tan_a);
  var zradius=ns*(0.5*bl)*(1/(2*tan_a))-zlow;
  draw_sector(paper,paper.width/2,paper.height-zlow,zradius,90-fv/2,90+fv/2,{"stroke":"gray","stroke-width":3});


}


//Draws inly pinhole cameras
function draw_vertical_camera(paper,loc,ns,fv,isdithered,raycolor)
{

  var a=Math.PI*fv/360;
  var tan_a=Math.tan(a);
  //var x=rad/tan_a;
  //var f=Math.sqrt(r*r+x*x)-r;
  var zmax=paper.height/100;

  var sensorStart=loc-paper.height*tan_a;
  var sensorEnd=loc+paper.height*tan_a;




  {


    //Drawing the triangle for NOP
    var line1 = paper.path( ["M", loc, paper.height, "L", sensorStart, 0] );
    var line2 = paper.path( ["M", loc, paper.height, "L", sensorEnd, 0] );
    var line3 = paper.path( ["M",sensorStart, 0, "L", sensorEnd, 0] );

    line1.attr({"stroke":raycolor,"stroke-width":1});
    line2.attr({"stroke":raycolor,"stroke-width":1});


  }

  var q=(sensorEnd-sensorStart)/ns;

  var elements = paper.set();


  //var tri   = paper.path( ["M", centr+rad+f, centr, "L", centr+rad, centr+h1 , "L", centr+rad, centr-h1] );
  //tri.attr({"stroke-width": 0, fill: "yellow"});
  var holder=sensorStart;
  //var holder2=centr-h2;

  //for (j=1;j<ns-1;j++)
  while (sensorEnd-holder>q)
  {
    if (isdithered)
    {
      var rnd_jump=Math.random()*q;
    }
    else
    {
      var rnd_jump=q;
    }
    holder=holder+rnd_jump;


    {
      var line = paper.path( ["M", loc, paper.height, "L", holder,0 ] );
    }

    line.attr({"stroke":raycolor,"stroke-width":1});
    elements.push(line);

  }


  elements.push(line1);
  elements.push(line2);
  elements.push(line3);

  //elements.rotate(an,centr,centr) ; // deprecated
}




  function DrawLinCam(paper)
{
    var nc=parseInt($( "#nc" ).val());
    var ns=parseInt($( "#ns" ).val());
    var fv=parseInt($( "#fov" ).val());
    var bl=parseFloat($( "#bl" ).val());
    var zmax=parseInt($( "#zmax" ).val());
    var isdithered=$('#dithered:checked').length>0;
    var isrand=$('#shuffled:checked').length>0;



    //console.log('Here '+(isdithered)+'8');
    //window.alert('45');

    //console.log(typeof(parseInt(zmax)));

    var paperWidth=Math.min(Math.floor($( "#mainpage" ).width()*0.95),9000);
    var paperHeight=500;
    bl=bl*paperHeight/zmax;

    paper.setSize(paperWidth,paperHeight);
    paper.clear();
    paper.canvas.style.backgroundColor = '#f1f09f';

    //draw_vertical_camera(paper,paper.width/3,ns,fv,isdithered)
    draw_linear_array(paper,ns,nc,bl,fv,isdithered,isrand)


}


function draw_sector(paper,cx, cy, r, startAngle, endAngle, params) {
  var rad = Math.PI / 180;
  var x1 = cx + r * Math.cos(-startAngle * rad),
  x2 = cx + r * Math.cos(-endAngle * rad),
  y1 = cy + r * Math.sin(-startAngle * rad),
  y2 = cy + r * Math.sin(-endAngle * rad);
  paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
}
