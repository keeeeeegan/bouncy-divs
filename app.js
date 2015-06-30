
var colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
var names = ["Robert", "Gregg", "Steven", "Jack", "Rolph", "Keegan", "Ted", "Star Wars", "Biff", "Freddy"]
var divs = [];

var viewWidth;
var viewHeight;

// Constructor
var BouncyDiv = function() {
  // append element
  this.element = document.getElementById("name") || document.createElement("div");
  this.element.classList.add("bouncy_div");
  document.getElementsByTagName('body')[0].appendChild(this.element);

  // setup name
  randomNameIndex = Math.floor(Math.random() * names.length);
  this.name = names[randomNameIndex];
  names.splice(randomNameIndex, 1);
  console.log(names);
  this.element.dataset.speech = "Hello, my name is " + this.name + "!";

  // setup color
  randomColorIndex = Math.floor(Math.random() * colors.length);
  this.color = colors[randomColorIndex];
  colors.splice(randomColorIndex, 1);
  this.element.style.backgroundColor = this.color;

  // setup position
  this.x = Math.floor((Math.random() * viewWidth) + 1);
  this.y = Math.floor((Math.random() * viewHeight) + 1);
  this.element.style.left = this.x + "px";
  this.element.style.top = this.y + "px";

  this.directionX = "right";
  this.directionY = "down";

  this.updateX = function(newX) {
    this.x = newX;
    this.element.style.left = this.x + "px";
  };

  this.updateY = function(newY) {
    this.y = newY;
    this.element.style.top = this.y + "px";
  };
};

function animateDivs() {
  for (d in divs) {

    el = divs[d]
    elemHeight = el.element.offsetHeight;
    elemWidth = el.element.offsetWidth;

    if (el.directionX == "right")
      el.updateX(el.x + 1);
    else
      el.updateX(el.x - 1);
    if (el.directionY == "down")
      el.updateY(el.y + 1);
    else
      el.updateY(el.y - 1);

    //check for collision
    if (el.y + elemHeight >= viewHeight || el.y < 0) {
      el.directionY = el.directionY == "down" ? "up" : "down"
    }
    if (el.x + elemWidth >= viewWidth || el.x < 0) {
      el.directionX = el.directionX == "right" ? "left" : "right"
    }
  }
}

function getWindowDimensions() {
  viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

function addNewBouncyDiv() {
  divs.push(new BouncyDiv());
}

function addListeners() {
  document.body.onmouseup = function (event) {
    var target = event.target || event.toElement;

    if (target.nodeName.toLowerCase() == "div") {
       for (d in divs) {

        if (divs[d].element == target) {

          el = divs[d]
          elemX = el.x;
          elemY = el.y;
          elemDirectionX = el.directionX = el.directionX == "right" ? "left" : "right";
          elemDirectionY = el.directionX = el.directionX == "right" ? "left" : "right";
          addNewBouncyDiv();
          //addNewBouncyDiv({x: elemX, y: elemY, directionY: elemDirectionY, directionX: elemDirectionX});
        }
       }
    };
  };
}

// init function calls
getWindowDimensions();
addListeners();
addNewBouncyDiv();

// add event listeners
document.getElementById("addDiv").onclick = addNewBouncyDiv;
window.addEventListener('resize', getWindowDimensions, false);
setInterval(animateDivs, 10);
