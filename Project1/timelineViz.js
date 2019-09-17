// var width2 = 1000;
// var height2 = 400;



  var checkNumber = [];

// set the dimensions and margins of the graph
var margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 60
  },
  width2 = 1800 - margin.left - margin.right,
  height2 = 400 - margin.top - margin.bottom;

var svg2 = d3.selectAll('#timeViz')
  .append("svg")
  .attr("width", width2 + margin.left + margin.right)
  .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


function TimeLineChart(data, metTimeData) {


  // Add X axis
  var x = d3.scaleLinear()
    .domain([-3000, 2017])
    .range([0, width2]);
  svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x));

    var yNumber=1;
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 2000])
    .range([height2, 0]);
  // svg2.append("g")
  //   .call(d3.axisLeft(y))


  for (var i=0; i<metTimeData.length; i++){

      checkNumber.push([metTimeData[i].key,0]);

  }
  console.log(data.length);

  console.log(typeof data[1]["Object End Date"] +" "+typeof checkNumber[1][1] );
  svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .call(function(d,i){

      // for(var a=0 ; a<checkNumber.length; a++){
      //   console.log(checkNumber[a][0])
      //     // console.log(d[i]["Object End Date"])
      //     // console.log(d)
      //   if(Number(d["Object End Date"]) === Number(checkNumber[a][0])){
      //     checkNumber[a][1]++;
      //       console.log("hdi")
      //     // console.log(checkNumber[a][1]);
      //   };
    //}
    })
    // .attr("cx", function (d) { return x(d.Sepal_Length); } )
    .attr("cx", (d) => x(d["Object End Date"]))
    // .attr("cy", function (d) { return y(d.Petal_Length); } )
    // .attr("cy", (d)=> y(d.values.length))
    .attr("cy", 100)
    .attr("r", 2)
    .style("fill", "black");

  // console.log(metTimeData[0].key);
  console.log(data[1]["Object End Date"]);



}
