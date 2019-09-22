var width = 1000;
var height = 600;
var nodePadding = 2;
var metClassification = [], metYears= [];


var svg = d3.selectAll('#viz')
  .append("svg")
  .attr("width", width)
  .attr("height", height);


  d3.csv('/../MajorStudioSupportFile/data/Chinese_dataframe1.csv').then((data) => {
  // array of objects
  console.log(data.length);

  NestingTheData(data);
  TimeLineChart(data, metYears);
  ClassificationChart(metClassification);



}).catch((error) => {
  // console.error('Error loading the data');
  console.error(error);
});



function NestingTheData(data){

  metClassification = d3.nest()
  .key(function(d) { return d.Classification;})
  .entries(data);
  // 174 good to go.
  // console.log(metClassification)


  metYears = d3.nest()
  .key(function(d) { return d['Object End Date'];})
  .entries(data);
  //718 different artist return, long tail
// console.log(metYears)

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


function ClassificationChart(data){
  let reScaleClaf = d3.scaleLinear()
    .domain([1,4500])
    .range([5,200]);

  var colorPallet = d3.scaleOrdinal(["#ED9988","#E4A4BA","#B7BCD7","#8DD1CC","#9EDBA3","#D9D881"]);
  var colorPallet2 = d3.scaleOrdinal(["#B15A6C","#846C94","#3A7E92","#308368","#677D3B","#976D35"])


  var clafNode = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    // .append("callafNode")
    .append("circle")
    .attr("r", (d)=>  reScaleClaf(d.values.length))
      .attr("cx", width/2)
      .attr("cy", height/2)
      .style("fill", (d)=> colorPallet2(d.key))
      // .style("fill", "#956B65")
      .style("fill-opacity", 0.5)
      // .attr("stroke", "#b3a2c8")
      // .style("stroke-width", 4)
      .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

    // clafNode.append("text")
    //   .attr("clip-path", d => d.clipUid)
    // .selectAll("tspan")
    // .data(d => d.key.split(/(?=[A-Z][^A-Z])/g))
    // .join("tspan")
    //   .attr("x", 0)
    //   .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
    //   .text(d => d.key);


         // Features of the forces applied to the nodes:
    var simulation = d3.forceSimulation()
            .force("forceX", d3.forceX().strength(.1).x(width * .5))
            .force("forceY", d3.forceY().strength(.1).y(height * .5))
            .force("center", d3.forceCenter().x(width * .5).y(height * .5))
            .force("charge", d3.forceManyBody().strength(-15));

         // Apply these forces to the nodes and update their positions.
       // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.

       // sort the nodes so that the bigger ones are at the back
             // graph = graph.sort(function(a,b){ return b.size - a.size; });



       simulation
           .nodes(data)
           .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return reScaleClaf(d.values.length) + nodePadding; }).iterations(1))
           .on("tick", function(d){
             clafNode
                 .attr("cx", function(d){ return d.x; })
                 .attr("cy", function(d){ return d.y; })
           });

       // What happens when a circle is dragged?
       function dragstarted(d) {
         if (!d3.event.active) simulation.alphaTarget(.03).restart();
         d.fx = d.x;
         d.fy = d.y;
       }
       function dragged(d) {
         d.fx = d3.event.x;
         d.fy = d3.event.y;
       }
       function dragended(d) {
         if (!d3.event.active) simulation.alphaTarget(.03);
         d.fx = null;
         d.fy = null;
       }
}
