// contains game
var mainState = {

  // execute in beginning to load images/ sound
  preload: function() {
    // load dog sprite
    game.load.image('dog', 'assets/bird.png');
  },

  // next function where we set up game, display sprites, etc
  create: function() {
    // change background color of game to grey
    game.stage.backgroundColor = '#f1f2eb';
    // set physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // display dog at x=100, y=245
    this.dog = game.add.sprite(100,245,'dog');
    // add physics to dog so it can move (gravity, collision)
    game.physics.arcade.enable(this.dog);
    // add gravity so dog falls
    this.dog.body.gravity.y = 1000;
    // call jump function when spacebar is pressed
    var spaceKey = game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
  },

  // called periodically 60 times/s and contains game logic
  update: function() {
    // if bird is out of screen (too high or low), restart game
    if (this.dog.y < 0 || this.dog.y > 600)
      this.restartGame();
  },

  // dog jumps
  jump: function() {
    // add vertical velocityto bird
    ths.dog.body.velocity.y = -350;
  },

  // restart game
  restartGame: function() {
    // start with main state which restarts the game
    game.State.start('main');
  }
  
};

// initialize phaser... create 500px by 600px game
var game = new Phaser.Game(500,600);

// add mainState called lisa
game.state.add('lisa', mainState);

// start state which starts the game
game.state.start('lisa');
