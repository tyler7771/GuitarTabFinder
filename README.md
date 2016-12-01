# Guitar Tab Finder <img src="http://res.cloudinary.com/dfmvfna21/image/upload/v1480552250/icon48_zluiyo.png" width="50px" height="50px" />

<a href="https://tyler7771.github.io/NeverTellMeTheOdds/" target="_blank">Download Site</a>

As a guitar player, sometimes when you're listening to a song, you just have to learn how to play it! You begin the process of going to ultimate-guitar and then searching for the song and it can be a pain. Guitar Tab Finder automates this process for you! This chrome extension grabs the video's

## Features & Implementation

The game is made using vanilla JavaScript. It tracks the score over the course of the game and store's the user's high score for the life of the window. As the user's score gets higher the astroids travel faster towards the ship making the game more difficult.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1479496472/Screen_Shot_2016-11-18_at_11.12.51_AM_mpvrwg.png)

#### Ship movement

I use a sprite to animate the ship back and forth as the user plays the game. The animation is done through tracking the animation point of the ship and on the next frame rendering incrementing the frame position to render a new position of the ship. The portion of the code that does that looks like this:


The frame index and tick count are how I find the position of the ship that I want. They're stored as instance variables so they aren't erased on every render call.
```js
constructor() {
  // The portion of the sprite needed currently
  this.frameIndex = 0;
  // How many frames it's been rendered
  this.tickCount = 0;
}
```
The draw method creates a sprite instance, updates the sprite position based on the frame index and tick count and then renders the ship.
```js
draw(context) {
  const imgSprite = this.sprite({
    context: context,
    width: 3000,
    height: 100,
    image: img,
    numberOfFrames: 30,
    ticksPerFrame: 3
  });

  imgSprite.update();
  imgSprite.render();
}
```

The sprite function takes the logic given to it by the draw function and returns the image of the ship that's needed.

```js
sprite(options) {
  let that = {},
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  // Updates the tickCount and frameIndex(if needed)
  that.update = function () {
    this.tickCount += 1;
    if (this.tickCount > ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }.bind(this);

  // Takes all the information given and finds the portion of the sprite needed currently
  that.render = function () {
    that.context.drawImage(
      // The sprite itself
      that.image,
      // Horizontal position in the sprite
      this.frameIndex * that.width / numberOfFrames,
      // Vertical position in the sprite
      0,
      // Height and width of the image on the sprite
      that.width / numberOfFrames,
      that.height,
      // Position on the canvas where it's drawn
      this.pos[0],
      this.pos[1],
      // Height and width of the image returned
      that.width / numberOfFrames,
      that.height);
  }.bind(this);
  return that;
}
```

### Game Over

When the user collides the ship with an asteroid there is an explosion and a game over page is rendered.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1479496490/Screen_Shot_2016-11-18_at_10.53.18_AM_owrekt.png)

On every frame step there is a check for a crash. If there is a crash it returns true and the game over sequence run. If there's no crash, the game continues to run until there is one.

```js
step(time) {
  this.moveObjects(time);
  const crash = this.checkCrash();

  if (crash) {
    this.crash = true;
  } else {
    this.addObstacle();
    this.removeObstacle();
    if (this.playing) {
      this.score += 1;
    }
  }
}
```

The checkCrash method looks at the the position of the ship and each obstacle on the screen and checks if the positions of the two items would be a crash.
```js
checkCrash() {
  const ship = this.ship[0];
  let returnValue = false;

  this.obstacles.forEach((obstacle) => {
    // The obstacle is range of where the ship is
    if (obstacle.pos[0] > 249 && obstacle.pos[0] < 398) {
      // Ship hits the obstacle in the middle
      if (ship.pos[1] > obstacle.pos[1]
        && (ship.pos[1] + 100) < (obstacle.pos[1] + 150)) {
          returnValue = true;
      // Ship hits the obstacle with on the bottom
      } else if ((ship.pos[1] < obstacle.pos[1])
        && (ship.pos[1] + 70) > (obstacle.pos[1])) {
          returnValue = true;
      // Ship hits the obstacle with the top
      } else if ((ship.pos[1] < (obstacle.pos[1] + 120))
        && (ship.pos[1] + 100) > (obstacle.pos[1] + 150)) {
          returnValue = true;
      }
      // Ship hits the top or bottom of the screen
    } else if (ship.pos[1] <= -25 || ship.pos[1] >= 425){
      returnValue = true;
    }
  });
  return returnValue;
}
```

## Future Additions to the Site

I had an absolute blast making this game and would love to keep adding on to it!

### Different Ships and Planets

I'd love to add other ships and planets from the Star Wars universe to allow users to choose the ship they want to fly and where they want to fly it.

### Gravity changing

Add a feature that allows users to choose the gravity of the game. If they find it too hard make the ship down slower, or if they find it too easy make the ship go down faster.

### Custom backgrounds

Allow users to upload their own custom backgrounds by utilizing cloudinary's upload widget so they can fly their favorite ships anywhere they want!
