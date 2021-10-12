
// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization 
let svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white') 
  .style('border', 'solid')
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

d3.csv("data/data.csv").then(function(data){

// add x scale
var xScale = d3.scaleBand()
  .range ([0, width])
  .domain (data.map(d => d.X));
svg1.append("g")
  .attr("transform", 'translate(' + margin.left + ',' + (height+30) +')')
  .call(d3.axisBottom(xScale));


// add y scale
let maxY = d3.max(data, function(d) {return d.Y;})
let yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([height, 0]);

// add y axis to SVG
  svg1.append("g")
  .attr("transform", "translate(" + margin.left + ",30)")
  .call(d3.axisLeft(yScale));

//create popup with information
var Tooltip = d3.select("#d3-container")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .attr('style', 'position: absolute');

// add bars
svg1.selectAll('.bar')
  .data(data)
  .enter().append('rect')
  .attr('class', 'bar')
  .attr('x', function(d) {return xScale(d.X) + margin.left + 10})
  .attr('y', function(d) {return yScale(d.Y) + margin.top-30})
  .attr('width', xScale.bandwidth() - 20)
  .attr('height', function(d) {return height - yScale(d.Y);})
  .attr('fill', 'orange')
  .on('mouseover', function(d, i) {
          // information popup becomes visible
          Tooltip.transition().duration(200).style("opacity", .9);
          Tooltip.html("<b>" + i.X + "</b><br>"+ i.Y)
                  .style("left", d.pageX - 20 + "px")
                  .style("top", d.pageY - 60 + "px");

        })
        // trigger mouse-leaving event
  .on('mouseout', function(d) {
    //decrease blob size
    d3.select(this).transition()
    // popup disappears  
    Tooltip.transition().duration(500).style("opacity", 0);
  });;



}) 