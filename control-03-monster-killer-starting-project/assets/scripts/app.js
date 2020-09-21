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

function getMaxLifeValues() {
  const enteredValue = prompt("Maximum life for you and the monster", "100");

  const parsedValue = parseInt(enteredValue);

  //ak input nieje number tak nastav deafault value
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Input isnt a number" };
  }
  return parsedValue;
}
let chosenMaxlife;
try {
  chosenMaxlife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxlife = 100;
}

let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasBonusLife = true;
let battleLog = [];
let lastLoggedEntry;

adjustHealthBars(chosenMaxlife);

function writeToLog(_event, _value, _monsterHealth, _playerHealth) {
  let logEntry = {
    event: _event,
    value: _value,
    finalMonsterHealth: _monsterHealth,
    finalPlayerHealth: _playerHealth,
  };

  switch (_event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break; // jump out of switch
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: _event,
        value: _value,
        target: "Monster",
        finalMonsterHealth: _monsterHealth,
        finalPlayerHealth: _playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATACK:
      logEntry = {
        event: _event,
        value: _value,
        target: "Player",
        finalMonsterHealth: _monsterHealth,
        finalPlayerHealth: _playerHealth,
      };
      break;

    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: _event,
        value: _value,
        target: "Player",
        finalMonsterHealth: _monsterHealth,
        finalPlayerHealth: _playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: _event,
        value: _value,
        finalMonsterHealth: _monsterHealth,
        finalPlayerHealth: _playerHealth,
      };
      break;

    default:
      break;
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
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE; // ternary operator
  const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // mame len dva mody takze moze byt aj else
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }
  // using ternary operator instead

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
  for (let index = 0; index < battleLog.length; index++) {
    console.log("---------------------------------");
  }

  let counter = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry === counter) {
      console.log(`#${counter}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = counter;
      break;
    }
    counter++;
  }

  console.log(battleLog);
}

// make function on buttons
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
