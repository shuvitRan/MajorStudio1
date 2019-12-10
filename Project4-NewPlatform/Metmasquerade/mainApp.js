let promises = [d3.json("./dataRequest/maskdata.json")];
let myKey = config.MY_KEY;

var deepAR;

let myTitle = d3.select("body").append('div')
.attr("id", "title");
  myTitle.append("h1")
          // .style("padding","auto")
          .style("margin","auto")
          // .style("padding-down","0.5vw")
          .style("color", "rgb(255, 255, 255)")
           .style("font-size", "3vw")
           .style("padding-bottom", "0.5px")
           .style("line-height","12vw")
           .style("vertical-align", "middle")
          .text("Met Masquerade");

  let maskInfo = d3.select("body").append('div')
                  .attr("id", "maskInfo");
  let columnContainer = maskInfo.append('div').attr("id","columnContainer");


                  maskInfo.append("input")
                        .attr("type", "image")
                        .attr("id","cancelButton")
                        .attr("src","assets/CancelWhite.png")
                        .style("top","30px")
                        .style("right","30px")
                        // .style("bottom","5%")
                        .style("position","absolute")
                        .style("width","28px")
                        .style("height","28px")
                        .style("outline","none")
                        .attr("onclick", "CloseInfo()");



Promise.all(promises).then((data)=>{
  return data[0];
}).then(data =>{

  let n = 2;
  const shuffled = data.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, n);

  console.log(selected[0].objIds +'and' + selected[1].objIds);






// Initialize the DeepAR object
   deepAR = DeepAR({
  licenseKey: myKey,
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
  canvas: document.getElementById('deepar-canvas'),
  numberOfFaces: 2, // how many faces we want to track min 1, max 4
  onInitialize: function() {
  // start video immediately after the initalization, mirror = true
  // deepAR.startVideo(true);
  startExternalVideo();

  deepAR.switchEffect(1, 'slot2', 'effects/'+selected[1].objIds, function() {
    // effect loaded
    MaskDescription(selected[1]);
  });

  // load the aviators effect on the first face into slot 'slot'
  deepAR.switchEffect(0, 'slot', 'effects/'+selected[0].objIds, function() {
    // effect loaded
    MaskDescription(selected[0]);

                    // .attr('height', 100);


  });

  d3.select("#myTip").append("p")
                      .text("Swipe Left or Right to Change the Mask");
  d3.select("#myTip").append("img")
                    .attr("type", "image")
                    .attr("id","imgTip")
                    .attr("src","assets/swipe.png")
                    .style("width","218px")
                    .style("height","202px");
                    let myTool = document.getElementById("imgTip");

                    // Code for Chrome, Safari and Opera
                    myTool.addEventListener("webkitAnimationEnd", DeleteTip);
                    // Standard syntax
                    myTool.addEventListener("animationend", DeleteTip);

  }
  });

  // download the face tracking model
  let a = 0;
  let b = 6;
  deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');
  function startExternalVideo() {

    // create video element
    var video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.controls = true;
    video.setAttribute('playsinline', 'playsinline');
    video.style.width = '100%';
    video.style.height = '100%';

    // put it somewhere in the DOM
    var videoContainer = document.createElement('div');
    videoContainer.appendChild(video);
    videoContainer.style.width = '1px';
    videoContainer.style.height = '1px';
    videoContainer.style.position = 'absolute';
    videoContainer.style.top = '0px';
    videoContainer.style.left = '0px';
    videoContainer.style['z-index'] = '-1';
    document.body.appendChild(videoContainer);

    navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }

      setTimeout(function() {
        video.play();
      }, 50);
    }).catch(function(error) {

    });

    // tell the DeepAR SDK about our new video element
    deepAR.setVideoElement(video, true);
  }

  function FindNewFaces(data){
    if(a<9){
      a=a+1;
    } else{
      a=0;
    }
    if(b<9){
      b++;
    } else{
      b=0;
    }
    d3.selectAll("#aboutMask").remove();
    console.log(a);

    deepAR.switchEffect(1, 'slot2', 'effects/'+data[b].objIds, function() {
      // effect loaded
          MaskDescription(data[b]);
    });
    deepAR.switchEffect(0, 'slot', 'effects/'+data[a].objIds, function() {
      // effect loaded
          MaskDescription(data[a]);


    });


  };
  function ReverseFaces(data){
    if(a>0){
      a--;
    } else{
      a=9;
    }
    if(b>0){
      b--;
    } else{
      b=9;
    }
    d3.selectAll("#aboutMask").remove();
    console.log(a);

    deepAR.switchEffect(1, 'slot2', 'effects/'+data[b].objIds, function() {
      // effect loaded
          MaskDescription(data[b]);
    });
    deepAR.switchEffect(0, 'slot', 'effects/'+data[a].objIds, function() {
      // effect loaded
          MaskDescription(data[a]);


    });


  };


  let mySwipeElement = document.getElementById('deepar-canvas');
  var mc = new Hammer(mySwipeElement);

  mc.on("swipeleft", function(ev) {
    // console.log(ev.type );
    FindNewFaces(data);
  });

  mc.on("swiperight", function(ev) {
    // console.log(ev.type );
    ReverseFaces(data);
  });

  let photoBtn = d3.select("body").append('a')
                                  .attr("class", "btn")
                                  // .attr("onclick", "TakePhoto()");
                                  .attr("onclick", "deepAR.takeScreenshot()");
                                  // .attr("onclick", function(){
                                      // return deepAR.takeScreenshot();
                                  //
  // });
  let infoBtn = myTitle.append('a')
                                  .attr("class", "square_btn")
                                  // .attr("onclick", "TakePhoto()");
                                  .attr("onclick", "ShowInfo()")
                                  .text("about mask");

// let photo;
// photo = deepAR.onScreenshotTaken(photo);


  //





  deepAR.onScreenshotTaken = function(photo) {
        console.log('screenshot taken');
        // console.log(photo);
        // photo.replace("image/png","image/octet-stream");
        // window.location.href = photo;
        download(photo, "metMasquerade.png", "image/png")
            };

  deepAR.onFaceVisibilityChanged = function(visible) {
      console.log('face visible', visible);

    };

    // deepAR.onImageVisibilityChanged = function(visible) {
    //   console.log('image visible', visible);
    // };
    // deepAR.onVideoStarted = function() {
    //     var loaderWrapper = document.getElementById('loader-wrapper');
    //     loaderWrapper.style.display = 'none';
    //   };


});

function MaskDescription(thisMask){

  this.mask = thisMask;
  let image =  columnContainer
                        .append("img")
                          .attr("id", "aboutMask")
                        .attr('src', 'MaskImageSmall/'+mask['objIds'] + '.png')
                          .attr("id", "aboutMask")
                          // .style("margin-top","150px" )
                         // .style('width', "100%")
                         // .style('display', "block")
                         // .style("max-width","200px")
                         .style("object-fit", "contain");
  let content = columnContainer.append("div")
                          .attr("id", "aboutMask");
                          content.append('H2')
                                 .attr("class","info")
                                 // .style("padding-left","2vw")
                                 .text(mask.title);
                      content.append('p')
                             .attr("class","info")
                             // .style("padding-left","2vw")
                             .text("Year: "+mask.date);
                     content.append('p')
                            .attr("class","info")
                            // .style("padding-left","2vw")
                            .text("Culture: "+mask.culture);
                     content.append('p')
                            .attr("class","info")
                            // .style("padding-left","2vw")
                            .text("Medium: "+mask.medium);


}



function DeleteTip(){
  d3.select("#myTip").remove();
};



function ShowInfo(){
  document.getElementById("maskInfo").style.zIndex = "15";


}

function CloseInfo(){
  document.getElementById("maskInfo").style.zIndex = "-5";
  // d3.select
}

  // deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');
