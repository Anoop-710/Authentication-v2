function display_home(){
    document.getElementById("home").style.display = "block";
    document.getElementById("sign-up-form").style.display = "none"
    document.getElementById("login-form").style.display = "none";
    


    document.getElementById("home-link").classList.add("active");
    document.getElementById("sign-up-link").classList.remove("active");
    document.getElementById("login-link").classList.remove("active");
}


function display_signUp(){
    //display signup and hide the rest
    document.getElementById("home").style.display = "none";
    document.getElementById("sign-up-form").style.display = "block"
    document.getElementById("login-form").style.display = "none";
    
    //classList returns the array of all the classes assigned to an element
    //To add a class use classList.add("class name")
    //To remove a class use classList.remove("class name")
    document.getElementById("home-link").classList.remove("active");
    document.getElementById("sign-up-link").classList.add("active");
    document.getElementById("login-link").classList.remove("active");
    
}


function display_login(){
    document.getElementById("home").style.display = "none";
    document.getElementById("sign-up-form").style.display = "none"
    document.getElementById("login-form").style.display = "block";

    document.getElementById("home-link").classList.remove("active");
    document.getElementById("sign-up-link").classList.remove("active");
    document.getElementById("login-link").classList.add("active");
}




let users_DB = [];

//Sign-up form validation
function validation(){
    
    let firstName = document.getElementById('first-name').value
    let lastName = document.getElementById('last-name').value
    let email = document.getElementById('email').value
    let phoneNumber = document.getElementById('phone-number').value
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    
    
    let error = false;


    if(firstName.length >= 2){
        document.getElementById('valid-first-name').style.display = 'block';
        document.getElementById('invalid-first-name').style.display = 'none';
    }
    else{
        error = true;
        document.getElementById('invalid-first-name').style.display = 'block';
        document.getElementById('valid-first-name').style.display = 'none';
    }


    if(lastName.length >= 2){
        document.getElementById('valid-last-name').style.display = 'block';
        document.getElementById('invalid-last-name').style.display = 'none';
    }
    else{
        error = true;
        document.getElementById('invalid-last-name').style.display = 'block';
        document.getElementById('valid-last-name').style.display = 'none';
    }


   
    if(email.includes('@') && 
        email.includes('.') && 
        email.indexOf("@")>0 && 
        // email.substr(email.lastIndexOf('.')+1).length>=2)
        email.substr(email.lastIndexOf('.')+1).length>=2)
        {
        document.getElementById("valid-email").style.display = 'block';
        document.getElementById("invalid-email").style.display = 'none';
    }
    else{
        error = true;
        document.getElementById("invalid-email").style.display = 'block';
        document.getElementById("valid-email").style.display = 'none';
    }


    let verifyPhoneNumber = parseInt(phoneNumber)
    if(!isNaN(verifyPhoneNumber) &&
        verifyPhoneNumber >= 1000000000 &&
        verifyPhoneNumber < 9999999999){
        document.getElementById("valid-phone-number").style.display = 'block';
        document.getElementById("invalid-phone-number").style.display = "none";
    }
    else{
        error = true;
        document.getElementById("valid-phone-number").style.display = 'none';
        document.getElementById("invalid-phone-number").style.display = "block";
    }

    if(password.length < 6){
        error = true;
        document.getElementById('invalid-password').style.display = 'block';
    }
    else{
        document.getElementById('invalid-password').style.display = 'none';
    }

    if(password!==confirmPassword){
        console.log('hello');
        document.getElementById("invalid-confirm-password").style.display = 'block';
        error = true;
    }
    else{
        document.getElementById("invalid-confirm-password").style.display = 'none';
    }
    

    if(!error){

        let userDetails = {
            //keyName === varName,so use object property assignment
            firstName,
            lastName,
            email,
            phoneNumber,
            password: encryptPassword(password),
        }
        users_DB.push(userDetails);
        alert("your details have been saved successfully");
        document.getElementById("sign-up-form-reset").reset();
        document.getElementById('valid-first-name').style.display = 'none'
        document.getElementById('valid-last-name').style.display = 'none'
        document.getElementById('valid-email').style.display = 'none'
        document.getElementById('valid-phone-number').style.display = 'none'
        console.log(users_DB);
    }
     
}

// 3.After sign up,login with same credentials:
    //  a.If email and password match: Show 'Access granted' alert
    //  b.If email and password don't match: Show 'Access denied' alert
function login(){
    let login_email = document.getElementById("login-email").value;
    let login_password = document.getElementById("login-password").value;

    // 1.Check wether any user exists in USERS_DB with the entered email(login email)
    // 2.If user exists,then check wether the password for that user matches with the entered password
    if(users_DB.find(user=>user.email === login_email && decryptPassword(user.password) === login_password)){
        alert("Access granted");

    }
    else{
        alert("Access denied");
    }
}



let encryptionRule = {
    'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
    'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
    'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
    'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
    'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
    'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
    'Y': 'L', 'Z': 'M',
    'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
    'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
    'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
    'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
    'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
    'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
    'y': 'l', 'z': 'm',
    '0': '5', '1': '6', '2': '7', '3': '8',
    '4': '9', '5': '0', '6': '1', '7': '2',
    '8': '3', '9': '4',
    '!': '#', '$': '%', '&': '+', '-': '@',
    '': '~', '#': '!', '%': '$', '+': '&',
    '@': '-', '~': ''
 }


function encryptPassword(inputString){
     let encryptedString = '';
     

     //for of or forEach to loop through
     for(let char of inputString){
        encryptedString = encryptedString + encryptionRule[char];
     }
     return encryptedString;
}

function decryptPassword(encryptedString){
    let orginalString = '';
    let keys = Object.keys(encryptionRule);
    let value = Object.values(encryptionRule);
    for(let char of encryptedString){
        let requiredIndex = value.indexOf(char);
        orginalString = orginalString + keys[requiredIndex];
    }
    return orginalString;
}

