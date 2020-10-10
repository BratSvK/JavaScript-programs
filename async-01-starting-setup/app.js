const button = document.querySelector("button");
const output = document.querySelector("p");

//how promises works internally
const setTimer = (duration) => {
  // build a new promise
  const promise = new Promise((resolve, reject) => {
    //we can define what should happened
    setTimeout(() => {
      resolve("Done");
    }, duration);
  });
  return promise;
};

const getPosition = (opts) => {
  //wrap it to the prosime
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success); // we will get the data later
      },
      (error) => {
        reject(error); // mark promise as failed
      },
      opts
    ); // callbacks
  });
  return promise;
};

//return a promise with async
async function trackUserHandler() {
  // get user location
  // let positionData;

  let posData;
  let timerData;

  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }

  console.log(posData, timerData);

  //------------------------------------------THEN CATCH BLOCKS
  // .then(
  //   (posData) => {
  //     positionData = posData;
  //     return setTimer(2000); // overall promise is setback to been pending
  //   }
  // )
  // .catch((err) => {
  //   console.log(err);
  // })
  // .then((data) => {
  //   console.log(data, positionData);
  // });

  // go first
  // setTimer(1000).then((data) => {
  //   console.log("Timer done");
  // });

  // console.log("Getting position...");
}

// browser hellp me dont block main thread
button.addEventListener("click", trackUserHandler);
// let result = 0;

// for (let i = 0; i < 1000000; i++) {
//   result += i;
// }
// console.log(result);
