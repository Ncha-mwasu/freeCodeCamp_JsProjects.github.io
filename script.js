//Declaring starting stats
let xp = 0
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

/* This gets a button by its css styling tag (id/class) 
and saves it up a variable to apply changes later on*/
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");

const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

/*Weapons arsenal (an object storing the weapon and its
destructive power)*/
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

/*Monster den (an object storing the monsters, their level and health
 level serves as destructive power)*/
const monsters = [
  {name: "slime",
  level: 2,
  health: 15
  },
  {name: "fanged beast",
  level: 8,
  health: 60
  },
  {name: "dragon",
  level: 20,
  health: 300
  }];

  /*Gaming locations: An array of objects storing the various locations
  and others operations.
  ~ name: gives the location's name or the operation name.
  ~ button text: this stores the text for the buttons in each location or for each
  operation in an array.
  ~ button functions: store in an array the operations to be carried out when each button is clicked.
  ~ text: this is the display text for each location / operation.
  */
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
   "button text": ["Attack", "Dodge", "Run"],
   "button functions": [attack, dodge, goTown],
   text: "You are fighting a monster."
 },
 {
  name: "kill monster",
 "button text": ["Go to town square", "Go to town square", "Go to town square"],
 "button functions": [goTown, goTown, easterEgg],
 text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
},
{
  name: "lose",
 "button text": ["REPLAY?", "REPLAY?", "Quit"],
 "button functions": [restart, restart, goTown],
 text: "You die. &#x2620;"
},
{
  name: "win",
  "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
  "button functions": [restart, restart, restart],
  text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
},
{
name: "easter egg",
  "button text": ["2", "8", "Go to town square?"],
  "button functions": [pickTwo, pickEight, goTown],
  text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
}
];

/* Button initialization: this assigns the base or the starting 
buttons with the function / operations to work with*/
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

/* ~ Update: This takes a parameter which is the locations object and 
assigns the buttons new text for each location as stored in the array,
assigns also the function(as in the object) of the button when clicked 
and also changes the display text*/
function update(location) {
  monsterStats.style.display = "none";

  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  
  text.innerHTML = location.text;
}

/* ~ goTown: This is the operation of the "Go to town button" and calls the
update function while passing the first object of the location's array.

~ Action: This button takes you to the town square.
*/
function goTown() {
  update(locations[0]);
}

/* ~ goStore: This is the operation of the "Go to store" button and calls the
update function while passing the second object of the location's array.

~ Action: This button takes you to the store.
*/
function goStore() {
  update(locations[1]);
}

/* ~ goStore: This is the operation of the "Go to cave" button and calls the
update function while passing the third object of the location's array.

~ Action: This button takes you to the cave of the slime and
the fanged beast.
*/
function goCave() {
  update(locations[2]);
}


/* ~ buyHealth: This allows one to buy health with their gold.
*/
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// buyWeapon: This allows one to buy (a) weapon(s) with their gold.
// giving also the option to sell their weapons
function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } 
    else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } 
  else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

/* sellWeapon: This allows the player to sell their weapons but
not their last*/
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  }
  else  {
    text.innerText = "Don't sell your only weapon!"
  }
}

/*The functions fightSlime, fightBeast and fightDragon
are the functions called for each of their respective button
indicating the monsters's index and the calling of the goFight function.
*/
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

/* goFight: This is the function that fights the beast providing the
options to attack, dodge or run.
This also displays the monsters name and health*/
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
}

/* attack: This is the attack option that fights the beast with the
available weapon.
This function shows the monster's attack, the players attack the effect
on their health and whether or not the player wins.
*/
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  // Condition for weapon to break and be lost in battle
  if (Math.random() <= .1 && (inventory.length !== 1)) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeaponIndex--;
  }
}

/* 
  isMonsterHit: Determines if the attack hits the monster or not
*/
function isMonsterHit(){
  return Math.random() > .2 || health < 20;
}

/* dodge: allows the player to dodge an attack from the monster
*/
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

/* defeatMonster: This adds to the players health a bonus and gives
them xp
*/
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;

  goldText.innerText = gold;
  xpText.innerText = xp;

  update(locations[4]);
}

/* lose: This displays a lost message with the option to replay or 
quit
*/
function lose(){
  update(locations[5]);
}

/* restart: This allows the player to restart and start at the base
*/
function restart(){
  xp = 0;
  health = 100;
  gold = 50;

  currentWeaponIndex = 0;
  inventory = ["stick"];

  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;

  goTown();
}

/* getMonsterAttackValue: This determines the monster's attack value,
taking their level
*/
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
  }

  /* easterEgg: this function gives the player a surprise boost 
  after killing the monster*/
  function easterEgg() {
    update(locations[7]);
  }
  

  /*~ pick: This function takes a guessed numbers either 2/8
  and checks it against a list of randomly generated numbers 
  from 1-11 to give a surprise gold boost for a good guess
  an a decrease in health for a bad guess
  */
  function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    }
    else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose();
    }
  }
}

  function pickTwo(){
    pick(2);
  }
  
  function pickEight(){
    pick(8);
  }
