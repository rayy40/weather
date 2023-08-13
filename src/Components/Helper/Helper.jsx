export const Icons = (id, shift) => {
  if (id === 200) {
    return 12;
  } else if (id === 210 || id === 211) {
    return 34;
  } else if (id === 221 || id === 771 || id === 781 || id === 762) {
    return 29;
  } else if (id === 201 || id === 202) {
    return 17;
  } else if (id === 230 || id === 231 || id === 232) {
    return 24;
  } else if (shift === "09d" && (id === 313 || id === 314 || id === 321)) {
    return 22;
  } else if (shift === "09n" && (id === 313 || id === 314 || id === 321)) {
    return 21;
  } else if (id === 300 || id === 301 || id === 302) {
    return 7;
  } else if (id === 310 || id === 311 || id === 312) {
    return 5;
  } else if (shift === "10d" && id >= 500 && id <= 503) {
    return 8;
  } else if (shift === "10n" && id >= 500 && id <= 503) {
    return 1;
  } else if (id === 504 || id === 511) {
    return 13;
  } else if (
    shift === "09d" &&
    (id === 520 || id === 521 || id === 522 || id === 531)
  ) {
    return 16;
  } else if (
    shift === "09n" &&
    (id === 520 || id === 521 || id === 522 || id === 531)
  ) {
    return 20;
  } else if (id === 615 || id === 616 || id === 620 || id === 212) {
    return 28;
  } else if (id === 600 || id === 601 || id === 602) {
    return 36;
  } else if (id === 611 || id === 612 || id === 613) {
    return 23;
  } else if (id === 621 || id === 622) {
    return 18;
  } else if (shift === "50d" && (id === 701 || id === 711 || id === 721)) {
    return 4;
  } else if (shift === "50n" && (id === 701 || id === 711 || id === 721)) {
    return 14;
  } else if (
    shift === "50d" &&
    (id === 731 || id === 741 || id === 751 || id === 761)
  ) {
    return 6;
  } else if (
    shift === "50n" &&
    (id === 731 || id === 741 || id === 751 || id === 761)
  ) {
    return 2.2;
  } else if (shift === "03d" || shift === "04d") {
    return 35;
  } else if (shift === "03n" || shift === "04n") {
    return 31;
  } else if (shift === "02d") {
    return 27;
  } else if (shift === "02n") {
    return 15;
  } else if (shift === "01d") {
    return 26;
  } else if (shift === "01n") {
    return 10;
  }
};

export const convertKtoC = (temp) => {
  return Math.round(temp - 273.15);
};

export const convertTimeFormat = (timestamp, zone) => {
  const moment = require("moment-timezone");
  const time = moment
    .unix(timestamp)
    .tz(zone)
    .format()
    .split("T")[1]
    .split("+")[0];
  const hour = parseInt(time.split(":")[0]);
  const suffix = hour >= 12 ? "PM" : "AM";
  return ((hour + 11) % 12) + 1 + ":" + time.split(":")[1] + " " + suffix;
};

export const convertTimestamptoWeekday = (timestamp) => {
  var d = new Date(timestamp * 1000),
    day = d.getDay();

  if (day === 0) {
    day = "Sunday";
  }
  if (day === 1) {
    day = "Monday";
  }
  if (day === 2) {
    day = "Tuesday";
  }
  if (day === 3) {
    day = "Wednesday";
  }
  if (day === 4) {
    day = "Thursday";
  }
  if (day === 5) {
    day = "Friday";
  }
  if (day === 6) {
    day = "Saturday";
  }

  return day;
};

export const showUviDescription = (range) => {
  if (range >= 0 && range < 3) {
    return "Minimal";
  } else if (range >= 3 && range < 5) {
    return "Low";
  } else if (range >= 5 && range < 7) {
    return "Moderate";
  } else if (range >= 7 && range < 10) {
    return "High";
  } else if (range > 10) {
    return "Very High";
  }
};

export const showVisibilityDescription = (range) => {
  if (range <= 0.03) {
    return "Dense fog";
  } else if (range > 0.03 && range <= 0.2) {
    return "Moderate fog";
  } else if (range > 0.2 && range <= 0.5) {
    return "Light fog";
  } else if (range > 0.5 && range <= 1) {
    return "Very light fog";
  } else if (range > 1 && range <= 2) {
    return "Light mist";
  } else if (range > 2 && range <= 5) {
    return "Very light mist";
  } else if (range > 5 && range <= 10) {
    return "Clear air";
  } else if (range > 10) {
    return "Very clear air";
  }
};

export const showHumidityDescription = (range) => {
  if (range <= 55) {
    return "Dry and comfortable weather";
  } else if (range > 55 && range < 65) {
    return "Weather becoming sticky with muggy evenings";
  } else if (range >= 65) {
    return "Lots of moisture in the air, weather becoming oppressive";
  }
};

export const showWindDescription = (range) => {
  if (range < 1) {
    return "Calm";
  } else if (range >= 1 && range < 4) {
    return "Light Air";
  } else if (range >= 4 && range < 8) {
    return "Light Breeze";
  } else if (range >= 8 && range < 13) {
    return "Gentle Breeze";
  } else if (range >= 13 && range < 19) {
    return "Moderate Breeze";
  } else if (range >= 19 && range < 25) {
    return "Fresh Breeze";
  } else if (range >= 25 && range < 32) {
    return "Strong Breeze";
  } else if (range >= 32 && range < 39) {
    return "Near Gale";
  } else if (range >= 39 && range < 47) {
    return "Gale";
  } else if (range >= 47 && range < 54) {
    return "Strong Gale";
  } else if (range >= 55 && range < 64) {
    return "Whole Gale";
  } else if (range >= 64 && range < 75) {
    return "Storm Force";
  } else if (range >= 75) {
    return "Hurricane Force";
  }
};

export const degToCompass = (num) => {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const showPressureDescription = (range) => {
  if (range >= 30) {
    return "Sunny weather";
  } else if (range < 30) {
    return "Stormy weather";
  }
};
