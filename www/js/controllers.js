angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('TempoPitchCtrl', function($scope, $timeout) {
  // globals
  $scope.original = new Quantify(100.0);
  $scope.desired = new Quantify(100.0);
  $scope.pitch = new Quantify(0.0);

  // functions
  $scope.updatePitch = function() {
    var val = Math.log($scope.desired.value/$scope.original.value)/0.05776227;
    $scope.pitch.value = val.toFixed(2);
  }

  $scope.updateTempo = function() {
    var val = Math.round(Math.pow(1.0594631,$scope.pitch.value)*($scope.original.value)*1000)/1000;
    $scope.desired.value = val.toFixed(2);
  }
})

.controller('TimeStretchCtrl', function($scope, $timeout) {
  // globals
  $scope.original = new Quantify(100.0);
  $scope.desired = new Quantify(100.0);
  $scope.stretch = new Quantify(100.0);

  // functions
  $scope.updateStretch = function() {
    var val = 100 * ($scope.original.value/$scope.desired.value);
    $scope.stretch.value = val.toFixed(2);
  }

  $scope.updateTempo = function() {
    var val = 100 * ($scope.original.value/$scope.stretch.value);
    $scope.desired.value = val.toFixed(2);
  }
})

.controller('DelayTimeCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('note-length.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // globals
  $scope.options = [
    {name : "1/1", value : 0.25},
    {name : "1/2.", value : 0.333333333333333333333},
    {name : "1/2", value : 0.5},
    {name : "1/2T", value : .75},
    {name : "1/4.", value : 0.666666666666666666666},
    {name : "1/4", value : 1},
    {name : "1/4T", value : 1.5},
    {name : "1/8.", value : 1.333333333333333333333},
    {name : "1/8", value : 2},
    {name : "1/8T", value : 3},
    {name : "1/16.", value : 2.666666666666666666666},
    {name : "1/16", value : 4},
    {name : "1/16T", value : 6},
    {name : "1/32.", value : 5.333333333333333333333},
    {name : "1/32", value : 8},
    {name : "1/32T", value : 12}
  ];
  $scope.bpm = new Quantify(100.0);
  $scope.length = 2.0;
  $scope.namedLength = "1/8";
  $scope.delay = new Quantify(300.0);

  // functions
  $scope.setLength = function(option) {
    $scope.length = option.value;
    $scope.namedLength = option.name;
    $scope.updateDelay();
    $scope.modal.hide();
  }
  $scope.updateDelay = function() {
    var val = Math.round(1/($scope.bpm.value / 60 * $scope.length * 0.001))
    $scope.delay.value = val;
  }
  $scope.updateBpm = function() {
    var val = Math.round(1/($scope.delay.value / 60 * $scope.length * 0.001))
    $scope.bpm.value = val;
  }
})

.controller('TransposeCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('note.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNote = modal;
  });
  $ionicModal.fromTemplateUrl('pitch.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPitch = modal;
  });
  // Cleanup modals when we're done with them!
  $scope.$on('$destroy', function() {
    $scope.modalNote.remove();
    $scope.modalPitch.remove();
  });

  // globals
  $scope.notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
  $scope.pitch = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  $scope.originalNote = "C4";
  $scope.desiredNote = "G3";
  $scope.stretch = 74.91;
  $scope.semitones = -5.0;
  $scope.switcher = 0;

  // functions
  $scope.setNote = function(option) {
    if ($scope.switcher == 0) {
      $scope.originalNote = option;
    } else {
      $scope.desiredNote = option;
    }
    $scope.modalNote.hide();
    $scope.modalPitch.show();
  }
  $scope.setPitch = function(option) {
    if ($scope.switcher == 0) {
      $scope.originalNote = $scope.originalNote + option;
    } else {
      $scope.desiredNote = $scope.desiredNote + option;
    }
    foriginal = frequency($scope.originalNote);
    fdesired = frequency($scope.desiredNote);

    var val = Math.round(1000*(100+Math.round(1000*(fdesired-foriginal)*100/foriginal)/1000))/1000;
    $scope.stretch = val.toFixed(2);

    val = (12/Math.log(2)) * Math.log(fdesired / foriginal);
    $scope.semitones = val.toFixed(2);

    $scope.modalPitch.hide();
  }
  $scope.changeOriginal = function() {
    $scope.switcher = 0;
    $scope.modalNote.show();
  }
  $scope.changeDesired = function() {
    $scope.switcher = 1;
    $scope.modalNote.show();
  }

  frequency = function(note) {
    var noteName;
    var octave;
    var res;
    var r=1.05946309436;
    var c5freq=523.251;
    var alteration;
    var decalage;
    noteName=note.charAt(0);
    octave=note.charAt(1);

    if (octave=="#" || octave=="b") {
      alteration=octave;
      octave=eval(note.charAt(2));
    }

    if (noteName=="A" || noteName=="a")
        res=c5freq*r*r*r*r*r*r*r*r*r;
    if (noteName=="B" || noteName=="b")
        res=c5freq*r*r*r*r*r*r*r*r*r*r*r;
    if (noteName=="C" || noteName=="c")
        res=c5freq;
    if (noteName=="D" || noteName=="d")
        res=c5freq*r*r;
    if (noteName=="E" || noteName=="e")
        res=c5freq*r*r*r*r;
    if (noteName=="F" || noteName=="f")
        res=c5freq*r*r*r*r*r;
    if (noteName=="G" || noteName=="g")
        res=c5freq*r*r*r*r*r*r*r;

    if (alteration=="#")
        res=res*r;
    if (alteration=="b")
        res=res/r;

    decalage=octave-5;
    res=res*Math.pow(2,decalage);
    return res;
  }
})

.controller('BpmCalcCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('measures.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalMeasures = modal;
  });
  $ionicModal.fromTemplateUrl('beat.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalBeat = modal;
  });
  $ionicModal.fromTemplateUrl('units.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalUnits = modal;
  });
  // Cleanup modals when we're done with them!
  $scope.$on('$destroy', function() {
    $scope.modalMeasures.remove();
    $scope.modalBeat.remove();
    $scope.modalUnits.remove();
  });

  // globals
  $scope.measureValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 12, 16 ];
  $scope.beatValues = [
    {name : "2/4", value : 0.5},
    {name : "3/4 - 6/8", value : 0.75},
    {name : "4/4", value : 1},
    {name : "5/4", value : 1.25},
    {name : "6/4 - 12/8", value : 1.5},
    {name : "7/4", value : 1.75},
    {name : "9/4", value : 2.25},
    {name : "7/8", value : 0.875},
    {name : "9/8", value : 1.125},
    {name : "11/8", value : 1.375}
  ];
  $scope.unitValues = [
    {name : "milliseconds", value : 0},
    {name : "22.05kHz", value : 22050},
    {name : "44.1kHz", value : 44100},
    {name : "48kHz", value : 48000},
    {name : "96kHz", value : 96000}
  ];
  $scope.measures = 4;
  $scope.beat = 1;
  $scope.namedBeat = "4/4";
  $scope.length = 0;
  $scope.units = 0;
  $scope.namedUnits = "milliseconds";

  // functions
  $scope.setMeasure = function(option) {
    $scope.measures = option;
    $scope.modalMeasures.hide();
  }
  $scope.setBeat = function(option) {
    $scope.beat = option.value;
    $scope.namedBeat = option.name;
    $scope.modalBeat.hide();
  }
  $scope.setUnits = function(option) {
    $scope.units = option.value;
    $scope.namedUnits = option.name;
    if ($scope.units > 0) {
      $scope.namedUnits = "samples in " + $scope.namedUnits;
    }
    $scope.modalUnits.hide();
  }
});

// object which serves to bind number and range inputs
// see: http://stackoverflow.com/questions/15116017/two-way-binding-with-range-and-number-input-in-angularjs
function Quantify(defaultValue) {
    var value = defaultValue;

    this.__defineGetter__("value", function () {
        return value;
    });

    this.__defineSetter__("value", function (val) {
        floatVal = parseFloat(val);
        if (isNaN(floatVal)) {
            value = val;
        } else {
            value = floatVal;
        }
    });
}
