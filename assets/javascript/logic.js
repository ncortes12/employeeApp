var config = {
    apiKey: "AIzaSyBGR5yeQxkXMBXZ5XBM6RPvGEMoTrHEL68",
    authDomain: "njc-employeeapp.firebaseapp.com",
    databaseURL: "https://njc-employeeapp.firebaseio.com",
    projectId: "njc-employeeapp",
    storageBucket: "",
    messagingSenderId: "379533953231"
  };
  firebase.initializeApp(config);
 var database = firebase.database();


$("#button").on("click", function(event) {
   event.preventDefault();

var emplName = $("#nameInput").val().trim();
var emplRole = $("#roleInput").val().trim();
var startDate = $("#dateInput").val().trim();
var rate = $("#rateInput").val().trim();

$("#nameInput").val("");
$("#roleInput").val("");
$("#dateInput").val("");
$("#rateInput").val("");

console.log(emplName, emplRole, startDate, rate);

database.ref().push({

   name: emplName,
   role: emplRole,
   start: startDate,
   rate: rate,


});

})

database.ref().on("child_added", function (childSnapshot){
var snap = childSnapshot.val();
console.log(snap.name, snap.role, snap.start, snap.rate);
var newRow = $("<tr></tr>");

var nameRow = $("<td></td>");
nameRow.text(snap.name);
newRow.append(nameRow);

var roleRow = $("<td></td>");
roleRow.text(snap.role);
newRow.append(roleRow);

var startRow = $("<td></td>");
startRow.text(snap.start);
newRow.append(startRow);

var blankRow = $("<td></td>");
var monthsWorked = moment().diff(snap.start, "month");
blankRow.text(monthsWorked);
newRow.append(blankRow);

var rateRow = $("<td></td>");
rateRow.text(snap.rate);
newRow.append(rateRow);

var owedRow = $("<td></td>");
var numRate = parseInt(snap.rate);
var numMonths = parseInt(monthsWorked);
var owed = (numRate * numMonths);
owedRow.text(owed);
newRow.append(owedRow);

$("#tableInput").append(newRow);




})