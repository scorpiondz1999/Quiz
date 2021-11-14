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

  // question data
  var questionData = () => {
    theElement("#Quiz-hold p").innerHTML = questions[Count].title;
    theElement(
      "#Quiz-hold button:nth-of-type(1)"
    ).innerHTML = `1. ${questions[Count].choices[0]}`;
    theElement(
      "#Quiz-hold button:nth-of-type(2)"
    ).innerHTML = `2. ${questions[Count].choices[1]}`;
    theElement(
      "#Quiz-hold button:nth-of-type(3)"
    ).innerHTML = `3. ${questions[Count].choices[2]}`;
    theElement(
      "#Quiz-hold button:nth-of-type(4)"
    ).innerHTML = `4. ${questions[Count].choices[3]}`;
  };

  var Update = (answerRes) => {
    theElement("#score-correct p").innerHTML = answerRes;
    theElement("#score-correct").classList.remove("hidden", yourScore());
    Array.from(answers).forEach((answer) => {
      answer.classList.add("disable");
    });

    //  exist the quiz section after answering questions
    setTimeout(() => {
      if (Count === questions.length) {
        showSection("#done");
        time = 0;
        theElement("#time").innerHTML = time;
      } else {
        questionData();

        Array.from(answers).forEach((answer) => {
          answer.classList.remove("disable");
        });
      }
    }, 1000);
  };
  // time
  var theTimer = () => {
    if (time > 0) {
      time = time - 1;
      theElement("#time").innerHTML = time;
    } else {
      clearInterval(startTime);
      theElement("#score").innerHTML = score;
      showSection("#done");
    }
  };

  // start time and start getting questions
  var startTime;
  theElement("#intro button").addEventListener("click", (e) => {
    questionData();
    showSection("#Quiz-hold");
    startTime = setInterval(theTimer, 1000);
  });

  // Clear

  var yourScore = () => {
    clearTimeout(timeset);
    timeset = setTimeout(() => {
      theElement("#score-correct").classList.add("hidden");
    }, 1000);
  };
  Array.from(answers).forEach((check) => {
  check.addEventListener("click", function (event) {
    if (this.innerHTML.substring(3, this.length) === questions[Count].answer) {
      score = score + 1;
      Count = Count + 1;
      Update("Correct");
    } else {
      // Wrong answers
      time = time - 15;
      Count = Count + 1;
      Update("Wrong");
    }
  });
});

var errorIndic = () => {
  clearTimeout(timeset);
  timeset = setTimeout(() => {
    theElement("#error").classList.add("hidden");
  }, 2000);
}


// Error submitting high scores
theElement("#records").addEventListener("click", () => {
  var initialsRecord = theElement("#initials").value;
  if (initialsRecord === "") {
    theElement("#error p").innerHTML = "";
    theElement("#error").classList.remove("hidden", errorIndic());
  } else {
    saveArray.push({
      initialRecord: initialsRecord,
      score: score,
    });
    //Send value to local storage
    localStorage.setItem("recordsArray", JSON.stringify(saveArray));
    theElement("#highScores div").innerHTML = "";
    showSection("#highScores");
    reset();
    theElement("#initials").value = "";
  }
});

// Clears highscores
theElement("#clearScores").addEventListener("click", () => {
  saveArray = [];
  theElement("#highScores div").innerHTML = "";
  localStorage.removeItem("recordsArray");
});

// Resets
theElement("#reset").addEventListener("click", () => {
  time = initialTime;
  score = 0;
  Count = 0;
  showSection("#intro");
});

// view the high scores.
theElement("#score").addEventListener("click", (e) => {
  e.preventDefault();
  clearInterval(startTime);
  theElement("#time").innerHTML = 0;
  time = initialTime;
  score = 0;
  Count = 0;
  showSection("#highScores");
  reset();
});
});


