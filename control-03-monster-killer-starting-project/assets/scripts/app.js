const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxlife = 100;
let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;

adjustHealthBars(chosenMaxlife);

function attackHandler() {
  const damageFromPlayer = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damageFromPlayer;
  // monster attacks us
  const damageFromMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageFromMonster;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
      alert("you have a draw!!");
  }
}

attackBtn.addEventListener("click", attackHandler);
