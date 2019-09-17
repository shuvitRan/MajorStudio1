var width = 600;
var height = 400;

var metClassification = [], metYears= [];


var svg = d3.selectAll('#mediumViz')
  .append("svg")
  .attr("width", width)
  .attr("height", height);


  d3.csv('/../MajorStudioSupportFile/data/Chinese_dataframe1.csv').then((data) => {
  // array of objects
  console.log(data.length);
  NestingTheData(data);




}).catch((error) => {
  console.error('Error loading the data');
});



function NestingTheData(data){

  metClassification = d3.nest()
  .key(function(d) { return d.Classification;})
  .entries(data);
  // 174 good to go.
  console.log(metClassification.length)


  metYears = d3.nest()
  .key(function(d) { return d['Object End Date'];})
  .entries(data);
  //718 different artist return, long tail
  console.log(metYears.length)

  //  metMedium = d3.nest()
  // .key(function(d) { return d.Medium;})
  // .entries(data);
  // // Medium 3773 , not clean
  // console.log(metMedium.length)
  //
  //  metArtists = d3.nest()
  // .key(function(d) { return d['Artist Display Name'];})
  // .entries(data);
  // //964 different artist return, long tail
  // console.log(metArtists)

}


// function
