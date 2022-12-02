const inputUser = document.querySelector(".input-user");
const inputPassword = document.querySelector(".input-password");
const form = document.getElementById("form");
const loadingMsg = document.querySelector(".loading-msg")

let user = JSON.parse(localStorage.getItem("user")) || [];

const checkForm = () => {};

const isEmpty = (valor) => (valor === "" ? true : false);

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

const clearError = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const isUsernameValid = (usuario) => {
  const checkUser = user.some((name) => name.username === usuario);
  return checkUser;
};

const isPasswordValid = (contra) => {
  const checkPass = user.some((pass) => pass.password === contra);
  return checkPass;
};

const checkUsername = (input) => {
  let valid = false;

  const content = input.value.trim();

  if (isEmpty(content)) {
    showError(input, "Este campo es requerido");
  } else if (!isUsernameValid(content)) {
    showError(input, "El usuario ingresado es incorrecto");
  } else {
    clearError(input);
    valid = true;
  }
  return valid;
};

const checkPassword = (input) => {
  let valid = false;

  const content = input.value.trim();

  if (isEmpty(content)) {
    showError(input, "Este campo es requerido");
  } else if (!isPasswordValid(content)) {
    showError(input, "Password ingresado incorrecto");
  } else {
    clearError(input);
    valid = true;
  }
  return valid;
};

const isValidForm = () => {
  const isValidName = checkUsername(inputUser);
  const isValidPassword = checkPassword(inputPassword);

  return isValidName && isValidPassword;
};

const submitForm = (e) => {
  e.preventDefault();
  if (isValidForm()) {
		showMsgLoading()
    form.reset();
		setTimeout(function(){
    window.location.href = "index.html";
		},3000)
  }
};

const showMsgLoading = () => {
	loadingMsg.classList.remove("show-msg")
}


function loginInit() {
  form.addEventListener("submit", submitForm);
}

loginInit();
