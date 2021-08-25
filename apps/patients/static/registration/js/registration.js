const $btn_submit_register = document.querySelector("#submitRegister");

$btn_submit_register.addEventListener("click", submitRegister, false);

function validateForm() {
  const $name = document.querySelector("#name");
  const $surname = document.querySelector("#surname");
  const $dni = document.querySelector("#dni");
  const $gender = document.querySelector("#gender");
  const $date_of_birth = document.querySelector("#date_of_birth");

  const $location = document.querySelector("#location");
  const $treatment = document.querySelector("#treatment");
  const $password = document.querySelector("#password");
  const $password_c = document.querySelector("#password_c");

  const $user = document.querySelector("#user");

  if ($name.value == "") {
    setResponseMsg("Debe informar su nombre", true);
    return false;
  }
  if ($surname.value == "") {
    setResponseMsg("Debe informar su apellido", true);
    return false;
  }
  if ($dni.value == "") {
    setResponseMsg("Debe informar su número de documento", true);
    return false;
  }
  if ($gender.value == "") {
    setResponseMsg("Debe informar su sexo", true);
    return false;
  }
  if ($date_of_birth.value == "") {
    setResponseMsg("Debe informar su fecha de nacimiento", true);
    return false;
  }
  if ($location.value == "") {
    setResponseMsg("Debe informar su localidad de residencia", true);
    return false;
  }
  if ($treatment.value == "") {
    setResponseMsg("Debe informar el tipo de tratamiento", true);
    return false;
  }

  if ($user.value == "") {
    setResponseMsg("Debe informar su nombre de usuario", true);
    return false;
  }

  if ($password.value == "") {
    setResponseMsg("Debe informar su contraseña", true);
    return false;
  }

  if ($password_c.value == "") {
    setResponseMsg("Debe confirmar su contraseña", true);
    return false;
  }

  if($password != $password_c){
    setResponseMsg("Las contraseñas no coinciden", true);
    return false;
  }

  return true;
}

function submitRegister(e) {
  e.preventDefault();

  if (!validateForm()) return;

  let csrftoken = getCookie("csrftoken");
  let formData = new FormData(document.querySelector("#formRegister"));

  fetch("/create_user/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data[0].status == "ok") {
        location.href = "/accounts/login/?status=ok";
      } else {
        setResponseMsg(`Ocurrió un error: ${data[0].message}`, true);
      }
    })
    .catch((e) => {
      setResponseMsg("Ocurrió un error", true);
      console.log("Error");
    });
}

function setResponseMsg(message, error = false) {
  const $div_message = document.querySelector("#message");

  $div_message.innerHTML = message;
  $div_message.classList.remove("alert-danger", "alert-success");

  if (error) {
    $div_message.classList.add("alert-danger");
  } else {
    $div_message.classList.add("alert-success");
  }

  $div_message.style.display = "block";
}
