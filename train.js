$( document ).ready(function() {

var train = '';
var destination = '';
var firstTrain = '';
var frequency = '';

//Firebase URL 
var dataRef = new Firebase("https://train101.firebaseio.com/");

  //gives input a value
  $('#addTrainBtn').on('click', function() {
    train = $('#trainNameInput').val();
    destination = $('#destinationInput').val();
    firstTrain = $('#firstTrainInput').val();
    frequency = $('#frequencyInput').val();

    //empty after addTrain button is clicked
    $('#trainNameInput').val('');
    $('#destinationInput').val('');
    $('#firstTrainInput').val('');
    $('#frequencyInput').val('');

    //put this to firebase
    dataRef.push({

      train: train,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency

    });

    return false;


  });// addBtn click ending

    // Child function

    dataRef.on("child_added", function(snapshot) {

    // Logs user-input 
    console.log(snapshot.val().train + " = train");
    console.log(snapshot.val().destination + " = destination");
    console.log(snapshot.val().firstTrain + " = nextTrain");
    console.log(snapshot.val().frequency +" = frequency");

    // Variables assigned to equal value of child_added inputs
    var train = snapshot.val().train;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    // Moment JS
    var timeHour = moment().format('H');
    var timeMin = moment().format('m');
    var ftHour = moment(firstTrain, "HH:mm").format('H');
    var ftMin = moment(firstTrain, "HH:mm").format('m');

    var ftMoment = (ftHour * 60) + (ftMin * 1);
    var timeMoment = (timeHour * 60) + (timeMin * 1);

  //time passed since the first train
    var diff = timeMoment - ftMoment;
    var trainsSinceFirst = Math.floor(diff/frequency);
    var nextArrival = ((trainsSinceFirst + 1) * frequency) + ftMoment;

    if (ftMoment < timeMoment) {
      var minAway = nextArrival - timeMoment;
      var nextArrival = moment().add(minAway, 'minutes').format('HH:mm');
    } 
    else {
      var nextArrival = firstTrain;
      var minAway = ftMoment - timeMoment;
    };

  // Appends new info to table
  $("#trainData").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

    

    }); 

});