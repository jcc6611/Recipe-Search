// author: Jason Cheung

function getValue() {
  let value;
  value = document.getElementById("save-entry").value;
  console.log(value);
  document.getElementById("save-entry").value = "";
}

document.getElementById("save-button").addEventListener("click", getValue);

//Event listener for enter key
document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    getValue();
  }
});
