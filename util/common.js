import moment from "moment-jalaali";

export const sepratePrice = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPersianDate = date => {
  return moment(date, "YYYY/M/D").format("jD jMMMM jYY");
};

export const abbrNum = (number, decPlaces) => {
  decPlaces = Math.pow(10, decPlaces);
  var abbrev = ["k", "m", "b", "t"];
  for (var i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number += abbrev[i];
      break;
    }
  }

  return number;
};

export const fixSelectScroll = () => {
  var scrollbar__wraps = document.querySelectorAll(".el-scrollbar__wrap");
  var index = 0,
    length = scrollbar__wraps.length;
  for (; index < length; index++) {
    scrollbar__wraps[index].style.margin = "0 0 0 -17px";
  }
};

export const dynamicColors = () => {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  var a = 0.6;
  return "rgb(" + r + "," + g + "," + b + "," + a + ")";
};

export const generateListOfRandomColors = count => {
  let colors = [];
  for (let index = 0; index < count; index++) {
    colors.push(dynamicColors());
  }
  return colors;
};
