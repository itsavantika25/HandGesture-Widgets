navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => webcam.srcObject = stream);

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const m = now.getMinutes().toString().padStart(2,"0");
  clock.textContent = `${h}:${m} ${ampm}`;
  date.textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

let timer = 1500, timerInterval;
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timer <= 0) return;
    timer--;
    timerDisplay.textContent =
      `${Math.floor(timer/60)}:${(timer%60).toString().padStart(2,"0")}`;
  }, 1000);
}
function resetTimer() {
  clearInterval(timerInterval);
  timer = 1500;
  timerDisplay.textContent = "25:00";
}

let sw = 0, swInt;
function startStopwatch() {
  swInt = setInterval(() => {
    sw += 100;
    const s = Math.floor(sw/1000);
    stopwatch.textContent =
      `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}.${Math.floor((sw%1000)/100)}`;
  },100);
}
function stopStopwatch(){ clearInterval(swInt); }
function resetStopwatch(){ sw=0; stopwatch.textContent="00:00.0"; }

notes.value = localStorage.getItem("notes") || "";
notes.addEventListener("input",()=>localStorage.setItem("notes",notes.value));

function generateCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarGrid.innerHTML = "";
  calendarTitle.textContent = now.toLocaleString("default", { month: "long", year: "numeric" });

  for (let i = 0; i < firstDay; i++) calendarGrid.innerHTML += `<div></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    calendarGrid.innerHTML += `
      <div class="py-2 rounded-lg ${d===today?'accent-bg text-black font-bold accent-glow':'hover:bg-white/10'}">${d}</div>
    `;
  }
}
generateCalendar();

function setAccent(color){
  document.documentElement.style.setProperty("--accent", color);
}