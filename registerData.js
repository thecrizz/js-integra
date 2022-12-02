const inputRegisterUser = document.querySelector(".input-reUser");
const inputRegisterPassword = document.querySelector(".input-rePassword");
const inputRepeatPassword = document.querySelector(".repeat-password");
const btnRegister = document.querySelector(".button-registrar");
const form = document.getElementById("form");

let user = JSON.parse(localStorage.getItem("user")) || [];

const saveLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

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

const isPasswordValid = (pass) => {
  const passworRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passworRegex.test(pass);
};

const checkTextInput = (input) => {
  let valid = false;

  const content = input.value.trim();

  if (isEmpty(content)) {
    showError(input, "Este campo es requerido");
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
    showError(input, "Minimo 8 caracteres, al menos una letra y un numero");
  } else {
    clearError(input);
    valid = true;
  }
  return valid;
};

const isRepeatPassValid = (pass) => {
  const inputContent = inputRegisterPassword.value.trim() === pass;

  console.log(inputContent);
  return inputContent;
};

const checkRepeatPass = (input) => {
  let valid = false;

  const content = input.value.trim();

  if (isEmpty(content)) {
    showError(input, "Este campo es requerido");
  } else if (!isRepeatPassValid(content)) {
    showError(input, "Las passwords no coinciden");
  } else {
    clearError(input);
    valid = true;
  }
  return valid;
};

const isValidForm = () => {
  const isValidName = checkTextInput(inputRegisterUser);
  const isValidPassword = checkPassword(inputRegisterPassword);
  const isValidRepeatPass = checkRepeatPass(inputRepeatPassword);

  return isValidName && isValidPassword && isValidRepeatPass;
};

const submitForm = (e) => {
  e.preventDefault();
  if (isValidForm()) {
    saveData();
    alert("Felicitaciones! El registro se ha completado");
    saveLocalStorage(user);
    form.reset();
    window.location.href = "login.html";
  }
};

const saveData = () => {
  user = [
    ...user,
    {
      id: user.length + 1,
      username: inputRegisterUser.value,
      password: inputRegisterPassword.value,
    },
  ];
};

function initLogin() {
  form.addEventListener("submit", submitForm);
}

initLogin();
