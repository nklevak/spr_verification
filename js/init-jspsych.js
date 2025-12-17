// Initialize jsPsych.
var jsPsych = initJsPsych({
  show_progress_bar: false,
  auto_update_progress_bar: false,
  on_finish: function(){
    // Add interactions to the data variable
    var interaction_data = jsPsych.data.getInteractionData();
    jsPsych.data.get().addToLast({interactions: interaction_data.json()});
    // Submit to proliferate
    proliferate.submit({data: jsPsych.data.get().values()});
  }
});