// ----- Деректерді localStorage-тан алу немесе бастапқы мәндер -----
let userData = JSON.parse(localStorage.getItem('userProfile')) || {
    name: "Аян",
    surname: "Сапарбаев",
    phone: "+7 777 123 45 67",
    school: "№123 мектеп",
    class: "10 А",
    birthday: "2007-05-15",
    email: "ayan@example.com",
    avatar: "../assets/icons/profile.svg",
    progress: { HTML: 70, CSS: 50, JS: 30 },
    badges: ["Курс аяқтады", "5 видео көрді"],
    lastCourse: "HTML базасы",
    lastTask: "CSS тапсырмасы"
};

// ----- Элементтерді таңдау -----
const userNameEl = document.getElementById("userName");
const userSurnameEl = document.getElementById("userSurname");
const userPhoneEl = document.getElementById("userPhone");
const userSchoolEl = document.getElementById("userSchool");
const userClassEl = document.getElementById("userClass");
const userBirthdayEl = document.getElementById("userBirthday");
const userEmailEl = document.getElementById("userEmail");
const avatarEl = document.getElementById("avatar");

const htmlProgressEl = document.getElementById("htmlProgress");
const cssProgressEl = document.getElementById("cssProgress");
const jsProgressEl = document.getElementById("jsProgress");

const badgesContainer = document.getElementById("badgesContainer");
const lastCourseEl = document.getElementById("lastCourse");
const lastTaskEl = document.getElementById("lastTask");

const editBtn = document.getElementById("editBtn");

// ----- Функция: Деректерді көрсету -----
function renderProfile() {
    userNameEl.textContent = userData.name;
    userSurnameEl.textContent = userData.surname;
    userPhoneEl.textContent = userData.phone;
    userSchoolEl.textContent = userData.school;
    userClassEl.textContent = userData.class;
    userBirthdayEl.textContent = userData.birthday;
    userEmailEl.textContent = userData.email;
    avatarEl.src = userData.avatar;

    htmlProgressEl.style.width = userData.progress.HTML + "%";
    htmlProgressEl.textContent = userData.progress.HTML + "%";

    cssProgressEl.style.width = userData.progress.CSS + "%";
    cssProgressEl.textContent = userData.progress.CSS + "%";

    jsProgressEl.style.width = userData.progress.JS + "%";
    jsProgressEl.textContent = userData.progress.JS + "%";

    badgesContainer.innerHTML = "";
    userData.badges.forEach(badge => {
        const div = document.createElement("div");
        div.classList.add("badge");
        div.textContent = badge;
        badgesContainer.appendChild(div);
    });

    lastCourseEl.textContent = "Соңғы кірген курс: " + userData.lastCourse;
    lastTaskEl.textContent = "Соңғы тапсырма: " + userData.lastTask;
}

// ----- Редактирование функциясы -----
editBtn.addEventListener("click", () => {
    const newName = prompt("Атыңызды енгізіңіз:", userData.name);
    if (newName) userData.name = newName;

    const newSurname = prompt("Тегіңізді енгізіңіз:", userData.surname);
    if (newSurname) userData.surname = newSurname;

    const newPhone = prompt("Телефон нөміріңіз:", userData.phone);
    if (newPhone) userData.phone = newPhone;

    const newSchool = prompt("Мектеп атауы:", userData.school);
    if (newSchool) userData.school = newSchool;

    const newClass = prompt("Сынып:", userData.class);
    if (newClass) userData.class = newClass;

    const newBirthday = prompt("Туған күніңіз (YYYY-MM-DD):", userData.birthday);
    if (newBirthday) userData.birthday = newBirthday;

    const newEmail = prompt("Email:", userData.email);
    if (newEmail) userData.email = newEmail;

    // Прогресс өзгерту (қаласа)
    const newHTML = prompt("HTML прогресс (0-100):", userData.progress.HTML);
    if (newHTML) userData.progress.HTML = parseInt(newHTML);

    const newCSS = prompt("CSS прогресс (0-100):", userData.progress.CSS);
    if (newCSS) userData.progress.CSS = parseInt(newCSS);

    const newJS = prompt("JS прогресс (0-100):", userData.progress.JS);
    if (newJS) userData.progress.JS = parseInt(newJS);

    // Бейдждерді өзгерту
    const newBadges = prompt("Бейдждерді үтір арқылы енгізіңіз:", userData.badges.join(", "));
    if (newBadges) userData.badges = newBadges.split(",").map(b => b.trim());

    // Соңғы әрекеттер
    const newLastCourse = prompt("Соңғы курс:", userData.lastCourse);
    if (newLastCourse) userData.lastCourse = newLastCourse;

    const newLastTask = prompt("Соңғы тапсырма:", userData.lastTask);
    if (newLastTask) userData.lastTask = newLastTask;

    // Жаңартуды сақтау
    localStorage.setItem('userProfile', JSON.stringify(userData));
    renderProfile();
});

// ----- Бастапқы көрсету -----
renderProfile();
