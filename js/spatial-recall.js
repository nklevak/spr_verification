// MAIN EXPERIMENT SET UP VARIABLES
var sr_trials_per_epoch = 10
var sr_practice_trial_num = 4 


// SR specific set up variables:
var consistent_tile_duration = 315 // was 275 in the original experiment
var grid_size_constant = 4
var digits_to_mem = 4

///////////////////////////////////////////////////////////////
////// SET UP GRID DIFFICULTY TO BE MAX_TILE_DURATION & CREATE num_trials TRIALS
function getGridParams(num_trials,max_tile_duration) {
  // Initialize an array to hold the duration of each trial
  var trialDurations = [];

  for (i=0;i < num_trials;i++) {
    trialDurations.push(max_tile_duration)
  }
  // go through the trial durations and return the timeline vals
  let timeline_full_vals = []
  trialDurations.forEach((item, _) => {
    timeline_full_vals.push({
        sequence: jsPsych.randomization.sampleWithoutReplacement([...Array(16).keys()], digits_to_mem),
        tile_duration: item
    });
  });
  return timeline_full_vals
}

// PRACTICE SESSION
var sr_practice_prop_added = 1/sr_practice_trial_num
var sr_recall_forwards_practice = {
  timeline: [
    {
      type: jsPsychScreenCheck,
      min_width: 258,
      min_height: 364
    },
    {
      type: jsPsychSpatialRecall,
      grid_size: grid_size_constant,
      sequence: jsPsych.timelineVariable('sequence'),
      tile_duration: jsPsych.timelineVariable('tile_duration'),
      backwards: false,
      on_finish: function(data){
        data.practice = "true"
        data.game_type = "spatial_recall"
        data.trial_type = "sr_practice_response"
      }
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      trial_duration: 1000,
      stimulus: function(){
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].score_an;
        if(last_trial_correct){
          return "<p>Correct!</p>"; // the parameter value has to be returned from the function
        } else {
          return "<p>Incorrect! Please try to focus on the order in which the squares appear.</p>"; // the parameter value has to be returned from the function
        }
      },
      choices: 'NO_KEYS',
      on_finish: function(data){
        data.trial_type = "sr_practice_feedback"
      }
    }
  ],
  timeline_variables: getGridParams(sr_practice_trial_num,consistent_tile_duration,false)
}

// MAIN EXPERIMENT GET EPOCH TRIALS FUNCTION
function sr_getBlock() {
  var timeline_sr_epoch = []
  var proportion_per_trial = 1 / sr_trials_per_epoch

  for (i=0; i < sr_trials_per_epoch; i++){
    var screenCheck={
      type: jsPsychScreenCheck,
      min_width: 258,
      min_height: 364
    }
  
    var recall_sr = {
      type: jsPsychSpatialRecall,
      grid_size: grid_size_constant,
      sequence: jsPsych.randomization.sampleWithoutReplacement([...Array(16).keys()], digits_to_mem),
      tile_duration: consistent_tile_duration,
      backwards: false,
      on_start: function(recall_sr) {
        recall_sr.sequence = jsPsych.randomization.sampleWithoutReplacement([...Array(16).keys()], digits_to_mem)
      },
      on_finish: function(data){
        data.practice = "false"
        data.game_type = "spatial_recall"
        data.trial_type = "sr_main_response"
      }
    }

    timeline_sr_epoch.push(screenCheck,recall_sr)
  }

  return timeline_sr_epoch
}

