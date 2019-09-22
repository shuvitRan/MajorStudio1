var margin = {top:20, right:20, buttom:20, left:20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.buttom;




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
  metChinese = data[3];

countCulture(metChinese);
  // console.log(me);

  var svg = d3.selectAll('#viz')
              .append("svg")
              .attr("width", width)
              .attr("height", height);




}).catch((err) =>{
  console.error(err);
});

function countCulture(data){
  let time1 = countWord(data,0,1300);
  let time2 = countWord(data,1300,1600);
  let time3 = countWord(data,1600,1900);
  let time4 = countWord(data,1900,2100);

console.log(time1);
console.log(time2);
console.log(time3);
console.log(time4);

}

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
      //--create a 2d array to store data
      myObject[i] = new Array(key,countmyWord[key], endYear);
    }
    }

  // console.log(Object.keys(countmyWord).length);
  // console.log(countmyWord);
  console.log(`number of painting in section ${endYear} : ` + countItems);
  // console.log(countItems);
  return myObject;

}
