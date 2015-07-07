window.bouncyDivs = function() {
  var colors = ["AliceBlue", /*"AntiqueWhite",*/ "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", /*"FloralWhite",*/ "ForestGreen", "Fuchsia", "Gainsboro", /*"GhostWhite",*/ "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", /*"NavajoWhite",*/ "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", /*"White",*/ /*"WhiteSmoke",*/ "Yellow", "YellowGreen"];
  var names = ["Leslie", "Ron", "Tom", "Ann", "April", "Andy", "Ben", "Chris", "Jerry", "Donna", "Mark", "Craig", "Dave", "Justin ", "Linda", "Lucy", "Bill", "Carl", "George", "Douglass", "Hugh", "Jeremy", "Joe", "Ken", "Kyle", "Swanson"]
  var divs = [];
  var viewWidth;
  var viewHeight;

  var init = function() {
    // init function calls
    getWindowDimensions();
    addListeners();
    addNewBouncyDiv();
  }
  // Constructor
  var BouncyDiv = function(options) {
    // append element
    this.element = document.getElementById("name") || document.createElement("div");
    this.element.classList.add("bouncy_div");
    document.getElementsByTagName('body')[0].appendChild(this.element);

    // setup name
    this.name = options.name;
    if (typeof options.speech != "undefined")
      this.element.dataset.speech = options.speech
    else
      this.element.dataset.speech = "Hello, my name is " + this.name + "!";

    // setup color
    this.color = options.color;
    this.element.style.backgroundColor = this.color;

    // setup position
    this.x = options.x
    this.y = options.y;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    if (typeof options.speed != "undefined")
      this.speed = options.speed;
    else
      this.speed = {
        x: getRandomNum(3),
        y: getRandomNum(3)
      };

    this.directionX = options.directionX;
    this.directionY = options.directionY;

    this.updateX = function(newX) {
      this.x = newX;
      this.element.style.left = this.x + "px";
    };

    this.updateY = function(newY) {
      this.y = newY;
      this.element.style.top = this.y + "px";
    };
  };

  var animateDivs = function() {
    for (d in divs) {

      var el = divs[d]
      var elemHeight = el.element.offsetHeight;
      var elemWidth = el.element.offsetWidth;

      if (el.directionX == "right")
        el.updateX(el.x + 1 * el.speed.x);
      else
        el.updateX(el.x - 1 * el.speed.x);
      if (el.directionY == "down")
        el.updateY(el.y + 1 * el.speed.y);
      else
        el.updateY(el.y - 1 * el.speed.y);

      //check for collision
      if (el.y + elemHeight >= viewHeight || el.y < 0) {
        el.directionY = el.directionY == "down" ? "up" : "down"
      }
      if (el.x + elemWidth >= viewWidth || el.x < 0) {
        el.directionX = el.directionX == "right" ? "left" : "right"
      }
    }
  }

  var addListeners = function() {
    document.body.onmouseup = function (event) {
      var target = event.target || event.toElement;

      if (target.nodeName.toLowerCase() == "div") {
         for (d in divs) {

          if (divs[d].element == target) {

            var el = divs[d];
            var elemDirectionX = el.directionX = el.directionX == "right" ? "left" : "right";
            var elemDirectionY = el.directionX = el.directionX == "right" ? "left" : "right";
            //var color = el.color;
            //var name = el.name + " " + getName();
            var name = getName();
            var speech = "Hello, I'm " + name + "! I budded off " + el.name;
            addNewBouncyDiv({name: name, color: getColor(), speech: speech, x: el.x, y: el.y, directionY: elemDirectionY, directionX: elemDirectionX});
          }
         }
      };
    };
  }

  var getWindowDimensions = function() {
    viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  var getName = function() {
    var randomNameIndex = Math.floor(Math.random() * names.length);
    var name = names[randomNameIndex];
    names.splice(randomNameIndex, 1);

    return name;
  }

  var getColor = function() {
    var randomColorIndex = Math.floor(Math.random() * colors.length);
    var color = colors[randomColorIndex];
    colors.splice(randomColorIndex, 1);

    return color;
  }

  var getRandomNum = function(to) {
    return(Math.floor(Math.random()*(to - 1)) + 1)
  }

  var addNewBouncyDiv = function(options) {

    // options are undefined, define them
    if (typeof options == "undefined") {
      options = {};

      options["name"] = getName()
      options["color"] = getColor()

      // setup position & direction
      options["x"] = Math.floor((Math.random() * viewWidth) + 1);
      options["y"] = Math.floor((Math.random() * viewHeight) + 1);
      options["directionX"] = "right";
      options["directionY"] = "down";
    }

    divs.push(new BouncyDiv(options));
  }

  return {
    init: init,
    animateDivs: animateDivs,
    getWindowDimensions: getWindowDimensions
  };
}();
