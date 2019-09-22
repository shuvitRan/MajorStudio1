var margin = {top:20, right:20, buttom:20, left:20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.buttom;


var svg = d3.selectAll('#viz')
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let metChinese =[], allwords=[];
let countChinese=[];

let promises = [
  d3.csv('/../MajorStudioSupportFile/SelectedData/ChinesePainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/ItalianPainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/IranianPainting.csv')
]
Promise.all(promises).then((data) =>{
  console.log(data[0]);
  // metChinese =  NestingTheData(data[0].['Tags']);
  metChinese =  splitData(data[0])
  console.log(metChinese[100]["Tags"]);
  countWord(metChinese,1400,1600);
  console.log(countChinese);


}).catch((err) =>{
  console.error(err);
});



function NestingTheData(data){

//find out the relation ship between objects
  return d3.nest()
  .key(function(d) { return d.Tags;})
  // .rollup((v)=> {return v.length; })
  .sortKeys(d3.ascending)

  .entries(data);


}


  async function tagProcess(data){

      let newdata = await splitData(data);
      return newdata;

  }

  function splitData(data){
    for( let i = 0 ; i < data.length; i++){
      data[i]["Tags"] = data[i]["Tags"].split('|')
    }
    return data;

  }

function countWord(data, startYear, endYear){
let countItems=0;
  for( let i = 0 ; i < data.length; i++){
    // for each (a in data[i]["Tags"])
    // data[i]["Tags"] = data[i]["Tags"].split('|')
    if(data[i]["Object End Date"]>startYear && data[i]["Object End Date"]<endYear){
      countItems++;
      if(data[i]["Tags"].length>0){
        for( let a = 0; a<data[i]["Tags"].length; a++){
          let word = data[i]["Tags"][a];
            if(countChinese[word] === undefined){
              countChinese[word] = 1;
            } else {
              countChinese[word] = countChinese[word]+1;
            }
          }
        }
    }
  }
  console.log(countItems);
  // console.log(countItems);

}
