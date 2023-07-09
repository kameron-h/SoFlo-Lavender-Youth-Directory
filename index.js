const themeButton = document.getElementById("theme-button");
const motionButton = document.getElementById("motion-button");
const buttons = document.querySelectorAll('button');
const dropdown = document.querySelectorAll('.dropdown-content');
const signButton = document.getElementById('sign-now-button');
const signatures = document.getElementById('signatures');
const form = document.getElementById('sign-petition');
const revealableContainers = document.querySelectorAll('.revealable');
const modal = document.getElementById('thanks-modal');
const modalContent = document.getElementById('thanks-modal-content');
const modalImage = document.getElementById('modal-image');
const modalButton = document.getElementById('close-modal-button');

let scaleFactor = 1;

// Light Mode function
const toggleLightMode = () => {
  document.body.classList.toggle("light-mode");
  document.getElementsByTagName('h3')[0].classList.toggle("light-mode");
  document.getElementsByClassName('header-container')[0].classList.toggle("lightmode-header");

  for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].classList.toggle("lightmode-dropdown");
  }

  for (let i = 2; i < buttons.length; i++) {
      buttons[i].classList.toggle("light-mode");
  }
  
  if (themeButton.innerHTML == "Toggle Light Mode") {
    themeButton.innerHTML = "Toggle Dark Mode";
  } else {
    themeButton.innerHTML = "Toggle Light Mode";
  }
}

themeButton.addEventListener("click", toggleLightMode);

// Website elements fade-in animation
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let revealTop = revealableContainers[i].getBoundingClientRect().top;
    let revealBottom = revealableContainers[i].getBoundingClientRect().bottom;

    if (revealableContainers[i].classList.contains("active")) {
      if (revealTop < (window.innerHeight - animation.revealDistance)) {
        revealableContainers[i].classList.remove("revealable");
      } else if (revealBottom > (window.innerHeight - animation.revealDistance)) {
        revealableContainers[i].classList.add("revealable");
      }
    } else {
      if (revealTop < (window.innerHeight - animation.revealDistance)) {
        revealableContainers[i].classList.remove("reduce-motion-reveal");
      } else if (revealBottom > (window.innerHeight - animation.revealDistance)) {
        revealableContainers[i].classList.add("reduce-motion-reveal");
      }
    }
  }
}

window.addEventListener('scroll', reveal);

//Reduce Motion function
const reduceMotion = () => {
  animation = {
    revealDistance: 50,
    initialOpacity: 0.10,
    transitionDelay: 0,
    transitionDuration: '0.5s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
  }

  if (motionButton.innerHTML == "Reduce Motion") {
    motionButton.innerHTML = "Reduce Motion ✅";
  } else {
    motionButton.innerHTML = "Reduce Motion";
  }

  for (let i = 0; i < revealableContainers.length; i++) {
    if (motionButton.innerHTML == "Reduce Motion ✅") {
      revealableContainers[i].classList.add("reduce-motion-active", "reduce-motion-reveal");
      revealableContainers[i].classList.remove("active", "revealable");
    } else {
      revealableContainers[i].classList.add("active", "revealable");
      revealableContainers[i].classList.remove("reduce-motion-active", "reduce-motion-reveal");
    }
  }
}

// motionButton.addEventListener("click", reduceMotion);
motionButton.addEventListener("click", reduceMotion);

// Petition Sign function
const addSignature = (person) => {
  let newSig = signatures.getElementsByTagName('p')[3];
  
  newSig.innerHTML = "🖊️ " + person.name + " from " + person.hometown + " supports this.";

  toggleModal(person);
}

//Close Modal function
modalButton.addEventListener("click", () => {
  modal.style.display = "none";})

//Toggle Thank You Modal function
const toggleModal = (person) => {
  let intervalId = setInterval(scaleImage, 500);
  
  modal.style.display = "flex";
  modalContent.innerHTML = "Thank you " + person.name + "! " + person.hometown + " represent!";

  setTimeout(() => {
  modal.style.display = "none";
  clearInterval(intervalId);
}, 4000)
}

//Modal Scale Image function
const scaleImage = () => {
  if (scaleFactor == 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
}

// Form Validation function
const validateForm = () => {
  let containsErrors = false;
  const inputs = form.elements;
  
  let person = {
    name: inputs[0].value,
    hometown: inputs[1].value,
    email: inputs[2].value
  }

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "" || inputs[i].value.length < 2) {
      containsErrors = true;
      inputs[i].value = "";
      inputs[i].classList.add("invalid");
      inputs[i].setAttribute('placeholder',"Must be at least 2 characters");
    } else {
      inputs[i].classList.remove("invalid");
      inputs[i].removeAttribute('placeholder');
    }
  }

  if (!person.email.includes('.com')) {
    containsErrors = true;
    inputs[2].value = "";
    inputs[2].classList.add("invalid");
    inputs[2].setAttribute('placeholder', "Must include '.com'");
  } 

  if (containsErrors == false) {
    addSignature(person);

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
}

signButton.addEventListener("click", validateForm);