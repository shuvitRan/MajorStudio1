var margin = {top:20, right:20, buttom:20, left:20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.buttom;


var svg = d3.selectAll('#viz')
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let promises = []
Promise.all(promises)
