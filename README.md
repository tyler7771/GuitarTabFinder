# Guitar Tab Finder <img src="http://res.cloudinary.com/dfmvfna21/image/upload/v1480552250/icon48_zluiyo.png" width="50px" height="50px" />

[Download Site](https://tyler7771.github.io/NeverTellMeTheOdds/)

As a guitar player, sometimes when you're listening to a song, you just have to learn how to play it! You begin the process of going to ultimate-guitar and then searching for the song and it can be a pain. Guitar Tab Finder automates this process for you! This chrome extension grabs the video's title, prefills the artist and song title, then searches to see what options are available for the given information. There is also a tuner implemented that generates the tones for each note in a guitar's standard tuning for ease of tuning.

## Features & Implementation

The extension is made using JavaScript. It makes requests to both Youtube's API and ultimate-guitar.com to provide information for the user to work with to search for the tab they're looking for in the easiest way possible. It can direct user's to guitar tabs, guitar chord sheets, bass tabs, ukulele chord sheets, and all the options for a given artist. Just go to a video, and click a button and you have your tab!

<img src="http://res.cloudinary.com/dfmvfna21/image/upload/v1480612797/ezgif.com-video-to-gif_p870gu.gif" />

### Find video information

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

### Finding Tabs

Once the information on the video is found, 5 ajax requests are made to find what options for tabs are made. Based on the information that is received from the request the button is either active or disabled. This gives the user a visual of what's available for them.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1480578840/Screen_Shot_2016-11-30_at_8.20.40_PM_cijqem.png)

`buttonStatus` iterates through all the button options, creates a url, and sends an ajax request to each option to check if tab exists.

```js
buttonStatus() {
  const buttons = ["tab", "chord", "uke", "bass", "all"];

  for (let i = 0; i < buttons.length; i++) {
    // if either the artist or title isn't defined buttons are inactive
    if (buttons[i] !== "all" &&
      (this.artist === "" ||
      this.title === "")) {
      this.inactiveButton(buttons[i]);
    // if the title isn't defined all button is inactive
    } else if (buttons[i] === "all" && this.artist === ""){
      this.inactiveButton(buttons[i]);
    // ajax request to see if the option is available
    } else {
      let url = new Url(buttons[i], this.artist, this.title);
      url = url.url;
      $.ajax({
        url: url,
        type: 'get',
        // Success if tab is available
        success: () => this.buttonEvent(buttons[i]),
        // Error if url returns 404 meaning no tab is available
        error: () => this.inactiveButton(buttons[i])
      });
    }
  }
}
```

### Tuner

Sometimes when beginning to learn a song you realize your guitar is out of tune. You have to then find a tuner online which is a pain time after time. That's why a standard tuner was implemented in the extension. User's select the note from the dropdown and press the tune button. The tone is then played for 3 seconds so the user can tune.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1480578840/Screen_Shot_2016-11-30_at_11.52.06_PM_cujap4.png)
