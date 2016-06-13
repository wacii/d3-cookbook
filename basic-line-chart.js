// generate data
//
var data = generateData([5, 10], [10, 15]);
console.log(data)
//
function generateData(domain, range) {
  var y0 = range[0];
  var yD = range[1] - range[0];

  var data = []
  for (var x = domain[0]; x <= domain[1]; x++) {
    var yRnd = Math.random();
    data.push([x, yRnd * yD + y0]);
  }
  return data;
}

// constants
//
var margin = { top: 10, right: 10, bottom: 20, left: 40 };
var chartContainer = '#chart';

// make all the charty objects
//
var el = d3.select('#chart');
var svg = el.append('svg').append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xScale = d3.scale.linear();
var yScale = d3.scale.linear();

var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
var yAxis = d3.svg.axis().scale(yScale).orient('left');

var xAxisContainer = svg.append('g').attr('class', 'axis');
var yAxisContainer = svg.append('g').attr('class', 'axis');

var line = d3.svg.line()
  .x(function(d) { return xScale(d[0]); })
  .y(function(d) { return yScale(d[1]); });
var path = svg.append('path').attr('class', 'line');

// size all the charty objects, and again whenever the window is resized
//
sizeChart();
window.onresize = sizeChart;
//
function sizeChart() {
  var containerHeight = parseInt(el.style('height'), 10);
  var containerWidth = parseInt(el.style('width'), 10);
  //
  var height = containerHeight - margin.top - margin.bottom;
  var width = containerWidth - margin.left - margin.right;

  xScale.domain(d3.extent(data, function(d) { return d[0]; }));
  xScale.range([0, width]);
  //
  yScale.domain(d3.extent(data, function(d) { return d[1]; }));
  yScale.range([height, 0]);

  xAxisContainer
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);
  yAxisContainer.call(yAxis);

  path.attr('d', line(data))
}
