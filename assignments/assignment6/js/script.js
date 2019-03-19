

let vowels = ['A','E','I','O','U'];
let vowelsLower = ['a','e','i','o','u'];

$(document).ready(function() {

  $.getJSON('data/data.json', gotData);
});

function gotData(data) {

  let condiment = getRandomElement(data.condiments);

  let verb = 'is';

  if (condiment.charAt(condiment.length - 1) === 's') {

    verb = 'are';
  }


  let cat = getRandomElement(data.cats);

  let catPreposition = 'a';

  for(let i = 0; i < vowels.length; i++){
    if (cat.charAt(0) === vowels[i]){
      catPreposition = 'an';
    }
  }

  let cancer = getRandomElement(data.cancers);

    let cancerPreposition = 'a';

    for(let i = 0; i < vowelsLower.length; i++){
      if (cancer.charAt(0) === vowelsLower[i]){
        cancerPreposition = 'an';
      }
    }

  let room = getRandomElement(data.rooms);

  let roomPreposition = 'a';

  for(let i = 0; i < vowelsLower.length; i++){
    if (room.charAt(0) === vowelsLower[i]){
      roomPreposition = 'an';
    }
  }

  let description = `${condiment} ${verb} like ${catPreposition} ${cat} inflicted with ${cancerPreposition} ${cancer} in ${roomPreposition} ${room}.`;

  $('body').append(description);

  $('html').on("click",function(){
    location.reload()
  });
}


function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
