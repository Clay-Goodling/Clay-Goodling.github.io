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
    details.append("p").text("(802) 266-0778");
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
  about.addContent(new TextBox("static/text/bio.txt"));


  let projects = new Page("Projects", back="Home");
  home.addSubPage(projects);

  let personalProjects = new Page("Personal/Club Projects", back="Projects");
  projects.addSubPage(personalProjects);

  let pp1 = new Page("Aerial Robotics", "Personal/Club Projects");
  personalProjects.addSubPage(pp1);

  pp1.addContent(new Image("static/img/arc.png"));
  pp1.addContent(new TextBox("static/text/arc.txt"));

  let pp2 = new Page("Cottage Connects", "Personal/Club Projects");
  personalProjects.addSubPage(pp2);

  pp2.addContent(new TextBox("static/text/cc.txt"));
  pp2.addContent(new Image("static/img/cc.png"));


  let academicWork = new Page("Academic Work", back="Projects");
  projects.addSubPage(academicWork);

  let aw1 = new Page("Personal Website", "Academic Work");
  academicWork.addSubPage(aw1);

  aw1.addContent(new Image("static/img/website.png"));
  aw1.addContent(new TextBox("static/text/website.txt"));

  let aw2 = new Page("Compiler", "Academic Work");
  academicWork.addSubPage(aw2);

  aw2.addContent(new TextBox("static/text/compiler.txt"));
  aw2.addContent(new Image("static/img/compiler.png"));


  let contact = new Page("Contact Me", back="Home");
  home.addSubPage(contact);

  contact.addContent(new ContactForm());
}
