$(document).ready(function(){

    var hangMan = {
    wins:0,
      losses:0,
      match:0,
      guessesLeft:7,
      playerGuess: [],//letters already guessed [array]
      hiddenWord:[],//will eventually be displayed as "---"
      wordChoices: ["lion",  "elephant", "zebra", "hyena", "monkey", "gorilla", "cheetah"],

    
    //When called a new word (newCompPick) is selected from the choices and dashes are pushed to the screen (hiddenWord) playerGuess and guessesLeft are also refreshed.  Would like to create a function to do this.
    newWord: function() {
        document.getElementById('wins').innerHTML=this.wins;
        document.getElementById('losses').innerHTML=this.losses;
        this.match = 0;
        this.guessesLeft = 7;
        document.getElementById('guessesLeft').innerHTML=this.guessesLeft;
        this.playerGuess = [];
        document.getElementById('playerGuess').innerHTML=this.playerGuess;
          this.newCompPick = this.wordChoices[Math.floor(Math.random() * this.wordChoices.length)];
        this.hiddenWord = [];
        console.log("The newCompPick:"+ this.newCompPick);
          for (i=0; i < this.newCompPick.length; i++){
                this.hiddenWord.push("-");
                document.getElementById('hiddenWord').innerHTML = this.hiddenWord.join(" ");

          }
          // return this.hiddenWord; //not sure this is needed
      
    },

    checkLetter: function(userGuess, result){
        
        var tempArray = [];

        // check to see if letter pushed multiple times (looking in playerGuess array)
        if (this.playerGuess.indexOf(userGuess) >= 0){ //could have used (this.playerGuess[userGuess])?
        console.log("repeat letter: " + userGuess);
        return; //or break
        }
        //push the key input (userGuess) to the playerGuess array which gets written to the screen
        this.playerGuess.push(userGuess);
        document.getElementById('playerGuess').innerHTML = this.playerGuess;

          //check if the key input (userGuess) exists in the new word chosen (newCompPick)
      if (this.newCompPick.indexOf(userGuess) > -1){

          //now checking for multiple occurences 
          for (var i=0; i<this.newCompPick.length; i++){

              if (userGuess===this.newCompPick[i]){
                 // letter match counter increases. match counter placed here in case of multiple occurrences. (as opposed to under the if exists if statement)
                 this.match++;
                 console.log("it's a match: "+ this.match);
                tempArray.push(i); //may need to create a new temp array here instead of using hiddenWord...created(tempArray)
                 //pushing the index, not the letter
                // console.log("tempArray: " +tempArray);
              }
          
          }
          for(var i = 0; i < tempArray.length; i++){
            //tempArray has been populated. Now assign hiddenWord at the index of tempArray[i] to be the same as newCompPick at the same index.
             this.hiddenWord[tempArray[i]] = this.newCompPick[tempArray[i]];
             document.getElementById('hiddenWord').innerHTML = this.hiddenWord.join(" ");

          }
            //When match = length of word we get a win.
          if (this.match===this.newCompPick.length){
              this.wins++
              // alert("You Got IT! The word was: "+ this.newCompPick); removed alert (not needed)
              console.log("wins: " + this.wins);
              this.newWord();
          }
      }

      /*if (this.match===this.newCompPick.length){
          this.wins++;
          console.log("wins: " + this.wins);
          this.newWord();
      }*/

         //If the letter does not exist in the newWord then guesses left goes down.  Moved this from being inline with the "if match" statement. 
      else {
          this.guessesLeft--;
          document.getElementById('guessesLeft').innerHTML= this.guessesLeft;
      }

      if (this.guessesLeft===0){
          this.losses++;
          document.getElementById('losses').innerHTML= this.losses;
          console.log("losses: " + this.losses);
          this.newWord();
      }

    },
}

hangMan.newWord(); //initiate new word for game via this function

document.onkeyup = function(event){
  
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        console.log("userGuess: "+ userGuess);

    if (event.key.match(/^[A-Za-z]$/)) {
  
        hangMan.checkLetter(userGuess); //calls checkLetter fxn and passes "userGuess (key pressed)" to hangman object

    }
}





























});