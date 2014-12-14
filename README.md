Created by [Christopher Manning](http://www.christophermanning.org/)

Summary
-------
This is a map of the [Chicago Wards](http://en.wikipedia.org/wiki/Community_areas_in_Chicago#Wards) that demonstrates how to use 
the JSTS Topology Suite and D3.js to find and display intersections 
between polygons. 

Wards shaded grey are scanned since their bounding boxes intersect with
the search envelope and wards shaded blue intersect with the search
polygon.

A Sort-Tile-Recursive R-tree is used to spatially index the wards and
efficently query the polygons for intersections.

References
----------
  * [Chicago Ward Remap Outlines](http://bl.ocks.org/2271944)
  * [JSTS Topology Suite](https://github.com/bjornharrtell/jsts)
  * [D3.js](https://github.com/mbostock/d3)
  * [Well-known text](http://en.wikipedia.org/wiki/Well-known_text)
  * [R-tree](http://en.wikipedia.org/wiki/R-tree)
  * [Quadtree](http://bl.ocks.org/4343214)
  * [SVG Controls (brush)](https://github.com/mbostock/d3/wiki/SVG-Controls)
  * [Polybrush](http://bl.ocks.org/3667340)
