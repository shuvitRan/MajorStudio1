var margin = {top:20, right:20, buttom:20, left:20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.buttom;


var svg = d3.selectAll('#viz')
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let metChinese =[], allwords=[];
// let countChinese=[];

let promises = [
  d3.csv('/../MajorStudioSupportFile/SelectedData/ChinesePainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/ItalianPainting.csv'),
  d3.csv('/../MajorStudioSupportFile/SelectedData/IranianPainting.csv')
]
Promise.all(promises).then((data) =>{
  // console.log(data[0]);
  return splitData(data)
}).then((data) =>{
  metChinese = data[0];

  countWord(metChinese,1400,1600);
  // console.log(countChinese);
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
      for(let a =0 ; a < data[i].length; a++){
        data[i][a]["Tags"] = data[i][a]["Tags"].split('|')
      }
    }
    return data;
  }

function countWord(data, startYear, endYear){
let countItems=0;
let countmyWord = []
    for( let i = 0 ; i < data.length; i++){
      if(data[i]["Object End Date"]>startYear && data[i]["Object End Date"]<endYear){
        countItems++;

          for( let a = 0; a<data[i]["Tags"].length; a++){
            let word = data[i]["Tags"][a];
            if(word!=""){
                if(countmyWord[word] === undefined){
                  countmyWord[word] = 1;
                } else {
                  countmyWord[word] = countmyWord[word]+1;
                }
            }
          }
      }
    }

  console.log(Object.keys(countmyWord).length);
  console.log(countmyWord);
  console.log("number of painting in section: " + countItems);
  // console.log(countItems);

}
