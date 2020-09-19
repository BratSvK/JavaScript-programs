const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

// modes
const MODE_ATTACK = "ATTACK"; // MODE ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

// events for log
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = parseInt(prompt("Maximum life for you and the monster", "100"));

let chosenMaxlife = enteredValue;

//ak input nieje number tak nastav deafault value
if (isNaN(chosenMaxlife) || chosenMaxlife <= 0) {
  chosenMaxlife = 100;
}

let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxlife);

function writeToLog(_event, _value, _monsterHealth, _playerHealth) {
  let logEntry = {
    event: _event,
    value: _value,
    finalMonsterHealth: _monsterHealth,
    finalPlayerHealth: _playerHealth,
  };
  if (_event === LOG_EVENT_PLAYER_ATTACK) {
    // MORE DYNAMIC AND SHORTER
    logEntry.target = "MONSTER";
  } else if (_event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    // EASIER TO READ
    logEntry = {
      event: _event,
      value: _value,
      target: "Monster",
      finalMonsterHealth: _monsterHealth,
      finalPlayerHealth: _playerHealth,
    };
  } else if (_event === LOG_EVENT_MONSTER_ATACK) {
    logEntry = {
      event: _event,
      value: _value,
      target: "Player",
      finalMonsterHealth: _monsterHealth,
      finalPlayerHealth: _playerHealth,
    };
  } else if (_event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: _event,
      value: _value,
      target: "Player",
      finalMonsterHealth: _monsterHealth,
      finalPlayerHealth: _playerHealth,
    };
  } else if (_event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: _event,
      value: _value,
      finalMonsterHealth: _monsterHealth,
      finalPlayerHealth: _playerHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  let currentMonsterHealth = chosenMaxlife;
  let currentPlayerHealth = chosenMaxlife;
  resetGame(chosenMaxlife);
}

function endRound() {
  const initialPlayerLife = currentPlayerHealth;
  const damageFromMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageFromMonster;
  // zapis logu po utoku na hraca od monstra
  writeToLog(LOG_EVENT_MONSTER_ATACK, damageFromMonster, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    // bonus health
    currentPlayerHealth = initialPlayerLife;
    alert("You would be death but you bonus life saved you!");
    setPlayerHealth(initialPlayerLife);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(LOG_EVENT_GAME_OVER, "PLAYER WON", currentMonsterHealth, currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    writeToLog(LOG_EVENT_GAME_OVER, "MONSTER WON", currentMonsterHealth, currentPlayerHealth);
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("you have a draw!!");
    writeToLog(LOG_EVENT_GAME_OVER, "DRAW", currentMonsterHealth, currentPlayerHealth);
  }

  // reset a game
  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}
// utok na montrtrum v akom mode bude
function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  // mame len dva mody takze moze byt aj else
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damageFromPlayer = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damageFromPlayer;
  writeToLog(logEvent, damageFromPlayer, currentMonsterHealth, currentPlayerHealth);
  // monster attacks us
  endRound();
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxlife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health");
    healValue = chosenMaxlife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
  // monster attacks us and check win
  endRound();
}
function printLogHandler() {
  console.log(battleLog);
}

// make function on buttons
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
