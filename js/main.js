const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};
DomElement.prototype.afterSearch = function () {
  if (this.selector.startsWith(".")) {
    let div = document.createElement("div");
    div.style.cssText = `height : ${this.height};
            width : ${this.width};
            background : ${this.bg};
            fontSize : ${this.fontSize};`;
    div.textContent = "здесь текст здесь текст здесь текст здесь текст";
    document.body.append(div);
    //  console.log(document);
  } else if (this.selector.startsWith("#")) {
    let p = document.createElement("p");
    p.style.cssText = `height : ${this.height};
            width : ${this.width};
            background : ${this.bg};
            fontSize : ${this.fontSize};`;
    p.textContent = "текст здесь текст здесь текст здесь текст здесь";
    document.body.append(p);
  }
};

const newElem = new DomElement(".wrapper", "150px", "500px", "#FF00FF", "30");
newElem.afterSearch();
