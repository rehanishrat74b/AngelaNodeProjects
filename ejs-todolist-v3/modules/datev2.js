

const getDate = () => {
  let today = new Date();
  let day = "";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (today.getDay() == 0 || today.getDay() == 6) {
    day = "weekend-" + days[today.getDay()];
  }
  else {
    day = "weekday-" + days[today.getDay()];
  }
  return day;

};
module.exports.getDate = getDate;

const getFormatedDate = () => {
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let formatedDate = today.toLocaleDateString("en-US", options);
  return formatedDate;
};
module.exports.getFormatedDate = getFormatedDate;