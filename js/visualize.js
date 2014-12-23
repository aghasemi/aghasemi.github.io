function draw_op(paper,ns,nc,rad,dim)
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
          var a=i*360/nc;
          var elements = paper.set();
          var r1 = paper.rect(centr-rad,centr-rad,2*rad,2*rad,0);
          var detector = paper.path( ["M", centr+rad, centr+rad, "L", centr+rad, centr-rad ] );
          detector.attr({"stroke":"#0000FF","stroke-width":3});


          for (j=0;j<ns;j++)
          {
            var line = paper.path( ["M", centr-rad, centr-rad+j*2*rad/ns, "L", centr+rad, centr-rad+j*2*rad/ns ] );
            line.attr({"stroke":"#FF00FF","stroke-width":1});
            elements.push(line);

          }

          elements.push(r1);
          elements.push(detector);

          elements.rotate(a,centr,centr); // deprecated

        }

      }

    function draw_op_dithered(paper,ns,nc,rad,dim)
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
        var a=i*360/nc;
        var elements = paper.set();
        var r1 = paper.rect(centr-rad,centr-rad,2*rad,2*rad,0);

        var detector = paper.path( ["M", centr+rad, centr+rad, "L", centr+rad, centr-rad ] );
        detector.attr({"stroke":"#0000FF","stroke-width":3});

        //Pointer to the current quantization threshold line
        var holder=centr-rad;
        //for (j=1;j<ns-1;j++)
        while (centr+rad-holder>q)
        {
          holder=holder+Math.random()*q;
          var line = paper.path( ["M", centr-rad, holder, "L", centr+rad, holder ] );
          line.attr({"stroke":"#FF00FF","stroke-width":1});
          elements.push(line);

        }

        elements.push(r1);
        elements.push(detector);

        elements.rotate(a,centr,centr) ; // deprecated

      }

    }
  function draw_nop_dithered(paper,ns,nc,fv,rad,dim)
  {
    var centr=dim/2;
    var r=rad;
    var a=Math.PI*fv/360;
    var tan_a=Math.tan(a);
    var x=rad/tan_a;
    var f=Math.sqrt(r*r+x*x)-r;

    var h1=f*tan_a;
    var h2=(2*r+f)*tan_a;

    var q=2*h1/ns;

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
          var rnd_jump=Math.random()*q;
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

  }

    function draw_nop(paper,ns,nc,fv,rad,dim)
  {
    var centr=dim/2;
    var r=rad;
    var a=Math.PI*fv/360;
    var tan_a=Math.tan(a);
    var x=rad/tan_a;
    var f=Math.sqrt(r*r+x*x)-r;

    var h1=f*tan_a;
    var h2=(2*r+f)*tan_a;
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
      var elements = paper.set();

      var line1 = paper.path( ["M", centr+rad, centr+h1, "L", centr-rad, centr+h2 ] );
      var line2 = paper.path( ["M", centr+rad, centr-h1, "L", centr-rad, centr-h2 ] );
      var line3 = paper.path( ["M", centr+rad, centr+h1, "L", centr+rad, centr-h1 ] );
      line3.attr({"stroke":"#0000FF","stroke-width":3});

      var line4 = paper.path( ["M", centr-rad, centr+h2, "L", centr-rad, centr-h2 ] );
      //var tri   = paper.path( ["M", centr+rad+f, centr, "L", centr+rad, centr+h1 , "L", centr+rad, centr-h1] );
      //tri.attr({"stroke-width": 0, fill: "yellow"});

      for (j=0;j<ns;j++)
      {
        var line = paper.path( ["M", centr-rad, centr-h2+j*2*h2/ns, "L", centr+rad, centr-h1+j*2*h1/ns ] );
        //var line_focal = paper.path( ["M", centr+rad+f, centr, "L", centr+rad, centr-h1+j*2*h1/ns ] );

        elements.push(line);
        line.attr({"stroke":"#FF00FF","stroke-width":1});

      }

      elements.push(line1);
      elements.push(line2);
      elements.push(line3);
      elements.push(line4);
      //elements.push(tri);

      elements.rotate(an,centr,centr) ; // deprecated

    }

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

      		console.log('Here '+(isdithered)+'8');
      		//window.alert('45');
      		paper.clear();
            if (ispara)
            {
                if (isdithered)

                {
                    draw_op_dithered(paper,ns,nc,rad,dim);
                }
                else
                {
                    draw_op(paper,ns,nc,rad,dim);

                }

                $( "#fov" ).slider("disable");
            }
            else
            {
                    if (isdithered)
                    {
                        draw_nop_dithered(paper,ns,nc,fv,rad,dim);

                    }
                    else
                    {
                        draw_nop(paper,ns,nc,fv,rad,dim);

                    }
                    $( "#fov" ).slider("enable");
            }

	}
