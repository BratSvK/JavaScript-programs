const task3Element = document.getElementById("task-3");

function showAlertWithouParameter() {
  alert("Ahoj ako sa mas ?");
}

function showAlertWithParameter(retazec) {
  alert(retazec);
}

// callling 2 funcitons above

showAlertWithouParameter();
showAlertWithParameter("Ale celkom fajn, Gajdy");

// add eventListener for click
task3Element.addEventListener('click', showAlertWithouParameter);

function concatStrings(string1, string2, string3){
    const fullString = `${string1}, ${string2}, ${string3}`;
    return fullString;
}

const combineString = concatStrings('Martin','Peter', 'Pavol');
alert(combineString);