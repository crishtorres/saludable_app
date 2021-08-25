const $afters_name = document.querySelector("#id_afters_name");
const $tentation_name = document.querySelector("#id_tentation_name");
const $select_after = document.querySelector("#id_afters");
const $select_tentation = document.querySelector("#id_tentation");
const $kind_food = document.querySelector("#id_kind_of_food");
const $add_daily_food = document.querySelector("#add_daily_food");
const $table_foods = document.querySelector("#table_foods_body");
const $btn_open_modal = document.querySelector("#btn_open_modal");
const $was_hungry = document.querySelector("#id_was_hungry");

const $primary_food = document.querySelector("#id_primary_food");
const $secondary_food = document.querySelector("#id_secondary_food");
const $drink = document.querySelector("#id_drink");

const $btn_submit_food = document.querySelector("#btn_submit_food");

let is_edit = false;
let date_edit;

let daily_foods = [];

window.addEventListener("load", () => {
  let date = new Date();

  if (is_edit) {
    document.querySelector("#id_date").value = date_edit;
  } else {
    document.querySelector("#id_date").value = `${date.getFullYear().toString()}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  }
});

// Habilito o deshabilito el postre si no es cena o almuerzo
$kind_food.addEventListener("change", () => {
  if ($kind_food.value == "A" || $kind_food.value == "C") {
    $select_after.disabled = false;
  } else {
    $select_after.value = "N";
    $select_after.disabled = true;
    $afters_name.value = "";
    $afters_name.disabled = true;
  }

  // $select_after.disabled = $kind_food.value == "A" || $kind_food.value == "C" ? false : true;
});

// Habilito el nombre del postre
$select_after.addEventListener(
  "change",
  () => {
    $afters_name.toggleAttribute("disabled");
  },
  false
);

// Habilito el nombre del alimento por el cual se tento
$select_tentation.addEventListener(
  "change",
  () => {
    $tentation_name.toggleAttribute("disabled");
    $tentation_name.value = "";
  },
  false
);

// Inicializo el modal
$btn_open_modal.addEventListener(
  "click",
  (e) => {
    e.preventDefault();

    document.querySelector("#modal_message").style.display = "none";

    $kind_food.value = "D";
    $primary_food.value = "";
    $secondary_food.value = "";
    $drink.value = "";
    $select_after.value = "N";
    $select_after.disabled = true;
    $afters_name.value = "";
    $afters_name.disabled = true;
    $select_tentation.value = "N";
    $tentation_name.value = "";
    $tentation_name.disabled = true;
    $was_hungry.value = "N";

    document.querySelector("#id_date").disabled = is_edit ? true : false;

    $("#modalFoods").modal("show");
  },
  false
);

// Agrego nuevo alimento
$add_daily_food.addEventListener("click", addDailyFood, false);

// Envio los alimentos al backend
$btn_submit_food.addEventListener("click", submitFormFoods, false);

// Listener global
document.addEventListener(
  "click",
  (e) => {
    if (e.target.classList.contains("btn-del-type")) {
      delete_food = confirm("¿Esta seguro que desea eliminar el registro?");

      if (delete_food) {
        delete_type_food(e.target.dataset.type);
      }
    }
  },
  false
);

function submitFormFoods(e) {
  if (daily_foods.length == 0) {
    setStatusMsg("No registro ningún alimento.", true);
    return;
  }

  e.preventDefault();

  let csrftoken = getCookie("csrftoken");
  fetch("/register_food/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
      "is-edit": is_edit,
    },
    body: JSON.stringify(daily_foods),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data[0].status == "ok") {
        daily_foods = [];
        $table_foods.innerHTML = ""
        document.querySelector("#message").innerHTML = "";
        document.querySelector("#message").style.display = "none";
        makeDrinkTemplate(data[0].drink_api.drinks[0]);
      } else {
        setStatusMsg(`Ocurrió un error: ${data[0].message}`, true);
      }
    })
    .catch((e) => {
      setStatusMsg("Ocurrió un error", true);
      console.log("Error");
    });
}

function delete_type_food(type) {
  $table_foods.innerHTML = "";

  let res = daily_foods.filter((food) => {
    return food.type !== type;
  });

  daily_foods = res;

  daily_foods.forEach((element) => {
    createElementTableFoods(element);
  });
}

function addDailyFood(e) {
  e.preventDefault();

  let type_food,
    name_type_food,
    primary_food,
    secondary_food,
    drink,
    afters,
    afters_name,
    tentation,
    tentation_name,
    was_hungry,
    date_register,
    exists = false;

  type_food = $kind_food.value;
  name_type_food = $kind_food[$kind_food.selectedIndex].innerText;
  primary_food = $primary_food.value;
  secondary_food = $secondary_food.value;
  drink = $drink.value;
  afters = $select_after.value;
  afters_name = $afters_name.value;
  tentation = $select_tentation.value;
  tentation_name = $tentation_name.value;
  was_hungry = $was_hungry.value;
  date_register = document.querySelector("#id_date").value;

  if (primary_food == "") {
    setModalMsg("Debe informar la comida principal");
    return;
  }

  if (afters == "S" && afters_name == "") {
    setModalMsg("Debe informar el postre!");
    return;
  }

  if (tentation == "S" && tentation_name == "") {
    setModalMsg("Debe informar el alimento por que el cual tuvo tentación de consumir!");
    return;
  }

  selectedFood = {
    type: type_food,
    name: name_type_food,
    primary_food,
    secondary_food,
    drink,
    afters,
    afters_name,
    tentation,
    tentation_name,
    was_hungry,
    date_register,
  };

  daily_foods.forEach((element) => {
    if (element.type == type_food) {
      exists = true;
    }
  });

  if (exists) {
    setModalMsg(`${name_type_food} ya se encuentra registrado.`);
  } else {
    daily_foods.push(selectedFood);

    loadDailyFoodsInTable();
    setStatusMsg("Alimento añadido correctamente", false);
    $("#modalFoods").modal("hide");
  }
}

function loadDailyFoodsInTable() {
  $table_foods.innerHTML = "";
  daily_foods.forEach((element) => {
    createElementTableFoods(element);
  });
}

// Creo la fila del alimento
function createElementTableFoods(element) {
  let tr = document.createElement("tr");
  let date_register = document.createElement("td");
  let type = document.createElement("td");
  let primary = document.createElement("td");
  let secondary = document.createElement("td");
  let drink = document.createElement("td");
  let afters = document.createElement("td");
  let afters_name = document.createElement("td");
  let tentation = document.createElement("td");
  let tentation_name = document.createElement("td");
  let was_hungry = document.createElement("td");

  let td_action = document.createElement("td");
  let action = document.createElement("button");

  type.innerText = element.name;
  date_register.innerText = element.date_register;
  primary.innerText = element.primary_food;
  secondary.innerText = element.secondary_food;
  drink.innerText = element.drink;
  afters.innerText = element.afters == "S" ? "Si" : "No";
  afters_name.innerText = element.afters_name;
  tentation.innerText = element.tentation == "S" ? "Si" : "No";
  tentation_name.innerText = element.tentation_name;
  was_hungry.innerText = element.was_hungry == "S" ? "Si" : "No";

  tr.appendChild(date_register);
  tr.appendChild(type);
  tr.appendChild(primary);
  tr.appendChild(secondary);
  tr.appendChild(drink);
  tr.appendChild(afters);
  tr.appendChild(afters_name);
  tr.appendChild(tentation);
  tr.appendChild(tentation_name);
  tr.appendChild(was_hungry);

  action.classList.add("btn", "btn-warning", "btn-del-type");
  action.dataset.type = element.type;
  action.innerText = "Eliminar";
  td_action.appendChild(action);
  tr.appendChild(td_action);

  $table_foods.appendChild(tr);
}

// Establezco el mensaje resultado
function setStatusMsg(message, error = false) {
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

//Esta funcion solo la voy a usar cuando de un error
function setModalMsg(message) {
  const modal_message = document.querySelector("#modal_message");
  modal_message.style.display = "block";
  modal_message.innerHTML = message;
}

function makeDrinkTemplate(data) {
  let $modal_drink_body = document.querySelector("#modal_drink_body");
  $modal_drink_body.innerHTML = "";

  let row = document.createElement("div");
  let col = document.createElement("div");

  row.classList.add("row");
  col.classList.add("col-md-4");

  let img = document.createElement("img");
  img.setAttribute('src',data.strDrinkThumb);
  img.classList.add("img-responsive");

  col.appendChild(img)
  row.appendChild(col);

  col = document.createElement("div");
  col.classList.add("col-md-8");

  let title = document.createElement("h3");
  let subtitle = document.createElement("small");
  let p = document.createElement("p");
  let b = document.createElement("b");
  let ul = document.createElement("ul");
  let li;

  for (let i = 1; i <= 15; i++) {
    if (data["strIngredient" + i] != "" && data["strIngredient" + i] != null) {
      li = document.createElement("li");
      li.innerText = data["strIngredient" + i];
      
      if(data["strMeasure" + i] != '' && data["strMeasure" + i] != null){
        li.innerText+= " " + data["strMeasure" + i]
      }else{
        li.innerText+= " c/n"
      }

      ul.appendChild(li)
    }
  }

  let text = document.createTextNode("Ingredientes")
  b.appendChild(text)
  p.appendChild(b);

  text = document.createTextNode(data.strDrink)
  title.appendChild(text)
  
  text = document.createTextNode(`${data.strCategory} - ${data.strGlass}`)
  subtitle.appendChild(text)


  col.appendChild(title);
  col.appendChild(subtitle);
  col.appendChild(p);
  col.appendChild(ul)

  p = document.createElement("p");
  b = document.createElement("b");
  text = document.createTextNode("Instrucciones")

  b.appendChild(text)
  p.appendChild(b)

  col.appendChild(p)

  p = document.createElement("p");
  if(data.strInstructionsES != null){
    text = document.createTextNode(data.strInstructionsES)
  }else if(data.strInstructions != null){
    text = document.createTextNode(data.strInstructions)
  }

  p.appendChild(text)
  col.appendChild(p)

  row.appendChild(col);

  $modal_drink_body.appendChild(row);
  $("#modalDrinks").modal("show");
}
