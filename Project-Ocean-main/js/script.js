const email = document.getElementById("exampleInputEmail1").value
const password = document.getElementById("exampleInputPassword1").value
const btn = document.getElementById("submitBtn")

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    // let emailTxt = email.innerHTML
    // let passwordTxt = password.innerText

    console.log(email, password)
})
