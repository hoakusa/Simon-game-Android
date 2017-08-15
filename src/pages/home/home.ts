import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private start_delay = 1000;
  private light_duration = 500;
  private light_delay = 1000;
  private boxs = ["green","red","yellow","blue"];

  private game: Game;
  private isStart: boolean;
  private isStrict: boolean;
  private canStart: boolean;
  private canPress: boolean;
  private msg: string;

  private audio: any[];

  constructor(public navCtrl: NavController) {

    this.game = new Game();
    this.isStrict = false;
    this.canPress = false;
    this.canStart = true;
    this.msg = "";

    // AUDIO
  
    var sources = [
      'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
      'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
      'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
      'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    ];
    var a0 = document.createElement("audio"),
        a1 = document.createElement("audio"),
        a2 = document.createElement("audio"),
        a3 = document.createElement("audio");
    a0.src = sources[0];
    a1.src = sources[1];
    a2.src = sources[2];
    a3.src = sources[3];
    
    this.audio = [a0,a1,a2,a3];
  }

  onStart() {
    if (this.canStart) {
      this.game = new Game();
      this.isStart = true;
      this.isStrict = false;
      this.canStart = false;
      this.canPress = false;
      this.msg = "";
      
      setTimeout(() => {
        // check level
        this.game.setLevel(0);
        this.nextLevel();      
      }, this.start_delay);
    }
        
  }
  
  nextLevel() {
    this.canStart = false;
    this.canPress = false;
    this.game.setLevel(this.game.getLevel() + 1);
    // Create new box
    this.newBox();
    this.startLevel();
  }

  startLevel() {
    this.canStart = false;
    this.canPress = false;
    this.game.resetPlayer();
    this.msg = "Level " + this.game.getLevel();

    // turn light on
    setTimeout(() => {
      this.computerPlay();
    }, 1000);
  }

  select(val: number) {    
    if (this.canPress) {
      this.msg = "";
      this.game.addPlayer(this.boxs[val]);
      this.onLight(this.boxs[val]);

      if (this.game.getPlayer().length === this.game.getHistory().length) {
        this.checkWin();
      }
    }
  }

  computerPlay() {
    var delay = this.light_duration + this.light_delay; // > 1000s onlight
    // Replay history turn
    for (var i = 0; i < this.game.getHistory().length; i++) {
      ((i) => {
        setTimeout(() => {
          console.log(i);
          this.onLight(this.game.getHistory()[i]);
        }, delay*i, true, i);
      })(i);      
    }

    // Allow player play
    setTimeout(() => {
      this.canPress = true;
      this.canStart = true;
      this.msg = "Repeat the order of light buttons";
    }, delay*this.game.getHistory().length);        
  }

  newBox() {
    var i = Math.floor(Math.random()*this.boxs.length);
    this.game.setBox(this.boxs[i]);
    this.game.addHistory(this.boxs[i]);
  }

  onLight(box) {
    // Play Sound
    this.audio[this.boxs.indexOf(box)].play();
    // Change light
    document.getElementById(box).className += ' ' + box + '2';
    setTimeout(() => {
      document.getElementById(box).className = 'btn-press ' + box;
    }, this.light_duration);
  }

  checkWin() {
    var delay = this.light_duration + this.light_delay;
    
    // Check win current level
    if (this.game.getPlayer().join(" ") === this.game.getHistory().join(" ")) {
      // Check Win 20 levels
      if (this.game.getHistory().length === 20) {            
        setTimeout(() => {
          this.msg = "Awesome. You win!";
          this.isStart = true;
        }, delay);
      }
      // Right -> Next level
      setTimeout(() => {
        this.msg = "Right answer";
      }, delay);

      setTimeout(() => {
        this.nextLevel();
      }, delay+500);

    } else  {
      // Wrong -> Replay
      if (!this.isStrict) {
        // Normal mode: Replay at current level
        setTimeout(() => {
          this.msg = "Wrong answer";
        }, 1500);

        setTimeout(() => {
          this.startLevel();
        }, 2000);

      } else {
        // Strict mode: Restart game
        setTimeout(() => {
          this.msg = "Wrong answer";
        }, 1500);

        setTimeout(() => {
          this.onStart();
        }, 2000);

      }
    }
  }

  onStrict() {
    this.isStrict = !this.isStrict;
  }
}

export class Game {
  private box: string;
  private level: number;
  private history: string[];
  private player: string[];
  private isWin: boolean;

  constructor() {
    this.level   = 0;
    this.history = [];
    this.player  = [];
    this.isWin   = false;
  }

  setBox(param: string) {
    this.box = param;
  }

  getLevel() {
    return this.level;
  }

  setLevel(param: number) {
    this.level = param;
  }

  getHistory() {
    return this.history;
  }

  addHistory(param: string) {
    this.history.push(param);
  }

  getPlayer() {
    return this.player;
  }

  addPlayer(param: string) {
    this.player.push(param);
  }

  resetPlayer() {
    this.player = [];
  }

  setWin(param: boolean) {
    this.isWin = param;
  }
}
