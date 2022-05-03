function expand(elem) {
  let bbox = elem.node().getBBox();
  elem.stlye("position", "absolute")
    .style("left", bbox.x)
    .style("top", bbox.y);
  elem.classed("active", true);
}

function main() {
  let body = d3.select("#body");

  let title = body.append("div")
    .attr("class", "title")
    .append("h1")
    .text("> James Goodling");

  let content = body.append("div")
    .attr("class", "content");

  let about = content.append("div")
    .attr("class", "container");

  let frame = about.append("div")
    .attr("class", "frame")
    .on("click", function(){d3.select(this).attr("class", "active")});

  frame.append("div")
    .attr("class", "title")
    .append("h1")
      .text("> James Goodling 2");

  let i_content = frame.append("div")
    .attr("class", "content")
    .append("div")
      .attr("class", "container");

  let i_frame = i_content.append("div")
    .attr("class", "frame")
    .on("click", function(){d3.select(this).attr("class", "active")});

  i_frame.append("div")
    .attr("class", "title")
    .append("h1")
      .text("> James Goodling 3");

  i_frame.append("div")
    .attr("class", "content")
    .append("div")
      .attr("class", "container");
}
