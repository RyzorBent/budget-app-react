export default function displayDate() {
  var now, year, month, months;

  now = new Date();
  // note: month is zero based, so use 11 to get December; 12 will return Jan 25, 2017
  // var Christmas = new Date(2016, 11, 25);
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  month = now.getMonth();
  year = now.getFullYear();
  return months[month] + " " + year;
}
