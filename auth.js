/*firebaseUser(firebaseAuth,(user)=>{

    if(user){

        window.location.href="index.html";

    }

});*/

const loginForm =
document.getElementById("loginForm");

const signupForm =
document.getElementById("signupForm");

document
.getElementById("openSignup")
.onclick = (e)=>{

    e.preventDefault();

    loginForm.style.display="none";

    signupForm.style.display="block";

};

document
.getElementById("openLogin")
.onclick = (e)=>{

    e.preventDefault();

    signupForm.style.display="none";

    loginForm.style.display="block";

};



const authMessage =
document.getElementById("authMessage");



document
.getElementById("signupBtn")
.onclick = async()=>{

    const name =
    document
    .getElementById("signupName")
    .value
    .trim();

    const email =
    document
    .getElementById("signupEmail")
    .value
    .trim();

    const password =
    document
    .getElementById("signupPassword")
    .value;



    if(!name || !email || !password){

        authMessage.textContent =
        "Please fill in all fields.";

        return;

    }

    try{

        const result =
        await firebaseCreateUser(

            firebaseAuth,

            email,

            password

        );

        // Save display name locally for now
        localStorage.setItem(
    "name",
    name
);

localStorage.setItem(
    "firebaseUID",
    result.user.uid
);

        authMessage.textContent =
"✅ Account created successfully!";

setTimeout(()=>{

    window.location.href = "index.html";

},1500);
        console.log(result.user);

    }catch(err){

        authMessage.textContent =
        err.message;

    }

};
document
.getElementById("loginBtn")
.onclick = async()=>{

    const email =
    document
    .getElementById("loginEmail")
    .value
    .trim();

    const password =
    document
    .getElementById("loginPassword")
    .value;

    if(!email || !password){

        authMessage.textContent =
        "Please enter your email and password.";

        return;

    }

    try{

        const result =
    await firebaseLogin(
        firebaseAuth,
        email,
        password
    );

localStorage.setItem(
    "firebaseUID",
    result.user.uid
);

        authMessage.textContent =
        "✅ Login successful!";

        // Go to StudyMate
        window.location.href = "index.html";

    }catch(err){

        authMessage.textContent =
        err.message;

    }

};
function togglePassword(inputId,buttonId){

    const input =
    document.getElementById(inputId);

    const button =
    document.getElementById(buttonId);


    button.onclick=()=>{


        if(input.type==="password"){

            input.type="text";

            button.textContent="🙈";

        }else{

            input.type="password";

            button.textContent="👁️";

        }

    };

}



togglePassword(
"loginPassword",
"showLoginPassword"
);


togglePassword(
"signupPassword",
"showSignupPassword"
);

document
.getElementById("forgotPassword")
.onclick=async(e)=>{


e.preventDefault();


const email =
document
.getElementById("loginEmail")
.value
.trim();



if(!email){

authMessage.textContent =
"Enter your email first.";

return;

}



try{


await window.firebaseResetPassword(

window.firebaseAuth,

email

);


authMessage.textContent =
"✅ Password reset email sent.";


}catch(err){


authMessage.textContent =
err.message;


}


};