const margin = {
    top: 20,
    right: 20,
    buttom: 20,
    left: 20
  },
  width = (300 - margin.left - margin.right),
  height = (320 - margin.top - margin.buttom);

  let metBaseURL = "https://www.metmuseum.org/art/collection/search/";

  let mysvgColor = null;
  let myrectColor="rgba(244, 244, 244, 1)";
  let mylineColor="rgb(0, 0, 0)";
  let textColor ="rgb(75, 75, 75)"

  let pageOnColor="rgb(222, 58, 58)";
  let pageOffColor="rgba(123, 122, 124, 0.45)";

  // let my
  let loadingData;
  let dataReady= false;

  let detailView=false;

  let countingPics={};

const culture = {
  'India': 'India',
  'Thailand': 'Thailand',
  'Pakistan': 'Pakistan',
  'China': 'China Central Region',
  'Indonesia': 'Indonesia',
  'Cambodia': 'Cambodia',
  'Sri': 'Sri Lanka',
  'Japan': 'Japan',

  'Nepal': 'Nepal',
  'Tibet': 'Tibet',
  'Burma': 'Burma',
  // 'Korea': 'Korea',
  'Afghanistan': 'Afghanistan'
}


const cultureDisplayName = [];
let onDisplay = [];
let columnNumber = 0 ;

let promises = [
  d3.json("data/dataCleaned.json")
]

Promise.all(promises).then((data) => {
    // console.log(data[0])
    return data[0];
  }).then(data => {
    // console.log(data)
    // console.log(Object.keys(culture).length)
    // console.log(Object.keys(culture).indexOf('China'))
    // console.log(culture[0])

    d3.selectAll("#faceViz")
      .append("div")
      .attr("class", "grid-container");

    for (let key in culture) {

      // get all the key
      cultureDisplayName.push(key);

    }
    // console.log(cultureDisplayName)


    for (let i = 0; i <cultureDisplayName.length; i++) {
      onDisplay.push(cultureDisplayName[i]);
      ColumnsWithBuddha(cultureDisplayName[i], data);

    }
    loadingData = data;
    dataReady=true;

    // for (let i = 4; i <8; i++) {
    //   onDisplay.push(cultureDisplayName[i]);
    //   ColumnsWithBuddha(cultureDisplayName[i], data);
    //
    // }



  })
  .catch((err) => {
    console.error(err);
  })



function ColumnsWithBuddha(cultureName, data) {


//FirstTimeDraw
  let mycloumn = d3.selectAll(".grid-container")
    .append("div")
    .attr("class", "grid-item")
    // .style("background-color","#aaa")
    .attr("id", cultureName);

  mycloumn.append("div")
  .attr("class","GrapInfo")
  .attr("id","info"+cultureName)
  // .style("display","relative")
  // .style("align-items","center")
  .append("h3")
    .text(culture[cultureName])
    .style("display", "inline-block")
    .style("padding-right", "40px")
    .style("opacity", 0)
    .style("color",textColor)

    .transition()
    .duration(2000)
    .ease(d3.easeQuadIn)
    .style("opacity", 1);


SupportingLine(cultureName);
SecondCV(cultureName,data);
//--------------------------------
// console.log(countingPics)
// if(cultureName=countingPics[cultureName]){

//Counting number Text after the first iteration done
let numberOfStatus=d3.selectAll("#info"+cultureName).append("p")
                      .text(countingPics[cultureName])
                      // .style("position", "absolute")
                      // .style("text-align", "right")
                      .style("display", "inline-block")
                      // .style("margin-left", "auto")
                      .style("color",textColor)
                      .style("opacity", 0)
                      .transition()
                      .duration(2000)
                      .ease(d3.easeQuadIn)
                      .style("opacity", 1);



                       detailView=true;

                        DetailPages("output3")



}


function CloseDetail(){


d3.selectAll(".detailPages").remove();

}



function ChangeMaps(input){
  if(dataReady==false) return;

  d3.selectAll("img")
    .remove();
    d3.selectAll("svg").remove();

    d3.selectAll(".yearText")
      .remove();

SwitchNumber=input;

// if(SwitchNumber==2){
//
//     detailView=false;
// }



  for (cultureDisplay in onDisplay) {
    switch(SwitchNumber) {
        case 1:
detailView=true;
        SupportingLine(onDisplay[cultureDisplay])
        FirstCV(onDisplay[cultureDisplay], loadingData);
        DetailPages("output")
        break;
        case 2:
         detailView=false;
        ThirdCV(onDisplay[cultureDisplay], loadingData);
        DetailPages("output2")

        break;
        case 3:
        detailView=true;
          SupportingLine(onDisplay[cultureDisplay])
          SecondCV(onDisplay[cultureDisplay], loadingData);
          DetailPages("output3")
        break;
        default:
        text = "I have never heard of that fruit...";
      }
  }

}



function FirstCV(cultureName, data){

d3.selectAll(".grid-item").style("background-color","rgb(255, 255, 255)");
  d3.select("#page1")
  .style("background-color", pageOffColor);
    // .style("background-color",activeButtonColor);
    d3.select("#page2")
    .style("background-color", pageOnColor);

    d3.select("#page3")
    .style("background-color", pageOffColor);
d3.selectAll(".detailPages").remove();


  let countPic = 0;
  for (content in data) {
    if (data[content]['CV'] == true) {

      if (data[content]['culture'].includes(cultureName)) {
        countPic += 1;

        // let thisimg =
        // console.log(data[content]['culture'])
        // var file = new File('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png') ;
        // console.log(file)
        // if (imageExists('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png')){
        // thisImgList.push
        let thisimage = d3.selectAll(("#" + cultureName))
          .style("height", '300px')
          // .style("position",)
          .append("img")
          // .attr('src', '../../../MajorStudioSupportFile/p2Data/output3/'+ data[content]['objIds']+'_Crop.jpg' )
          // // .attr('src', 'data/output2/'+ data[content]['objIds']+'.png' )
          // .attr('width', 100)
          // .attr('height', 100)
          // .append("img")
          .attr('src', 'data/output/' + data[content]['objIds'] + '.png')
          // .attr('src', 'data/output2/'+ data[content]['objIds']+'.png' )
          .attr('width', 200)
          .attr('height', 200)
          // .style('margin-top', '30px')
          .style('margin-left', '-100px')
          .style("position", "absolute")
          // .style("opacity",0.2)
          .style("opacity", 0)
          .on("error", function() {
            // d3.select(this).style("visibility", "hidden");
            d3.select(this).remove();
          });
        thisimage.transition()
          .duration(3000)
          .delay(400*countPic)
          .ease(d3.easeQuadIn)
          .style("opacity", .2);


        // }

      }
    }
  }
}









function SecondCV(cultureName, data) {

d3.select("#page1")
.style("background-color", pageOnColor);
  // .style("background-color",activeButtonColor);
  d3.select("#page2")
  .style("background-color", pageOffColor);

  d3.select("#page3")
  .style("background-color", pageOffColor);

d3.selectAll(".detailPages").remove();

  d3.selectAll(".grid-item").style("background-color","rgb(255, 255, 255)");

countingPics[cultureName]=0
  let countPic = 0;




  for (content in data) {
    if (data[content]['CV'] == true) {

        if (data[content]['culture'].includes(cultureName)) {
          countPic += 1;
          countingPics[cultureName]+=1;



          // let thisimg =
          // console.log(data[content]['culture'])
          // var file = new File('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png') ;
          // console.log(file)
          // if (imageExists('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png')){
          // thisImgList.push
          let thisimage = d3.selectAll(("#" + cultureName))
            .style("height", '300px')
            // .style("position",)
            .append("img")
            // .attr('src', '../../../MajorStudioSupportFile/p2Data/output3/'+ data[content]['objIds']+'_Crop.jpg' )
            // // .attr('src', 'data/output2/'+ data[content]['objIds']+'.png' )
            // .attr('width', 100)
            // .attr('height', 100)
            // .append("img")
            .attr('src', 'data/output3/' + data[content]['objIds'] + '.png')
            // .attr('src', 'data/output2/'+ data[content]['objIds']+'.png' )
            .attr('width', 200)
            .attr('height', 200)
            .style('margin-left', '-100px')
            // .style('margin-top', '30px')
            .style("position", "absolute")
            // .style("opacity",0.2)
            .style("opacity", 0)
            .on("error", function() {
              // d3.select(this).style("visibility", "hidden");
              d3.select(this).remove();
            });
          thisimage.transition()
            .duration(3000)
            .delay(500*countPic)
            .ease(d3.easeQuadIn)
            .style("opacity", .6);
        }

    }
  }




}



function ThirdCV(cultureName, data) {

  d3.select("#page1")
  .style("background-color", pageOffColor);
    // .style("background-color",activeButtonColor);
    d3.select("#page2")
    .style("background-color", pageOffColor);

    d3.select("#page3")
    .style("background-color", pageOnColor);
// column.style("heigth",null);
  d3.selectAll("svg").remove();
d3.selectAll(".detailPages").remove();
  d3.selectAll(".grid-item").style("background-color","rgb(201, 201, 201)");
// d3.selectAll(".grid-item")
//   .style("display","block");


  let thisimage;
  let thisgroup;
  let countPic = 0;
  for (content in data) {
    if (data[content]['CV'] == true) {


        if (data[content]['culture'].includes(cultureName)) {
          countPic += 1;
          // let thisimg =
          // console.log(data[content]['culture'])
          // var file = new File('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png') ;
          // console.log(file)
          // if (imageExists('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png')){
          // thisImgList.push





          thisgroup = d3.selectAll(("#" + cultureName))
            .style("height", null)

            // .style("position",)
            .append("div")
              .style("display","inline-block")
            // .style("", "fixed")
            .attr('width', 100)
            .attr('height', 100);



            let  thistext=  thisgroup.append("p")
                  .attr("class","yearText")
                  .text(loadingData[content]['date']+" CE")
                  .style("position","absolute")

                  .style("font-size", '6pt')
                  .style("margin-left","auto")
                  // .style("margin-right","auto")
                  .style("display","inline-block")
                  .style("margin-top","0px")
                  .style('width', '100px')
                    // .style("width","100px")
                  .style("opacity", 0);

                  thistext.transition()
                  .duration(2000)
                  .delay(150*countPic)
                  .ease(d3.easeQuadIn)
                  .style("opacity", 1);

          thisimage=thisgroup.append("img")
            .attr('src', 'data/output/'+ data[content]['objIds']+'_Crop.jpg' )
            // .attr('src', '../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png' )
            // .attr('width', 100)
            // .attr('height', 100)
            // .append("img")
            // .attr('src', '../../../MajorStudioSupportFile/p2Data/output3/' + data[content]['objIds'] + '.png')
            // .attr('src', 'data/output2/'+ data[content]['objIds']+'.png' )
            .attr('width', 100)
            .attr('height', 100)
            .attr('id',data[content]['objIds'])
            .style("position", "relative")
            // .style("opacity",0.2)
            .style("opacity", 0)
            .on("error", function() {
              // d3.select(this).style("visibility", "hidden");
              d3.select(this).remove();
            });
            //text




          thisimage.transition()
            .duration(1000)
            .delay(100*countPic)
            .ease(d3.easeQuadIn)
            .style("opacity", 1);



        }

    }
  }
    d3.selectAll("img").on("mouseover", function(){
    let mouse = d3.select(this);



    mouse.attr('src', 'data/output2/' + mouse.attr("id") + '.png');
    // console.log(mouse.attr("id"))

  });
  d3.selectAll("img").on("mouseout", function(){
  let mouse = d3.select(this);

  mouse.attr('src', 'data/output/' + mouse.attr("id") + '_Crop.jpg' );
  // console.log(mouse.attr("id"))

  });

  d3.selectAll("img").on("click", function(){
  let mouse = d3.select(this);
  window.open(metBaseURL+mouse.attr("id"), '_blank');
  // mouse.attr('src', '../../../MajorStudioSupportFile/p2Data/output3/' + mouse.attr("id") + '_Crop.jpg' );
  // console.log(mouse.attr("id"))

  });


}



function DetailPages(folderName){


  d3.selectAll(".grid-item").on("click",function(){
    d3.selectAll(".detailPages").remove();

    let mouse = d3.select(this);
    // var elem = document.elementFromPoint(mouse[0], mouse[1]);
    //     console.log(elem.tagName)

    let cultureName =mouse.attr("id");
if(detailView==true){
      let showDetaiPages= d3.selectAll(".hidden")
            .append("div")
            .attr("class","detailPages")
            .style("padding","10px")
            .style("z-index", "2")
        let detailTitle=  showDetaiPages.append("div")
              .attr("class","submenu")
              .style("display","flex")
                .style("padding","0px 20px")
              // .attr("")
              .style("justify-content","space-between");
detailTitle.append("h3")
              .text(culture[cultureName])
              // .style("position","relative")
              .style("padding","10px")
              .style("display","inline");
detailTitle.append("input")
              .attr("type", "image")
              .attr("id","cancelButton")
              .attr("src","Assets/Cancel.png")
              .style("margin-top","20px")
              .style("width","10px")
              .style("height","10px")
              .style("outline","none")
              .attr("onclick", "CloseDetail()");
              // .style("text-align","right")
              // .style("display","inline-block");





          }
          // else{
          //
          //
          // }
            // .style("opacity", 0)
            // .duration(1000)
            // .ease(d3.easeQuadIn)
            // .style("opacity", 1);

              let countPic = 0;

            for (content in loadingData) {
              if (loadingData[content]['CV'] == true) {
                  if (loadingData[content]['culture'].includes(cultureName)) {
                    countPic += 1;
                    // let thisimg =
                    // console.log(data[content]['culture'])
                    // var file = new File('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png') ;
                    // console.log(file)
                    // if (imageExists('../../../MajorStudioSupportFile/p2Data/output/'+ data[content]['objIds']+'.png')){
                    // thisImgList.push

                    // d3.selectAll(".detailPages")
                    //   .append('div')
                    //   .attr("class","infoImagenYear");
                    let thisGroup = d3.selectAll(".detailPages")
                                      .append("div")
                                      .style("display","inline-block")
                                    // .style("", "fixed")
                                      .attr('width', 100)
                                      .attr('height', 100);
                  let  thistext=thisGroup
                                  .append("p")
                                  .text(loadingData[content]['date']+" CE")
                                  .style("position","absolute")
                                  .style("display","inline-block")
                                  .style("margin-left","auto")
                                  .style("font-size", '6pt')
                                  .style("margin-top","0px")
                                  .style("text-align","center")
                                    .style("width", "100px")
                                    // .style("padding","10px")
                                  .style("opacity", 0)
                                  thistext.transition()
                                  .duration(1000)
                                  .delay(150*countPic)
                                  .ease(d3.easeQuadIn)
                                  .style("opacity", 1);
                                  // .style("height", null)


                  let thisimage = thisGroup
                      .append("img")
                      // .attr('src', '../../../MajorStudioSupportFile/p2Data/output3/'+ loadingData[content]['objIds']+'_Crop.jpg' )
                      .attr('src', 'data/'+folderName+'/' + loadingData[content]['objIds'] + '.png')
                      .attr('width', 100)
                      .attr('height', 100)
                      .attr('id',loadingData[content]['objIds'])
                      .style("cursor","pointer")
                      .style("position", "relative")
                      .style("padding","10px")
                      // .style("opacity",0.2)
                      .style("opacity", 0)
                      .on("error", function() {
                        // d3.select(this).style("visibility", "hidden");
                        d3.select(this).remove();
                      });
                    thisimage.transition()
                      .duration(1000)
                      .delay(100*countPic)
                      .ease(d3.easeQuadIn)
                      .style("opacity", 1);




                      d3.select(".hidden").selectAll("img").on("mouseover", function(){
                      let mouse2 = d3.select(this);

                      mouse2.attr('src', 'data/output/' + mouse2.attr("id") + '_Crop.jpg' );
                      // mouse2.attr('src', '../../../MajorStudioSupportFile/p2Data/output2/' + mouse2.attr("id") + '.png');
                      // console.log(mouse.attr("id"))

                    });

                    d3.select(".detailPages").selectAll("img").on("mouseout", function(){
                    let mouse = d3.select(this);

                    mouse.attr('src', 'data/'+folderName+'/' + mouse.attr("id") + '.png' );
                    // console.log(mouse.attr("id"))

                    });
                    d3.select(".detailPages").selectAll("img").on("click", function(){
                    let mouse = d3.select(this);
                    window.open(metBaseURL+mouse.attr("id"), '_blank');
                    // mouse.attr('src', '../../../MajorStudioSupportFile/p2Data/output3/' + mouse.attr("id") + '_Crop.jpg' );
                    // console.log(mouse.attr("id"))

                    });

                  }

              }
            }

      // d3.selectAll(".detailPages").style("z-index",100);


  });





// d3.select(".detailPages").selectAll("img").on("mouseout", function(){
// let mouse = d3.select(this);
//
// mouse.attr('src', '../../../MajorStudioSupportFile/p2Data/output/' + mouse.attr("id") + '_Crop.jpg' );
// // console.log(mouse.attr("id"))
//
// });
//




}

function SupportingLine(cultureName){
  //
  let svgLine=d3.selectAll("#"+cultureName).append("svg")
      .attr("width", 200)
      .attr("height", 200)
      .style("background",mysvgColor)
      // .style('margin-top', '30px')
      .style('margin-left', '-100px')
      // .style("align-items","right")
      .style("position", "absolute");

      // let circle1= svgLine.append("circle")
      //   .attr("cx", 100)
      //   .attr("cy", 100)
      //   .attr("r", 100)
      //   .style('fill', "white")
      //   .style("opacity", 0)
      //   .transition()
      //   .duration(1500)
      //   .ease(d3.easeQuadIn)
      //   .style("opacity", 1);

    let rect1 =svgLine.append("rect")
    .attr("rx", 16)
    .attr("ry", 16)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 200)
    .attr("height", 200)



      .style('fill', myrectColor)
      .style("opacity", 0)
      .transition()
      .duration(1500)
      .ease(d3.easeQuadIn)
      .style("opacity", 1);


      let line1= svgLine.append("line")
        .attr("x1", 0)
        .attr("y1", 60)
        .attr("x2", 200)
        .attr("y2", 60)
        .attr("stroke-width", .5)
        .attr("stroke", mylineColor)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .ease(d3.easeQuadIn)
        .style("opacity", 1);
      let line2= svgLine.append("line")
        .attr("x1", 0)
        .attr("y1", 140)
        .attr("x2", 200)
        .attr("y2", 140)
        .attr("stroke-width", .5)
        .attr("stroke",mylineColor)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .ease(d3.easeQuadIn)
        .style("opacity", 1);
      let line3= svgLine.append("line")
        .attr("x1", 100)
        .attr("y1", 0)
        .attr("x2", 100)
        .attr("y2", 200)
        .attr("stroke-width", .5)
        .attr("stroke", mylineColor)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .ease(d3.easeQuadIn)
        .style("opacity", 1);
}
