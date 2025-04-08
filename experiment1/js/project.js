// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    time: ["Long", "Very long", "Very very long", "Very very extremely long", "Some years", "A millenia", "A decade", "A short while"],
    who: ["we", "they", "a small few", "you", "some of us", "all of us"],
    what: ["vanished", "were right", "were wrong", "left", "fought", "stopped", "remembered"],
    state: ["died", "healed", "stood still", "was forgotten", "remained", "faded away"],
    what2: ["came back", "forgot", "began again", "started anew", "rallied", "fought back"]
  };
  
  const template = `$time ago, $who $what and so the planet $state. 
  But then, $who $what2. 
  So the planet $state.
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    //box.innerText = story;
    $("#box").text(story);
  }
  
  /* global clicker */
  //clicker.onclick = generate;
  $("#clicker").click(generate);
  
  generate();
}

// let's get this party started - uncomment me
main();