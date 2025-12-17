// INTRO AND BEFORE PRACTICE
// make a prolific id place for them to enter
var prolific_id_insert = {
  type: jsPsychSurveyText,
  preamble: `<div class="instructions-container">
    <h1 class="instructions-heading">Welcome!</h1>
    <p class="instructions-text">Please enter your Prolific ID below:</p>
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
      <p class="instructions-text">In this experiment, you will be playing a <b>spatial recall game</b>. <br>\
      You will also be given rest breaks, during which you will do the <b>Rest Game</b>.</p>
      <p class="instructions-text">You will be paid 12 dollars per hour, plus a bonus of up to 2.50 dollars, and \
      regardless of your choices during this experiment, it will be approximately 56 minutes. </p>
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
    external tool to help you remember.\
    If you make a mistake, click the "Clear" button to erase your entries.</p>
    <p class="instructions-text">When you're ready, click "Next" to get started.</p>
  </div>`
]

rest_practice = [
`<div class="instructions-container">
  <h1 class="instructions-heading">Rest Game</h1>
  <p class="instructions-text">You have completed the practice for the spatial recall game!</p>
  <p class="instructions-text">Now, you will practice the <strong>rest game</strong>, which will be shown to you during rest breaks.</p>
  <p class="instructions-text">Unlike the spatial recall game, do not worry about getting everything correct in the Rest Game. \
  As long as you make an attempt to correctly answer most of the trials, you will get credit.</p>
</div>`,
`<div class="instructions-container">
  <p class="instructions-text">In this game, you will see two shapes with numbers underneath them. \
  You will be asked about the number under one of the shapes.</p>
  <div style="display: flex; justify-content: center; gap: 10px; margin: 0;">
    <div class="shape-container"><img src="./img/Circle.png" style="width: 50px;"><br>1</div>
    <div class="shape-container"><img src="./img/Square.png" style="width: 50px;"><br>2</div>
</div>
  <p class="instructions-text">Press the <b>corresponding number key on your keyboard (1 or 2)</b> when a specific shape is listed.</p>
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

      <p class="instructions-text">In this experiment, you will be playing the <strong>spatial recall game</strong>, \
      with rest periods in between (during which you will play the rest game).
      <br><br>You will play multiple epochs of the spatial recall game. At certain points, you will be notified that you are 
      about to enter a <strong>rest period</strong>.<br></p>
      <p class="instructions-text">When you enter the rest period, you will be able to remain in rest and play the rest game for up \
      to 30 seconds. <b>Once you're ready to leave rest, you can press the "End Rest" button in the top right corner</b>. \
      You should stay in the rest game for as long as you need or want, but be aware that staying longer will be costly.</p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">The point system and bonus</h1>
  
      <p class="instructions-test">Please try your best on the spatial recall game; as long as it is clear you tried on every trial, you will get a base bonus of at least 0.50 dollars.</p>
      <p class="instructions-text">You can gain an extra bonus of 2 additional dollars (bringing the total up to 2.50). \
      To do so: you will get an endowment of <b>600 points</b> to begin with, which you can use as currency in this experiment.<br>\
      These points are valuable, and <b>they represent your ability to rest for longer during the experiment.</b><br>\
      During the rest game, <b>every rest trial you use will use 1 point from your endowment</b> and at the end of the game, \
      <b>the proportion remaining of your endowment will be converted to the extra 2 dollar bonus.</b><br> \
      However, <strong>do not worry too much about holding onto every single point; they are meant to be used to make your experience more enjoyable.</strong></p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">Important Notes</h1>
      <p class="instructions-text">1) The experiment is set to be exactly 56 minutes long (no matter how much time is spent on the rest game vs the spatial recall game), so please
      feel free to extend rest whenever you feel you need to--taking into consideration that it will take away points from your endowment. \
      <br><br>2) Please stay in fullscreen the entire time, or the experiment will break and you will have to start over.</p>
    </div>`,
    `<div class="instructions-container">
      <h1 class="instructions-heading">Ready to Begin</h1>
      <p class="instructions-text">Re-read the instructions if necessary, and press continue when you are ready to begin the main experiment!</p>
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

var exitFullscreen = {
type: jsPsychFullscreen,
fullscreen_mode: false,
};

// cue that task will stay
var rest_leftovers_transition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p> You have completed the main experiment! Now you will do the leftover rest trials that you skipped earlier. </p>',
  choices: "ALL_KEYS",
  trial_duration: 2000,
}

