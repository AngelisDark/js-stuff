const time = require('ntp-time-sync').default.getInstance();

time.getTime().then(function (result) {
    let times = result
    let timeNow = JSON.stringify(result.now).split('T')[1];
    let currentTime = timeNow.split('.')[0];
    console.log(currentTime);
});
