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
    this.elem = d3.select(document.createElement("div"))
      .classed("contact-div", true);

    let form = this.elem.append("form")
      .attr("action", "mailto:james@goodling.dev")
      .attr("method", "GET");

    form.append("input")
      .attr("name", "subject")
      .attr("placeholder", "Subject")
      .attr("type", "text")
      .classed("contact-subject", true);

    form.append("textarea")
      .attr("name", "body")
      .attr("placeholder", "Message")
      .attr("type", "text")
      .classed("contact-message", true);

    form.append("div")
      .classed("send-div", true)
      .append("input")
        .attr("type", "submit")
        .attr("value", "Send")
        .classed("submit-button", true);

    let details = this.elem.append("div")
      .classed("contact-details", true);

    details.append("p").text("james@goodling.dev");
    details.append("p").text("(802) 291-4053");
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

  addContent(content) {
    this.content.node().appendChild(content.elem.node());
  }
}

function main() {
  let body = d3.select("body");

  let home = new Page("James Goodling", null, true);
  body.node().appendChild(home.elem.node());

  let about = new Page("About Me", back="Home");
  home.addSubPage(about);

  about.addContent(new Image("static/img/James_Goodling_2022.jpg"));
  about.addContent(new TextBox("static/text/placeholder.txt"));


  let projects = new Page("Projects", back="Home");
  home.addSubPage(projects);

  let personalProjects = new Page("Personal Projects", back="Projects");
  projects.addSubPage(personalProjects);

  let pp1 = new Page("Personal Project 1", "Personal Projects");
  personalProjects.addSubPage(pp1);

  pp1.addContent(new Image("static/img/placeholder.jpg"));
  pp1.addContent(new TextBox("static/text/placeholder.txt"));

  let pp2 = new Page("Personal Project 2", "Personal Projects");
  personalProjects.addSubPage(pp2);

  pp2.addContent(new TextBox("static/text/placeholder.txt"));
  pp2.addContent(new Image("static/img/placeholder.jpg"));

  let pp3 = new Page("Personal Project 1", "Personal Projects");
  personalProjects.addSubPage(pp3);

  pp3.addContent(new Image("static/img/placeholder.jpg"));
  pp3.addContent(new TextBox("static/text/placeholder.txt"));


  let academicWork = new Page("Academic Work", back="Projects");
  projects.addSubPage(academicWork);

  let aw1 = new Page("Academic Work 1", "Academic Work");
  academicWork.addSubPage(aw1);

  aw1.addContent(new Image("static/img/placeholder.jpg"));
  aw1.addContent(new TextBox("static/text/placeholder.txt"));

  let aw2 = new Page("Academic Work 2", "Academic Work");
  academicWork.addSubPage(aw2);

  aw2.addContent(new TextBox("static/text/placeholder.txt"));
  aw2.addContent(new Image("static/img/placeholder.jpg"));

  let aw3 = new Page("Academic Work 1", "Academic Work");
  academicWork.addSubPage(aw3);

  aw3.addContent(new Image("static/img/placeholder.jpg"));
  aw3.addContent(new TextBox("static/text/placeholder.txt"));


  let contact = new Page("Contact Me", back="Home");
  home.addSubPage(contact);

  contact.addContent(new ContactForm());
}
