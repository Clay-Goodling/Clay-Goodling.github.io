class BackButton {
  constructor(text, elem) {
    this.elem = d3.select(document.createElement("div"))
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
    this.elem = d3.select(document.createElement("div"))
      .classed("textbox", true);

    fetch(path)
      .then(r => r.text())
      .then(d => this.elem.append("p").html(d));
  }
}

class Image {
  constructor(path) {
    this.elem = d3.select(document.createElement("img"))
    .attr("src", path);
  }
}

class ContactForm {
  constructor() {
    this.elem = this.elem = d3.select(document.createElement("form"));
  }
}

class Page {
  constructor(title, back=null, active=false) {
    this.elem = d3.select(document.createElement("div"))
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

  let home = new Page("James Goodling", null, true);
  body.node().appendChild(home.elem.node());

  let about = new Page("About Me", back="Home");
  home.addSubPage(about);

  about.addImage("static/img/James_Goodling_2022.jpg");
  about.addText("static/text/placeholder.txt");


  let projects = new Page("Projects", back="Home");
  home.addSubPage(projects);

  let personalProjects = new Page("Personal Projects", back="Projects");
  projects.addSubPage(personalProjects);

  let pp1 = new Page("Personal Project 1", "Personal Projects");
  personalProjects.addSubPage(pp1);

  pp1.addImage("static/img/placeholder.jpg");
  pp1.addText("static/text/placeholder.txt");

  let pp2 = new Page("Personal Project 2", "Personal Projects");
  personalProjects.addSubPage(pp2);

  pp2.addText("static/text/placeholder.txt");
  pp2.addImage("static/img/placeholder.jpg");

  let pp3 = new Page("Personal Project 1", "Personal Projects");
  personalProjects.addSubPage(pp3);

  pp3.addImage("static/img/placeholder.jpg");
  pp3.addText("static/text/placeholder.txt");


  let academicWork = new Page("Academic Work", back="Projects");
  projects.addSubPage(academicWork);

  let aw1 = new Page("Academic Work 1", "Academic Work");
  academicWork.addSubPage(aw1);

  aw1.addImage("static/img/placeholder.jpg");
  aw1.addText("static/text/placeholder.txt");

  let aw2 = new Page("Academic Work 2", "Academic Work");
  academicWork.addSubPage(aw2);

  aw2.addText("static/text/placeholder.txt");
  aw2.addImage("static/img/placeholder.jpg");

  let aw3 = new Page("Academic Work 1", "Academic Work");
  academicWork.addSubPage(aw3);

  aw3.addImage("static/img/placeholder.jpg");
  aw3.addText("static/text/placeholder.txt");


  let contact = new Page("Contact Me", back="Home");
  home.addSubPage(contact);

  let contactForm = new ContactForm();
  contact.addForm(contactForm);
}
