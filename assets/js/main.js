(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

 /**
   * addEventListener for gallery page
   */

document.addEventListener('DOMContentLoaded', function () {
  const allFilter = document.getElementById('filter-all');
  const atmFilter = document.getElementById('filter-atm');
  const videoFilter = document.getElementById('filter-videos');
  const items = document.querySelectorAll('.row .col-md-4');

  allFilter.addEventListener('click', function () {
      items.forEach(item => item.classList.remove('hidden'));
  });

  atmFilter.addEventListener('click', function () {
      items.forEach(item => {
          if (item.classList.contains('filter-app')) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  });

  videoFilter.addEventListener('click', function () {
      items.forEach(item => {
          if (item.classList.contains('filter-product')) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  });
});

// Request call back validate form
function validateCallbackForm() {
  let isValid = true;

  // Clear previous error messages
  document.getElementById("callback_nameErr").innerHTML = "";
  document.getElementById("callback_phoneErr").innerHTML = "";
  document.getElementById("callback_messageErr").innerHTML = "";

  // Get form values
  const name = document.getElementById("callback_name").value;
  const phone = document.getElementById("callback_phone").value;
  const message = document.getElementById("callback_message").value;

  // Validate name
  if (!name) {
      document.getElementById("callback_nameErr").innerHTML = "Name is required.";
      isValid = false;
  }

  // Validate phone number
  const phonePattern = /^[0-9]{10}$/;
  if (!phone) {
      document.getElementById("callback_phoneErr").innerHTML = "Phone number is required.";
      isValid = false;
  } else if (!phonePattern.test(phone)) {
      document.getElementById("callback_phoneErr").innerHTML = "Invalid phone number.";
      isValid = false;
  }

  // Validate message
  if (!message) {
      document.getElementById("callback_messageErr").innerHTML = "Message is required.";
      isValid = false;
  }

  // If form is not valid, prevent submission
  return isValid;
}



function popUp() {
  // Your validation and form submission logic here
  alert('Form submitted');
}



/* enquiey form validate */
function validateEnquiryForm() {
  let isValid = true;
  const form = document.getElementById("enquiryForm");

  // Reset error messages
  document.getElementById("p_fnameErr").innerText = "";
  document.getElementById("p_lnameErr").innerText = "";
  document.getElementById("p_emailErr").innerText = "";
  document.getElementById("p_mobileErr").innerText = "";
  document.getElementById("p_productErr").innerText = "";
  document.getElementById("p_messageErr").innerText = "";

  // Validate First Name
  if (form.p_fname.value.trim() === "") {
      document.getElementById("p_fnameErr").innerText = "First Name is required.";
      isValid = false;
  }

 

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.p_email.value)) {
      document.getElementById("p_emailErr").innerText = "Valid Email is required.";
      isValid = false;
  }

  // Validate Mobile Number
  const mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(form.p_mobile.value)) {
      document.getElementById("p_mobileErr").innerText = "Valid Mobile Number is required.";
      isValid = false;
  }

  // Validate Product Selection
  if (form.p_product.value === "Select Product") {
      document.getElementById("p_productErr").innerText = "Please select a product.";
      isValid = false;
  }

  // Validate Message
  if (form.p_message.value.trim() === "") {
      document.getElementById("p_messageErr").innerText = "Message is required.";
      isValid = false;
  }

  // If form is valid, show success message
  if (isValid) {
      document.getElementById("succ-popup-alert").innerText = "Form submitted successfully!";
      document.getElementById("fail-popup-alert").innerText = "";
  } else {
      document.getElementById("fail-popup-alert").innerText = "Please fill the details ";
      document.getElementById("succ-popup-alert").innerText = "";
  }

  return isValid;
}

// get in touch 
function validateContactForm() {
  let isValid = true;

  // Clear previous error messages
  document.getElementById('c_fnameErr').innerHTML = "";
  document.getElementById('c_lnameErr').innerHTML = "";
  document.getElementById('c_emailErr').innerHTML = "";
  document.getElementById('c_mobileErr').innerHTML = "";
  document.getElementById('c_messageErr').innerHTML = "";
  document.getElementById('succ-client-alert').innerHTML = "";
  document.getElementById('fail-client-alert').innerHTML = "";

  // Validate First Name
  const firstName = document.getElementById('c_fname').value.trim();
  if (firstName === "") {
      document.getElementById('c_fnameErr').innerHTML = "First Name is required.";
      isValid = false;
  }



  // Validate Email
  const email = document.getElementById('c_email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
      document.getElementById('c_emailErr').innerHTML = "Email is required.";
      isValid = false;
  } else if (!emailPattern.test(email)) {
      document.getElementById('c_emailErr').innerHTML = "Invalid Email format.";
      isValid = false;
  }

  // Validate Mobile Number
  const mobile = document.getElementById('c_mobile').value.trim();
  const mobilePattern = /^[0-9]{10}$/;
  if (mobile === "") {
      document.getElementById('c_mobileErr').innerHTML = "Mobile Number is required.";
      isValid = false;
  } else if (!mobilePattern.test(mobile)) {
      document.getElementById('c_mobileErr').innerHTML = "Invalid Mobile Number.";
      isValid = false;
  }

  // Validate Message
  const message = document.getElementById('c_message').value.trim();
  if (message === "") {
      document.getElementById('c_messageErr').innerHTML = "Message is required.";
      isValid = false;
  }

  // If all fields are valid
  if (isValid) {
      document.getElementById('succ-client-alert').innerHTML = "Form submitted successfully!";
  } else {
      document.getElementById('fail-client-alert').innerHTML = "Please fill the details above.";
  }

  return isValid;
}

// Franchise Enquiry
function validateFranchiseForm() {
  let isValid = true;

  // Clear previous error messages
  document.getElementById('f_fnameErr').innerHTML = "";
  document.getElementById('f_distnameErr').innerHTML = "";
  document.getElementById('f_citynameErr').innerHTML = "";
  document.getElementById('f_pinErr').innerHTML = "";
  document.getElementById('f_emailErr').innerHTML = "";
  document.getElementById('f_mobileErr').innerHTML = "";
  document.getElementById('succ-front-alert').innerHTML = "";
  document.getElementById('fail-front-alert').innerHTML = "";

  // Validate First Name
  const firstName = document.getElementById('f_fname').value.trim();
  if (firstName === "") {
      document.getElementById('f_fnameErr').innerHTML = "First Name is required.";
      isValid = false;
  }

  // Validate District Name
  const distName = document.getElementById('f_distname').value.trim();
  if (distName === "") {
      document.getElementById('f_distnameErr').innerHTML = "District is required.";
      isValid = false;
  }

   // Validate City Name
   const cityName = document.getElementById('f_cityname').value.trim();
   if (cityName === "") {
       document.getElementById('f_citynameErr').innerHTML = "City is required.";
       isValid = false;
   }
  // Validate Pincode
const pin = document.getElementById('f_pin').value.trim();
const pinErrorElement = document.getElementById('f_pinErr');

if (pin === "") {
    pinErrorElement.innerHTML = "Pin is required.";
    isValid = false;
} else if (!/^\d{6}$/.test(pin)) {
    pinErrorElement.innerHTML = "Pin must be a 6-digit number.";
    isValid = false;
} else {
    pinErrorElement.innerHTML = ""; // Clear any previous error messages
}

// You can return isValid if this is part of a larger validation function


  // Validate Email
  const email = document.getElementById('f_email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
      document.getElementById('f_emailErr').innerHTML = "Email is required.";
      isValid = false;
  } else if (!emailPattern.test(email)) {
      document.getElementById('f_emailErr').innerHTML = "Invalid Email format.";
      isValid = false;
  }

  // Validate Mobile Number
  const mobile = document.getElementById('f_mobile').value.trim();
  const mobilePattern = /^[0-9]{10}$/;
  if (mobile === "") {
      document.getElementById('f_mobileErr').innerHTML = "Mobile Number is required.";
      isValid = false;
  } else if (!mobilePattern.test(mobile)) {
      document.getElementById('f_mobileErr').innerHTML = "Invalid Mobile Number.";
      isValid = false;
  }

  // If all fields are valid
  if (isValid) {
      document.getElementById('succ-front-alert').innerHTML = "Form submitted successfully!";
  } else {
      document.getElementById('fail-front-alert').innerHTML = "Please fill the details .";
  }

  return isValid;
}

// product page addEventlistener
document.addEventListener("DOMContentLoaded", function () {
  const atmFilter = document.querySelector(".atm-filter");
  const merchantFilter = document.querySelector(".merchant-filter");

  atmFilter.addEventListener("click", function () {
    window.location.href = "atm.html";
  });

  merchantFilter.addEventListener("click", function () {
    window.location.href = "merchant.html";
  });
});


// career apply page 

var modal = document.getElementById("myModal");
var btn = document.getElementById("btn-apply");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function submitForm() {
    // Your form submission logic here
}

function applyNow() {
    // Your subscribe logic here
}

$(document).ready(function($) {
    var phoneInputID = "#cr_mobile";
    var input = document.querySelector(phoneInputID);
    iti = window.intlTelInput(
        input, {
            formatOnDisplay: true,
            autoHideDialCode: false,
            autoPlaceholder: "aggressive",
            hiddenInput: "full_number",
            initialCountry: "in",
            preferredCountries: ['in'],
            separateDialCode: true,
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return '' + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
        });
    $(phoneInputID).on("focus click countrychange", function(e, countryData) {
        var pl = $(this).attr('placeholder') + '';
        var res = pl.replace(/X/g, '9');
        if (res != 'undefined') {
            $(this).inputmask(res, {
                placeholder: "X",
                clearMaskOnLostFocus: true
            });
        }
        console.log(phoneInputID);
    });
    $(phoneInputID).on("focusout", function(e, countryData) {
        var intlNumber = iti.getNumber();
        console.log(intlNumber);
    });
});

$(document).ready(function() {
    $('.iti__flag-container').click(function() {
        var countryCode = $('.iti__selected-flag').attr('title');
        var countryCode = countryCode.replace(/[^0-9]/g, '')
        $('cr_mobile').val("");
        $('cr_mobile').val("+" + countryCode + " " + $('cr_mobile').val());
    });
});
