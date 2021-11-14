document.addEventListener("DOMContentLoaded", (event) => {
  var initialTime = 75;
  var time = 75;
  var score = 0;
  var Count = 0;
  var timeset;
  var answers = document.querySelectorAll("#Quiz-hold button");

  // Sets array
  var saveArray = [];

  localStorage.getItem("recordsArray")
    ? (saveArray = JSON.parse(localStorage.getItem("recordsArray")))
    : (recordsArray = []);

  var theElement = (element) => {
    return document.querySelector(element);
  };

  // hide then show all sections
  var showSection = (element) => {
    let sections = document.querySelectorAll("section");
    Array.from(sections).forEach((userItem) => {
      userItem.classList.add("hide");
    });
    theElement(element).classList.remove("hide");
  };
  //Quiz questions
  var questions = [
    {
      title: "What does “www” stand for in a website browser?",
      choices: [
        "World wide web",
        "World with web",
        "When web work",
        "None of the above",
      ],
      answer: "World wide web",
    },
    {
      title: "Which country invented ice cream?",
      choices: ["United states", "Spain", "China", "Australia"],
      answer: "China",
    },
    {
      title: "what is the biggest country in africa?",
      choices: ["Egypt", "Kynia", "South africa", "Algeria"],
      answer: "Algeria",
    },
    {
      title: "How many teeth does an adult human have? ",
      choices: ["18", "24", "32", "30"],
      answer: "32",
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal/bash", "alerts", "console.log"],
      answer: "console.log",
    },
  ];

  // reset display for the score
  var reset = () => {
    theElement("#highScores div").innerHTML = "";
    var i = 1;
    saveArray.sort((a, b) => b.score - a.score);
    Array.from(saveArray).forEach((check) => {
      var scores = document.createElement("div");
      scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
      theElement("#highScores div").appendChild(scores);
      i = i + 1;
    });
    i = 0;
    Array.from(answers).forEach((answer) => {
      answer.classList.remove("disable");
    });
  };
