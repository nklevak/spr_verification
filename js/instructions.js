// INTRO AND BEFORE PRACTICE
// make a participant id place for them to enter
var prolific_id_insert = {
  type: jsPsychSurveyText,
  preamble: `<div class="instructions-container">
    <h1 class="instructions-heading">Welcome!</h1>
    <p class="instructions-text">Please enter your participant ID or student ID below:</p>
  </div>`,
  questions: [
    {prompt: 'Enter here:', rows: 1, name: 'prolific_id'},
  ]
}

// welcome screen for experiment
var welcome_practice_instructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions-container">
      <h1 class="instructions-heading">Welcome to the experiment!</h1>
      <p class="instructions-text">Important: <strong>This experiment must be completed in fullscreen mode.</strong>
      Please do not exit fullscreen mode during the experiment as this will break the experiment 
      and you will need to start over. It might help to put your computer/laptop on do not disturb.</p>
    </div>`,
    `<div class="instructions-container">
      <p class="instructions-text">In this experiment, you will be playing a <b>Square Game</b>. \
      You will also be given rest breaks, during which you will do the <b>Rest Game</b>.</p>
      <p class="instructions-text">You will be paid $12 per hour, plus a bonus of up to $2.50, and \
      regardless of your choices during this experiment, the total duration will be approximately 50 minutes.</p>
      <p class="instructions-text">Before we begin, let's do some practice of the game.</p>
    </div>`
  ],
  key_forward: 'ArrowRight',
  key_backward: 'ArrowLeft',
  allow_keys: true,
  show_clickable_nav: true,
  button_label_previous: 'Prev',
  button_label_next: 'Next'
}

// practice instructions
SR_practice = [
  `<div class="instructions-container">
    <h1 class="instructions-heading">Square Game</h1>
    <p class="instructions-text">In this game you will see a grid of squares that will flash blue one at a time.\
    Your goal is to remember the order in which the squares flashed blue. \
    At the end of each trial, press the tiles that flashed in the <b>same order</b> as they were presented to you.</p>
  </div>`,
  `<div class="instructions-container">
    <p class="instructions-text">Do your best to memorize the order, but do not write them down or use any other \
    external tool to help you remember. \
    If you make a mistake, click the "Clear" button to erase your entries, but be aware that there is a maximum response time before the next trial will start.</p>
    <p class="instructions-text">When you're ready, click "Next" to get started.</p>
  </div>`
]

rest_practice = [
`<div class="instructions-container">
  <h1 class="instructions-heading">Rest Game</h1>
  <p class="instructions-text">You have completed the practice for the Square Game!</p>
  <p class="instructions-text">Now, you will practice the <strong>Rest Game</strong>, which will be shown to you during rest breaks.</p>
  <p class="instructions-text">Unlike the Square Game, do not worry about getting everything correct in the Rest Game. \
  As long as you make an attempt to correctly answer most of the trials, you will get credit.</p>
</div>`,
`<div class="instructions-container">
  <p class="instructions-text">In this game, you will see two shapes with numbers underneath them. \
  You will be asked about the number under one of the shapes.</p>
  <div style="display: flex; justify-content: center; gap: 10px; margin: 0;">
    <div class="shape-container"><img src="./img/Circle.png" style="width: 50px;"><br>1</div>
    <div class="shape-container"><img src="./img/Square.png" style="width: 50px;"><br>2</div>
</div>
  <p class="instructions-text">Press the <b>corresponding number key on your keyboard (1 or 2)</b> when a specific shape is listed. \
  <b>Please use your keyboard to respond, not your mouse.</b></p>
  <p class="instructions-text"><b>In the actual experiment, you will be able to end the rest at any time</b> by clicking the \
  <b>"End Rest" button</b> that will appear in the top right corner, but for the practice it will not be visible.</p>
  <p class="instructions-text">Press Next to begin the practice.</p>
</div>`
]

// practice instructions for spatial recall
var sr_practice_instructions = {
  type: jsPsychInstructions,
  pages: SR_practice,
  key_forward: 'ArrowRight',
  key_backward: 'ArrowLeft',
  allow_keys: true,
  show_clickable_nav: true,
  button_label_previous: 'Prev',
  button_label_next: 'Next',
}

// rest task practice instructions and transition
var rest_practice_instructions = {
  type: jsPsychInstructions,
  pages: rest_practice,
  key_forward: 'ArrowRight',
  key_backward: 'ArrowLeft',
  allow_keys: true,
  show_clickable_nav: true,
  button_label_previous: 'Prev',
  button_label_next: 'Next',
}

// POST PRACTICE INSTRUCTIONS
// main experiment instructions
var main_exp_instructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions-container">
      <h1 class="instructions-heading">Main Experiment</h1>
      <p class="instructions-text">Great work on completing the practice! We will now go into instructions for the main experiment.</p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">Experiment Structure</h1>

      <p class="instructions-text">In this experiment, you will be playing the <strong>Square Game</strong>, \
      with rest periods in between (during which you will play the Rest Game).
      <br><br>You will play multiple rounds of the Square Game. At certain points, you will be notified that you are 
      about to enter a <strong>rest period</strong>.<br></p>
      <p class="instructions-text">When you enter the rest period, you will be able to remain in rest and play the Rest Game for up \
      to 30 seconds. <b>Once you're ready to leave rest, you can press the "End Rest" button in the top right corner</b>. \
      You should stay in the Rest Game for as long as you need or want, but be aware that staying longer will be costly.</p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">The Point System and Bonus</h1>

      <p class="instructions-text"><strong>Please do your best on the Square Game.</strong> As long as it is clear you tried on every trial \
      and consistently responded, you will get a base bonus of at least <b>$0.50</b>. \
      Please be aware that this will be a long study, and we would really appreciate if you do your best on it.</p>
      <p class="instructions-text">You can gain an extra bonus of <b>$2.00</b> (bringing the total up to <b>$2.50</b>).</p>
      <p class="instructions-text">To do so: you will get an endowment of <b>480 points</b> to begin with, which you can use as currency in this experiment.<br>\
      These points are valuable, and <b>they represent your ability to rest for longer during the experiment.</b><br>\
      During the Rest Game, <b>every rest trial you use will use 1 point from your endowment</b>.<br>\
      The proportion remaining of your endowment will be converted to the extra <b>$2</b> bonus.<br> \
      <strong>Do not worry too much about holding onto every single point; they are meant to be used to make your experience more enjoyable.</strong></p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">Important Notes</h1>
      <p class="instructions-text">The total duration of the experiment is approximately 50 minutes (no matter how much time is spent on the Rest Game vs the Square Game), so please \
      feel free to extend rest whenever you feel you need to--taking into consideration that it will take away points from your endowment.</p>
      <p class="instructions-text">Please stay in fullscreen the entire time, or the experiment will break and you will have to start over.</p>
      <p class="instructions-text">At the end, it will redirect you to Prolific. It might take a few seconds for it to send the data, \
      but if you are faced with a blank screen and have not been re-directed, press the spacebar and that should work.</p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">Ready to Begin</h1>
      <p class="instructions-text">Re-read the instructions if necessary, and click "Next" when you are ready to begin the main experiment!</p>
    </div>`
  ],
  key_forward: 'ArrowRight',
  key_backward: 'ArrowLeft',
  allow_keys: true,
  show_clickable_nav: true,
  button_label_previous: 'Prev',
  button_label_next: 'Next',
  on_start: function(){
  }
}

var submitting_message = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size:18px;">Please wait, submitting your data...</p>',
  choices: "NO_KEYS",
  trial_duration: 2000,
};

var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  on_start: function() {
    window._experimentEndingNormally = true;
  }
};

// cue that task will stay
var rest_leftovers_transition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p> You have completed the main experiment! Now you will do the leftover rest trials that you skipped earlier. </p>',
  choices: "ALL_KEYS",
  trial_duration: 2000,
}

