// select the span in control buttons
// splash screen
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What is Your Name?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  //document.querySelector(".control-buttons").style.display = "none";
  // or :
  document.querySelector(".control-buttons").remove();
};

// main variables
let duretaion = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
//let blocks = Array.from(document.querySelectorAll(".game-block"));
// or
let blocks = Array.from(blocksContainer.children);
// shiffle the elements
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
// add order css property to game blocks

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // add click event
  block.addEventListener("click", () => {
    // trigger flip block function
    flipBlock(block);
  });
});
// flip block function
function flipBlock(selectedBlock) {
  // add class flipped
  selectedBlock.classList.add("is-flipped");
  // collect all fliped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // if there is two selected blocks
  if (allFlippedBlocks.length == 2) {
    // stop clicking function
    stopClicking();
    // check matched blocks function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// shuffle function

function shuffle(array) {
  let current = array.length,
    temp, // temp for old way
    random;
  while (current > 0) {
    // get random element
    random = Math.floor(Math.random() * current);
    current--;
    /*
1 - save current element in stash
2- current element = random element
3- random element = get element from stash
destructring way:
 */
    [array[current], array[random]] = [array[random], array[current]];
  }
  return array;
}
/* old way :
     temp = array[current]; 
    array[current] = array[random];
    array[random] = temp; */
function stopClicking() {
  // add class no clicking on the main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // Remove class no clicking after duration
    blocksContainer.classList.remove("no-clicking");
  }, duretaion);
}

// check matched blocks function
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duretaion);
    document.getElementById("failed").play();
  }

}
