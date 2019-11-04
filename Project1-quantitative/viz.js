const margin = {top:20, right:20, buttom:20, left:20},
    width = (300 - margin.left - margin.right),
    height = (320 - margin.top - margin.buttom);
var nodePadding = .5;

var colorPallet2 = d3.scaleOrdinal(["#B15A6C","#846C94","#3A7E92","#308368","#677D3B","#976D35"])
var colorPallet3 = d3.scaleOrdinal(
  ["#6dbd7f",
  "#ca5b92",
  "#5b863d",
  "#907cc3",
  "#bea747",
  "#bd7c8e",
  "#54a091",
  "#c3694c",
  "#827038",
  "#c6a479"]

//   ["#6362f0",
// "#4eb528",
// "#9a48f1",
// "#ea511d",
// "#c441e9",
// "#eb254c",
// "#ad59e2",
// "#f3279e",
// "#d745df",
// "#de3ec2"]

// ["#ee4880",
// "#e57e20",
// "#be2455",
// "#af5616",
// "#e8385c",
// "#e87c45",
// "#951a30",
// "#ec4520",
// "#c14652",
// "#c73f1c",
// "#eb625a",
// "#972611",
// "#d72f38",
// "#b9512e",
// "#a9272c"]



);

let metChinese =[], allwords=[];
// let countChinese=[];



let promises = [
  // d3.csv('/../MajorStudioSupportFile/SelectedData/ChinesePainting.csv'),
  // d3.csv('/../MajorStudioSupportFile/SelectedData/ItalianPainting.csv'),
  // d3.csv('/../MajorStudioSupportFile/SelectedData/FrenchPainting.csv'),
  // d3.csv('/../MajorStudioSupportFile/SelectedData/AmericanPainting.csv'),
  // d3.csv('/../MajorStudioSupportFile/SelectedData/IranianPainting.csv'),
  // d3.csv('/../MajorStudioSupportFile/SelectedData/JapanesePainting.csv'),
  // d3.csv('/../MajorStudioSupportFile/SelectedData/IndianPainting.csv')

  d3.csv('SelectedData/ChinesePainting.csv'),
  d3.csv('SelectedData/ItalianPainting.csv'),
  d3.csv('SelectedData/FrenchPainting.csv'),
  d3.csv('SelectedData/AmericanPainting.csv'),
  d3.csv('SelectedData/IranianPainting.csv'),
  d3.csv('SelectedData/JapanesePainting.csv'),
  d3.csv('SelectedData/IndianPainting.csv'),
  d3.csv('SelectedData/GermanyPainting.csv'),
  d3.csv('SelectedData/BritishPainting.csv')
]
Promise.all(promises).then((data) =>{
  // console.log(data[0]);
  return splitData(data)
}).then((data) =>{
  // metChinese = data[0];

 // let ChineseTagData = countCulture(data[0]);
 let ChineseTagData = NestingTheData(countCulture(data[0]));
  let ItalianTagData = NestingTheData(countCulture(data[1]));
   let FrenchTagData = NestingTheData(countCulture(data[2]));
    let IrannianTagData = NestingTheData(countCulture(data[4]));
    let AmericanTagData = NestingTheData(countCulture(data[3]));
    let JapaneseTagData = NestingTheData(countCulture(data[5]));
    let IndianTagData = NestingTheData(countCulture(data[6]));
    let GermanyTagData = NestingTheData(countCulture(data[7]));
    let BritishTagData = NestingTheData(countCulture(data[8]));
  // console.log(ChineseTagData);

// NestingTheData(ChineseTagData));
// return ChineseTagData;
chartOfTags(ItalianTagData, "#italyviz");
chartOfTags(ChineseTagData, "#chinaviz");
chartOfTags(IrannianTagData, "#iranviz");
chartOfTags(FrenchTagData, "#frenchviz");
chartOfTags(IndianTagData, "#indiaviz");
chartOfTags(AmericanTagData, "#usaviz");
chartOfTags(JapaneseTagData, "#japanviz");
chartOfTags(GermanyTagData, "#germviz");
chartOfTags(BritishTagData, "#britishviz");

d3.selectAll(".describe")
  .append("svg")
  .style("height", 200 + 'px')
  .style("width",100 + 'px')
  .style("display", "inline-block")
  .style("position", "absolute")
  .style("top", "0px")
  .append("line")
  // .style("position", "absolute")
   .attr("x1", 100)
   .attr("y1", 0)
   .attr("x2", 70)
   .attr("y2", 400)
   .attr("stroke-width", 2)
   .attr("stroke", "grey");

//Call my interactive function
  linkAllTags();
  ClicklinkAllTags();
})
.catch((err) =>{
  console.error(err);
});


function chartOfTags(data, id){

  // d3.selectAll("#timeline")
  //    .style("width", '1350px')
  //    .style("display", "inline-block")
  //    .style("position", "fixed")
  //    .append("text")
  //    ;


  d3.selectAll(id)
     .style("width", '1250px')
     .style("display", "inline-block");



  var svg = d3.select("body")
              .select(id)
              .selectAll(null);

     //  svg.append("text")
     //      .style("fill","black")
     //  // .style("fill","white")
     //      .attr("x", (d)=>{
     //       if (d.number != null){
     //       return width/2+rectwidth(d.number+15);
     //       }
     //     })
     // .attr("y", (d,i)=> {
     //   let textY=15;
     //   textY=i*30+textY;
     //   return textY;
     // })
     // .text((d)=>{
     //   return d.number;
     // })
     // .style("font-size","8px");



  let eachGraph = svg.data(data)
              .enter()
              .append("svg")
              .style("height", height + margin.top + margin.buttom+ 'px')
              .style("width", width + margin.left + margin.right+ 'px')
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              // .each(multipleCircle);

              .each(multipleText);

      //------text on every graph
      // eachGraph.append("text")
      //         .attr("x",  50)
      //         .attr("y", 15)
      //         .style("fill", "black")
      //         .text(function(d) { return d.key; });


}



function multipleCircle(data) {
  // console.log(data)
  let svg = d3.select(this);
                // .append("g");

  let reScaleClaf = d3.scaleLinear()
    .domain([1,200])
    .range([5,40]);


   var clafNode =svg.selectAll("g")
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

// console.log(time1);

//condition of no data of tags
  if(time1.length == 0){
    var thisObject = {
      tag:"No Record",
      // number:countmyWord[key],
      year:1300
    }
    time1.push(thisObject);
  }

  if(time2.length == 0){
    var thisObject = {
      tag:"No Record",
      // number:countmyWord[key],
      year:1600
    }
    time1.push(thisObject);
  }


  return time1.concat(time2,time3,time4);
}

 function NestingTheData(data){

//find out the relationship between objects
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



// **** Check numbers of painting in this section
  // console.log(`number of painting in section ${endYear} : ` + countItems);

  return myObject;

}


function scrollWin() {
  window.scrollTo(0, 0);
}
