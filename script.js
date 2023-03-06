
document.getElementById("quds").addEventListener("click", function () {
  getPrayerTime(
    "http://api.aladhan.com/v1/timingsByCity?country=PS&city=jerusalem"
  );
});
document.getElementById("cairo").addEventListener("click", function () {
  getPrayerTime(
    "http://api.aladhan.com/v1/timingsByCity?country=EG&city=Cairo"
  );
});
document.getElementById("amman").addEventListener("click", function () {
  getPrayerTime(
    "http://api.aladhan.com/v1/timingsByCity?country=JO&city=amman"
  );
});

document.getElementById("gaza").addEventListener("click", function () {
    getPrayerTime(
      "http://api.aladhan.com/v1/timingsByCity?country=PS&city=gaza"
    );
  });

function getPrayerTime(link) {
  axios.get(link).then((response) => {
    let times = response.data.data.timings;

    document.getElementsByClassName("time")[0].innerHTML = formatTime(
      times.Fajr
    );
    document.getElementsByClassName("time")[1].innerHTML = formatTime(
      times.Sunrise
    );
    document.getElementsByClassName("time")[2].innerHTML = formatTime(
      times.Dhuhr
    );
    document.getElementsByClassName("time")[3].innerHTML = formatTime(
      times.Asr
    );
    document.getElementsByClassName("time")[4].innerHTML = formatTime(
      times.Maghrib
    );
    document.getElementsByClassName("time")[5].innerHTML = formatTime(
      times.Isha
    );

    let nearestPrayerTime = getNearestPrayerTime([
      times.Fajr[0] + times.Fajr[1],
      times.Sunrise[0] + times.Sunrise[1],
      times.Dhuhr[0] + times.Dhuhr[1],
      times.Asr[0] + times.Asr[1],
      times.Maghrib[0] + times.Maghrib[1],
      times.Isha[0] + times.Isha[1],
    ]);
    document.getElementsByClassName("salah")[
      nearestPrayerTime
    ].style.border = "5px solid red";
  });
}

function formatTime(hour) {
  newHour = hour[0] + hour[1];
  if (newHour > 12) {
    return newHour - 12 + hour[2] + hour[3] + hour[4];
  } else return hour;
}

function getNearestPrayerTime(prayerTime) {
  let hour = new Date().getHours();
  let times = prayerTime.map(Number);
  times.push(hour);
  times.sort(function (a, b) {
    return a - b;
  });
  if (hour == times[6]) return 0;
  else return times.indexOf(hour);
}

getPrayerTime(
  "http://api.aladhan.com/v1/timingsByCity?country=PS&city=jerusalem"
);
