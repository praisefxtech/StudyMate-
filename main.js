/* =========================
   STUDYMATE MAIN.JS CLEAN
   PART 1/4
========================= */


/* =========================
   DATE SYSTEM
========================= */

function getTodayKey() {
  const d = new Date();
  return "study_" + d.toDateString();
}


/* =========================
   MENU SYSTEM
========================= */

function openMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if (menu) menu.classList.add("active");
  if (overlay) overlay.classList.add("active");

  loadMenuProfile();
}


function closeMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if (menu) menu.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}


function loadMenuProfile() {

  const name = localStorage.getItem("name");
  const school = localStorage.getItem("school");

  const menuName = document.getElementById("menuUserName");
  const menuSchool = document.getElementById("menuUserSchool");

  if (menuName)
    menuName.textContent = name || "My Profile";

  if (menuSchool)
    menuSchool.textContent =
      school || "Student • Focus Mode";
}


/* =========================
   PROFILE SYSTEM
========================= */

function saveProfile(){

  const name =
    document.getElementById("name")?.value.trim();

  const school =
    document.getElementById("school")?.value.trim();


  if(!name || !school){
    alert("Please fill in both name and school");
    return;
  }


  localStorage.setItem("name", name);
  localStorage.setItem("school", school);


  const displayName =
    document.getElementById("displayName");

  const displaySchool =
    document.getElementById("displaySchool");

  const userName =
    document.getElementById("userName");


  if(displayName)
    displayName.innerText = "👤 " + name;


  if(displaySchool)
    displaySchool.innerText = school;


  if(userName)
    userName.innerHTML =
    `<span class="span">👋Welcome</span> ${name}!`;


  const card =
    document.getElementById("profileCard");

  const edit =
    document.getElementById("editProfile");


  if(card)
    card.style.display="block";

  if(edit)
    edit.style.display="none";


  loadMenuProfile();
}



function showEditProfile(){

 const card =
 document.getElementById("profileCard");

 const edit =
 document.getElementById("editProfile");


 if(card)
 card.style.display="none";


 if(edit)
 edit.style.display="block";

}



function resetProfile(){

 localStorage.removeItem("name");
 localStorage.removeItem("school");


 const displayName =
 document.getElementById("displayName");

 const displaySchool =
 document.getElementById("displaySchool");


 if(displayName)
 displayName.innerText="👤 Your Name";


 if(displaySchool)
 displaySchool.innerText="Your School";


 const userName =
 document.getElementById("userName");


 if(userName)
 userName.innerHTML=
 `<span class="span">👋Welcome</span>!`;

 loadMenuProfile();

}



/* =========================
   LOAD PROFILE ON START
========================= */


document.addEventListener("DOMContentLoaded",()=>{


 const name =
 localStorage.getItem("name");

 const school =
 localStorage.getItem("school");


 const displayName =
 document.getElementById("displayName");


 const displaySchool =
 document.getElementById("displaySchool");


 const userName =
 document.getElementById("userName");


 if(name){

  if(displayName)
  displayName.innerText="👤 "+name;


  if(userName)
  userName.innerHTML=
  `<span class="span">👋Welcome</span> ${name}!`;

 }


 if(school && displaySchool)
 displaySchool.innerText=school;


});



/* =========================
   GREETING
========================= */


function setGreeting(){

 const hour =
 new Date().getHours();

 let text;


 if(hour < 12){

 text =
 "Good Morning ☀️ Let's make today productive";

 }

 else if(hour < 18){

 text =
 "Good Afternoon 🔥 Keep pushing!";

 }

 else{

 text =
 "Good Evening 🌙 Reflect & finish strong";

 }


 const greeting =
 document.getElementById("greetingText");


 if(greeting)
 greeting.innerText=text;

}


setGreeting();



/* =========================
   NOTIFICATION SYSTEM
========================= */


let notifications =
JSON.parse(
localStorage.getItem("notifications")
) || [];



function saveNotifications(){

 localStorage.setItem(
 "notifications",
 JSON.stringify(notifications)
 );

}



function addNotification(title,message){


 notifications.unshift({

 title,
 message,

 time:new Date()
 .toLocaleTimeString([],{
 hour:"2-digit",
 minute:"2-digit"
 })

 });


 saveNotifications();
 playNotificationSound();
 renderNotifications();

}




function renderNotifications(){

 const list =
 document.getElementById("notificationList");


 const badge =
 document.querySelector(".badge");


 if(!list)
 return;


 list.innerHTML="";


 if(notifications.length===0){

 list.innerHTML=
 "<p>No notifications yet.</p>";

 if(badge)
 badge.textContent="0";

 return;

 }


 if(badge)
 badge.textContent=
 notifications.length;



 notifications
 .slice()
 .reverse()
 .forEach(n=>{


 const div =
 document.createElement("div");


 div.className=
 "notification-item";


 div.innerHTML=`

 <strong>${n.title}</strong>

 <p>${n.message}</p>

 <small>${n.time}</small>

 `;


 list.appendChild(div);


 });


}



function toggleNotifications(){

 const panel =
 document.getElementById("notificationPanel");


 if(panel)
 panel.classList.toggle("show");

}



function clearNotifications(){

 notifications=[];

 saveNotifications();

 renderNotifications();

}



document.addEventListener(
"DOMContentLoaded",
renderNotifications
);

/* =========================
   TIMER SYSTEM
========================= */


let timer = null;
let totalTime = 25 * 60;
let timeLeft = totalTime;



function updateTimerDisplay(){

 const timerText =
 document.getElementById("timer");


 if(timerText){

 let minutes =
 Math.floor(timeLeft / 60);

 let seconds =
 timeLeft % 60;


 timerText.textContent =
 `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

 }

}




function updateCircle(){

 const circle =
 document.querySelector(".progress");


 if(!circle)
 return;


 const radius = 90;

 const circumference =
 2 * Math.PI * radius;


 circle.style.strokeDasharray =
 circumference;


 const progress =
 ((totalTime - timeLeft) / totalTime) * 100;


 const offset =
 circumference -
 (progress / 100) * circumference;


 circle.style.strokeDashoffset =
 offset;

}





function startTimer(){

 if(timer)
 return;


 // count focus session once when started

 


 timer =
 setInterval(()=>{


 timeLeft--;


 updateTimerDisplay();

 updateCircle();


 saveStudySecond();



 if(timeLeft <= 0){
   
   let focus =
 Number(localStorage.getItem("focusSessions")) || 0;


 focus++;


 localStorage.setItem(
 "focusSessions",
 focus
 );
 

 clearInterval(timer);

 timer=null;

 alert("Time's up!");
 

 updateStudyHours();


 updateProgress();


 resetTimer();


 }



 },1000);


}




function resetTimer(){

 clearInterval(timer);

 timer=null;

 timeLeft=totalTime;


 updateTimerDisplay();

 updateCircle();

}




window.startTimer=startTimer;
window.resetTimer=resetTimer;




/* =========================
   STUDY TIME TRACKING
========================= */


function saveStudySecond(){


 const key =
 getTodayKey();


 let seconds =
 Number(localStorage.getItem(key)) || 0;


 seconds++;


 localStorage.setItem(
 key,
 seconds
 );


}




function getStudyToday(){


 const seconds =
 Number(
 localStorage.getItem(getTodayKey())
 ) || 0;


 return seconds / 3600;

}




function getStudyWeek(){


 let total = 0;


 for(let i=0;i<7;i++){


 let d = new Date();


 d.setDate(
 d.getDate()-i
 );


 let key =
 "study_" + d.toDateString();



 total +=
 Number(
 localStorage.getItem(key)
 ) || 0;


 }


 return total / 3600;

}




function updateStudyHours(){


 const hours =
 Math.floor(getStudyToday());


 localStorage.setItem(
 "studyHours",
 hours
 );


}





/* =========================
   LOAD TIMER
========================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


 updateTimerDisplay();

 updateCircle();


});

/* =========================
   TASK SYSTEM
========================= */


let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



function saveTasks(){

 localStorage.setItem(
 "tasks",
 JSON.stringify(tasks)
 );

}



function renderTasks(){


 const list =
 document.getElementById("taskList");


 if(!list)
 return;


 list.innerHTML="";


 tasks.forEach((task,index)=>{


 const li =
 document.createElement("li");


 li.innerHTML=`

 <input type="checkbox"
 ${task.done ? "checked":""}
 onchange="toggleTask(${index})">


 <span style="
 text-decoration:${task.done ?
 "line-through":"none"}">

 ${task.text}

 </span>


 <div>

 <button onclick="editTask(${index})">
 Edit
 </button>


 <button onclick="deleteTask(${index})">
 🗑
 </button>


 </div>

 `;


 list.appendChild(li);


 });


 updateCompletedTasks();

}



function addTask(){


 const input =
 document.getElementById("newTask");


 if(!input)
 return;


 let value =
 input.value.trim();


 if(!value)
 return;


 tasks.push({

 text:value,

 done:false

 });


 input.value="";


 saveTasks();

 renderTasks();


}



function toggleTask(index){


 tasks[index].done =
 !tasks[index].done;


 saveTasks();


 updateCompletedTasks();

 renderTasks();


}



function deleteTask(index){


 tasks.splice(index,1);


 saveTasks();


 renderTasks();


}



function editTask(index){


 let updated =
 prompt(
 "Edit task:",
 tasks[index].text
 );


 if(updated && updated.trim()){


 tasks[index].text =
 updated.trim();


 saveTasks();

 renderTasks();

 }


}




function updateCompletedTasks(){


 let completed =
 tasks.filter(
 t=>t.done
 ).length;


 localStorage.setItem(
 "completedTasks",
 completed
 );


}



window.addTask=addTask;
window.toggleTask=toggleTask;
window.deleteTask=deleteTask;
window.editTask=editTask;



document.addEventListener(
"DOMContentLoaded",
()=>{


 const button =
 document.getElementById("addTaskBtn");


 if(button){

 button.onclick=
 addTask;

 }


 renderTasks();


});





/* =========================
   GOALS SYSTEM
========================= */


function saveGoals(){


 const goals={


 study:
 document.getElementById("studyGoal")?.value.trim(),


 focus:
 document.getElementById("focusGoal")?.value.trim(),


 task:
 document.getElementById("taskGoal")?.value.trim(),


 streak:
 document.getElementById("streakGoal")?.value.trim()


 };



 if(
 !goals.study ||
 !goals.focus ||
 !goals.task ||
 !goals.streak
 ){

 alert("Please fill in all goals");

 return;

 }



 localStorage.setItem(
 "goals",
 JSON.stringify(goals)
 );


 clearGoalInputs();


 renderGoals();
 updateProgress();

}




function clearGoalInputs(){


 [
 "studyGoal",
 "focusGoal",
 "taskGoal",
 "streakGoal"

 ].forEach(id=>{


 const el =
 document.getElementById(id);


 if(el)
 el.value="";


 });


}





function renderGoals(){


 const goals =
 JSON.parse(
 localStorage.getItem("goals")
 ) || {};



 const study =
 document.getElementById("showStudyGoal");


 const focus =
 document.getElementById("showFocusGoal");


 const task =
 document.getElementById("showTaskGoal");


 const streak =
 document.getElementById("showStreakGoal");



 if(study)
 study.innerText =
 (goals.study || 0)+" hrs";


 if(focus)
 focus.innerText =
 (goals.focus || 0)+" sessions";


 if(task)
 task.innerText =
 (goals.task || 0)+" tasks";


 if(streak)
 streak.innerText =
 (goals.streak || 0)+" days";


}





document.addEventListener(
"DOMContentLoaded",
()=>{

 clearGoalInputs();

 renderGoals();
 
updateProgress();
});



/* =========================
   CLEAN PROGRESS SYSTEM
========================= */

function updateProgress(){

  const goals =
  JSON.parse(localStorage.getItem("goals")) || {};


  const studyGoal = Number(goals.study) || 0;
  const focusGoal = Number(goals.focus) || 0;
  const taskGoal = Number(goals.task) || 0;
  const streakGoal = Number(goals.streak) || 0;


  // Study time
  const todayHours = getStudyToday();
  const weekHours = getStudyWeek();


  const focus =
  Number(localStorage.getItem("focusSessions")) || 0;


  const completedTasks =
  Number(localStorage.getItem("completedTasks")) || 0;


  const streak =
  Number(localStorage.getItem("currentStreak")) || 0;



  // Goal progress

  const goalStudy =
  document.getElementById("goalStudyProgress");

  if(goalStudy){

    let h = Math.floor(todayHours);
    let m = Math.floor((todayHours * 60) % 60);

    goalStudy.textContent =
    `${h}h ${m}m / ${studyGoal} hrs`;

  }



  const goalFocus =
  document.getElementById("goalFocusProgress");

  if(goalFocus)
  goalFocus.textContent =
  `${focus}/${focusGoal}`;



  const goalTask =
  document.getElementById("goalTaskProgress");

  if(goalTask)
  goalTask.textContent =
  `${completedTasks}/${taskGoal}`;



  const goalStreak =
  document.getElementById("goalStreakProgress");

  if(goalStreak)
  goalStreak.textContent =
  `${streak}/${streakGoal} days`;




  // Study statistics

  const today =
  document.getElementById("todayStudy");

  if(today){

    let mins =
    Math.floor(todayHours * 60);

    today.textContent =
    mins + "m";

  }



  const week =
  document.getElementById("weekStudy");

  if(week)
  week.textContent =
  weekHours.toFixed(2)+" hrs";



  const month =
  document.getElementById("monthStudy");

  if(month)
  month.textContent =
  weekHours.toFixed(2)+" hrs";



  const all =
  document.getElementById("allStudy");

  if(all)
  all.textContent =
  weekHours.toFixed(2)+" hrs";




  // Task stats

  const complete =
  document.getElementById("completedTasks");

  if(complete)
  complete.textContent =
  completedTasks;



  const remaining =
  document.getElementById("remainingTasks");

  if(remaining)
  remaining.textContent =
  Math.max(taskGoal-completedTasks,0);



  // Sessions

  document.querySelectorAll(
  "#todaySessions,#totalSessions"
  )
  .forEach(el=>{

    el.textContent = focus;

  });



  // Streak

  const current =
  document.getElementById("currentStreak");

  if(current)
  current.textContent =
  streak+" Days";


  const longest =
  document.getElementById("longestStreak");

  if(longest)
  longest.textContent =
  streak+" Days";




  // Overall progress

  let values=[];


  if(studyGoal)
  values.push(todayHours/studyGoal);


  if(focusGoal)
  values.push(focus/focusGoal);


  if(taskGoal)
  values.push(completedTasks/taskGoal);


  if(streakGoal)
  values.push(streak/streakGoal);



  let percent = 0;


  if(values.length){

    percent =
    (values.reduce((a,b)=>a+b,0)
    /
    values.length)
    *100;

  }


  percent =
  Math.min(percent,100);



  const bar =
  document.getElementById("overallBar");


  const text =
  document.getElementById("overallPercent");


  if(bar)
  bar.style.width =
  percent+"%";


  if(text)
  text.textContent =
  percent.toFixed(1)+"%";



  renderAchievements();

}


/* =========================
   ACHIEVEMENTS
========================= */


function renderAchievements(){


 const list =
 document.getElementById(
 "achievementList"
 );


 if(!list)
 return;



 list.innerHTML="";



 let achievements=[];



 let study =
 Number(
 localStorage.getItem("studyHours")
 ) || 0;


 let tasks =
 Number(
 localStorage.getItem("completedTasks")
 ) || 0;


 let focus =
 Number(
 localStorage.getItem("focusSessions")
 ) || 0;




 if(study>=5)
 achievements.push(
 "📚 First Study Session"
 );


 if(study>=10)
 achievements.push(
 "🔥 10+ Hours Grinder"
 );


 if(tasks>=5)
 achievements.push(
 "✅ Task Finisher"
 );


 if(tasks>=20)
 achievements.push(
 "🏆 Task Master"
 );


 if(focus>=5)
 achievements.push(
 "🎯 Focus Starter"
 );


 if(focus>=20)
 achievements.push(
 "🧠 Deep Focus Pro"
 );



 if(achievements.length===0){

 list.innerHTML=
 "<p>No achievements yet 🚀</p>";

 return;

 }



 achievements.forEach(a=>{


 const div =
 document.createElement("div");


 div.textContent=a;


 list.appendChild(div);


 });


}




/* =========================
   NAVIGATION
========================= */


function showHome(){


 const home =
 document.getElementById(
 "homePage"
 );


 if(home)
 home.style.display="block";



 [
 "goalsSection",
 "progressSection",
 "settingsSection",
 "musicSection",
 "privacySection",
 "resetSection",
 "calculatorSection",
 "aboutSection"

 ].forEach(id=>{


 const section =
 document.getElementById(id);


 if(section)
 section.style.display="none";


 });



 closeMenu();

}





function showPage(pageId){


 const home =
 document.getElementById(
 "homePage"
 );


 if(home)
 home.style.display="none";



 [
 "goalsSection",
 "progressSection",
 "settingsSection",
 "musicSection",
 "privacySection",
 "resetSection",
 "calculatorSection",
 "aboutSection"

 ].forEach(id=>{


 const section =
 document.getElementById(id);


 if(section)
 section.style.display="none";


 });



 const page =
 document.getElementById(pageId);


 if(page)
 page.style.display="block";


 closeMenu();

}




/* =========================
   PROFILE IMAGE
========================= */
/* =========================
   PROFILE PICTURE SYSTEM
========================= */

function updateProfileImages(image) {

  const ids = [
    "displayAvatar",
    "profileCardAvatar",
    "menuAvatar"
  ];

  ids.forEach(id => {
    const img = document.getElementById(id);
    if (img) {
      img.src = image;
    }
  });

}

document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("profilePicInput");

  const savedImage = localStorage.getItem("profileImage");

  if (savedImage) {
    updateProfileImages(savedImage);
  }

  if (!input) return;

  input.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

      const image = e.target.result;

      localStorage.setItem("profileImage", image);

      updateProfileImages(image);

    };

    reader.readAsDataURL(file);

  });

});



/* =========================
   RESET SYSTEM
========================= */


function resetAllProgress(){


 if(!confirm(
 "Reset ALL progress?"
 ))
 return;



 const keep=[
 "name",
 "school",
 "profileImage"
 ];



 Object.keys(localStorage)
 .forEach(key=>{


 if(!keep.includes(key))
 localStorage.removeItem(key);


 });



 alert(
 "Progress reset successfully!"
 );


 location.reload();

}



function resetAllData(){


 if(confirm(
 "Delete all StudyMate data?"
 )){


 localStorage.clear();

 location.reload();

 }


}

/* =========================
   BOTTOM NAVIGATION
========================= */

function goToSection(sectionId){

  const section = document.getElementById(sectionId);

  if(section){

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}

/* =========================
   STUDYMATE MIDNIGHT THEME
========================= */


function toggleTheme(){

 document.body.classList.toggle(
 "midnight-mode"
 );


 let enabled =
 document.body.classList.contains(
 "midnight-mode"
 );


 localStorage.setItem(
 "midnightMode",
 enabled
 );


 const btn =
 document.getElementById("themeBtn");


 if(btn){

 btn.textContent =
 enabled
 ? "☀️ Normal Theme"
 : "🌙 Midnight Theme";

 }

}



document.addEventListener(
"DOMContentLoaded",
()=>{


 let saved =
 localStorage.getItem(
 "midnightMode"
 );


 if(saved==="true"){

 document.body.classList.add(
 "midnight-mode"
 );

 }


});

/* =========================
   CUSTOM TIMER SETTINGS
========================= */


function saveTimerSetting(){

 const select =
 document.getElementById(
 "focusDuration"
 );


 if(!select)
 return;


 let minutes =
 select.value;


 localStorage.setItem(
 "timerDuration",
 minutes
 );


 // update timer value

 totalTime =
 Number(minutes) * 60;


 timeLeft =
 totalTime;


 updateTimerDisplay();

 updateCircle();


}




function loadTimerSetting(){

 const saved =
 localStorage.getItem(
 "timerDuration"
 );


 const select =
 document.getElementById(
 "focusDuration"
 );


 if(saved){

 totalTime =
 Number(saved) * 60;


 timeLeft =
 totalTime;


 if(select)
 select.value=saved;

 }

}



document.addEventListener(
"DOMContentLoaded",
()=>{


 loadTimerSetting();


 const select =
 document.getElementById(
 "focusDuration"
 );


 if(select){

 select.addEventListener(
 "change",
 saveTimerSetting
 );

 }


});


/* =========================
   STUDY REMINDER SYSTEM
========================= */


let reminderInterval;



function saveReminderSettings(){

 const enabled =
 document.getElementById("reminderToggle")?.checked;


 const time =
 document.getElementById("reminderTime")?.value;


 localStorage.setItem(
 "reminderEnabled",
 enabled
 );


 localStorage.setItem(
 "reminderTime",
 time
 );


 startReminderCheck();

}





function startReminderCheck(){


 clearInterval(reminderInterval);


 reminderInterval =
 setInterval(()=>{


 const enabled =
 localStorage.getItem(
 "reminderEnabled"
 );


 if(enabled !== "true")
 return;



 const savedTime =
 localStorage.getItem(
 "reminderTime"
 );



 if(!savedTime)
 return;



 const now =
 new Date();



 const current =
 now.toTimeString()
 .slice(0,5);



 if(current === savedTime){


 showReminder(
 "📚 Study Time!",
 "Your planned study session has started."
 );


 }



 },60000);


}





function showReminder(title,message){


 if(
 Notification.permission === "granted"
 ){


 new Notification(
 title,
 {
 body:message
 }
 );


 }

 else{


 Notification.requestPermission();

 }


}




function loadReminderSettings(){


 const toggle =
 document.getElementById(
 "reminderToggle"
 );


 const time =
 document.getElementById(
 "reminderTime"
 );



 let enabled =
 localStorage.getItem(
 "reminderEnabled"
 );


 let savedTime =
 localStorage.getItem(
 "reminderTime"
 );



 if(toggle)
 toggle.checked =
 enabled === "true";


 if(time)
 time.value =
 savedTime || "";


 startReminderCheck();

}




document.addEventListener(
"DOMContentLoaded",
()=>{


 loadReminderSettings();



 const toggle =
 document.getElementById(
 "reminderToggle"
 );


 const time =
 document.getElementById(
 "reminderTime"
 );


 if(toggle)
 toggle.addEventListener(
 "change",
 saveReminderSettings
 );


 if(time)
 time.addEventListener(
 "change",
 saveReminderSettings
 );


});

/* =========================
   DATA BACKUP SYSTEM
========================= */


function exportData(){


 let data = {};


 Object.keys(localStorage)
 .forEach(key=>{

 data[key] =
 localStorage.getItem(key);

 });



 let file =
 new Blob(
 [JSON.stringify(data,null,2)],
 {
 type:"application/json"
 }
 );



 let link =
 document.createElement("a");


 link.href =
 URL.createObjectURL(file);


 link.download =
 "StudyMate_Backup.json";


 link.click();



 alert(
 "StudyMate backup exported successfully ✅"
 );


}





function importData(event){


 let file =
 event.target.files[0];


 if(!file)
 return;



 let reader =
 new FileReader();



 reader.onload =
 function(e){


 let data =
 JSON.parse(e.target.result);



 Object.keys(data)
 .forEach(key=>{


 localStorage.setItem(
 key,
 data[key]
 );


 });



 alert(
 "Backup restored successfully ✅"
 );


 location.reload();



 };


 reader.readAsText(file);



}





document.addEventListener(
"DOMContentLoaded",
()=>{


 const input =
 document.getElementById(
 "importFile"
 );


 if(input){

 input.addEventListener(
 "change",
 importData
 );

 }


});


/* =========================
   FOCUS MUSIC SYSTEM
========================= */


let focusAudio = new Audio();

focusAudio.preload = "auto";

focusAudio.loop = true;


const focusSounds = {

 calm:{
   name:"🎹 Emotional Piano",
   file:"calm.mp3"
 },

 sky:{
   name:"🌧Deep-Rain",
   file:"sky.mp3"
 },

 ocean:{
   name:"🌊 Ocean Waves",
   file:"ocean.mp3"
 },

 silent:{
   name:"🌌 Night Sky",
   file:"silent.mp3"
 },

 space:{
   name:"🌲 Forest",
   file:"space.mp3"
 },

 storm:{
   name:"☕ Cozy Café",
   file:"storm.mp3"
 },

 piano:{
   name:"🔥 Fireplace",
   file:"piano.mp3"
 },

 meditation:{
   name:"🕯 Meditation",
   file:"dream.mp3"
 }

};


function playMusic(type){

  let song = focusSounds[type];

  if(!song) return;

  focusAudio.pause();
  focusAudio.src = song.file;
  focusAudio.load();

  focusAudio.play();

  localStorage.setItem("lastMusic", type);

  document.getElementById("nowPlaying").textContent =
  "🎵 Playing: " + song.name;

}



function pauseMusic(){

 focusAudio.pause();

}



function resumeMusic(){

 focusAudio.play();

}



function stopMusic(){

 focusAudio.pause();

 focusAudio.currentTime = 0;

 document.getElementById("nowPlaying").textContent =
 "🎵 Nothing playing";

}


document.addEventListener("DOMContentLoaded",()=>{


const volume =
document.getElementById("musicVolume");


if(volume){


focusAudio.volume =
volume.value;


volume.addEventListener("input",()=>{


focusAudio.volume =
volume.value;


});


}


});

document.addEventListener("DOMContentLoaded", () => {

  const lastMusic = localStorage.getItem("lastMusic");

  if(lastMusic && focusSounds[lastMusic]){

    const nowPlaying = document.getElementById("nowPlaying");

    if(nowPlaying){
      nowPlaying.textContent =
      "🎵 Last Selected: " +
      focusSounds[lastMusic].name;
    }

  }

});

/* ============================
   FAVORITE MUSIC SYSTEM
============================ */

let favoriteMusic =
JSON.parse(localStorage.getItem("favoriteMusic")) || [];


function toggleFavorite(song){

  const index = favoriteMusic.indexOf(song);

  if(index === -1){

    favoriteMusic.push(song);

    alert("⭐ Added to Favorites");

  }else{

    favoriteMusic.splice(index,1);

    alert("❌ Removed from Favorites");

  }

  localStorage.setItem(
    "favoriteMusic",
    JSON.stringify(favoriteMusic)
  );

  updateFavoriteButtons();

}


function updateFavoriteButtons(){

  document.querySelectorAll(".music-card").forEach(card=>{

    const playBtn = card.querySelector("button");

    if(!playBtn) return;

    const song = playBtn.getAttribute("onclick")
    .match(/'(.*?)'/)[1];

    const starBtn = card.querySelectorAll("button")[1];

    if(!starBtn) return;

    if(favoriteMusic.includes(song)){

      starBtn.innerHTML = "⭐ Saved";

    }else{

      starBtn.innerHTML = "☆ Favorite";

    }

  });

}


document.addEventListener("DOMContentLoaded",()=>{

  updateFavoriteButtons();

});


/* =========================
   STUDY REMINDER SYSTEM
========================= */


function saveReminderSettings(){

  const enabled =
  document.getElementById("reminderToggle")?.checked;

  const time =
  document.getElementById("reminderTime")?.value;


  localStorage.setItem(
    "reminderEnabled",
    enabled
  );


  localStorage.setItem(
    "reminderTime",
    time
  );

}



document.addEventListener(
"DOMContentLoaded",
()=>{


 const toggle =
 document.getElementById("reminderToggle");


 const time =
 document.getElementById("reminderTime");


 if(!toggle || !time) return;



 // Load saved settings

 toggle.checked =
 localStorage.getItem("reminderEnabled")
 === "true";


 time.value =
 localStorage.getItem("reminderTime")
 || "";



 toggle.addEventListener(
 "change",
 saveReminderSettings
 );


 time.addEventListener(
 "change",
 saveReminderSettings
 );


});




/* =========================
   FIXED STUDY REMINDER CHECK
========================= */

function checkStudyReminder(){
  
  let reminderChecking = false;
  
  if(reminderChecking)
return;

reminderChecking = true;

  const enabled =
  localStorage.getItem("reminderEnabled");


  const savedTime =
  localStorage.getItem("reminderTime");


  if(enabled !== "true" || !savedTime){
    return;
    
    reminderChecking = false;
    
  }


  const now = new Date();


  const currentHour =
  String(now.getHours()).padStart(2,"0");


  const currentMinute =
  String(now.getMinutes()).padStart(2,"0");


  const currentTime =
  currentHour + ":" + currentMinute;



  const today =
  now.toDateString();



  const alreadySent =
  localStorage.getItem("reminderSent");



  if(
    currentTime == savedTime &&
    alreadySent !== today
  ){

    addNotification(
      "📚 Study Reminder",
      "Time to focus on your study goal!"
    );


   localStorage.setItem(
      "reminderSent",
      today
    );

  }

}



setInterval(
checkStudyReminder,
10000
);


/* =========================
   SAVE STUDY REMINDER SETTINGS
========================= */

document.addEventListener("DOMContentLoaded",()=>{

const toggle =
document.getElementById("reminderToggle");


const time =
document.getElementById("reminderTime");


if(!toggle || !time) return;



// load saved settings

toggle.checked =
localStorage.getItem("reminderEnabled") === "true";


time.value =
localStorage.getItem("reminderTime") || "";



// save when changed

toggle.addEventListener("change",()=>{

localStorage.setItem(
"reminderEnabled",
toggle.checked
);


});



time.addEventListener("change",()=>{

localStorage.setItem(
"reminderTime",
time.value
);


});


});


localStorage.removeItem("reminderSent");




/* =========================
   TIMER COMPLETION NOTIFICATION
========================= */

const originalAlert = window.alert;


window.alert = function(message){

  if(message === "Time's up!"){

    addNotification(
      "⏰ Focus Session Complete",
      "Great job! Your focus session is finished 🎉"
    );

  }


  originalAlert(message);

};


/* =========================
   TASK COMPLETION NOTIFICATION
========================= */

let lastCompletedTasks =
Number(localStorage.getItem("completedTasks")) || 0;


setInterval(()=>{

  let currentCompleted =
  Number(localStorage.getItem("completedTasks")) || 0;

  if(currentCompleted > lastCompletedTasks){

    addNotification(
      "✅ Task Completed",
      "Awesome! You completed a task. Keep the momentum going! 🔥"
    );

  }

  lastCompletedTasks = currentCompleted;

},500);


const StudyMate = {

  notify(title, message){

    addNotification(title, message);

    playNotificationSound();

  },

  achievement(title){

    this.notify(
      "🏆 Achievement",
      title
    );

  },

  reminder(message){

    this.notify(
      "📚 Reminder",
      message
    );

  },

  timer(){

    this.notify(
      "⏰ Focus Session Complete",
      "Great job! Time for a short break 🎉"
    );

  },

  task(){

    this.notify(
      "✅ Task Completed",
      "Awesome! Keep the momentum going 🔥"
    );

  }

};

/* =========================
   SMART MOTIVATION SYSTEM
========================= */

function updateMotivation(){

  const msg =
  document.getElementById("motivationMessage");

  if(!msg) return;


  const study =
  getStudyToday();

  const tasks =
  Number(localStorage.getItem("completedTasks")) || 0;

  const focus =
  Number(localStorage.getItem("focusSessions")) || 0;


  let text = "";


  if(study === 0 && tasks === 0 && focus === 0){

    text =
    "🌱 Every expert was once a beginner. Start your first study session today!";

  }

  else if(study < 0.5){

    text =
    "📚 Nice start! Keep studying—you are building consistency.";

  }

  else if(study < 1){

    text =
    "🔥 Great work! You're making real progress today.";

  }

  else if(study < 2){

    text =
    "🚀 Excellent! You're becoming more disciplined every session.";

  }

  else{

    text =
    "👑 Outstanding! You're smashing your goals today. Keep it up!";

  }


  msg.textContent = text;

}


/* Update motivation every 5 seconds */

setInterval(updateMotivation,5000);


/* Update immediately when page loads */

document.addEventListener(
"DOMContentLoaded",
updateMotivation
);

/* =========================
   XP & LEVEL SYSTEM
========================= */

function getXP(){

  return Number(
    localStorage.getItem("studyXP")
  ) || 0;

}


function addXP(amount){

  let xp = getXP();

  xp += amount;

  localStorage.setItem(
    "studyXP",
    xp
  );

  updateXP();

}


function updateXP(){

  const xp = getXP();

  const level =
  Math.floor(xp / 100) + 1;

  const currentXP =
  xp % 100;


  const levelText =
  document.getElementById("userLevel");

  const xpText =
  document.getElementById("xpText");

  const bar =
  document.getElementById("xpBar");


  if(levelText)
  levelText.textContent = level;


  if(xpText)
  xpText.textContent =
  `${currentXP} / 100 XP`;


  if(bar)
  bar.style.width =
  currentXP + "%";

}


document.addEventListener(
"DOMContentLoaded",
updateXP
);


/* =========================
   XP EVENT CONNECTIONS
========================= */

let lastXPTasks =
Number(localStorage.getItem("completedTasks")) || 0;

let lastXPFocus =
Number(localStorage.getItem("focusSessions")) || 0;


setInterval(()=>{

  const completed =
  Number(localStorage.getItem("completedTasks")) || 0;

  const focus =
  Number(localStorage.getItem("focusSessions")) || 0;


  // Task XP

  if(completed > lastXPTasks){

    addXP(
      (completed - lastXPTasks) * 15
    );

  }


  // Focus Session XP

  if(focus > lastXPFocus){

    addXP(
      (focus - lastXPFocus) * 25
    );

  }


  lastXPTasks = completed;
  lastXPFocus = focus;

},500);

/* =========================
   PRODUCTIVITY RANK SYSTEM
========================= */

function updateRank(){

  const xp =
  Number(localStorage.getItem("studyXP")) || 0;

  const rank =
  document.getElementById("productivityRank");

  const message =
  document.getElementById("rankMessage");

  if(!rank || !message) return;


  if(xp < 100){

    rank.textContent =
    "🌱 Beginner";

    message.textContent =
    "Every great student starts somewhere.";

  }

  else if(xp < 300){

    rank.textContent =
    "📚 Learner";

    message.textContent =
    "You're building a strong study habit.";

  }

  else if(xp < 600){

    rank.textContent =
    "🥇 Focused Student";

    message.textContent =
    "Excellent consistency! Keep pushing.";

  }

  else if(xp < 1000){

    rank.textContent =
    "💎 Study Master";

    message.textContent =
    "Your dedication is paying off.";

  }

  else{

    rank.textContent =
    "👑 Study Legend";

    message.textContent =
    "You've reached the highest productivity rank!";

  }

}


/* Refresh rank */

setInterval(updateRank,1000);

document.addEventListener(
"DOMContentLoaded",
updateRank
);

/* =========================
   DAILY CHALLENGES
========================= */

function updateChallenges(){

  const tasks =
  Number(localStorage.getItem("completedTasks")) || 0;

  const focus =
  Number(localStorage.getItem("focusSessions")) || 0;

  const study =
  getStudyToday();


  const c1 =
  document.getElementById("challenge1");

  const c2 =
  document.getElementById("challenge2");

  const c3 =
  document.getElementById("challenge3");


  if(c1){

    c1.textContent =
    (tasks >= 3 ? "✅" : "⬜")
    + " Complete 3 Tasks";

  }


  if(c2){

    c2.textContent =
    (focus >= 2 ? "✅" : "⬜")
    + " Finish 2 Focus Sessions";

  }


  if(c3){

    c3.textContent =
    (study >= 1 ? "✅" : "⬜")
    + " Study for 1 Hour";

  }


  if(
    tasks >= 3 &&
    focus >= 2 &&
    study >= 1 &&
    !localStorage.getItem("challengeRewarded")
  ){

    addXP(50);

    StudyMate.notify(
      "🏆 Daily Challenge Complete",
      "Amazing! You earned 50 XP."
    );

    localStorage.setItem(
      "challengeRewarded",
      "true"
    );

  }

}


document.addEventListener(
"DOMContentLoaded",
updateChallenges
);

setInterval(
updateChallenges,
1000
);

/* =========================
   PRIVACY SETTINGS
========================= */

document.addEventListener("DOMContentLoaded",()=>{

const hideStats =
document.getElementById("hideStats");

const hideBadge =
document.getElementById("hideBadge");


if(hideStats){

hideStats.checked =
localStorage.getItem("hideStats") === "true";

hideStats.addEventListener("change",()=>{

localStorage.setItem(
"hideStats",
hideStats.checked
);

const progress =
document.getElementById("progressSection");

if(progress){

progress.style.visibility =
hideStats.checked
? "hidden"
: "visible";

}

});

}


if(hideBadge){

hideBadge.checked =
localStorage.getItem("hideBadge") === "true";

hideBadge.addEventListener("change",()=>{

localStorage.setItem(
"hideBadge",
hideBadge.checked
);

const badge =
document.querySelector(".badge");

if(badge){

badge.style.display =
hideBadge.checked
? "none"
: "inline-flex";

}

});

}

});

/* =========================
   RESET CENTER
========================= */

function resetNotifications(){

notifications=[];

saveNotifications();

renderNotifications();

}



function resetStudyHours(){

localStorage.removeItem(
getTodayKey()
);

updateProgress();

alert(
"Today's study hours reset."
);

}



function resetTasksOnly(){

tasks=[];

saveTasks();

renderTasks();

updateProgress();

}



function resetGoalsOnly(){

localStorage.removeItem(
"goals"
);

renderGoals();

updateProgress();

}



function resetXP(){

localStorage.removeItem(
"studyXP"
);

updateXP();

updateRank();

alert(
"XP reset."
);

}



function resetAchievements(){

localStorage.removeItem(
"studyHours"
);

localStorage.removeItem(
"focusSessions"
);

renderAchievements();

updateProgress();

alert(
"Achievements reset."
);
}


/* =========================
   APP PIN SETTINGS
========================= */


function saveAppPin(){

const input =
document.getElementById("appPin");

const pin =
input.value;


if(!pin || pin.length !== 4 || isNaN(pin)){

alert("PIN must be 4 numbers");

return;

}


localStorage.setItem(
"studyPin",
pin
);


document.getElementById("pinStatus").textContent =
"✅ PIN saved";


}



function removeAppPin(){

localStorage.removeItem(
"studyPin"
);


document.getElementById("appPin").value="";


document.getElementById("pinStatus").textContent =
"PIN removed";


}



function togglePin(){

const input =
document.getElementById("appPin");


if(input.type === "password"){

input.type="text";

}
else{

input.type="password";

}

}



document.addEventListener(
"DOMContentLoaded",
()=>{

const input =
document.getElementById("appPin");


const savedPin =
localStorage.getItem("studyPin");


if(input && savedPin){

input.value=savedPin;

}


});

/* =========================
   APP LOCK SCREEN
========================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


const pin =
localStorage.getItem("studyPin");


const lock =
document.getElementById("lockScreen");


if(pin && lock){

lock.style.display="flex";

}


});





function unlockApp(){

const savedPin =
localStorage.getItem("studyPin");


const entered =
document.getElementById("unlockPin").value;


const message =
document.getElementById("lockMessage");


if(entered === savedPin){


document.getElementById("lockScreen")
.style.display="none";


message.textContent="";


}

else{


message.textContent =
"❌ Wrong PIN";


}


}


/* =========================
   STUDYMATE FINAL STARTUP
========================= */


document.addEventListener(
"DOMContentLoaded",
()=>{

  updateTimerDisplay();

  updateCircle();

  renderTasks();

  renderGoals();

  updateProgress();

  updateXP();

  updateRank();

  updateChallenges();
  

  renderNotifications();


});

/* =========================
   NOTIFICATION HELPER
========================= */


function sendStudyNotification(title,message){

  addNotification(
    title,
    message
  );

   playNotificationSound();
}

/* =========================
   OVERALL PROGRESS COMPLETE CHECK
========================= */


function checkOverallCompletion(){

  const bar =
  document.getElementById("overallBar");


  const percentText =
  document.getElementById("overallPercent");


  if(!bar || !percentText)
  return;


  const percent =
  parseFloat(
    percentText.textContent
  );


  if(percent >= 100){

    if(
    localStorage.getItem(
    "overallCompleted"
    ) !== "true"
    ){

      addNotification(
        "🎉 Goal Progress Complete",
        "Amazing! You completed all your current goals."
      );
        
        playNotificationSound();

      localStorage.setItem(
        "overallCompleted",
        "true"
      );

    }

  }

  else{

    // Allow new notification
    // when goals change again

    localStorage.removeItem(
    "overallCompleted"
    );

  }

}



setInterval(
checkOverallCompletion,
1000
);

/* =========================
   DAILY PROGRESS RESET
========================= */


function checkNewDayReset(){

  const today =
  new Date().toDateString();


  const savedDay =
  localStorage.getItem(
    "progressDay"
  );


  if(savedDay !== today){


    localStorage.setItem(
      "progressDay",
      today
    );


    // reset today's completion notification

    localStorage.removeItem(
      "overallCompleted"
    );


    // refresh progress display

    updateProgress();


  }

}



setInterval(
checkNewDayReset,
60000
);


document.addEventListener(
"DOMContentLoaded",
checkNewDayReset
);

/* =========================
   DAILY CHALLENGE RESET
========================= */


function checkChallengeReset(){

  const today =
  new Date().toDateString();


  const savedDate =
  localStorage.getItem(
    "challengeDate"
  );


  if(savedDate !== today){


    localStorage.removeItem(
      "challengeRewarded"
    );


    localStorage.setItem(
      "challengeDate",
      today
    );


    updateChallenges();

  }

}



document.addEventListener(
"DOMContentLoaded",
checkChallengeReset
);


setInterval(
checkChallengeReset,
60000
);

/* =========================
   NOTIFICATION CLEANUP
========================= */


function cleanNotifications(){

  // remove duplicates

  notifications =
  notifications.filter(
    (item,index,self)=>


    index === self.findIndex(
      n =>
      n.title === item.title &&
      n.message === item.message &&
      n.time === item.time
    )

  );


  // keep only latest 50

  if(notifications.length > 50){

    notifications =
    notifications.slice(
      notifications.length - 50
    );

  }


  saveNotifications();

}



setInterval(
cleanNotifications,
30000
);

/* =========================
   APP LOADER
========================= */


window.addEventListener(
"load",
()=>{


const loader =
document.getElementById(
"appLoader"
);


if(loader){


setTimeout(()=>{


loader.style.opacity="0";


setTimeout(()=>{

loader.style.display="none";

},500);


},1000);


}


});


/* =========================
   NOTIFICATION SOUND
========================= */

function playNotificationSound(){

  const sound =
  document.getElementById("notificationSound");

  if(!sound) return;

  sound.currentTime = 0;

  sound.play().catch(()=>{});

}



/* =========================
   STUDYMATE NOTEBOOK
========================= */

let notes = JSON.parse(localStorage.getItem("studyNotes")) || [];

let editingNoteId = null;

const newNoteBtn = document.getElementById("newNoteBtn");
const noteEditor = document.getElementById("noteEditor");
const saveNoteBtn = document.getElementById("saveNoteBtn");

const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const noteCategory = document.getElementById("noteCategory");
const noteColor = document.getElementById("noteColor");
const notesContainer = document.getElementById("notesContainer");
const notePassword =
document.getElementById("notePassword");

/* Hide editor when page loads */
if(noteEditor){
    noteEditor.style.display = "none";
}

/* Open editor */
if(newNoteBtn){

newNoteBtn.onclick = function(){

noteEditor.style.display="block";
noteTitle.focus();

};

}
/* Save note */

saveNoteBtn.onclick = function () {

    if (noteTitle.value.trim() === "") {

        alert("Please enter a title.");
        return;

    }

    let noteData = {

title: noteTitle.value,

content: noteContent.value,

category: noteCategory.value,

color: noteColor.value,

password: notePassword.value,

locked: notePassword.value !== "",

pinned:false,

lastEdited: new Date().toLocaleString()

};


if(editingNoteId){

let note = notes.find(
n => n.id === editingNoteId
);


Object.assign(note, noteData);


editingNoteId = null;


}else{


notes.unshift({

id: Date.now(),

...noteData

});


}

    localStorage.setItem(
        "studyNotes",
        JSON.stringify(notes)
    );

    noteTitle.value = "";
    noteContent.value = "";

    noteCategory.selectedIndex = 0;
    noteColor.selectedIndex = 0;

    noteEditor.style.display = "none";

    displayNotes();

};

/* Display Notes */

function displayNotes() {

    notesContainer.innerHTML = "";

    let sortedNotes = [...notes].sort(
(a,b)=> b.pinned - a.pinned
);


sortedNotes.forEach(function(note){

        let card = document.createElement("div");

        card.className = "note-card";

        card.style.background = note.color;

        /* Make text readable */
        if (note.color === "#ffffff") {

            card.style.color = "#000";

        } else {

            card.style.color = "#222";

        }

card.innerHTML = `

<h3>
${note.locked ? "🔒 " : ""}
${note.title}
</h3>


<span class="note-category">
📂 ${note.category}
</span>


<small class="note-date">
📅 ${note.lastEdited || "No date"}
</small>


<div class="note-actions">

<button onclick="togglePin(${note.id}); event.stopPropagation();">

${note.pinned ? "📌 Unpin" : "📍 Pin"}

</button>

<button onclick="editNote(${note.id}); event.stopPropagation();">
✏️ Edit
</button>


<button onclick="deleteNote(${note.id}); event.stopPropagation();">
🗑️ Delete
</button>

</div>

`;

        card.onclick=function(){

openNote(note.id);

};

notesContainer.appendChild(card);

    });

}

displayNotes();

let currentNoteID=null;

function openNote(id){

let note =
notes.find(n=>n.id===id);


if(!note)return;


if(note.locked){

let password =
prompt("Enter note password");


if(password !== note.password){

alert("Wrong password");

return;

}

}


currentNoteID=id;


document.getElementById("viewTitle").textContent =
note.title;


document.getElementById("viewCategory").textContent =
"📂 "+note.category;


document.getElementById("viewContent").textContent =
note.content;


document.getElementById("viewDate").textContent =
"Last edited: "+note.lastEdited;


document.getElementById("noteModal").style.display="flex";

}

document.getElementById("closeNote").onclick=function(){

document.getElementById("noteModal").style.display="none";

};

const togglePassword =
document.getElementById("togglePassword");

if(togglePassword){

togglePassword.onclick = function(){

let password =
document.getElementById("notePassword");


if(password.type === "password"){

password.type = "text";
togglePassword.textContent = "🙈";

}else{

password.type = "password";
togglePassword.textContent = "👁";

}

};

}

function deleteNote(id){

notes =
notes.filter(note => note.id !== id);


localStorage.setItem(
"studyNotes",
JSON.stringify(notes)
);


displayNotes();

}

function editNote(id){

let note =
notes.find(n => n.id === id);


if(!note)return;


editingNoteId = id;


noteTitle.value = note.title;

noteContent.value = note.content;

noteCategory.value = note.category;

noteColor.value = note.color;

notePassword.value = note.password || "";


noteEditor.style.display="block";

}

displayNotes();


const searchNotes =
document.getElementById("searchNotes");


if(searchNotes){

searchNotes.addEventListener(
"input",
function(){

let text =
this.value.toLowerCase();


let filtered =
notes.filter(note =>

note.title.toLowerCase()
.includes(text)

);


displaySearch(filtered);


});

}



function displaySearch(data){

notesContainer.innerHTML="";


data.forEach(note=>{

let card =
document.createElement("div");

card.className="note-card";

card.style.background =
note.color;


card.innerHTML=`

<h3>${note.title}</h3>

<span class="note-category">
${note.category}
</span>

`;

card.onclick=function(){
openNote(note.id);
};

notesContainer.appendChild(card);


});

}

function togglePin(id){

let note =
notes.find(n => n.id === id);


if(!note)return;


note.pinned = !note.pinned;


localStorage.setItem(
"studyNotes",
JSON.stringify(notes)
);


displayNotes();

}


/* =========================
   STUDYMATE CALCULATOR
========================= */


let calcDisplay = document.getElementById("calcDisplay");


function calcInput(value){

    if(calcDisplay){
        calcDisplay.value += value;
    }

}


function calcClear(){

    if(calcDisplay){
        calcDisplay.value = "";
    }

}

function calcDelete(){

    if(!calcDisplay) return;

    calcDisplay.value =
    calcDisplay.value.slice(0,-1);

}


function calcAnswer(){

    if(!calcDisplay) return;

    try{

        calcDisplay.value = eval(calcDisplay.value);

    }

    catch(error){

        calcDisplay.value = "Error";

    }

}



/* Percentage Calculator */

function calculatePercentage(){

    let value =
    Number(document.getElementById("percentValue").value);

    let total =
    Number(document.getElementById("percentTotal").value);


    if(total === 0){

        document.getElementById("percentageResult").textContent =
        "Enter a valid total";

        return;

    }


    let result =
    (value / total) * 100;


    document.getElementById("percentageResult").textContent =
    "Result: " + result.toFixed(2) + "%";

}



/* Average Calculator*/

function calculateAverage(){

    let input =
    document.getElementById("scoreInput").value;


    let scores =
    input.split(",").map(Number);


    let total =
    scores.reduce((a,b)=>a+b,0);


    let average =
    total / scores.length;


    document.getElementById("averageResult").textContent =
    "Average Score: " + average.toFixed(2);

} 



/* GPA Helper*/

function calculateGPA(){

    let gpa =
    Number(document.getElementById("gpaInput").value);


    let result;


    if(gpa >= 4.5){

        result = "Excellent 🎉";

    }

    else if(gpa >= 3.5){

        result = "Very Good 👍";

    }

    else if(gpa >= 2.5){

        result = "Good, keep improving 💪";

    }

    else{

        result = "Keep working harder 📚";

    }


    document.getElementById("gpaResult").textContent = result;

} 

/* =========================
   PWA SERVICE WORKER
========================= */


if("serviceWorker" in navigator){

window.addEventListener("load", function(){

navigator.serviceWorker.register("service-worker.js")

.then(function(){

console.log("StudyMate Service Worker Registered");

})

.catch(function(error){

console.log("Service Worker Error:", error);

});

});

}





// =============================
// STUDYMATE INSTALL BUTTON
// =============================

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Hide the button if the app is already running as an installed app
window.addEventListener("DOMContentLoaded", () => {
    if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true ||
    window.Capacitor ||
    navigator.userAgent.includes("wv")
) {
        if (installBtn) {
            installBtn.remove();
        }
    }
});

// Save the install prompt
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    console.log("Install prompt is ready.");
});

// Install button click
if (installBtn) {
    installBtn.addEventListener("click", async () => {

        if (!deferredPrompt) {
            alert("Install is not available. The app may already be installed.");
            return;
        }

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        console.log("User choice:", outcome);

        deferredPrompt = null;

        if (outcome === "accepted") {
            installBtn.remove();
        }
    });
}

// Remove button after installation
window.addEventListener("appinstalled", () => {
    console.log("StudyMate installed!");

    if (installBtn) {
        installBtn.remove();
    }
});


