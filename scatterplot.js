// generate data
//
var data = generateData([5, 10], [10, 15]);
//
function generateData(domain, range) {
  var y0 = range[0];
  var yD = range[1] - range[0];

  var data = [];
  for (var x = domain[0]; x <= domain[1]; x++) {
    var yRnd = Math.random();
    data.push([x, yRnd * yD + y0]);
  }
  return data
}

// constants
//
var margin = { top: 10, right: 10, bottom: 20, left: 40 };
var chartContainer = '#chart';

// make all the charty objects
//
var xScale = d3.scale.linear().domain(d3.extent(data, first));
var yScale = d3.scale.linear().domain(d3.extent(data, second));

var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
var yAxis = d3.svg.axis().scale(yScale).orient('left');

var el = d3.select(chartContainer);
var container = el.append('svg').append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xAxisContainer = container.append('g').attr('class', 'axis');
var yAxisContainer = container.append('g').attr('class', 'axis');

container.selectAll('.point').data(data).enter().append('circle')
  .attr('class', 'point').attr('r', 2);

// size all the charty objects, and again whenever the window is resized
//
sizeChart();
window.onresize = sizeChart;
//
function sizeChart() {
  var height = parseInt(el.style('height'), 10) - margin.top - margin.bottom;
  var width = parseInt(el.style('width'), 10) - margin.left - margin.right;

  xScale.range([0, width]);
  yScale.range([height, 0]);

  xAxis(xAxisContainer.attr('transform', 'translate(0,' + height + ')'));
  yAxis(yAxisContainer);

  container.selectAll('.point')
    .attr('cx', function (d) { return xScale(d[0]); })
    .attr('cy', function (d) { return yScale(d[1]); });
}

// helpers
//
function first(array) { return array[0]; }
function second(array) { return array[1]; }
