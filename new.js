// global constants
const myAPIkey = "CzXtRan91Wp0597awIXFPJGI7qZaee0h";

const limit = "20";
const rating = "g";
const offset = pages * limit;
var pages = 0;
var focus = [0, 0];
var pos = 0;

searchTerms = [
  "grr",
  "so frustrated",
  "oop",
  "hustle",
  "justin bieber",
  "dad joke",
  "dogs",
  "cats",
  "hungry",
  "happy",
  "winner",
  "loser",
  "bored",
  "grind",
  "angry",
  "flirting",
  "new york",
  "confused",
  "friends",
  "drake",
  "bunnies",
  "pigs",
  "hi",
  "love you",
  "yay",
  "no",
  "yes",
  "fast",
  "slow",
  "lame",
  "awesome",
  "party",
  "ice cream",
  "try again",
  "you're the best",
  "best friend",
  "love you",
  "amazing",
  "dancing",
  "grr",
  "so frustrated",
  "oop",
  "hustle",
  "justin bieber",
  "dad joke",
  "dogs",
  "cats",
  "hungry",
  "happy",
  "winner",
  "loser",
  "bored",
  "grind",
  "angry",
  "flirting",
  "new york",
  "confused",
  "friends",
  "drake",
  "bunnies",
  "pigs",
  "hi",
  "love you",
  "yay",
  "no",
  "yes",
  "fast",
  "slow",
  "lame",
  "awesome",
  "party",
  "ice cream",
  "try again",
  "you're the best",
  "best friend",
  "love you",
  "amazing",
  "dancing",
  "grr",
  "so frustrated",
  "oop",
  "hustle",
  "justin bieber",
  "dad joke",
  "dogs",
  "cats",
  "hungry",
  "happy",
  "winner",
  "loser",
  "bored",
  "grind",
  "angry",
  "flirting",
  "new york",
  "confused",
  "friends",
  "drake",
  "bunnies",
  "pigs",
  "hi",
  "love you",
  "yay",
  "no",
  "yes",
  "fast",
  "slow",
  "lame",
  "awesome",
  "party",
  "ice cream",
  "try again",
  "you're the best",
  "best friend",
  "love you",
  "amazing",
  "dancing",
  "grr",
  "so frustrated",
  "oop",
  "hustle",
  "justin bieber",
  "dad joke",
  "dogs",
  "cats",
  "hungry",
  "happy",
  "winner",
  "loser",
  "bored",
  "grind",
  "angry",
  "flirting",
  "new york",
  "confused",
  "friends",
  "drake",
  "bunnies",
  "pigs",
  "hi",
  "love you",
  "yay",
  "no",
  "yes",
  "fast",
  "slow",
  "lame",
  "awesome",
  "party",
  "ice cream",
  "try again",
  "you're the best",
  "best friend",
  "love you",
  "amazing",
  "dancing",
  "love you",
  "amazing",
  "dancing",
  "grr",
  "so frustrated",
  "oop",
  "hustle",
  "justin bieber",
  "dad joke",
];

// we are working with a 15 by 11 grid
// functions
function moveUp() {
  if (focus[1] == 0) {
    // we are at the top do nothing
  } else {
    removeGLow(focus[0], focus[1]);
    focus[1] -= 1;
  }
  highlightSelected(focus[0], focus[1]);
}
function moveDown() {
  if (focus[1] == 10) {
    // nothing
  } else {
    removeGLow(focus[0], focus[1]);
    focus[1] += 1;
  }
  highlightSelected(focus[0], focus[1]);
}
function moveLeft() {
  if (focus[0] % 15 == 0) {
    // we are all the way left do nothing
    // do nothing
  } else {
    removeGLow(focus[0], focus[1]);
    focus[0] -= 1;
  }
  highlightSelected(focus[0], focus[1]);
}
function moveRight() {
  if (focus[0] % 15 == 14) {
    // we are all the way right do nothing
    // do nothing
  } else {
    // calculate the current number and remove the highlight
    removeGLow(focus[0], focus[1]);
    focus[0] += 1;
  }
  highlightSelected(focus[0], focus[1]);
}
async function readLoop(reader) {
  counterVal = 0;
  while (true) {
    const { value, done } = await reader.read();
    var fixed = value.trim();
    if (done) {
      // Allow the serial port to be closed later.
      console.log("closing connection");
      reader.releaseLock();
      break;
    }
    // here we will handle every action
    switch (fixed) {
      case "joyUp":
        moveUp();
        break;
      case "joyDown":
        moveDown();
        break;
      case "joyLeft":
        moveLeft();
        break;
      case "joyRight":
        moveRight();
        break;
      case "press":
        boxSelected();
        break;
      default:
        // then it is probably a number or garbage
        if (isNaN(fixed) === false) {
          changeSize(fixed);
          console.log("in here");
        } else {
          // do nothing
        }
    }
  }
}
// make the gif bigger or smaller
function changeSize(num) {
  let classString = "eachGif " + "individual-gif" + String(num);
  $(".eachGif").removeClass().addClass(classString);
}
function highlightSelected(valx, valy) {
  // calculate the number of the square we are looking at
  let x = valx;
  let y = valy * 15;
  pos = x + y;
  let findString = "[" + "data-id=" + '"' + String(pos) + '"' + "]";
  $(findString).addClass("highlighted");
}
function boxSelected() {
  pos = focus[0] + focus[1];
  let findString = "[" + "data-id=" + '"' + String(pos) + '"' + "]";
  let searchFor = $(findString).attr("data-term");
  handleFormSubmit(searchFor);
}
function removeGLow(valx, valy) {
  // calculate the number of the square we are looking at
  let x = valx;
  let y = valy * 15;
  pos = x + y;
  let findString = "[" + "data-id=" + '"' + String(pos) + '"' + "]";
  $(findString).removeClass("highlighted");
}
// function to create many squares
function makeSquares() {
  // empty when first called
  $("#square-area").empty();
  $.each(searchTerms, function (i, term) {
    let rand = Math.floor(Math.random() * 5) + 1;
    let classString = "color" + rand;
    let inputString =
      "<div " +
      'class="square-term ' +
      classString +
      '" ' +
      "data-term=" +
      '"' +
      term +
      '"' +
      " data-id=" +
      '"' +
      i +
      '"' +
      ' id="' +
      term +
      i +
      '">' +
      "</div>";
    console.log(inputString);
    let square = $(inputString);
    $("#square-area").append(square);
  });
}
// form submit makes gifs appear
async function handleFormSubmit(searchInput) {
  const apiUrl =
    "http://api.giphy.com/v1/gifs/search?api_key=" +
    myAPIkey +
    "&q=" +
    searchInput +
    "&limit=20";

  // 2. On form submit, go to the giphy API and get urls of gifs
  // let response = await fetch(apiUrl);
  const response = await fetch(apiUrl);
  //   console.log(apiUrl);
  const responseData = await response.json();
  console.log(responseData);
  for (let i = 0; i < responseData.data.length; i++) {
    displayResults(responseData.data[i]);
  }
}
function displayResults(data) {
  console.log(data);
  let url = data.images.original.url;
  let imgCode = "<img src=" + '"' + url + '"' + 'class="eachGif" alt="gif" />';
  console.log(imgCode);
  // clear out the boxes
  $("#square-area").empty();
  $("#gif-area").append(imgCode);
}

// change the size of the gifs

async function begin() {
  var port = await navigator.serial.requestPort();
  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200 });
  var decoder = new TextDecoderStream();
  var inputDone = port.readable.pipeTo(decoder.writable);
  var inputStream = decoder.readable;
  var reader = inputStream.getReader();
  readLoop(reader);
}

$(document).ready(function () {
  $(".test").click(function () {
    begin();
  });
  makeSquares();
  $("#get-results").click(function (event) {
    event.preventDefault();
    handleFormSubmit();
  });
  highlightSelected(0, 0);
});
