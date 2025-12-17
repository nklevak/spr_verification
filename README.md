# Spatial Recall Verification Experiment

This experiment is a simplified version of the task-switching experiment (`cf_ts_rep`). It contains only the spatial recall task with self-paced rest blocks between epochs.

## Key Differences from `cf_ts_rep`

1. **Single Task Only**: Only the spatial recall task is used (no digit span task)
2. **No Task Switching**: There are no A/B blocks or switch/stay cues
3. **Simplified Structure**: Epochs are separated by self-paced rest blocks only

## Experiment Structure

- **Practice Phase**: 
  - Spatial recall practice
  - Rest task practice
  
- **Main Experiment**:
  - 30 epochs of spatial recall
  - Each epoch consists of 10 trials
  - Self-paced rest blocks between epochs (participants can end rest at any time)

## Files

- `index.html` - Main experiment file
- `js/spatial-recall.js` - Spatial recall task configuration
- `js/rest-experiment.js` - Rest task configuration (simplified, no switch/stay cues)
- `js/instructions.js` - Experiment instructions (updated for single task)
- `js/plugin-spatial-recall.js` - Spatial recall plugin
- `js/plugin-dsst-with-end-rest.js` - Rest task plugin
- `js/plugin-screen-check.js` - Screen size check plugin
- `img/` - Image assets (Circle.png, Square.png, Diamond.png)

## Running the Experiment

Open `index.html` in a web browser. The experiment requires:
- Fullscreen mode
- Minimum browser window size: 258x364 pixels
- Internet connection (for jsPsych libraries and Proliferate)

## Configuration

Key variables that can be adjusted:
- `num_epochs` (in `rest-experiment.js`): Number of epochs (default: 30)
- `sr_trials_per_epoch` (in `spatial-recall.js`): Trials per epoch (default: 10)
- `max_num_rest_trials_per_epoch` (in `rest-experiment.js`): Maximum rest trials per rest block (default: 20)

