var dataAlreadySubmitted = false;

function emergencySubmit() {
  if (dataAlreadySubmitted) return;
  dataAlreadySubmitted = true;

  var dataToSubmit;
  try {
    dataToSubmit = jsPsych.data.get().values();
  } catch(e) {
    console.warn('Could not retrieve jsPsych data for emergency submit.');
    return;
  }

  if (!dataToSubmit || dataToSubmit.length === 0) return;

  try {
    localStorage.setItem('experiment_data_backup', JSON.stringify(dataToSubmit));
  } catch(e) {}

  proliferate.submit(
    {data: dataToSubmit},
    function() {
      try { localStorage.removeItem('experiment_data_backup'); } catch(e) {}
      console.log('Emergency data submitted successfully.');
      window.location.href = 'https://app.prolific.com/submissions/complete?cc=C1OF1QFO';
    },
    function() {
      console.warn('Emergency submit failed. Data saved to localStorage.');
      document.body.innerHTML =
        '<div style="text-align:center; margin-top:15%; font-family:Arial,sans-serif;">' +
          '<h2>You exited the experiment early</h2>' +
          '<p>We are trying to save your data. Please do not close this tab.</p>' +
          '<button id="emergency-retry-btn" style="padding:12px 24px; font-size:16px; cursor:pointer;">Retry Submission</button>' +
        '</div>';
      document.getElementById('emergency-retry-btn').addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'Submitting...';
        dataAlreadySubmitted = false;
        emergencySubmit();
      });
    }
  );
}

document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement && !dataAlreadySubmitted && !window._experimentEndingNormally) {
    console.log('Fullscreen exited early, attempting emergency submit.');
    emergencySubmit();
  }
});

window.addEventListener('beforeunload', function(e) {
  if (!dataAlreadySubmitted) {
    try {
      var dataToSubmit = jsPsych.data.get().values();
      localStorage.setItem('experiment_data_backup', JSON.stringify(dataToSubmit));
    } catch(err) {}
  }
});

// Initialize jsPsych.
var jsPsych = initJsPsych({
  show_progress_bar: false,
  auto_update_progress_bar: false,
  on_finish: function(){
    if (dataAlreadySubmitted) return;
    dataAlreadySubmitted = true;

    // Add interactions to the data variable
    var interaction_data = jsPsych.data.getInteractionData();
    jsPsych.data.get().addToLast({interactions: interaction_data.json()});

    // Save data to localStorage as a backup before submitting
    var dataToSubmit = jsPsych.data.get().values();
    try {
      localStorage.setItem('experiment_data_backup', JSON.stringify(dataToSubmit));
      console.log('Data backed up to localStorage successfully.');
    } catch (e) {
      console.warn('localStorage backup failed:', e);
    }

    // Submit to proliferate with retry logic
    var maxRetries = 3;
    var retryCount = 0;

    function attemptSubmit() {
      proliferate.submit(
        {data: dataToSubmit},
        // success callback: clear backup and redirect to Prolific
        function() {
          try { localStorage.removeItem('experiment_data_backup'); } catch(e) {}
          console.log('Data submitted successfully.');
          window.location.href = 'https://app.prolific.com/submissions/complete?cc=C1OF1QFO';
        },
        // error callback: retry or show manual retry button
        function() {
          retryCount++;
          if (retryCount < maxRetries) {
            console.log('Submit failed, retrying (' + retryCount + '/' + maxRetries + ')...');
            setTimeout(attemptSubmit, 2000 * retryCount);
          } else {
            // All retries failed — show a retry button to the participant
            document.body.innerHTML =
              '<div style="text-align:center; margin-top:15%; font-family:Arial,sans-serif;">' +
                '<h2>Submission failed</h2>' +
                '<p>Your data has been saved locally. Please check your internet connection and click the button below to retry.</p>' +
                '<button id="manual-retry-btn" style="padding:12px 24px; font-size:16px; cursor:pointer;">Retry Submission</button>' +
                '<p style="margin-top:20px; font-size:12px; color:#888;">If this keeps failing, please message the researcher. Your data is safe.</p>' +
              '</div>';
            document.getElementById('manual-retry-btn').addEventListener('click', function() {
              this.disabled = true;
              this.textContent = 'Submitting...';
              retryCount = 0;
              attemptSubmit();
            });
          }
        }
      );
    }

    attemptSubmit();
  }
});
