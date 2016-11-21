## Guitar Tab Finder

### Background

As a guitar player, I'm always listening to music wondering if I'd be able to play that cool guitar line in every song. When watching videos on youtube I often find that I want to learn that particular song that I've been listening to on repeat for the past 5 days, enter Guitar Tab Finder. This Chrome extension will take the youtube video that the user is listening to and find the guitar tab for the song. It will automatically find the tab and open it in a new tab for ease of learning songs!

### Functionality & MVP

With this extension, users will be able to:

- [ ] Find tabs for a song they're listening to on youtube
- [ ] Users have the ability to search for chord charts, tab charts, or a list of all tabs that match the song
- [ ] Learn how to read guitar tabs
- [ ] Open search results in a new tab

### Wireframes

![wireframes](http://res.cloudinary.com/dfmvfna21/image/upload/v1479712808/Chrome_Extension_en9zab.png)

### Technologies & Technical Challenges

The extension will use: Javascript, HTML, and CSS. It will also utilize the Youtube's API to grab the video's title. It will use two files `find_title.js` and `searching.js`.

- `find_title.js`: will contain the logic for finding the title of the video and parsing it for only the information needed.
- `searching.js`: will contain the logic creating the url needed for finding the tab based on the information received from `find_title.js` and options from user.

There will also be 2 HTML files to display the content:

- `options.html`: the file that will display the options for the user.
- `styling.css`: the file containing all the styling for the extension.

The primary technical challenges will be:

- Find the youtube video's title and then parsing it to grab only the information that I want from the title.
- Error handling. The site I plan on using for displaying tabs only displays a page that says nothing's there. There is not redirect so figuring out how to handle when no tabs exist will be a challenge.
- Most songs on youtube, the artist title is before the song title. Although, I've found some cases where they're flipped. Handling that in a way that's good for the user will be a challenge.

### Implementation Timeline

**Day 1**: Get started on the infrastructure of the extension, following <a href="https://developer.chrome.com/extensions/getstarted">this guide</a> from Chrome.  By the end of the day, I will have:

- A completed `package.json`
- A completed `manifest.json`
- The ability to locate a video's title.

**Day 2**: Work on parsing video's title, and return the specific url I'd like based on the type of search the user would like. By the end of the day I'd like to be able to:

- Separate artist from song title
- Remove any extra information not wanted
- Get a url returned based on the button selected.

**Day 3**: Dedicate this day to learning how to open new tabs in chrome and navigate to a specified url. Figure out error handling. By the end of the day I'd like to be able to:

- Open a new tab on each button click.
- Figure out a way to handle if no tab exists for that specific song.

**Day 4**: Finish all the HTML and CSS for the extension. Create a page that teaches users how to read tabs that the extension links to. Any final debugging. By the end of the day:

- Fully functioning extension that has adequate styling.
- Page that teaches users how to read tabs. Also has adequate styling. 

**Bonus**: Implement a tuner. Have a select to choose specific notes the user could use. Then when a button is pressed, it generates that tone for 10 seconds so a user can tune their guitar.
