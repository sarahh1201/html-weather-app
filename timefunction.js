let timeOutput = document.getElementById("current_time");
let dateOutput = document.getElementById("current_date");

function updateTime() {
  const datetime = new Date();
  const formattedTime = datetime.toLocaleTimeString('en-US', {
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true
  });
  timeOutput.innerHTML = `<i>Current Time: ${formattedTime}</i>`;
}

updateTime(); // Call the function once initially
setInterval(updateTime, 60000); // Refresh the time every 60 seconds (60000 milliseconds)

function date() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});
  dateOutput.innerHTML = `Current Date: ${formattedDate}`;
}

date();