# Guitar Tab Finder <img src="http://res.cloudinary.com/dfmvfna21/image/upload/v1480552250/icon48_zluiyo.png" width="50px" height="50px" />

[Download Site](https://tyler7771.github.io/NeverTellMeTheOdds/)

As a guitar player, sometimes when you're listening to a song, you just have to learn how to play it! You begin the process of going to ultimate-guitar and then searching for the song and it can be a pain. Guitar Tab Finder automates this process for you! This chrome extension grabs the video's title, prefills the artist and song title, then searches to see what options are available for the given information. There is also a tuner implemented that generates the tones for each note in a guitar's standard tuning for ease of tuning.

## Features & Implementation

The game is made using JavaScript. It makes requests to both Youtube's API and ultimate-guitar.com to provide information for the user to work with to search for the tab they're looking for in the easiest way possible. It can direct user's to guitar tabs, guitar chord sheets, bass tabs, ukulele chord sheets, and all the options for a given artist. Just go to a video, and click a button and you have your tab!

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1479496472/Screen_Shot_2016-11-18_at_11.12.51_AM_mpvrwg.png)

#### Find video information

I used jQuery to make a call to Youtube's API to get the information for the video a user is currently watching. This returns the video's title in the form of a string. I then have 2 functions (`getArtist` and `getTitle`) that parse this string and give me the artist and the song title.

For 99.9% of videos for a song, a dash separates the artist and the song title. `getArtist` takes the string received from the ajax request and separates the artist from the song title on the dash. It's then stored as an instance variable and updates the text input for the user to update it if necessary.

```js
getArtist(info) {
  // Separates the artist from the song title and then stores as an instance variable.
  this.artist = info.split(" - ")[0];
  // Finds the text field and fills with the instance variable that was just stored.
  let artistName = document.getElementById("artist-name");
  artistName.value = this.artist;
}
```

Song titles were a little more complicated. The song title side of the split often has a lot of unnecessary information such as `(Offical Video)` or `(Live)` that we don't want. There's also the possibility that the song title can be in quotes which we also don't want. I solved this problem by using regular expressions to grab only the portions of the song half that I want and then, like the artist, store it as an instance variable and update the text input.

```js
getTitle(info) {
  // Store the second half of the video title as a variable
  const infoSplit = info.split(" - ")[1];
    // Check and see if the song title is undefined for a button status check
  if (infoSplit === undefined) {
    this.buttonStatus();
    // Check to see if the video is in quotes
  } else if (infoSplit[0] === '"'){
    // Only grabs the text that's after a full quote until something that's not a letter, number, space,
    //  apostrophe, or period (or a second full quote).
    this.title = info.split(/^[^\"]*\"([a-z0-9\ \-\'\.]{1,})/i)[1];
  } else {
    // Only grabs the text that's after a full dash until something that's not a letter, number, space,
    // apostrophe, or period. This will give us a string with spaces at the beginning and the end
    // ex. " example ". Trim gets rid of these spaces.
    this.title = info.split(/^[^\-]*\-([a-z0-9\ \-\'\.]{1,})/i)[1].trim();
  }
  let titleName = document.getElementById("title-name");
  titleName.value = this.title;
}
```

There are also cases in which the song title is listed before the artist. In this case a check box has been given to switch the artist and song title. When checked, the artist and song title variables are switched.


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
