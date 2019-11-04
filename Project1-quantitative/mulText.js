


function multipleText(data){
  let svg = d3.select(this)
              .selectAll("g")
               .data((d)=>{
                 return d.values;
               })
               .enter();

  let tagGroup = svg.append("g");

  let rectwidth = d3.scaleLinear()
            .domain([1,800])
            .range([5,140]);


      tagGroup.append("text")
          .style("fill","black")
          // .style("fill", (d)=> colorPallet3(d.tag))
          .style("font-size","13px")
          .style("font-weight","bold")
          .style("text-align", "center")

          // .style("width", "20px")
          // .attr("height","20px")
          // .attr("clear","both")
          .style("display", "inline-block")


            // .style("clear","both")


          .attr("text-anchor", "end")
          .attr("class", function(d){
            // console.log(d)
            return (d.tag.replace(/ +|[^\w\s]/g, ""));
          })
         .attr("x", width*4/7)
         .attr("y", (d,i)=> {
           let textY=20;
           textY=i*25+textY;
           return textY;
         })
         .text((d)=>{
           return d.tag;
         });


         var t = d3.transition()
             .duration(3050)
             .ease(d3.easeLinear);

        svg.append("rect")
           .attr("x", width*4/7)

           // (d)=>{
           //   if (d.number != null){
           //     return width/3+rectwidth(d.number+30);
           //  }
           // })
           .attr("y", (_,i)=> {
             let textY=20;
             textY=i*25+textY;
             return textY;
           })

           .attr("height", 10)
           .attr("rx",2)
           .attr("ry",2)
           .attr("width", "0")
           .transition(t)
           .attr("width", (d)=> rectwidth(d.number))
           // .style("fill",'white')
           .style("fill", (d)=> colorPallet3(d.tag));


//all the numbers
         svg.append("text")
            .attr("y", (d,i)=> {
              let textY=15;
              textY=i*25+textY;
              return textY;
            })
            .text((d)=>{
              return d.number;
            })
            .style("font-size","8px")
            .style("fill","white")
            .attr("x", width*4/7)
            .transition(t)
            .style("fill","black")
            // .style("fill","white")
           .attr("x", (d)=>{
             if (d.number != null){
               if(d.number <700){
                 return width*4/7+rectwidth(d.number+40);
               } else{
                 return width*4/7+rectwidth(700+40);

               }
             }
           });
//seperating lines
          svg.append("line")
             .attr("x1", width+30)
             .attr("y1", 0)
             .attr("x2", width)
             .attr("y2", height)
             .attr("stroke-width", .5)
             .attr("stroke", "grey");
             //
             // console.log(width);
             // svg.append("line")
             //    .attr("x1", 0)
             //    .attr("y1", 0)
             //    .attr("x2", 0)
             //    .attr("y2", height)
             //    .attr("stroke-width", .5)
             //    .attr("stroke", "grey");;


}


function linkAllTags(){
    let tagHighlight;
  d3.selectAll("svg").selectAll("g").selectAll("text").on("mouseover", function(){
    let myCursor = d3.select(this);
    let allTag = d3.selectAll("svg").selectAll("g").selectAll("text");


    // console.log(myCursor.data()[0].tag);
    tagHighlight = d3.select(this).data()[0].tag.replace(/ +|[^\w\s]/g, "");
    // console.log(tagHighlight);

     d3.selectAll("svg").selectAll("g")
                       .selectAll("."+tagHighlight)
                       // .style("background-color","black")
                       .style("outline"," FireBrick  solid 2px");
                       // .style("font-size", "15px");


  });

  d3.selectAll("svg").selectAll("g").selectAll("text").on("mouseout", function(){

  tagHighlight = d3.select(this).data()[0].tag.replace(/ +|[^\w\s]/g, "");

         d3.selectAll("svg").selectAll("g")
                           .selectAll("."+tagHighlight)
                           // .style("background-color","yellow")
                           .style("outline"," none");
                           //  .style("fill","black")
                           // .style("font-size", "13px");

  });

}



function ClicklinkAllTags(){
let tagHighlight;


  d3.selectAll("svg").selectAll("g").selectAll("text").on("click", function(){
    let myCursor = d3.select(this);
    let allTag = d3.selectAll("svg").selectAll("g").selectAll("text");


    // console.log(myCursor.data()[0].tag);
    tagHighlight = d3.select(this).data()[0].tag.replace(/ +|[^\w\s]/g, "");
    // console.log(tagHighlight);
    let getColor = d3.selectAll("svg").selectAll("g")
                         .selectAll("."+tagHighlight)
                         .style('fill');





     d3.selectAll("svg").selectAll("g")
                       .selectAll("."+tagHighlight)
                       .style("fill",function(d){
                         if(getColor.includes("black")){
                           d3.selectAll("svg").selectAll("g")
                                               .selectAll("."+tagHighlight)
                                               .style("font-size", "15px");

                           return "firebrick";

                         } else if(getColor.includes("firebrick")){
                           d3.selectAll("svg").selectAll("g")
                                               .selectAll("."+tagHighlight)
                                               .style("font-size", "13px");
                             return 'black';

                         }


                       });


  });


}
