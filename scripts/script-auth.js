import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyACMunaPmYKXnphdouIc6T8fDTJHfL8Q1Q",
    authDomain: "ecommerce-thefeerid.firebaseapp.com",
    projectId: "ecommerce-thefeerid",
    storageBucket: "ecommerce-thefeerid.appspot.com",
    messagingSenderId: "340163398169",
    appId: "1:340163398169:web:a2ba8e0e8f2557dd4f3888",
    measurementId: "G-2Q0G4FHG5T"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const loader = document.getElementById('loader');

const apiKey = "AIzaSyACMunaPmYKXnphdouIc6T8fDTJHfL8Q1Q";
const authtestemail = "authtestemail@test.com";  // İstədiyiniz email
const authtestpassword = "authtestpassword";     // İstədiyiniz şifrə

function signInUser() {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: authtestemail,
            password: authtestpassword,
            returnSecureToken: true
        })
    });
}

function signUpUser() {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: authtestemail,
            password: authtestpassword,
            returnSecureToken: true
        })
    });
}

signInUser()
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById('error-domain-div').classList.remove('hidden')
            throw new Error("ResponseIsOk");
        }
    })
    .then(data => {
        console.log("ResponseIsOk");
    })
    .catch(error => {
        console.log(error.message);
        signUpUser()
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    document.getElementById('error-domain-div').classList.remove('hidden')
                    throw new Error("ResponseIsInvalid.");
                }
            })
            .then(data => {
                console.log("ResponseIsOk");
            })
            .catch(error => {
                document.getElementById('error-domain-div').classList.remove('hidden')
                console.error("Eroor:", error.message);
            });
    });