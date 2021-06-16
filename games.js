/* TABLINK */
function openTab(cityName, elmnt) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Remove the background color of all tablinks/buttons
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].style.backgroundColor = "";
	}
  
	// Show the specific tab content
	document.getElementById(cityName).style.display = "block";
  }
  







/*		BLACKJACK		*/
let deck = [];
let player = [];
let dealer = [];
let dealerShow = [];
var currIdx = 0;
var playerSum = 0;
var dealerSum = 0;
var dealerShowTotal = 0;
var playerCash = 100; //player betting money

function startGame() {
	//initialize vars
	playerSum = 0;
	dealerSum = 0;
	dealerShowTotal = 0;
	currIdx = 0;
	dealerShow = [];
	player = [];
    dealer = [];
	//create deck
	for (var i = 0 ; i < 4 ; i++){
		for (var j = 1 ; j < 14 ; j++) {
			if (j == 11){
				deck.push('J');
			}
			else if (j == 12){
				deck.push('Q');
			}
			else if (j == 13){
				deck.push('K');
			}
			else if (j == 1){
				deck.push('A');
			}
			else {
				deck.push(j);
			}
		}
	}
	//shuffle deck
	deck = shuffle(deck);
	//deal
	for (var i = 0 ; i < 2 ; i++){
		dealer.push(deck[currIdx]);
		currIdx++;
		player.push(deck[currIdx]);
		currIdx++;
	}
	//determine player and dealer sum
	for (card of player) {
		if (card == 'J' || card == 'Q' || card == 'K'){
			playerSum += 10;
		}
		else if (card == 'A'){
            if ((playerSum + 11) > 21) {
                playerSum += 1;
            }
            else {
                playerSum += 11;
            }
		}
		else {
			playerSum += card;
		}
	}
	for (card of dealer) {
		if (card == 'J' || card == 'Q' || card == 'K'){
			dealerSum += 10;
		}
		else if (card == 'A'){
            if ((dealerSum + 11) > 21) {
                dealerSum += 1;
            }
            else {
                dealerSum += 11;
            }
		}
		else {
			dealerSum += card;
		}
	}
	//determine dealer visible total
	if (dealer[0] == 'J' || dealer[0] == 'Q' || dealer[0] == 'K'){
		dealerShowTotal = 10;
	}
	else if (dealer[0] == 'A'){
		dealerShowTotal = 1;
	}
	else {
		dealerShowTotal = dealer[0];
	}
	dealerShow.push(dealer[0]);
	dealerShow.push('?');

	//input bet
	document.getElementById("proj1").innerHTML = 
	"Enter Betting Amount (25$/Round) : " + "<br><br>" + 
	"<input type='number' id='bet' ></input>";
	var bet = document.getElementById("bet");
	bet.focus();
	bet.addEventListener("keyup", function(e) {
		if (e.keyCode == 13) {
			playerCash = Number(document.getElementById("bet").value)
			if (playerCash < 25) {
				document.getElementById("proj1").innerHTML = 
				"<br> A round costs 25$." +
				"<br> Come back  when you have the cash." + 
				"<br> <button onclick='JavaScript:startGame()'>Start</button>";

			}
			else {
				start()
			}
		}
	})

	
}

function start() {
	//display player hand
	
	
	document.getElementById("proj1").innerHTML = 
	"Your Hand: " + player + "<br>";
	document.getElementById("proj1").innerHTML +=
     "Total: " + playerSum + "<br>" + "<br>";
     
	checkState();
}

function continueGame() {
	//initialize vars
	playerSum = 0;
	dealerSum = 0;
	dealerShowTotal = 0;
	currIdx = 0;
	dealerShow = [];
	player = [];
    dealer = [];
	//create deck
	for (var i = 0 ; i < 4 ; i++){
		for (var j = 1 ; j < 14 ; j++) {
			if (j == 11){
				deck.push('J');
			}
			else if (j == 12){
				deck.push('Q');
			}
			else if (j == 13){
				deck.push('K');
			}
			else if (j == 1){
				deck.push('A');
			}
			else {
				deck.push(j);
			}
		}
	}
	//shuffle deck
	deck = shuffle(deck);
	//deal
	for (var i = 0 ; i < 2 ; i++){
		dealer.push(deck[currIdx]);
		currIdx++;
		player.push(deck[currIdx]);
		currIdx++;
	}
	//determine player and dealer sum
	for (card of player) {
		if (card == 'J' || card == 'Q' || card == 'K'){
			playerSum += 10;
		}
		else if (card == 'A'){
            if ((playerSum + 11) > 21) {
                playerSum += 1;
            }
            else {
                playerSum += 11;
            }
		}
		else {
			playerSum += card;
		}
	}
	for (card of dealer) {
		if (card == 'J' || card == 'Q' || card == 'K'){
			dealerSum += 10;
		}
		else if (card == 'A'){
            if ((dealerSum + 11) > 21) {
                dealerSum += 1;
            }
            else {
                dealerSum += 11;
            }
		}
		else {
			dealerSum += card;
		}
	}
	//determine dealer visible total
	if (dealer[0] == 'J' || dealer[0] == 'Q' || dealer[0] == 'K'){
		dealerShowTotal = 10;
	}
	else if (dealer[0] == 'A'){
		dealerShowTotal = 1;
	}
	else {
		dealerShowTotal = dealer[0];
	}
	dealerShow.push(dealer[0]);
	dealerShow.push('?');

	//display player hand
	document.getElementById("proj1").innerHTML = 
	"Your Hand: " + player + "<br>";
	document.getElementById("proj1").innerHTML +=
     "Total: " + playerSum + "<br>" + "<br>";
     
	checkState();
}
//Called when Hit button is clicked
function Hit(){
	player.push(deck[currIdx]);
	countTotal();
	currIdx++;
	document.getElementById("proj1").innerHTML =
	 "Your Hand: " + player + "<br>";
	document.getElementById("proj1").innerHTML +=
     "Total: " + playerSum + "<br>" + "<br>";
     
	checkStateHit();

}
//called when Call button is clicked
function Call(){
	document.getElementById("proj1").innerHTML =
	 "Your Hand: " + player + "<br>";
	document.getElementById("proj1").innerHTML +=
	 "Total: " + playerSum + "<br>" + "<br>";

	 //Dealer Hits
	while (dealerSum < 17) {
		dealer.push(deck[currIdx]);
		dealerShow.push(deck[currIdx]);
		countTotal();
		countShowTotal();
		currIdx++;
	}
	checkStateCall();


}
var numAcesPlayer = 0;
var numAcesDealer = 0;
function countTotal() {
	numAcesPlayer = countAces(player);
	numAcesDealer = countAces(dealer);
	dealerSum = 0;
	playerSum = 0;
	for (var i = 0 ; i < player.length ; i++){
		if (player[i] == 'J' || player[i] == 'Q' || player[i] == 'K'){
			playerSum += 10;
		}
		else if (player[i] <= 10){
			playerSum += player[i];
		}
	}
	for (var i = 0 ; i < player.length ; i++) {
		if (player[i] == 'A' && numAcesPlayer > 1){
			playerSum += 1;
			numAcesPlayer--;
		}
		else if (player[i] == 'A' && numAcesPlayer <= 1){
			if ((playerSum + 11) > 21){
				playerSum += 1;
				numAcesPlayer--;
			}
			else {
				playerSum += 11;
				numAcesPlayer--;
			}
		}
	}
	for (var i = 0 ; i < dealer.length ; i++){
		if (dealer[i] == 'J' || dealer[i] == 'Q' || dealer[i] == 'K'){
			dealerSum += 10;
		}
		else if (dealer[i] <= 10){
			dealerSum += dealer[i];
		}
	}
	for (var i = 0 ; i < dealer.length ; i++){
		if (dealerSum[i] == 'A' && numAcesDealer > 1){
			dealerSum += 1;
			numAcesDealer--;
		}
		else if (dealer[i] == 'A' && numAcesDealer <= 1){
			if ((dealerSum + 11) > 21){
				dealerSum += 1;
				numAcesDealer--;
			}
			else {
				dealerSum += 11;
				numAcesDealer--;
			}
		}
	}
}

function countShowTotal(){
	dealerShowTotal = 0;
	if (dealer[0] == 'A') {
		dealerShowTotal = dealerSum - 1;
	}
	else if (dealer[0] == 'J' || dealer[0] == 'Q' || dealer[0] == 'K'){
		dealerShowTotal = dealerSum - 10;
	}
	else if (dealer[0] <= 10){
		dealerShowTotal = dealerSum - dealer[0];
	}
}
function countAces(arr) {
	var num = 0;
	for (var i = 0 ; i < arr.length ; i++){
		if (arr[i] == 'A'){
			num++;
		}
	}
	return num;
}
//determines game state of deal
function checkState() {
	
	
	if (playerSum == 21 && dealerSum != 21) {
		document.getElementById("proj1").innerHTML += "YOU WIN"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash += 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (dealerSum == playerSum && dealerSum == 21){
		document.getElementById("proj1").innerHTML += "TIE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else {
		document.getElementById("proj1").innerHTML +=
		 "<button onclick='JavaScript:Hit()'>Hit</button>"
		document.getElementById("proj1").innerHTML +=
		 "<button onclick='JavaScript:Call()'>Call</button>"

		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealerShow + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerShowTotal + "+";
	}
}
//determines game state after a hit
function checkStateHit() {
	if (playerSum > 21) {
		document.getElementById("proj1").innerHTML += "YOU LOSE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash -= 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (playerSum == 21) {
		document.getElementById("proj1").innerHTML += "YOU WIN"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash += 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else {
		document.getElementById("proj1").innerHTML +=
		 "<button onclick='JavaScript:Hit()'>Hit</button>"
		document.getElementById("proj1").innerHTML +=
		 "<button onclick='JavaScript:Call()'>Call</button>"

		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealerShow + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerShowTotal + "+";
		
	}
}
//determines game state after a call
function checkStateCall() {
	if (dealerSum > 21 && playerSum < 21){
		document.getElementById("proj1").innerHTML += "YOU WIN"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash += 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	} 
	else if (playerSum > 21 && dealerSum < 21) {
		document.getElementById("proj1").innerHTML += "YOU LOSE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash -= 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (playerSum == 21 && dealerSum != 21) {
		document.getElementById("proj1").innerHTML += "YOU WIN"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash += 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (dealerSum == 21 && playerSum != 21){
		document.getElementById("proj1").innerHTML += "YOU LOSE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash -= 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (dealerSum == playerSum && dealerSum == 21){
		document.getElementById("proj1").innerHTML += "TIE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (dealerSum < playerSum) {
		document.getElementById("proj1").innerHTML += "YOU WIN"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash += 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (dealerSum > playerSum) {
		document.getElementById("proj1").innerHTML += "YOU LOSE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        playerCash -= 25;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
	else if (dealerSum == playerSum) {
		document.getElementById("proj1").innerHTML += "TIE"
		document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Dealer Hand: " + dealer + "<br>";
		document.getElementById("proj1").innerHTML += "Dealer Total: " + dealerSum;
		player = [];
		dealer = [];
        currIdx = 0;
        document.getElementById("proj1").innerHTML +=
		 "<br>" + "<br>" + "Your Cash: " + playerCash + "<br>";
		deck = shuffle(deck);
		if (playerCash >= 25) {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:continueGame()'>Next Hand</button>";
		 document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:reset()'>Cash Out</button>";
        }
        else {
            document.getElementById("proj1").innerHTML +=
		 "<br>" + "<button onclick='JavaScript:startGame()'>Start Over</button>";
        }
	}
}

function reset() {
	document.getElementById("proj1").innerHTML = "Play Single-Deck BlackJack" + "<br>" +
	"<br>" + "<button onclick='JavaScript:startGame()'>Start</button>"
}

//shuffles deck
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }





/*		WAR		*/
/*
let playerDeck = [];
let dealerDeck = [];
let toWinner = [];
var playerCardCount = 0;
var dealerCardCount = 0;
var playerCard = 0;
var dealerCard = 0;
var playerValue = 0;
var dealerValue = 0;
var playerDownCard = 0;
var playerUpCard = 0;
var dealerDownCard = 0;
var dealerUpCard = 0;
var iterations = 0;
function startWar() {
	playerDeck = [];
	dealerDeck = [];
	deck = [];
	playerCardCount = 0;
	dealerCardCount = 0;
	playerCard = 0;
	dealerCard = 0;
	playerValue = 0;
	dealerValue = 0;
	playerDownCard = 0;
	playerUpCard = 0;
	dealerDownCard = 0;
	dealerUpCard = 0;
	iterations = 0;
	toWinner = [];
	for (var i = 0 ; i < 4 ; i++){
		for (var j = 1 ; j < 14 ; j++) {
			if (j == 11){
				deck.push('J');
			}
			else if (j == 12){
				deck.push('Q');
			}
			else if (j == 13){
				deck.push('K');
			}
			else if (j == 1){
				deck.push('A');
			}
			else {
				deck.push(j);
			}
		}
	}
	deck = shuffle(deck);
	dealCards();
	playerCardCount = dealerCardCount = playerDeck.length;
	document.getElementById("3").innerHTML = 
	"Player Card Count: " + playerCardCount;
	document.getElementById("3").innerHTML += 
	"<br>Dealer Card Count: " + dealerCardCount;
	document.getElementById("3").innerHTML += 
	"<br><button onclick='JavaScript:flip()'>Flip Card</button>";
	document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:autoComplete()'>Simulate Rest of Game</button>";

}

function dealCards() {
	for (var i = 0 ; i < deck.length ; i++){
		if (i%2 == 0){
			playerDeck.push(deck[i]);
		}
		else{
			dealerDeck.push(deck[i]);
		}
	}
}
function flip() {
	iterations++;
	playerCard = playerDeck[playerDeck.length - 1];
	playerDeck.pop();
	dealerCard = dealerDeck[dealerDeck.length - 1];
	dealerDeck.pop();
	document.getElementById("3").innerHTML = 
	"Your Card: " + playerCard;
	document.getElementById("3").innerHTML += 
	"<br>Dealer Card: " + dealerCard;

	if (playerCard == 'J'){
		playerValue = 11;
	}
	else if (playerCard =='Q'){
		playerValue = 12;
	}
	else if (playerCard =='K'){
		playerValue = 13;
	}
	else if (playerCard =='A'){
		playerValue = 14;
	}
	else{
		playerValue = playerCard;
	}

	if (dealerCard == 'J'){
		dealerValue = 11;
	}
	else if (dealerCard =='Q'){
		dealerValue = 12;
	}
	else if (dealerCard =='K'){
		dealerValue = 13;
	}
	else if (dealerCard =='A'){
		dealerValue = 14;
	}
	else{
		dealerValue = dealerCard;
	}
	checkWarState();
}
function checkWarState() {
	if (playerValue > dealerValue){
		//you win
		document.getElementById("3").innerHTML += 
		"<br><br>You win this hand!"
		playerDeck.unshift(playerCard);
		playerDeck.unshift(dealerCard);
		playerCardCount = playerDeck.length;
		dealerCardCount = dealerDeck.length;
		document.getElementById("3").innerHTML += 
			"<br><br>Player Card Count: " + playerCardCount;
			document.getElementById("3").innerHTML += 
			"<br>Dealer Card Count: " + dealerCardCount;
		if (playerCardCount != 0 && dealerCardCount != 0){
			//continue
			document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:flip()'>Flip Card</button>";
			document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:autoComplete()'>Simulate Rest of Game</button>";
		}
		else if (playerCardCount == 0 && dealerCardCount != 0){
			//dealer wins
			document.getElementById("3").innerHTML =
			"You Lose!";
			document.getElementById("3").innerHTML +=
			"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
		}
		else if (playerCardCount != 0 && dealerCardCount == 0){
			//player wins
			document.getElementById("3").innerHTML =
			"You Win!";
			document.getElementById("3").innerHTML +=
			"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
		}
	}
	else if (dealerValue > playerValue){
		//you lose
		document.getElementById("3").innerHTML += 
		"<br><br>You lose this hand!"
		dealerDeck.unshift(dealerCard);
		dealerDeck.unshift(playerCard);
		playerCardCount = playerDeck.length;
		dealerCardCount = dealerDeck.length;
		document.getElementById("3").innerHTML += 
			"<br><br>Player Card Count: " + playerCardCount;
			document.getElementById("3").innerHTML += 
			"<br>Dealer Card Count: " + dealerCardCount;
			if (playerCardCount != 0 && dealerCardCount != 0){
				//continue
				document.getElementById("3").innerHTML += 
				"<br><br><button onclick='JavaScript:flip()'>Flip Card</button>";
				document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:autoComplete()'>Simulate Rest of Game</button>";
			}
			else if (playerCardCount == 0 && dealerCardCount != 0){
				//dealer wins
				document.getElementById("3").innerHTML =
				"You Lose!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
			else if (playerCardCount != 0 && dealerCardCount == 0){
				//player wins
				document.getElementById("3").innerHTML =
				"You Win!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
	}
	else {
		//tie
		document.getElementById("3").innerHTML += 
		"<br><br>You tie this hand! This means WAR!"
		if (playerDeck.length < 2 || dealerDeck.length < 2){
			if (playerDeck.length < 2){
				document.getElementById("3").innerHTML =
				"You Lose!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
			else {
				document.getElementById("3").innerHTML =
				"You Win!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
		}
		else {
			document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:dealWar()'>Deal War</button>"
		}
	}
}
function dealWar() {
	playerDownCard = playerDeck[playerDeck.length - 1];
	playerDeck.pop();
	playerUpCard = playerDeck[playerDeck.length - 1];
	playerDeck.pop();
	dealerDownCard = dealerDeck[dealerDeck.length - 1];
	dealerDeck.pop();
	dealerUpCard = dealerDeck[dealerDeck.length - 1];
	dealerDeck.pop();
	toWinner.push(playerUpCard);
	toWinner.push(playerDownCard);
	toWinner.push(playerCard);
	toWinner.push(dealerUpCard);
	toWinner.push(dealerDownCard);
	toWinner.push(dealerCard);
	if (playerUpCard == 'J'){
		playerValue = 11;
	}
	else if (playerUpCard =='Q'){
		playerValue = 12;
	}
	else if (playerUpCard =='K'){
		playerValue = 13;
	}
	else if (playerUpCard =='A'){
		playerValue = 14;
	}
	else{
		playerValue = playerUpCard;
	}
		
	if (dealerUpCard == 'J'){
		dealerValue = 11;
	}
	else if (dealerUpCard =='Q'){
		dealerValue = 12;
	}
	else if (dealerUpCard =='K'){
		dealerValue = 13;
	}
	else if (dealerUpCard =='A'){
		dealerValue = 14;
	}
	else{
		dealerValue = dealerUpCard;
	}

	document.getElementById("3").innerHTML = 
	"Your Card: " + playerUpCard;
	document.getElementById("3").innerHTML += 
	"<br>Dealer Card: " + dealerUpCard;

	if (playerValue > dealerValue){
		//you win
		document.getElementById("3").innerHTML += 
		"<br><br>You win this hand!"
		for (var i = 0 ; i < toWinner.length ; i++){
			playerDeck.unshift(toWinner[i]);
		}
		toWinner = [];
		playerCardCount = playerDeck.length;
		dealerCardCount = dealerDeck.length;
		document.getElementById("3").innerHTML += 
			"<br><br>Player Card Count: " + playerCardCount;
			document.getElementById("3").innerHTML += 
			"<br>Dealer Card Count: " + dealerCardCount;
		if (playerCardCount != 0 && dealerCardCount != 0){
			//continue
			document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:flip()'>Flip Card</button>";
			document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:autoComplete()'>Simulate Rest of Game</button>";
		}
		else if (playerCardCount == 0 && dealerCardCount != 0){
			//dealer wins
			document.getElementById("3").innerHTML =
			"You Lose!";
			document.getElementById("3").innerHTML +=
			"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
		}
		else if (playerCardCount != 0 && dealerCardCount == 0){
			//player wins
			document.getElementById("3").innerHTML =
			"You Win!";
			document.getElementById("3").innerHTML +=
			"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
		}
	}
	else if (dealerValue > playerValue){
		//you lose
		document.getElementById("3").innerHTML += 
		"<br><br>You lose this hand!"
		for (var i = 0 ; i < toWinner.length ; i++){
			dealerDeck.unshift(toWinner[i]);
		}
		toWinner = [];
		playerCardCount = playerDeck.length;
		dealerCardCount = dealerDeck.length;
		document.getElementById("3").innerHTML += 
			"<br><br>Player Card Count: " + playerCardCount;
			document.getElementById("3").innerHTML += 
			"<br>Dealer Card Count: " + dealerCardCount;
			if (playerCardCount != 0 && dealerCardCount != 0){
				//continue
				document.getElementById("3").innerHTML += 
				"<br><br><button onclick='JavaScript:flip()'>Flip Card</button>";
				document.getElementById("3").innerHTML += 
			"<br><br><button onclick='JavaScript:autoComplete()'>Simulate Rest of Game</button>";
			}
			else if (playerCardCount == 0 && dealerCardCount != 0){
				//dealer wins
				document.getElementById("3").innerHTML =
				"You Lose!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
			else if (playerCardCount != 0 && dealerCardCount == 0){
				//player wins
				document.getElementById("3").innerHTML =
				"You Win!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
	}
	else {
		//tie
		document.getElementById("3").innerHTML += 
		"<br><br>You tie this hand! This means WAR!"
		if (playerDeck.length < 2 || dealerDeck.length < 2){
			if (playerDeck.length < 2){
				document.getElementById("3").innerHTML =
				"You Lose!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
			else if (dealerDeck.length < 2){
				document.getElementById("3").innerHTML =
				"You Win!";
				document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
			}
		}
		else {
			document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:dealWar()'>Deal War</button>"
		}
	}

}
function autoComplete() {
	while (playerCardCount > 0 || dealerCardCount > 0){
		playerCard = playerDeck[playerDeck.length - 1];
		playerDeck.pop();
		dealerCard = dealerDeck[dealerDeck.length - 1];
		dealerDeck.pop();

		if (playerCard == 'J'){
			playerValue = 11;
		}
		else if (playerCard =='Q'){
			playerValue = 12;
		}
		else if (playerCard =='K'){
			playerValue = 13;
		}
		else if (playerCard =='A'){
			playerValue = 14;
		}
		else{
			playerValue = playerCard;
		}
	
		if (dealerCard == 'J'){
			dealerValue = 11;
		}
		else if (dealerCard =='Q'){
			dealerValue = 12;
		}
		else if (dealerCard =='K'){
			dealerValue = 13;
		}
		else if (dealerCard =='A'){
			dealerValue = 14;
		}
		else{
			dealerValue = dealerCard;
		}
		if (playerValue > dealerValue){
			//you win
			console.log("You win")
			playerDeck.unshift(playerCard);
			playerDeck.unshift(dealerCard);
			playerCardCount = playerDeck.length;
			dealerCardCount = dealerDeck.length;
			if (playerCardCount != 0 && dealerCardCount != 0){
				//continue
				flip();
			}
			if (playerCardCount == 0 || dealerCardCount == 0){
				break;
			}
		}
		else if (dealerValue > playerValue){
			//you lose
			console.log("You lose")
			dealerDeck.unshift(dealerCard);
			dealerDeck.unshift(playerCard);
			playerCardCount = playerDeck.length;
			dealerCardCount = dealerDeck.length;
				if (playerCardCount != 0 && dealerCardCount != 0){
					//continue
					flip();
				}
				if (playerCardCount == 0 || dealerCardCount == 0){
					break;
				}
		}
		else if (dealerValue == playerValue) {
			//tie
			console.log("tie")
			if (playerDeck.length < 2 || dealerDeck.length < 2){
				if (playerDeck.length < 2){
					playerDeck = [];
					playerCardCount = 0;
				}
				else if (dealerDeck.length < 2) {
					dealerDeck = [];
					dealerCardCount = 0;
				}
			}
			else {
				dealWarSim();
			}
			if (playerCardCount == 0 || dealerCardCount == 0){
				break;
			}
		}
		console.log(iterations);

	}

	if (playerCardCount == 0){
		document.getElementById("3").innerHTML =
				"You Lost!";
		document.getElementById("3").innerHTML += 
		"<br>The game ended in " + iterations + " turns!"
		document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
	}
	else if (dealerCardCount == 0) {
		document.getElementById("3").innerHTML =
				"You Won!";
		document.getElementById("3").innerHTML += 
				"<br>The game ended in " + iterations + " turns!"
		document.getElementById("3").innerHTML +=
				"<br><button onclick='JavaScript:resetWar()'>Start Over</button>"
	}
}
function dealWarSim() {
	playerDownCard = playerDeck[playerDeck.length - 1];
	playerDeck.pop();
	playerUpCard = playerDeck[playerDeck.length - 1];
	playerDeck.pop();
	dealerDownCard = dealerDeck[dealerDeck.length - 1];
	dealerDeck.pop();
	dealerUpCard = dealerDeck[dealerDeck.length - 1];
	dealerDeck.pop();
	toWinner.push(playerCard);
	toWinner.push(playerUpCard);
	toWinner.push(playerDownCard);
	toWinner.push(dealerCard);
	toWinner.push(dealerUpCard);
	toWinner.push(dealerDownCard);
	if (playerUpCard == 'J'){
		playerValue = 11;
	}
	else if (playerUpCard =='Q'){
		playerValue = 12;
	}
	else if (playerUpCard =='K'){
		playerValue = 13;
	}
	else if (playerUpCard =='A'){
		playerValue = 14;
	}
	else{
		playerValue = playerUpCard;
	}
		
	if (dealerUpCard == 'J'){
		dealerValue = 11;
	}
	else if (dealerUpCard =='Q'){
		dealerValue = 12;
	}
	else if (dealerUpCard =='K'){
		dealerValue = 13;
	}
	else if (dealerUpCard =='A'){
		dealerValue = 14;
	}
	else{
		dealerValue = dealerUpCard;
	}
	if (playerValue > dealerValue){
		//you win
		for (var i = 0 ; i < toWinner.length ; i++){
			playerDeck.unshift(toWinner[i]);
		}
		toWinner = [];
		playerCardCount = playerDeck.length;
		dealerCardCount = dealerDeck.length;
	
		if (playerCardCount != 0 && dealerCardCount != 0){
			//continue
			flip();
		}
	}
	else if (dealerValue > playerValue){
		//you lose
		for (var i = 0 ; i < toWinner.length ; i++){
			dealerDeck.unshift(toWinner[i]);
		}
		toWinner = [];
		playerCardCount = playerDeck.length;
		dealerCardCount = dealerDeck.length;
	
			if (playerCardCount != 0 && dealerCardCount != 0){
				//continue
				flip();
			}
	}
	else {
		//tie
		if (playerDeck.length < 2 || dealerDeck.length < 2){
			if (playerDeck.length < 2){
				playerDeck = [];
				playerCardCount = 0;
			}
			else if (dealerDeck.length < 2){
				dealerDeck = [];
				dealerCardCount = 0;
			}
		}
		else {
			dealWarSim();
		}
	}
}
function resetWar(){
	playerDeck = [];
	dealerDeck = [];
	deck = [];
	playerCardCount = 0;
	dealerCardCount = 0;
	playerCard = 0;
	dealerCard = 0;
	playerValue = 0;
	dealerValue = 0;
	playerDownCard = 0;
	playerUpCard = 0;
	dealerDownCard = 0;
	dealerUpCard = 0;
	iterations = 0;
	document.getElementById("3").innerHTML = 
	"Play War the Card Game<br><br>" +
	"<button onclick='JavaScript:startWar()'>Start</button>"
}

*/

/*		ROULETTE		*/
let playerBets = [];
var ball = 0;
var startAngle = 0;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var options = ["0", "28", "9", "26", "30", "11", "7", "20", "32", "17", "5", "22", "34", "15", "3", "24", "36", "13", "1", "00", "27", "10", "25", "29", "12", "8", "19", "31", "18", "6", "21", "33", "16", "4", "23", "35", "14", "2"];
var colors = ['Green', 'Black', 'Red', 'Black', 'Red', 'Black', 'Red', 'Black','Red', 'Black', 'Red', 'Black','Red', 'Black', 'Red', 'Black','Red', 'Black', 'Red', 'Green','Red', 'Black', 'Red', 'Black','Red', 'Black', 'Red', 'Black','Red', 'Black', 'Red', 'Black','Red', 'Black', 'Red', 'Black','Red', 'Black']
var arc = Math.PI / (options.length / 2);
var ctx;
var playerCashRoulette = 0;
var earnings = 0;
var losses = 0;
var nums = ["0", "28", "9", "26", "30", "11", "7", "20", "32", "17", "5", "22", "34", "15", "3", "24", "36", "13", "1", "00", "27", "10", "25", "29", "12", "8", "19", "31", "18", "6", "21", "33", "16", "4", "23", "35", "14", "2"];

function takeBet() {
	document.getElementById("proj2").innerHTML = 
	"Enter The Value of Each Bet: " + "<br><br>" + 
	"<input type='number' id='rouletteBet' ></input>";
	var rouletteBet = document.getElementById("rouletteBet");
	rouletteBet.focus();
	rouletteBet.addEventListener("keyup", function(e) {
		if (e.keyCode == 13) {
			playerCashRoulette = Number(document.getElementById("rouletteBet").value)
			if (playerCashRoulette < 1) {
				document.getElementById("proj2").innerHTML = 
				"<br> Minimum of 1$/bet." +
				"<br> Come back  when you have the cash." + 
				"<br> <button onclick='JavaScript:resetRoulette()'>Start</button>";

			}
			else {
				startRoulette()
			}
		}
	})
}
function startRoulette() {
	playerBets = [];
	document.getElementById("proj2").innerHTML = "<div id = 'betting-board'>" + "</br>" +
	"Place Your Bets<br>Each bet will cost " + playerCashRoulette + "$" + "<br><br>" +
	"<button onclick='JavaScript:zero()' id = 'zero' >0 </button>" +
	"<button onclick='JavaScript:doubleZero()' id = 'doublezero' class = 'doublezero'>00</button>" + "<br>" + "<br>" +
	"<button onclick='JavaScript:three()' id = 'three' class = 'three'>3 </button>" +
	"<button onclick='JavaScript:two()' id = 'two' class = 'two'>2 </button>" +
	"<button onclick='JavaScript:one()' id = 'one' class = 'one'>1 </button>" + "<br>" +
	"<button onclick='JavaScript:six()' id = 'six' class = 'six'>6 </button>" +
	"<button onclick='JavaScript:five()' id = 'five' class = 'five'>5 </button>" +
	"<button onclick='JavaScript:four()' id = 'four' class = 'four'>4 </button>" + "<br>" +
	"<button onclick='JavaScript:nine()' id = 'nine' class = 'nine'>9 </button>" +
	"<button onclick='JavaScript:eight()' id = 'eight' class = 'eight'>8 </button>" +
	"<button onclick='JavaScript:seven()' id = 'seven' class = 'seven'>7 </button>" + "<br>" +
	"<button onclick='JavaScript:twelve()' id = 'twelve' class = 'twelve'>12</button>" +
	"<button onclick='JavaScript:eleven()' id = 'eleven' class = 'eleven'>11</button>" +
	"<button onclick='JavaScript:ten()' id = 'ten' class = 'ten'>10</button>" + "<br>" +
	"<button onclick='JavaScript:fifteen()' id = 'fifteen' class = 'fifteen'>15</button>" +
	"<button onclick='JavaScript:fourteen()' id = 'fourteen' class = 'fourteen'>14</button>" +
	"<button onclick='JavaScript:thirteen()' id = 'thirteen' class = 'thirteen'>13</button>" + "<br>" +
	"<button onclick='JavaScript:eighteen()' id = 'eighteen' class = 'eighteen'>18</button>" +
	"<button onclick='JavaScript:seventeen()' id = 'seventeen' class = 'seventeen'>17</button>" +
	"<button onclick='JavaScript:sixteen()' id = 'sixteen' class = 'sixteen'>16</button>" + "<br>" +
	"<button onclick='JavaScript:twentyone()' id = 'twentyone' class = 'twentyone'>21</button>" +
	"<button onclick='JavaScript:twenty()' id = 'twenty' class = 'twenty'>20</button>" +
	"<button onclick='JavaScript:nineteen()' id = 'nineteen' class = 'nineteen'>19</button>" + "<br>" +
	"<button onclick='JavaScript:twentyfour()' id = 'twentyfour' class = 'twentyfour'>24</button>" +
	"<button onclick='JavaScript:twentythree()' id = 'twentythree' class = 'twentythree'>23</button>" + 
	"<button onclick='JavaScript:twentytwo()' id = 'twentytwo' class = 'twentytwo'>22</button>" +  "<br>" +
	"<button onclick='JavaScript:twentyseven()' id = 'twentyseven' class = 'twentyseven'>27</button>" + 
	"<button onclick='JavaScript:twentysix()' id = 'twentysix' class = 'twentysix'>26</button>" + 
	"<button onclick='JavaScript:twentyfive()' id = 'twentyfive' class = 'twentyfive'>25</button>" + "<br>" +
	"<button onclick='JavaScript:thirty()' id = 'thirty' class = 'thirty'>30</button>" + 
	"<button onclick='JavaScript:twentynine()' id = 'twentynine' class = 'twentynine'>29</button>" + 
	"<button onclick='JavaScript:twentyeight()' id = 'twentyeight' class = 'twentyeight'>28</button>" + "<br>" +
	"<button onclick='JavaScript:thirtythree()' id = 'thirtythree'>33</button>" +
	"<button onclick='JavaScript:thirtytwo()' id = 'thirtytwo'>32</button>" +
	"<button onclick='JavaScript:thirtyone()' id = 'thirtyone' class = 'thirtyone'>31</button>" +  "<br>" +
	"<button onclick='JavaScript:thirtysix()' id = 'thirtysix'>36</button>" +
	"<button onclick='JavaScript:thirtyfive()' id = 'thirtyfive'>35</button>" + 
	"<button onclick='JavaScript:thirtyfour()' id = 'thirtyfour'>34</button>" +  "<br>" + "<br>" +
	"<button onclick='JavaScript:black()' id = 'black'>Black</button>" +
	"<button onclick='JavaScript:red()' id = 'red'>Red</button>"
	 + "</div>"
	document.getElementById("proj2").innerHTML += "<br><button onclick='JavaScript:showRouletteWheel()'>Spin Wheel</button>";
}

function showRouletteWheel() {
	if (playerBets.length == 0) {
		alert("Please make atleast one bet. Click Spin Wheel when done placing bets");
	}
	else {
		document.getElementById("proj2").innerHTML = "Your Bets: " + playerBets + "<br>" +
		"<button onclick='resetBet()' id ='restart'>Bet</button>" + 
		"<button onclick='resetRoulette()' id ='restart'>Reset</button>" + "<br><br>" +
		"<canvas id='canvas' width='500' height='500'></canvas>";
		drawRouletteWheel();
		spin();
	}
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "White";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "Yellow";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var win = 0;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.fillStyle = colors[index]
  var color = colors[index];
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index]
  losses = playerBets.length*playerCashRoulette;
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
  ctx.font = 'bold 20px Open Sans, sans-serif';
  ctx.fillStyle = color;
  for (var i = 0 ; i < playerBets.length ; i++){
	if (playerBets[i] == text || playerBets[i] == color) {
		win = 1;
		if (contains(playerBets, text) && contains(nums, text)){
			earnings += (playerCashRoulette*36)
			earnings += playerCashRoulette;
		}
		if (playerBets[i] == color) {
			earnings += playerCashRoulette*2;
			earnings += playerCashRoulette;
		}
		earnings -= losses;
		

		}
		
	}
	if (win == 1) {
		ctx.fillText("You Win", 250 - ctx.measureText("You Win").width / 2, 200)
		ctx.fillText("Total: " + earnings + "$", 250 - ctx.measureText("Total: " + earnings + "$").width / 2, 225)
		ctx.restore();
	}
	else if (win == 0) {
		earnings -= losses;
		ctx.fillText("You Lose", 250 - ctx.measureText("You Lose").width / 2, 200)
		ctx.fillText("Total: " + earnings + "$", 250 - ctx.measureText("Total: " + earnings +"$").width / 2, 225)
		ctx.restore();
	}

}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}
function resetRoulette() {
	earnings = 0;
	document.getElementById("proj2").innerHTML = "Play Roulette<br>" +
	"<br>" +
	"<button onclick='JavaScript:takeBet()'>Start</button>";
}
function resetBet() {
	takeBet();
}
function zero() {
	if (!(contains(playerBets, "0"))){
		playerBets.push("0");
		document.getElementById("zero").id = 'changed0';
	}
	else if (contains(playerBets, "0")) {
		var idx = playerBets.indexOf("0");
		playerBets.splice(idx, 1);
		document.getElementById('changed0').id = 'zero';
	}
}
function doubleZero() {
	if (!(contains(playerBets, "00"))){
		playerBets.push("00");
		document.getElementById("doublezero").id = 'changed00';
	}
	else if (contains(playerBets, "00")) {
		var idx = playerBets.indexOf("00");
		playerBets.splice(idx, 1);
		document.getElementById('changed00').id = 'doublezero';
	}
}
function one() {
	if (!(contains(playerBets, "1"))){
		playerBets.push("1");
		document.getElementById("one").id = 'changed1';
	}
	else if (contains(playerBets, "1")) {
		var idx = playerBets.indexOf("1");
		playerBets.splice(idx, 1);
		document.getElementById('changed1').id = 'one';
	}
}
function two() {
	if (!(contains(playerBets, "2"))){
		playerBets.push("2");
		document.getElementById("two").id = 'changed2';
	}
	else if (contains(playerBets, "2")) {
		var idx = playerBets.indexOf("2");
		playerBets.splice(idx, 1);
		document.getElementById('changed2').id = 'two';
	}
}
function three() {
	if (!(contains(playerBets, "3"))){
		playerBets.push("3");
		document.getElementById("three").id = 'changed3';
	}
	else if (contains(playerBets, "3")) {
		var idx = playerBets.indexOf("3");
		playerBets.splice(idx, 1);
		document.getElementById('changed3').id = 'three';
	}
}
function four() {
	if (!(contains(playerBets, "4"))){
		playerBets.push("4");
		document.getElementById("four").id = 'changed4';
	}
	else if (contains(playerBets, "4")) {
		var idx = playerBets.indexOf("4");
		playerBets.splice(idx, 1);
		document.getElementById('changed4').id = 'four';
	}
}
function five() {
	if (!(contains(playerBets, "5"))){
		playerBets.push("5");
		document.getElementById("five").id = 'changed5';
	}
	else if (contains(playerBets, "5")) {
		var idx = playerBets.indexOf("5");
		playerBets.splice(idx, 1);
		document.getElementById('changed5').id = 'five';
	}
}
function six() {
	if (!(contains(playerBets, "6"))){
		playerBets.push("6");
		document.getElementById("six").id = 'changed6';
	}
	else if (contains(playerBets, "6")) {
		var idx = playerBets.indexOf("6");
		playerBets.splice(idx, 1);
		document.getElementById('changed6').id = 'six';
	}
}
function seven() {
	if (!(contains(playerBets, "7"))){
		playerBets.push("7");
		document.getElementById("seven").id = 'changed7';
	}
	else if (contains(playerBets, "7")) {
		var idx = playerBets.indexOf("7");
		playerBets.splice(idx, 1);
		document.getElementById('changed7').id = 'seven';
	}
}
function eight() {
	if (!(contains(playerBets, "8"))){
		playerBets.push("8");
		document.getElementById("eight").id = 'changed8';
	}
	else if (contains(playerBets, "8")) {
		var idx = playerBets.indexOf("8");
		playerBets.splice(idx, 1);
		document.getElementById('changed8').id = 'eight';
	}
}
function nine() {
	if (!(contains(playerBets, "9"))){
		playerBets.push("9");
		document.getElementById("nine").id = 'changed9';
	}
	else if (contains(playerBets, "9")) {
		var idx = playerBets.indexOf("9");
		playerBets.splice(idx, 1);
		document.getElementById('changed9').id = 'nine';
	}
}
function ten() {
	if (!(contains(playerBets, "10"))) {
		playerBets.push("10");
		document.getElementById("ten").id = 'changed10';
	}
	else if (contains(playerBets, "10")) {
		var idx = playerBets.indexOf("10");
		playerBets.splice(idx, 1);
		document.getElementById('changed10').id = 'ten';
	}
}
function eleven() {
	if (!(contains(playerBets, "11"))){
		playerBets.push("11");
		document.getElementById("eleven").id = 'changed11';
	}
	else if (contains(playerBets, "11")) {
		var idx = playerBets.indexOf("11");
		playerBets.splice(idx, 1);
		document.getElementById('changed11').id = 'eleven';
	}
}
function twelve() {
	if (!(contains(playerBets, "12"))){
		playerBets.push("12");
		document.getElementById("twelve").id = 'changed12';
	}
	else if (contains(playerBets, "12")) {
		var idx = playerBets.indexOf("12");
		playerBets.splice(idx, 1);
		document.getElementById('changed12').id = 'twelve';
	}
}
function thirteen() {
	if (!(contains(playerBets, "13"))){
		playerBets.push("13");
		document.getElementById("thirteen").id = 'changed13';
	}
	else if (contains(playerBets, "13")) {
		var idx = playerBets.indexOf("13");
		playerBets.splice(idx, 1);
		document.getElementById('changed13').id = 'thirteen';
	}
}
function fourteen() {
	if (!(contains(playerBets, "14"))){
		playerBets.push("14");
		document.getElementById("fourteen").id = 'changed14';
	}
	else if (contains(playerBets, "14")) {
		var idx = playerBets.indexOf("14");
		playerBets.splice(idx, 1);
		document.getElementById('changed14').id = 'fourteen';
	}
}
function fifteen() {
	if (!(contains(playerBets, "15"))){
		playerBets.push("15");
		document.getElementById("fifteen").id = 'changed15';
	}
	else if (contains(playerBets, "15")) {
		var idx = playerBets.indexOf("15");
		playerBets.splice(idx, 1);
		document.getElementById('changed15').id = 'fifteen';
	}
}
function sixteen() {
	if (!(contains(playerBets, "16"))){
		playerBets.push("16");
		document.getElementById("sixteen").id = 'changed16';
	}
	else if (contains(playerBets, "16")) {
		var idx = playerBets.indexOf("16");
		playerBets.splice(idx, 1);
		document.getElementById('changed16').id = 'sixteen';
	}
}
function seventeen() {
	if (!(contains(playerBets, "17"))){
		playerBets.push("17");
		document.getElementById("seventeen").id = 'changed17';
	}
	else if (contains(playerBets, "17")) {
		var idx = playerBets.indexOf("17");
		playerBets.splice(idx, 1);
		document.getElementById('changed17').id = 'seventeen';
	}
}
function eighteen() {
	if (!(contains(playerBets, "18"))){
		playerBets.push("18");
		document.getElementById("eighteen").id = 'changed18';
	}
	else if (contains(playerBets, "18")) {
		var idx = playerBets.indexOf("18");
		playerBets.splice(idx, 1);
		document.getElementById('changed18').id = 'eighteen';
	}
}
function nineteen() {
	if (!(contains(playerBets, "19"))){
		playerBets.push("19");
		document.getElementById("nineteen").id = 'changed19';
	}
	else if (contains(playerBets, "19")) {
		var idx = playerBets.indexOf("19");
		playerBets.splice(idx, 1);
		document.getElementById('changed19').id = 'nineteen';
	}
}
function twenty() {
	if (!(contains(playerBets, "20"))){
		playerBets.push("20");
		document.getElementById("twenty").id = 'changed20';
	}
	else if (contains(playerBets, "20")) {
		var idx = playerBets.indexOf("20");
		playerBets.splice(idx, 1);
		document.getElementById('changed20').id = 'twenty';
	}
}
function twentyone() {
	if (!(contains(playerBets, "21"))){
		playerBets.push("21");
		document.getElementById("twentyone").id = 'changed21';
	}
	else if (contains(playerBets, "21")) {
		var idx = playerBets.indexOf("21");
		playerBets.splice(idx, 1);
		document.getElementById('changed21').id = 'twentyone';
	}
}
function twentytwo() {
	if (!(contains(playerBets, "22"))){
		playerBets.push("22");
		document.getElementById("twentytwo").id = 'changed22';
	}
	else if (contains(playerBets, "22")) {
		var idx = playerBets.indexOf("22");
		playerBets.splice(idx, 1);
		document.getElementById('changed22').id = 'twentytwo';
	}
}
function twentythree() {
	if (!(contains(playerBets, "23"))){
		playerBets.push("23");
		document.getElementById("twentythree").id = 'changed23';
	}
	else if (contains(playerBets, "23")) {
		var idx = playerBets.indexOf("23");
		playerBets.splice(idx, 1);
		document.getElementById('changed23').id = 'twentythree';
	}
}
function twentyfour() {
	if (!(contains(playerBets, "24"))){
		playerBets.push("24");
		document.getElementById("twentyfour").id = 'changed24';
	}
	else if (contains(playerBets, "24")) {
		var idx = playerBets.indexOf("24");
		playerBets.splice(idx, 1);
		document.getElementById('changed24').id = 'twentyfour';
	}
}
function twentyfive() {
	if (!(contains(playerBets, "25"))){
		playerBets.push("25");
		document.getElementById("twentyfive").id = 'changed25';
	}
	else if (contains(playerBets, "25")) {
		var idx = playerBets.indexOf("25");
		playerBets.splice(idx, 1);
		document.getElementById('changed25').id = 'twentyfive';
	}
}
function twentysix() {
	if (!(contains(playerBets, "26"))){
		playerBets.push("26");
		document.getElementById("twentysix").id = 'changed26';
	}
	else if (contains(playerBets, "26")) {
		var idx = playerBets.indexOf("26");
		playerBets.splice(idx, 1);
		document.getElementById('changed26').id = 'twentysix';
	}
}
function twentyseven() {
	if (!(contains(playerBets, "27"))){
		playerBets.push("27");
		document.getElementById("twentyseven").id = 'changed27';
	}
	else if (contains(playerBets, "27")) {
		var idx = playerBets.indexOf("27");
		playerBets.splice(idx, 1);
		document.getElementById('changed27').id = 'twentyseven';
	}
}
function twentyeight() {
	if (!(contains(playerBets, "28"))){
		playerBets.push("28");
		document.getElementById("twentyeight").id = 'changed28';
	}
	else if (contains(playerBets, "28")) {
		var idx = playerBets.indexOf("28");
		playerBets.splice(idx, 1);
		document.getElementById('changed28').id = 'twentyeight';
	}
}
function twentynine() {
	if (!(contains(playerBets, "29"))){
		playerBets.push("29");
		document.getElementById("twentynine").id = 'changed29';
	}
	else if (contains(playerBets, "29")) {
		var idx = playerBets.indexOf("29");
		playerBets.splice(idx, 1);
		document.getElementById('changed29').id = 'twentynine';
	}
}
function thirty() {
	if (!(contains(playerBets, "30"))){
		playerBets.push("30");
		document.getElementById("thirty").id = 'changed30';
	}
	else if (contains(playerBets, "30")) {
		var idx = playerBets.indexOf("30");
		playerBets.splice(idx, 1);
		document.getElementById('changed30').id = 'thirty';
	}
}
function thirtyone() {
	if (!(contains(playerBets, "31"))){
		playerBets.push("31");
		document.getElementById("thirtyone").id = 'changed31';
	}
	else if (contains(playerBets, "31")) {
		var idx = playerBets.indexOf("31");
		playerBets.splice(idx, 1);
		document.getElementById('changed31').id = 'thirtyone';
	}
}
function thirtytwo() {
	if (!(contains(playerBets, "32"))){
		playerBets.push("32");
		document.getElementById("thirtytwo").id = 'changed32';
	}
	else if (contains(playerBets, "32")) {
		var idx = playerBets.indexOf("32");
		playerBets.splice(idx, 1);
		document.getElementById('changed32').id = 'thirtytwo';
	}
}
function thirtythree() {
	if (!(contains(playerBets, "33"))){
		playerBets.push("33");
		document.getElementById("thirtythree").id = 'changed33';
	}
	else if (contains(playerBets, "33")) {
		var idx = playerBets.indexOf("33");
		playerBets.splice(idx, 1);
		document.getElementById('changed33').id = 'thirtythree';
	}
}
function thirtyfour() {
	if (!(contains(playerBets, "34"))){
		playerBets.push("34");
		document.getElementById("thirtyfour").id = 'changed34';
	}
	else if (contains(playerBets, "34")) {
		var idx = playerBets.indexOf("34");
		playerBets.splice(idx, 1);
		document.getElementById('changed34').id = 'thirtyfour';
	}
}
function thirtyfive() {
	if (!(contains(playerBets, "35"))){
		playerBets.push("35");
		document.getElementById("thirtyfive").id = 'changed35';
	}
	else if (contains(playerBets, "35")) {
		var idx = playerBets.indexOf("35");
		playerBets.splice(idx, 1);
		document.getElementById('changed35').id = 'thirtyfive';
	}
}
function thirtysix() {
	if (!(contains(playerBets, "36"))){
		playerBets.push("36");
		document.getElementById("thirtysix").id = 'changed36';
	}
	else if (contains(playerBets, "36")) {
		var idx = playerBets.indexOf("36");
		playerBets.splice(idx, 1);
		document.getElementById('changed36').id = 'thirtysix';
	}
}
function black() {
	if (!(contains(playerBets, "Black"))){
		playerBets.push("Black");
		document.getElementById("black").id = 'changedblack';
	}
	else if (contains(playerBets, "Black")) {
		var idx = playerBets.indexOf("Black");
		playerBets.splice(idx, 1);
		document.getElementById('changedblack').id = 'black';
	}
}
function red() {
	if (!(contains(playerBets, "Red"))){
		playerBets.push("Red");
		document.getElementById("red").id = 'changedred';
	}
	else if (contains(playerBets, "Red")) {
		var idx = playerBets.indexOf("Red");
		playerBets.splice(idx, 1);
		document.getElementById('changedred').id = 'red';
	}
}

function contains(arr, element) {
	for (var i = 0 ; i < arr.length ; i++){
		if (arr[i] == element) {
			return true;
		}
	}
	return false;
}

	
// PHOTO PUZZLE
let og_places = [];
var main_image;
(function() {
	var Blank, Puzzle, Tile,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
	Puzzle = (function() {
	  function Puzzle(images) {
		var i, image, t, x, y, _i, _j, _len, _ref,
		  _this = this;
		this.images = images;
		this.changeImage = __bind(this.changeImage, this);
		this.switchTwo = __bind(this.switchTwo, this);
		this.renderBoard = __bind(this.renderBoard, this);
		this.blankPosition = __bind(this.blankPosition, this);
		this.mixup = __bind(this.mixup, this);
	

		this.places = [];
		this.initialPlaces = [];
		_ref = this.images;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  image = _ref[_i];
		  $('#previews').append('<img src="' + image + '" class="mini"/>');
		}
		this.image = this.images[0];
		main_image = this.image;
		$('.mini').bind('click', function(event) {
		  return _this.changeImage(event.target.src);
		});
		for (i = _j = 0; _j <= 7; i = ++_j) {
		  x = Math.floor(i % 3) * 110;
		  y = Math.floor(i / 3) * 110;
		  t = new Tile(i, 110, 110, x, y, this.image);
		  this.places.push(t);
		}
		this.places.push(new Blank(8));
		this.initialPlaces = this.places.slice(0);
		og_places = this.initialPlaces;
		this.mixup();
	  }
	  
  
	  Puzzle.prototype.mixup = function() {
		var blankpos, i, randomNum, _i, _results;
		blankpos = 8;
		_results = [];
		for (i = _i = 0; _i <= 10; i = ++_i) {
		  randomNum = Math.floor(Math.random() * 9);
		  this.switchTwo(randomNum, blankpos);
		  _results.push(blankpos = randomNum);
		}
		return _results;
	  };

	
	  Puzzle.prototype.blankPosition = function() {
		var place, pos, _i, _len, _ref;
		_ref = this.places;
		for (pos = _i = 0, _len = _ref.length; _i < _len; pos = ++_i) {
		  place = _ref[pos];
		  if (place["class"] === 'Blank') {
			return pos;
		  }
		}
	  };
  
	  Puzzle.prototype.renderBoard = function() {
		var blank, t, _i, _len, _ref,
		  _this = this;
		blank = this.blankPosition();
		$('#canvas1').html('');
		_ref = this.places;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			t = _ref[_i];
			t.show(blank);
		}
		return $('.clickable').bind('click', function(event) {
			var toSwitch;
			toSwitch = parseInt(event.target.id);
			return _this.switchTwo(toSwitch, _this.blankPosition());
		});
		
	  };
  
	  Puzzle.prototype.switchTwo = function(pos1, pos2) {
		var x, y;
		x = this.places[pos1];
		y = this.places[pos2];
		this.places[pos2] = x;
		this.places[pos1] = y;
		this.places[pos2].position = pos2;
		return this.renderBoard();
	  };
  
	  Puzzle.prototype.changeImage = function(image) {
		var panel, _i, _len, _ref;
		this.image = image;
		main_image = this.image;
		_ref = this.places;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  panel = _ref[_i];
		  if (panel["class"] !== 'Blank') {
			panel.image = image;
		  }
		}
		return this.renderBoard();
	  };
  
	  return Puzzle;
  
	})();
	
  
	Tile = (function() {
	  function Tile(position, width, height, x, y, image) {
		this.position = position;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.image = image;
		this["class"] = 'Tile';
	  }
  
	  Tile.prototype.show = function(blankPosition) {
		if (this.isAdjacent(blankPosition)) {
		  $('#canvas1').append('<div id="' + this.position + '" class="innerSquare imageSquare clickable"></div>');
		} else {
		  $('#canvas1').append('<div id="' + this.position + '" class="innerSquare imageSquare"></div>');
		}
		$("#" + this.position).css('background-position', '-' + this.x + 'px -' + this.y + 'px');
		return $("#" + this.position).css('background-image', 'url(' + this.image + ')');
	  };
  
	  Tile.prototype.isAdjacent = function(blanksPosition) {
		if (blanksPosition - 1 === this.position && (blanksPosition % 3) > 0 || blanksPosition + 1 === this.position && (blanksPosition % 3) < 2 || blanksPosition + 3 === this.position && (blanksPosition / 3) < 2 || blanksPosition - 3 === this.position && (blanksPosition / 3) > 0) {
		  return true;
		}
		return false;
	  };
  
	  Tile.prototype.setImage = function(image) {
		return this.image = image;
		main_image = image;
	  };
  
	  return Tile;
  
	})();
  
	Blank = (function() {
	  function Blank(position) {
		this.position = position;
		this["class"] = 'Blank';
	  }
  
	  Blank.prototype.show = function() {
		return $('#canvas1').append('<div class="innerSquare blank"></div>');
	  };
  
	  return Blank;
  
	})();
  
	$(document).ready(function() {
	  var imgs, puzzle;
	  imgs = ["images/Bijan.JPG", 'images/milo1.jpeg', 'images/milo2.jpeg', 'images/patrick.jpeg'];
	  return puzzle = new Puzzle(imgs);
	});
	
	
  }).call(this);

  function revert() {
	var Blank, Puzzle, Tile,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
	Puzzle = (function() {
	  function Puzzle(images) {
		var i, image, t, x, y, _i, _j, _len, _ref,
		  _this = this;
		this.images = images;
		this.changeImage = __bind(this.changeImage, this);
		this.switchTwo = __bind(this.switchTwo, this);
		this.renderBoard = __bind(this.renderBoard, this);
		this.blankPosition = __bind(this.blankPosition, this);
		this.mixup = __bind(this.mixup, this);
	

		this.places = [];
		this.initialPlaces = [];
		_ref = this.images;
		
		this.image = main_image;
		$('.mini').bind('click', function(event) {
		  return _this.changeImage(event.target.src);
		});
		for (i = _j = 0; _j <= 7; i = ++_j) {
		  x = Math.floor(i % 3) * 110;
		  y = Math.floor(i / 3) * 110;
		  t = new Tile(i, 110, 110, x, y, this.image);
		  this.places.push(t);
		}
		this.places.push(new Blank(8));
		this.initialPlaces = og_places;
		this.renderBoard();
	  }
	  
  
	  Puzzle.prototype.mixup = function() {
		var blankpos, i, randomNum, _i, _results;
		blankpos = 8;
		_results = [];
		for (i = _i = 0; _i <= 10; i = ++_i) {
		  randomNum = Math.floor(Math.random() * 9);
		  this.switchTwo(randomNum, blankpos);
		  _results.push(blankpos = randomNum);
		}
		return _results;
	  };

	
  
	  Puzzle.prototype.blankPosition = function() {
		var place, pos, _i, _len, _ref;
		_ref = this.places;
		for (pos = _i = 0, _len = _ref.length; _i < _len; pos = ++_i) {
		  place = _ref[pos];
		  if (place["class"] === 'Blank') {
			return pos;
		  }
		}
	  };
  
	  Puzzle.prototype.renderBoard = function() {
		var blank, t, _i, _len, _ref,
		  _this = this;
		blank = this.blankPosition();
		$('#canvas1').html('');
		_ref = this.places;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			t = _ref[_i];
			t.show(blank);
		}
		return $('.clickable').bind('click', function(event) {
			var toSwitch;
			toSwitch = parseInt(event.target.id);
			return _this.switchTwo(toSwitch, _this.blankPosition());
		  });
		
	  };
  
	  Puzzle.prototype.switchTwo = function(pos1, pos2) {
		var x, y;
		x = this.places[pos1];
		y = this.places[pos2];
		this.places[pos2] = x;
		this.places[pos1] = y;
		this.places[pos2].position = pos2;
		return this.renderBoard();
	  };
  
	  Puzzle.prototype.changeImage = function(image) {
		var panel, _i, _len, _ref;
		this.image = image;
		_ref = this.places;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  panel = _ref[_i];
		  if (panel["class"] !== 'Blank') {
			panel.image = image;
		  }
		}
		return this.renderBoard();
	  };
  
	  return Puzzle;
  
	})();
	
  
	Tile = (function() {
	  function Tile(position, width, height, x, y, image) {
		this.position = position;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.image = image;
		this["class"] = 'Tile';
	  }
  
	  Tile.prototype.show = function(blankPosition) {
		if (this.isAdjacent(blankPosition)) {
		  $('#canvas1').append('<div id="' + this.position + '" class="innerSquare imageSquare clickable"></div>');
		} else {
		  $('#canvas1').append('<div id="' + this.position + '" class="innerSquare imageSquare"></div>');
		}
		$("#" + this.position).css('background-position', '-' + this.x + 'px -' + this.y + 'px');
		return $("#" + this.position).css('background-image', 'url(' + this.image + ')');
	  };
  
	  Tile.prototype.isAdjacent = function(blanksPosition) {
		if (blanksPosition - 1 === this.position && (blanksPosition % 3) > 0 || blanksPosition + 1 === this.position && (blanksPosition % 3) < 2 || blanksPosition + 3 === this.position && (blanksPosition / 3) < 2 || blanksPosition - 3 === this.position && (blanksPosition / 3) > 0) {
		  return true;
		}
		return false;
	  };
  
	  Tile.prototype.setImage = function(image) {
		return this.image = image;
	  };
  
	  return Tile;
  
	})();
  
	Blank = (function() {
	  function Blank(position) {
		this.position = position;
		this["class"] = 'Blank';
	  }
  
	  Blank.prototype.show = function() {
		return $('#canvas1').append('<div class="innerSquare blank"></div>');
	  };
  
	  return Blank;
  
	})();
  
	$(document).ready(function() {
	  var imgs, puzzle;
	  imgs = ["images/Bijan.JPG", 'images/milo1.jpeg', 'images/milo2.jpeg', 'images/patrick.jpeg'];
	  return puzzle = new Puzzle(imgs);
	});
	
	
  }
  
  function scramble() {
	var Blank, Puzzle, Tile,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
	Puzzle = (function() {
	  function Puzzle(images) {
		var i, image, t, x, y, _i, _j, _len, _ref,
		  _this = this;
		this.images = images;
		this.changeImage = __bind(this.changeImage, this);
		this.switchTwo = __bind(this.switchTwo, this);
		this.renderBoard = __bind(this.renderBoard, this);
		this.blankPosition = __bind(this.blankPosition, this);
		this.mixup = __bind(this.mixup, this);
	

		this.places = [];
		this.initialPlaces = [];
		_ref = this.images;
		this.image = main_image;
		$('.mini').bind('click', function(event) {
		  return _this.changeImage(event.target.src);
		});
		for (i = _j = 0; _j <= 7; i = ++_j) {
		  x = Math.floor(i % 3) * 110;
		  y = Math.floor(i / 3) * 110;
		  t = new Tile(i, 110, 110, x, y, this.image);
		  this.places.push(t);
		}
		this.places.push(new Blank(8));
		this.initialPlaces = this.places.slice(0);
		this.mixup();
	  }
	  
  
	  Puzzle.prototype.mixup = function() {
		var blankpos, i, randomNum, _i, _results;
		blankpos = 8;
		_results = [];
		for (i = _i = 0; _i <= 10; i = ++_i) {
		  randomNum = Math.floor(Math.random() * 9);
		  this.switchTwo(randomNum, blankpos);
		  _results.push(blankpos = randomNum);
		}
		return _results;
	  };

	
  
	
	  Puzzle.prototype.blankPosition = function() {
		var place, pos, _i, _len, _ref;
		_ref = this.places;
		for (pos = _i = 0, _len = _ref.length; _i < _len; pos = ++_i) {
		  place = _ref[pos];
		  if (place["class"] === 'Blank') {
			return pos;
		  }
		}
	  };
  
	  Puzzle.prototype.renderBoard = function() {
		var blank, t, _i, _len, _ref,
		  _this = this;
		blank = this.blankPosition();
		$('#canvas1').html('');
		_ref = this.places;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			t = _ref[_i];
			t.show(blank);
		}
		return $('.clickable').bind('click', function(event) {
			var toSwitch;
			toSwitch = parseInt(event.target.id);
			return _this.switchTwo(toSwitch, _this.blankPosition());
		});
	  };
  
	  Puzzle.prototype.switchTwo = function(pos1, pos2) {
		var x, y;
		x = this.places[pos1];
		y = this.places[pos2];
		this.places[pos2] = x;
		this.places[pos1] = y;
		this.places[pos2].position = pos2;
		return this.renderBoard();
	  };
  
	  Puzzle.prototype.changeImage = function(image) {
		var panel, _i, _len, _ref;
		this.image = image;
		_ref = this.places;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  panel = _ref[_i];
		  if (panel["class"] !== 'Blank') {
			panel.image = image;
		  }
		}
		return this.renderBoard();
	  };
  
	  return Puzzle;
  
	})();
	
  
	Tile = (function() {
	  function Tile(position, width, height, x, y, image) {
		this.position = position;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.image = image;
		this["class"] = 'Tile';
	  }
  
	  Tile.prototype.show = function(blankPosition) {
		if (this.isAdjacent(blankPosition)) {
		  $('#canvas1').append('<div id="' + this.position + '" class="innerSquare imageSquare clickable"></div>');
		} else {
		  $('#canvas1').append('<div id="' + this.position + '" class="innerSquare imageSquare"></div>');
		}
		$("#" + this.position).css('background-position', '-' + this.x + 'px -' + this.y + 'px');
		return $("#" + this.position).css('background-image', 'url(' + this.image + ')');
	  };
  
	  Tile.prototype.isAdjacent = function(blanksPosition) {
		if (blanksPosition - 1 === this.position && (blanksPosition % 3) > 0 || blanksPosition + 1 === this.position && (blanksPosition % 3) < 2 || blanksPosition + 3 === this.position && (blanksPosition / 3) < 2 || blanksPosition - 3 === this.position && (blanksPosition / 3) > 0) {
		  return true;
		}
		return false;
	  };
  
	  Tile.prototype.setImage = function(image) {
		return this.image = image;
	  };
  
	  return Tile;
  
	})();
  
	Blank = (function() {
	  function Blank(position) {
		this.position = position;
		this["class"] = 'Blank';
	  }
  
	  Blank.prototype.show = function() {
		return $('#canvas1').append('<div class="innerSquare blank"></div>');
	  };
  
	  return Blank;
  
	})();
  
	$(document).ready(function() {
	  var imgs, puzzle;
	  imgs = ["images/Bijan.JPG", 'images/milo1.jpeg', 'images/milo2.jpeg', 'images/patrick.jpeg'];
	  return puzzle = new Puzzle(imgs);
	});
	
	
  }



  
