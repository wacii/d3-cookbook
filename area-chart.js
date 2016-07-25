// generate random data
var data = [];
var y0, y1;

for (var x = 0; x < 10; x++) {
  y0 = Math.random() * 10;
  y1 = Math.random() * (10 - y0) + y0 + 1;
  data.push([x, y0, y1]);
}

// constants
var margin = { top: 10, right: 10, bottom: 20, left: 40 };
var chartContainer = '#chart';
var X = '0', Y0 = '1', Y1 = '2'

// make charty objects
var el = d3.select(chartContainer);
var chart = el.append('svg').append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xScale = d3.scale.linear().domain(d3.extent(data, pluck(X)));
var yScale = d3.scale.linear().domain([0, d3.max(data, pluck(Y1))]);

var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
var yAxis = d3.svg.axis().scale(yScale).orient('left');

var xAxisContainer = chart.append('g').attr('class', 'axis');
var yAxisContainer = chart.append('g').attr('class', 'axis');

var areaFn = d3.svg.area()
  .x(function(d) { return xScale(d[X]); })
  .y0(function(d) { return yScale(d[Y0]); })
  .y1(function(d) { return yScale(d[Y1]); });

var area = chart.append('path').datum(data).attr('class', 'area');

// size charty objects
sizeChart()
window.onresize = sizeChart;

function sizeChart() {
  var height = parseInt(el.style('height'), 10) - margin.top - margin.bottom;
  var width = parseInt(el.style('width'), 10) - margin.left - margin.right;

  xScale.range([0, width]);
  yScale.range([height, 0]);

  xAxisContainer.attr('transform', 'translate(0,' + height + ')').call(xAxis);
  yAxis(yAxisContainer);

  area.attr('d', areaFn)
}

// helpers
function pluck(key) {
  return function(obj) {
    return obj[key];
  };
}
