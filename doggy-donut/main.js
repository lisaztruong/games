// run in terminal
// python -m SimpleHTTPServer
// local host 8000

// height and width
var height = 570;
var width = 325;


// Create our 'main' state that will contain the game
var mainState = {
  preload: function() {
      // Load the doggy sprite
      game.load.image('doggy', 'assets/doggy.png');

      game.load.image('donut', 'assets/donut.png');

      game.load.audio('jump', 'assets/jump.wav');


  },

  create: function() {
      // Change the background color of the game to blue
      game.stage.backgroundColor = '#71c5cf';

      // Set the physics system
      game.physics.startSystem(Phaser.Physics.ARCADE);

      // Display the doggy at the position x=100 and y=245
      this.doggy = game.add.sprite(100, 245, 'doggy');

      // Add physics to the doggy
      // Needed for: movements, gravity, collisions, etc.
      game.physics.arcade.enable(this.doggy);

      // Add gravity to the doggy to make it fall
      this.doggy.body.gravity.y = 1000;

      // Call the 'jump' function when the spacekey is hit
      var spaceKey = game.input.keyboard.addKey(
                      Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);

      // Create an empty group
      this.donuts = game.add.group();

      this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

      this.score = 0;
      // 20 20
      this.labelScore = game.add.text(145, 490, "0",
          { font: "60px Verdana", fill: "white  " });

      // Move the anchor to the left and downward
      this.doggy.anchor.setTo(-0.2, 0.5);

      this.jumpSound = game.add.audio('jump');

  },

  update: function() {
      // If the doggy is out of the screen (too high or too low)
      // Call the 'restartGame' function
      if (this.doggy.y < 0 || this.doggy.y > height){
        this.restartGame();
      }

      game.physics.arcade.overlap(
        this.doggy, this.donuts, this.hitPipe, null, this);

      if (this.doggy.angle < 20){
        this.doggy.angle += 1;
      }

  },

    // Make the doggy jump
  jump: function() {
      if (this.doggy.alive == false){
        return;
      }

      // Add a vertical velocity to the doggy
      this.doggy.body.velocity.y = -350;

      // Create an animation on the doggy
      var animation = game.add.tween(this.doggy);

      // Change the angle of the doggy to -20° in 100 milliseconds
      animation.to({angle: -20}, 100);

      // And start the animation
      animation.start();

      this.jumpSound.play();

  },

  // Restart the game
  restartGame: function() {
      // Start the 'main' state, which restarts the game
      game.state.start('main');
  },

  addOnePipe: function(x, y) {
    // Create a donut at the position x and y
    var donut = game.add.sprite(x, y, 'donut');

    // Add the donut to our previously created group
    this.donuts.add(donut);

    // Enable physics on the donut
    game.physics.arcade.enable(donut);

    // Add velocity to the donut to make it move left
    donut.body.velocity.x = -200;

    // Automatically kill the donut when it's no longer visible
    donut.checkWorldBounds = true;
    donut.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
      // Randomly pick a number between 1 and 5
      // This will be the hole position
      var hole = Math.floor(Math.random() * 5) + 1;

      // Add the 6 donuts
      // With one big hole at position 'hole' and 'hole + 1'
      for (var i = 0; i < 8; i++)
          if (i != hole && i != hole + 1)
              this.addOnePipe(width, i * 60 + 10);

      this.score += 1;
      this.labelScore.text = this.score;
  },

  hitPipe: function() {
      // If the doggy has already hit a donut, do nothing
      // It means the doggy is already falling off the screen
      if (this.doggy.alive == false)
          return;

      // Set the alive property of the doggy to false
      this.doggy.alive = false;

      // Prevent new donuts from appearing
      game.time.events.remove(this.timer);

      // Go through all the donuts, and stop their movement
      this.donuts.forEach(function(p){
          p.body.velocity.x = 0;
      }, this);
  },
};

// Initialize Phaser, and create a width 400px by height 490px game
var game = new Phaser.Game(325, 570);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
