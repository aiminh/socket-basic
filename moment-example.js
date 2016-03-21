var moment = require('moment');


var now = moment();


// console.log(now.format());

// now.subtract(1, 'month');
// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));
// console.log(now.valueOf());

// console.log(now.format('MMM Do YYYY, h:mma'));


var timeStamp = 1456029234587;
var timeStampMoment = moment.utc(timeStamp); //utc will convert time to local time



console.log(timeStampMoment.format());

console.log(timeStampMoment.local().format('h:mm a'));
