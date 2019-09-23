const margin = {top:20, right:20, buttom:20, left:20},
    width = (300 - margin.left - margin.right),
    height = (200 - margin.top - margin.buttom);
var nodePadding = .5;

var colorPallet2 = d3.scaleOrdinal(["#B15A6C","#846C94","#3A7E92","#308368","#677D3B","#976D35"])


let metChinese =[], allwords=[];
// let countChinese=[];



let promises = [
  d3.csv('/../MajorStudioSupportFile/SelectedData/ChinesePainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/ItalianPainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/FrenchPainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/AmericanPainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/IranianPainting.csv')
]
Promise.all(promises).then((data) =>{
  // console.log(data[0]);
  return splitData(data)
}).then((data) =>{
  metChinese = data[0];

 // let ChineseTagData = countCulture(data[0]);
 let ChineseTagData = NestingTheData(countCulture(data[0]));
  console.log(ChineseTagData);

// NestingTheData(ChineseTagData));
// return ChineseTagData;
chartOfTags(ChineseTagData);

})
.catch((err) =>{
  console.error(err);
});


function chartOfTags(data){
  console.log(height + margin.top + margin.buttom);
  console.log(width + margin.left + margin.right);

  var svg = d3.select("body")
              .select("#viz")
              .selectAll("circle")
              .data(data)
              .enter()
              .append("svg")
              .style("height", height + margin.top + margin.buttom+ 'px')
              .style("width", width + margin.left + margin.right+ 'px')
              .each(multiple);

          svg.append("text")
              .attr("x",  50)
              .attr("y", 15)
              .style("fill", "black")
              .text(function(d) { return d.key; });


}



function multiple(data) {
  // console.log(data)
  var svg = d3.select(this);
                // .append("g");

  let reScaleClaf = d3.scaleLinear()
    .domain([1,200])
    .range([5,40]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data.values, function(d) {
          // console.log(d.number);
          return d.tags; })])
        .range([height, 0]);

    //     var radius = d3.scaleSqrt()
    // .range([0, 220]);

    // radius.domain([0, d3.max(data, function(d) { return d.number; })]);

// var r = radius(d.number);
// console.log(r);



    // var circle = d3.circle()
    //               .r((d)=> {
    //                 console.log(d.number);
    //                 return y(d.number);
    //               })

   var clafNode =svg.selectAll("g")
                    // .append("circle")
                    // .attr("cx", 30)
                    // .attr("cy", 30)
                    // .attr("r", 20)
      // .selectAll("circle")
      //
      .data(function(d){
        return d.values;
      })
      .enter()
      .append("circle")
      .attr("cx",10)
      .attr("cy", 20)
      .attr("r", (d)=>  {
          // console.log(d.number);
          return reScaleClaf(d.number);
        })
        // return reScaleClaf(d.number)}
      // })
        .style("fill", (d)=> colorPallet2(d.tag))
        // .style("fill", "#956B65")
        .style("fill-opacity", 0.5)
        // .attr("stroke", "#b3a2c8")
        // .style("stroke-width", 4)
        .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));


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
                  .nodes(data.values)
                  .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return reScaleClaf(d.number) + nodePadding; }).iterations(1))
                  .on("tick", function(d){
                    clafNode
                        .attr("cx", function(d){ return d.x; })
                        .attr("cy", function(d){ return d.y; })
                  });
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


  // console.log(data);
  // console.log(d3.max(data.values, function(d) { return d.number; }));
  // var y = d3.scaleLinear()
  //     .domain([0, d3.max(data.values, function(d) { return d.number; })])
  //     .range([height, 0]);


}



function countCulture(data){
  let time1 = countWord(data,0,1300);
  let time2 = countWord(data,1300,1600);
  let time3 = countWord(data,1600,1900);
  let time4 = countWord(data,1900,2100);
  return time1.concat(time2,time3,time4);
}

 function NestingTheData(data){

//find out the relation ship between objects
  return d3.nest()
  .key(function(d) { return d.year;})
  // .rollup((v)=> {return v; })
  // .sortKeys(d3.ascending)
  .entries(data);


}


async function tagProcess(data){

      let newdata = await splitData(data);
      return newdata;

  }

function splitData(data){

    for( let i = 0 ; i < data.length; i++){
      for(let a =0 ; a < data[i].length; a++){
        data[i][a]["Tags"] = data[i][a]["Tags"].split('|')
      }
    }
    return data;
  }

function countWord(data, startYear, endYear){
let countItems=0;
let countmyWord = [];
let keys = [];
let myObject=[];
    for( let i = 0 ; i < data.length; i++){
      if(data[i]["Object End Date"]>=startYear && data[i]["Object End Date"]<endYear){
        countItems++;
        // console.log(data[i]);
          for( let a = 0; a<data[i]["Tags"].length; a++){
            let word = data[i]["Tags"][a];
            if(word!=""){
                if(countmyWord[word] === undefined){
                  countmyWord[word] = 1;
                  keys.push(word);
                } else {
                  countmyWord[word] = countmyWord[word]+1;
                }
            }
          }
      }
    }
//sort my key
keys.sort(compare);
// console.log(keys);
function compare(a,b){
  let countA = countmyWord[a];
  let countB = countmyWord[b];
  return countB - countA ;
}
// console.log(keys.sort(compare)+ " " );
// console.log(countmyWord.sort(compare));
    for(let i = 0; i<10; i++){
      if(keys[i] != undefined){
      var key = keys[i];
      // console.log(key + " " + countmyWord[key]);
      //-- create a object
      // myObject[key] = countmyWord[key] ;
      var thisObject = {
        tag:key,
        number:countmyWord[key],
        year:endYear
      }

      myObject.push(thisObject);

      //--create a 2d array to store data
      // myObject[i] = new Array(key,countmyWord[key], endYear);
    }
    }


  console.log(`number of painting in section ${endYear} : ` + countItems);

  return myObject;

}
