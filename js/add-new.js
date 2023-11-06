const imageIn = document.querySelector("#image-in");
const label = document.querySelector("#upload-img-label");
const submitButton = document.querySelector(".btn");
let uploadedImage = "";

imageIn.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImage = reader.result;
        document.querySelector("#image-input").style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(this.files[0]);
    label.style.display = "none";
});


// For disabling form submissions if there are invalid fields
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
          alert("The movie was added successfully!")
      }

      form.classList.add('was-validated')
    }, false)
  })
})()