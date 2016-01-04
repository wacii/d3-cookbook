// generate data
//
var data = generateData([5, 40], 10);
//
function generateData(range, domain) {
  var width = range[1] - range[0];
  var offset = range[0];

  var data = [];
  for (var i = 0; i < domain; i++)
    data.push({ x: i, y: Math.ceil(Math.random() * width + offset) });
  return data;
}

// constants
//
var margin = { top: 10, right: 10, bottom: 20, left: 40 };
var barSpacing = 0.1;
var chartContainer = '#chart';

// make all the charty objects
//
var el = d3.select(chartContainer);
var svg = el.append('svg').append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xScale = d3.scale.ordinal();
var yScale = d3.scale.linear();

var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
var yAxis = d3.svg.axis().scale(yScale).orient('left');
//
var xAxisContainer = svg.append('g').attr('class', 'axis');
var yAxisContainer = svg.append('g').attr('class', 'axis');

svg.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar');

// size all the charty objects, and again whenever the window is resized
//
sizeChart();
window.onresize = sizeChart;
//
function sizeChart() {
  var containerHeight = parseInt(el.style('height').slice(0, -2), 10);
  var containerWidth = parseInt(el.style('width').slice(0, -2), 10);
  //
  var height = containerHeight - margin.top - margin.bottom;
  var width = containerWidth - margin.left - margin.right;

  xScale.rangeRoundBands([0, width], barSpacing);
  xScale.domain(data.map(function(d) { return d.x }));
  //
  yScale.range([height, 0]);
  yScale.domain([0, d3.max(data, function(d) { return d.y })]);

  xAxisContainer
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);
  yAxisContainer.call(yAxis);

  svg.selectAll('rect.bar')
    .attr('x', function(d) { return xScale(d.x) })
    .attr('y', function(d) { return yScale(d.y) })
    .attr('height', function(d) { return height - yScale(d.y) })
    .attr('width', xScale.rangeBand());
}
