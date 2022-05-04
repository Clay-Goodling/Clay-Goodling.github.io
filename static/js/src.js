class BackButton {
  constructor(text, elem) {
    this.elem = d3.select(document.createElement('div'))
      .classed("button", true)
      .text(text)
      .on("click", function (e) {
        elem.classed("active", false)
          .classed("mini", true);
        e.stopPropagation();
      })
  }
}

class TextBox {
  constructor(path) {
    this.elem = d3.select(document.createElement('div'))
      .classed("textbox", true);

    fetch(path)
      .then(r => r.text())
      .then(d => this.elem.append("p").html(d));
  }
}

class Image {
  constructor(path) {
    this.elem = d3.select(document.createElement('img'))
    .attr("src", path);
  }
}

class Page {
  constructor(title, back=null, active=false) {
    this.elem = d3.select(document.createElement('div'))
      .classed("frame", true);

    this.elem.classed("active", active)
      .classed("mini", !active);

    this.head = this.elem.append("div")
      .attr("class", "title")
      .on("click", () =>
        (this.parent != null && this.parent.classed("active"))
        ? this.elem.classed("active", true).classed("mini", false)
        : null
      );

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
      .classed("frame-container", true);

    container.node().appendChild(page.elem.node());

    page.parent = this.elem;
  }

  addText(path) {
    this.content.node().appendChild(new TextBox(path).elem.node());
  }

  addImage(path) {
    this.content.node().appendChild(new Image(path).elem.node());
  }
}

function main() {
  let body = d3.select("#body");

  let main = new Page("James Goodling", null, true);
  body.node().appendChild(main.elem.node());

  let about = new Page("About Me", back="Home");
  main.addSubPage(about);

  about.addImage("static/img/James_Goodling_2022.jpg")
  about.addText('static/text/bio.txt');


  let projects = new Page("Projects", back="Home");
  main.addSubPage(projects);

  let personalProjects = new Page("Personal Projects", back="Projects");
  projects.addSubPage(personalProjects);

  let academicWork = new Page("Academic Work", back="Projects");
  projects.addSubPage(academicWork);


  let contact = new Page("Contact Me", back="Home");
  main.addSubPage(contact);

  
}
