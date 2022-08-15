// VARIABLES

const USERS = [ 
    { name: "supercode", secret: "no_one_will_know" },
    { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
    { name: "admin", secret: "1234" },
];

let submitButtonModal = document.querySelector("#submit-modal");
let userNameOutput = document.querySelector("#user-name-output");
let userPassWord = document.querySelector("#pass-word-input");
let cookieData = document.cookie;
let welcomeMessage = document.querySelector("#welcome-message");
let modal = document.querySelector("#modal");
let formCheckAlert = document.querySelector("#emptyFieldAlert");

// FUNCTION FOR COOKIE CHECK

checkCookieStatus = () =>{
    if (document.cookie == "") {
        modal.style.display = "flex";
        welcomeMessage.style.opacity = "0";
    }
    else{
        modal.style.display = "none";
        userNameOutput.innerText = cookieData.split("; ")[0].slice(9);
        welcomeMessage.style.opacity = "unset";
    }
}
checkCookieStatus();

// FUNCTION FOR LOG OUT --- EVENT: CLICK ON LOG OUT-BUTTON

let logOutLink = document.querySelector("#log-out-link");

logOutLink.addEventListener("click", () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    checkCookieStatus();
})

// FUNCTION FOR THE LOG IN --- EVENT: CLICK ON SUBMIT-BUTTON

submitButtonModal.addEventListener("click", () => {

    // VARIABLES

    let userNameInput = document.querySelector("#user-name-input");
    let userNameInputCheck = userNameInput.value.toLowerCase();

    // FUNCTION FOR CLEARING ERROR MESSAGE ON EVERY BUTTON CLICK

    clearError = () =>{
        formCheckAlert.innerHTML = ""
    }

    clearError();

    // FUNCTION FOR CHECKING EMPTY FIELDS

    document.querySelectorAll("input").forEach(field =>{
        checkEmptyField = () =>{
            if (field.value.length === 0){
                formCheckAlert.innerHTML += `*${field.placeholder} is requiered.<br>`;
            }
        }
        checkEmptyField();
    })

    // FUNCTION FOR CHECKING IF USER EXISTS
    
    checkUserList = () =>{
        let USERSnames = USERS.map((USERS) => {
            return USERS.name
        })
    
        if (USERSnames.includes(userNameInputCheck) == false && userNameInput.value.length >= 1){
            formCheckAlert.innerHTML += `*user does not exist.`;
            userNameInput.style.color = "#FF002E";
            userPassWord.style.color = "#FF002E";
        }
        else{
            userNameInput.style.color = "";
        }
    }

    checkUserList();

    // FUNCTION FOR CHECKING USERNAME AND PASSWORD COMBINATION

    USERS.forEach(USER =>{
        if (userNameInputCheck == USER.name && userPassWord.value == USER.secret) {
            modal.style.display = "none";
            userNameOutput.innerText = userNameInputCheck;
            document.cookie = `username=${userNameInput.value}; expires=Wed, 10 Aug 2024 16:13:00 UTC; path=/`;
            document.cookie = `password=${userPassWord.value}; expires=Wed, 10 Aug 2024 16:13:00 UTC; path=/`;
            welcomeMessage.style.opacity = "unset";
        }
        else if (userNameInputCheck == USER.name && userPassWord.value != USER.secret && userPassWord.value.length >= 1){
            formCheckAlert.innerHTML += `*password is wrong`;
            userPassWord.style.color = "#FF002E";
        }
        else if (document.getElementById("user-name-input").value.length == 0 && userPassWord.value.length == 0){
            userNameInput.style.color = "#FF002E";
            userPassWord.style.color = "#FF002E";
        }
        else if (document.getElementById("user-name-input").value.length == 0 && userPassWord.value.length >= 1){
            userNameInput.style.color = "#FF002E";
        }
    })
})