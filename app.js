/* CLOCK */
setInterval(() => {
  const n = new Date();
  clock.textContent = n.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  date.textContent = n.toDateString();
}, 1000);

// TIMER
let timerEnd = null;
function startTimer() {
  const mins = timerInput.value || 1;
  timerEnd = Date.now() + mins * 60000;
}
function resetTimer() {
  timerEnd = null;
  timerDisplay.textContent = "00:00";
  document.title = "Widget Screen";
}
setInterval(() => {
  if (!timerEnd) return;
  const r = Math.max(0, Math.floor((timerEnd - Date.now()) / 1000));
  timerDisplay.textContent =
    `${Math.floor(r/60)}:${String(r%60).padStart(2,'0')}`;
  document.title = `⏱ ${timerDisplay.textContent}`;
  if (r === 0) {
    alarm.play();
    timerEnd = null;
    document.title = "Widget Screen";
  }
}, 500);

/* STOPWATCH */
let swStart = null, swRun = false;
function startSW(){
  if(!swRun){ swRun=true; swStart = Date.now() - (swStart||0); }
}
function stopSW(){ swRun=false; }
function resetSW(){
  swRun=false;
  swStart=null;
  stopwatch.textContent="00:00";
  document.title = "Widget Screen";
}
setInterval(()=>{
  if(!swRun) return;
  const t = Math.floor((Date.now()-swStart)/1000);
  stopwatch.textContent =
    `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;
  document.title = `⏱ ${stopwatch.textContent}`;
},500);

/* NOTES */
notes.value = localStorage.getItem("notes") || "";
notes.oninput = () => localStorage.setItem("notes", notes.value);

/* CALENDAR */
(function(){
  const now = new Date();
  calendarTitle.textContent =
    now.toLocaleString("default",{month:"long",year:"numeric"});
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  for(let i=0;i<firstDay;i++) calendarGrid.innerHTML += "<div></div>";
  for(let d=1; d<=days; d++){
    const today = d === now.getDate();
    calendarGrid.innerHTML += `
      <div class="calendar-day py-2 rounded-lg
        ${today ? 'accent-bg text-black font-bold accent-glow' : ''}">
        ${d}
      </div>`;
  }
})();

/* ACCENT */
function setAccent(c){ document.documentElement.style.setProperty("--accent",c); }