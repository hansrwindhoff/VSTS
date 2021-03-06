/// <reference path="d3.d.ts"/>
///<reference path="angular.d.ts"/>


//declare var d3;


module App {


  'use strict';

  //  interface thisScope extends ng.IScope
  // {
  // //a first step to annotate the stuff in ths file could be to type the anular scope
  // }


  var mycirclesdirdirectivefactory = () => {
    return {
      restrict: "A",
      link: (scope// :thisScope
        , elem, attrs: ng.IAttributes) => {


        var targetEl = document.getElementById(attrs["id"]);
        var maxRadius = 32; // maximum radius of circle
        var margin = { top: -maxRadius, right: -maxRadius, bottom: -maxRadius, left: -maxRadius };
        var width = targetEl.offsetWidth - margin.left - margin.right,
          height = targetEl.offsetHeight - margin.top - margin.bottom;




        // start original demo code

        var nodes:any =  (d3.range(200).map (  function () { return { radius: Math.random() * 12 + 4   }; })),
          root = nodes[0],
          color = d3.scale.category10();

        root.radius = 0;
        root.fixed = true;

        var force = d3.layout.force()
          .gravity(0.05)
          .charge(function (d, i) { return i ? 0 : -2000; })
          .nodes(nodes)
          .size([width, height]);

        force.start();

        var svg = d3.select("#" + attrs["id"]).append("svg") // <================
          .attr("width", width)
          .attr("height", height);

        svg.selectAll("circle")
          .data(nodes.slice(1))
          .enter().append("circle")
          .attr("r", function (d) { return d.radius; })
          .style("fill", function (d, i) { return color(i % 3); });

        force.on("tick", function (e) {
          var q = d3.geom.quadtree(nodes),
            i = 0,
            n = nodes.length;

          while (++i < n) q.visit(collide(nodes[i]));

          svg.selectAll("circle")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
        });

        svg.on("mousemove", function () {
          var p1 = d3.mouse(this);
          root.px = p1[0];
          root.py = p1[1];
          force.resume();
        });

        function collide(node) {
          var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
          return function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
              var x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = node.radius + quad.point.radius;
              if (l < r) {
                l = (l - r) / l * .5;
                node.x -= x *= l;
                node.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
              }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
          };
        }
        // original demo code end


      }
    }
  };



  var d3Circles = angular.module('App.d3Circles', []);
  d3Circles.directive("mycirclesdir", mycirclesdirdirectivefactory);

}
