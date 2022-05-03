class BackButton {
  constructor(text, elem) {
    this.elem = d3.select(document.createElement('div'))
      .classed("button", true)
      .text(text)
      .on("click", function (e) {
        elem.classed("active", false);
        e.stopPropagation();
      })
  }
}

class Page {
  constructor(title, back=null, active=false) {
    this.elem = d3.select(document.createElement('div'))
      .classed("frame", true);

    if (active) {
      this.elem.classed("active", true);
    }

    this.head = this.elem.append("div")
      .attr("class", "title")
      .on("click", () => this.elem.classed("active", true));

    if (back != null) {
      let back_button = new BackButton(back, this.elem);
      this.back = this.head.node().appendChild(back_button.elem.node())
    }

    this.title = this.head.append("h1")
      .text("> " + title);

    this.content = this.elem.append("div")
      .attr("class", "content");
  }

  addSubPage(page) {
    let container = this.content.append("div")
      .classed("container", true);

    container.node().appendChild(page.elem.node());
  }
}

function main() {
  let body = d3.select("#body");

  let main = new Page("James Goodling", null, true);
  body.node().appendChild(main.elem.node());

  let about = new Page("About Me", back="Home");
  main.addSubPage(about);

  let projects = new Page("Projects", back="Home");
  main.addSubPage(projects);

  let contact = new Page("Contact Me", back="Home");
  main.addSubPage(contact);
}

// function main() {
//   let body = d3.select("#body");

//   let title = body.append("div")
//     .attr("class", "title")
//     .append("h1")
//     .text("> James Goodling");

//   let content = body.append("div")
//     .attr("class", "content");

//   let about = content.append("div")
//     .attr("class", "container");

//   let frame = about.append("div")
//     .attr("class", "frame")
//     .on("click", function(){d3.select(this).attr("class", "active")});

//   frame.append("div")
//     .attr("class", "title")
//     .append("h1")
//       .text("> James Goodling 2");

//   let i_content = frame.append("div")
//     .attr("class", "content")
//     .append("div")
//       .attr("class", "container");

//   let i_frame = i_content.append("div")
//     .attr("class", "frame")
//     .on("click", function(){d3.select(this).attr("class", "active")});

//   i_frame.append("div")
//     .attr("class", "title")
//     .append("h1")
//       .text("> James Goodling 3");

//   i_frame.append("div")
//     .attr("class", "content")
//     .append("div")
//       .attr("class", "container");
// }
