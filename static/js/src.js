function main() {
  let body = d3.select("#body");

  let title = body.append("div")
    .attr("class", "title")
    .append("h1")
    .text("> James Goodling ");

  let content = body.append("div")
    .attr("class", "content");

  let about = content.append("div")
    .attr("class", "container");

  let frame = about.append("div")
    .attr("class", "frame");

  frame.append("div")
    .attr("class", "title")
    .append("h1")
      .text("> James Goodling ");

  let i_content = frame.append("div")
    .attr("class", "content")
    .append("div")
      .attr("class", "container");

  let i_frame = i_content.append("div")
    .attr("class", "frame");

  i_frame.append("div")
    .attr("class", "title")
    .append("h1")
      .text("> James Goodling ");

  i_frame.append("div")
    .attr("class", "content")
    .append("div")
      .attr("class", "container");
}
