// MAIN EXPERIMENT SET UP VARIABLES
var max_num_rest_trials_per_epoch = 20;
var rest_num_practice_trials = 4;
var num_epochs = 30; // Total number of epochs (can be adjusted)

const rt_instructions_01 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this task, you will see two shapes with numbers underneath them.</p>
    <p>You will be asked about the number under one of the shapes.</p>
    <div style="display: flex; justify-content: space-around; margin: 20px;">
      <div><img src="./img/Circle.png" style="width: 50px;"><br>1</div>
      <div><img src="./img/Square.png" style="width: 50px;"><br>2</div>
    </div>
    <p>Press the corresponding <strong>number key (1 or 2) on your keyboard</strong> when asked about a specific shape.</p>
    <p>You can end the rest at any time by clicking the "End Rest" button.</p>
    <p>Press any key to begin.</p>
  `,
};

// REST BREAK INSTRUCTIONS
var rest_ended = false;
var overall_rest_left = num_epochs * max_num_rest_trials_per_epoch
var num_rest_used = 0

function getNumRestUsed() {
  return num_rest_used
}

function shouldTrialRun() {
  console.log('in function')
  console.log(rest_ended)
  return !rest_ended
}

function rest_task_createTrials(num_rt_trials, follows_epoch_num, type_desc) {
  const shapes = ['Circle', 'Square'];
  const trials = [];

  var rest_trial_number = 0; // records how many trials have been added
  for (let i = 0; i < num_rt_trials; i++) {
    var targetShape = jsPsych.randomization.sampleWithoutReplacement(shapes, 1)[0];
    trials.push({
        timeline: [{
          type: dsstWithEndRestPlugin,
          stimulus: targetShape,
          choices: ['1', '2'],
          shapes: ['./img/Circle.png', './img/Square.png'],
          show_end_rest_button: true,
          data: {
            target_shape: targetShape,
            correct_response: shapes.indexOf(targetShape) + 1,
            option_to_end: true, //whether the end rest button is visible
            rest_trial_num: rest_trial_number,
            overall_num_rest_used: getNumRestUsed(),
            follows_epoch_num: follows_epoch_num,
            type_desc: type_desc
          },
          on_finish: function(data) {
            console.log("end_rest: " + data.end_rest.toString());

            data.game_type = "rest_task"
            data.trial_type = "rt_main_trials";

            if (data.end_rest == false && rest_ended == false) {
              data.is_correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response.toString());
              rest_ended = false;
            } else {
              rest_ended = true;
            }

            overall_rest_left = overall_rest_left - 1
            num_rest_used = num_rest_used + 1
          },
        }],
        conditional_function: function() {
          console.log("Evaluating conditional function for trial " + (i + 1));
          const shouldRun = shouldTrialRun();
          console.log("shouldTrialRun() returned: " + shouldRun);
          return shouldRun;
        }
      });

      rest_trial_number = rest_trial_number + 1
    }

  return trials;
}


// Simple transition message (no switch/stay cues since there's only one task)
var rest_transition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="instructions-container" style="text-align: center;">
      <h2 style="font-size: 22px; margin-bottom: 20px;">Rest Period</h2><br><br>
      <p class="instructions-text" style="font-size: 24px;">
        You will now have a rest period. Take as much time as you need.
      </p>
    </div>`,
  choices: "NO_KEYS",
  trial_duration: 2000,
  on_finish: function(data){
    data.transition_type = "rest"
    rest_ended = false
    console.log(rest_ended)
  }
}

var rest_to_game_transition= {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div class="instructions-container">
    <p class="instructions-text">You are done with rest! <br>You will now return to the spatial recall task.</p>
  </div>`,
  choices: "NO_KEYS",
  trial_duration: 1500,
  }

// Create self-paced rest timeline
function createSelfPacedRestTimeline(follows_epoch_num, type_desc) {
  var rest_timeline = rest_task_createTrials(max_num_rest_trials_per_epoch, follows_epoch_num, type_desc);
  
  var self_paced_rest_procedure = {
    timeline: rest_timeline,
    on_finish: function(data) {
    var rest_duration = data.last(1).time_elapsed - data.first(1).time_elapsed;
    data.rest_duration = rest_duration
    console.log("in on finish of createSelfPacedRestTimeline")
    rest_ended = false
    }
  };

  return {timeline: [rest_transition, self_paced_rest_procedure, rest_to_game_transition]};
}
function practice_rest_task_createTrials(num_rt_trials) {
  const shapes = ['Circle', 'Square'];
  const trials = [];

  for (let i = 0; i < num_rt_trials; i++) {
    var targetShape = jsPsych.randomization.sampleWithoutReplacement(shapes, 1)[0];
    
    trials.push({
      timeline: [
        {
          type: dsstWithEndRestPlugin,
          stimulus: targetShape,
          choices: ['1', '2'],
          shapes: ['./img/Circle.png', './img/Square.png'],
          show_end_rest_button: false,
          data: {
            target_shape: targetShape,
            correct_response: shapes.indexOf(targetShape) + 1
          },
          on_finish: function(data) {
            data.is_correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response.toString());
            data.game_type = "rest_task";
            data.trial_type = "rt_practice_trials";
          }
        },
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: function() {
            var last_trial = jsPsych.data.get().last(1).values()[0];
            console.log("Feedback trial data:", last_trial); // Add logging to diagnose

            if (last_trial.timed_out) {
              return `
                <div class="flex flex-col items-center justify-center">
                    <p>Incorrect! Please answer faster.</p>
                </div>
              `;
            } else if (last_trial.is_correct) {
                return `
                  <div class="flex flex-col items-center justify-center">
                      <p>Correct!</p>
                  </div>
                `;
            } else {
                return `
                  <div class="flex flex-col items-center justify-center">
                      <p>Incorrect, please click the number corresponding to the shape in bold.</p>
                  </div>
                `;
            }
          },
          choices: "ALL_KEYS",
          trial_duration: 1000,
          on_start: function(trial) {
            console.log("Feedback trial starting"); // Add more logging
          },
          on_finish: function(data) {
            data.trial_type = "rt_practice_feedback";
            console.log("Feedback trial finished"); // Add more logging
          }
        }
      ]
    });
  }

  return trials;
}


function leftover_rest_task_createTrials(num_rt_trials) {
  const shapes = ['Circle', 'Square'];
  const trials = [];

  for (let i = 0; i < num_rt_trials; i++) {
    var targetShape = jsPsych.randomization.sampleWithoutReplacement(shapes, 1)[0];
    trials.push({
      timeline: [{
      type: dsstWithEndRestPlugin,
      stimulus: targetShape,
      choices: ['1', '2'],
      shapes: ['./img/Circle.png', './img/Square.png'],
      show_end_rest_button: false,
      data: {
        target_shape: targetShape,
        correct_response: shapes.indexOf(targetShape) + 1
      },
      on_finish: function(data) {
        overall_rest_left = overall_rest_left - 1
        data.is_correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response.toString());
        data.game_type = "rest_task",
        data.trial_type = "rt_extra_trials"
      },
    }],
      conditional_function: function() {
        console.log("Trials left" + (overall_rest_left));
        const shouldRun = overall_rest_left > 0
        return shouldRun;
      }
    });
  }

  return trials;
}

var rt_practice = {timeline: practice_rest_task_createTrials(rest_num_practice_trials)}
var rt_leftovers = {timeline: leftover_rest_task_createTrials(overall_rest_left)}

