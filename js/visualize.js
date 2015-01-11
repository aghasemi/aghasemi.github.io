function draw_array(paper,ns,nc,fv,rad,dim,isorth,isdithered,isrand)
      {
        var centr=dim/2;
        // Creates canvas
        //var paper = Raphael("raph", centr*2, centr*2);
        paper.canvas.style.backgroundColor = '#f1f09f';


        // Creates circle at x, y with radius rad
        var circle = paper.circle(centr, centr, rad);
        // Sets the fill attribute of the circle to white
        circle.attr("fill", "#a0ee90");

        for (i=0;i<nc;i++)
        {
          if (isrand)
          {
              console.log('Shuffled');
              var an=360*Math.random();
          }
          else
          {
            var an=i*360/nc;
          }
          draw_camera(paper,an,ns,fv,rad,dim,isorth,isdithered);

        }

      }

   /* function draw_op_dithered(paper,ns,nc,rad,dim)
    {
      var centr=dim/2;
      var q=2*rad/ns;
      // Creates canvas
      //var paper = Raphael("raph", centr*2, centr*2);
      paper.canvas.style.backgroundColor = '#f1f09f';


      // Creates circle at x, y with radius rad
      var circle = paper.circle(centr, centr, rad);
      // Sets the fill attribute of the circle to white
      circle.attr("fill", "#a0ee90");

      for (i=0;i<nc;i++)
      {
        var an=i*360/nc;
        
          draw_camera(paper,an,ns,0,rad,dim,true,true);
      }

    }
  function draw_nop_dithered(paper,ns,nc,fv,rad,dim)
  {
    
    // Creates canvas
    //var paper = Raphael("raph", centr*2, centr*2);
    paper.canvas.style.backgroundColor = '#f1f09f';

    var centr=dim/2;

    // Creates circle at x, y with radius rad
    var circle = paper.circle(centr, centr, rad);
    // Sets the fill attribute of the circle to white
    circle.attr("fill", "#a0ee90");

    for (i=0;i<nc;i++)
    {
      var an=i*360/nc;
      draw_camera(paper,an,ns,fv,rad,dim,false,true);
    }

  }
    


    function draw_nop(paper,ns,nc,fv,rad,dim)
  {
    var centr=dim/2;
    // Creates canvas
    //var paper = Raphael("raph", centr*2, centr*2);
    paper.canvas.style.backgroundColor = '#f1f09f';


    // Creates circle at x, y with radius rad
    var circle = paper.circle(centr, centr, rad);
    // Sets the fill attribute of the circle to white
    circle.attr("fill", "#a0ee90");

    for (i=0;i<nc;i++)
    {
      var an=i*360/nc;
      draw_camera(paper,an,ns,fv,rad,dim,false,false);

    }

  }

*/
    function draw_camera(paper,an,ns,fv,rad,dim,isorth,isdithered)
{
      var centr=dim/2;
      var r=rad;
      var a=Math.PI*fv/360;
      var tan_a=Math.tan(a);
      var x=rad/tan_a;
      var f=Math.sqrt(r*r+x*x)-r;
      
      if (isorth)
      {
          var h1=r;
          var h2=r;
      }
      else
      {
          var h1=f*tan_a;
          var h2=(2*r+f)*tan_a;
      }
    
      var q=2*h1/ns;
  
      var elements = paper.set();

      //Drawing the trapezoid
      var line1 = paper.path( ["M", centr+rad, centr+h1, "L", centr-rad, centr+h2 ] );
      var line2 = paper.path( ["M", centr+rad, centr-h1, "L", centr-rad, centr-h2 ] );
      var line3 = paper.path( ["M", centr+rad, centr+h1, "L", centr+rad, centr-h1 ] );
      line3.attr({"stroke":"#0000FF","stroke-width":3});

      var line4 = paper.path( ["M", centr-rad, centr+h2, "L", centr-rad, centr-h2 ] );
      //var tri   = paper.path( ["M", centr+rad+f, centr, "L", centr+rad, centr+h1 , "L", centr+rad, centr-h1] );
      //tri.attr({"stroke-width": 0, fill: "yellow"});
      var holder=centr-h1;
      var holder2=centr-h2;

        //for (j=1;j<ns-1;j++)
        while (centr+h1-holder>q)
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
          holder2=holder2+rnd_jump*h2/h1;
          var line = paper.path( ["M", centr+rad, holder, "L", centr-rad, holder2 ] );
          line.attr({"stroke":"#FF00FF","stroke-width":1});
          elements.push(line);

        }


      elements.push(line1);
      elements.push(line2);
      elements.push(line3);
      elements.push(line4);
      //elements.push(tri);

      elements.rotate(an,centr,centr) ; // deprecated
}




  function effectiveDeviceWidth() {
    var deviceWidth = window.orientation == 0 ? window.screen.width : window.screen.height;
    // iOS returns available pixels, Android returns pixels / pixel ratio
    // http://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html
    if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
        deviceWidth = deviceWidth / window.devicePixelRatio;
    }
    return deviceWidth;
  }

  function Draw(paper,dim,rad)
	{
	 		var nc=$( "#nc" ).val();
    		var ns=$( "#ns" ).val();
      		var fv=$( "#fov" ).val();
            var ispara=$('input:radio[name=proj]:checked').val().trim().indexOf('-1')>-1;
            var isdithered=$('#dithered:checked').length>0;
            var isrand=$('#shuffled:checked').length>0;
      		console.log('Here '+(isdithered)+'8');
      		//window.alert('45');
      		paper.clear();
            if (ispara)
            {
                $( "#fov" ).slider("disable");

            }
            else{
                $( "#fov" ).slider("enable");

            }
        
            draw_array(paper,ns,nc,fv,rad,dim,ispara,isdithered,isrand);



	}
