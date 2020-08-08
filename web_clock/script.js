function startTime(gmt) {
    let today = new Date();
    //gmt = '+05:30'
    let timenow = gmt_add(today, gmt)
    document.getElementById('txt').innerHTML = timenow;
};

function gmt_add(today, gmt) {
    let gmt_op = gmt[0];
    let gmt_h = parseInt(gmt.split(':')[0].slice(1))
    let gmt_m = parseInt(gmt.split(':')[1])

    let h = today.getHours();
    let m = today.getMinutes();
    let s = checkTime(today.getSeconds());

    if (gmt_op == '+') {
        h = (h + gmt_h) % 12;
        m = m + gmt_m;
        if (m >= 60) {
            h = checkTime(h + parseInt(m / 60));
            m = checkTime(m % 60);
        } else {
            h = checkTime(h);
            m = checkTime(m);
        }
    } else if (gmt_op == '-') {
        h = checkTime((h - gmt_h) % 12);
        m = checkTime(m - gmt_m);
    }

    return h + ':' + m + ':' + s;
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

function gmtUpdate() {
    let gmt = document.getElementById("gmt").innerHTML.split(' ')[1];
    startTime(gmt)
    let t = setTimeout(gmtUpdate, 500);
}

function gmtIncrease() {
    let gmt = document.getElementById("gmt").innerHTML.split(' ')[1];
    let gmt1 = gmt.split(':')[0].slice(0,1);
    let gmt_h = parseInt(gmt.split(':')[0].slice(1));
    let gmt_m = parseInt(gmt.split(':')[1]);
    if (gmt_h < 12) {
        if (gmt_m == 30) {
            gmt_m = 0;
            gmt_h++;
        } else if (gmt_m == 0) {
            gmt_m+=30;
        }
    }
    gmt_h = checkTime(gmt_h);
    gmt_m = checkTime(gmt_m);
    document.getElementById('gmt').innerHTML = 'GMT ' + gmt1 + gmt_h + ':' + gmt_m;
    gmtUpdate()
}

function gmtDecrease() {
    let gmt = document.getElementById("gmt").innerHTML.split(' ')[1];
    let gmt1 = gmt.split(':')[0].slice(0,1);
    let gmt_h = parseInt(gmt.split(':')[0].slice(1));
    let gmt_m = parseInt(gmt.split(':')[1]);
    if (gmt_h != 0 || gmt_m != 0) {
        if (gmt_m == 30) {
            gmt_m = 0;
        } else if (gmt_m == 0) {
            gmt_m = 30;
            gmt_h--;
        }
    }
    let c = 0;
    if (gmt_h < 0) {
        gmt_h = gmt_h + -2*gmt_h;
        c = 1;
    }
    gmt_h = checkTime(gmt_h);
    gmt_m = checkTime(gmt_m);
    if (c == 1) {
        gmt_h = '-' + gmt_h;
    }
    document.getElementById('gmt').innerHTML = 'GMT ' + gmt1 + gmt_h + ':' + gmt_m;
    gmtUpdate()
}