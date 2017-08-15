# Simon Game - Android Game

Build with [Ionic 2](https://github.com/ionic-team/ionic2-app-base)

### Download app at [PlayStore](https://play.google.com/store/apps/details?id=com.hoakusa.simongame)

[Live Demo](http://simongame.hoakusa.com)

Simon Game is an electronic game of memory skills, requires player listen to music (or sound) then repeat what they hear in order. At each level, game device plays sounds and show the light (red, green, yellow, blue) which correspond to the sound order. Player has to remember the order of sound and light position. After game device done, playes has to perform what they heard in the order as game device played before. If player plays right, he will pass to next level, if wrong answer, game will restart.

My Simon Game is a web app game built by Javascript, one of project challenges in [FreeCodeCamp](https://www.freecodecamp.com) Development Program. Functions in web app:
* Player will see how computer play with light and sound in order.
* Computer can check whether player play right or wrong syntax.
* Player can see the different light colors and different sounds in each level.
* Player can choose Normal mode or Strict mode.
* In Normal mode, if player plays wrong, computer will replay the song at this level again. However, in Strict mode, player will be moved to Level 1 and restart again.

### See more app at my [PlayStore](https://play.google.com/store/apps/developer?id=Alice%20Pham&hl=en)

## Design

Game materials was made by [An Pham](http://hoakusa.com), view [project description](http://hoakusa.com/works/simon-game) on homepage.

# Getting Started

## Installing & Development

1. Download/Clone the folder: `git clone https://github.com/hoakusa/Simon-game-Android.git`
2. Access your local folder:  `cd yourfolder`
3. Install dependencies: `npm install`
4. Run app in development browser: `ionic serve`

## Deploying app to a device

Make sure you have slready installed [Android SDK](https://developer.android.com/studio/index.html) or Xcode
Run `ionic cordova run android --prod --release`
or  `ionic cordova build android --prod --release`

### See full doc at [Ionic documentation](https://ionicframework.com/docs/intro/deploying/)

## License

MIT

