/* Variables on document load for zero state */
let boxModal = '';
let radioModal = '';
let modalSuccess = '';
let pledgeValue = '';
let inputValue = '';
let total = 89914;
let backers = 5007;

/* Function for bookmark button to change its visual state */
function bookmark() {
    /* select bookmark text html element by class */
    const bookmarkButton = document.querySelector('.bookmark__paragraph');
    /* select svg circle to change color when active */
    const circleSvg = document.querySelector('.button--circle-fill');
    /* select bookmark icon inside circle */
    const circleSvgBookmark = document.querySelector('.button--bookmark-fill');
    /* change text inside bookmark button to -> Bookmarked */
    bookmarkButton.innerHTML = 'Bookmarked';
    /* change its color to -> Moderate Cyan */
    bookmarkButton.classList.add('active');
    /* change circle color to -> Moderate Cyan */
    circleSvg.classList.add('colored');
    /* change bookmark icon color inside bookmark button to -> White */
    circleSvgBookmark.classList.add('colored');
}

/* Function for mobile menu */
function menuToggle() {
    /* select main menu ul element by class */
    const mainMenu = document.querySelector('.main__menu');
    /* select overlay background for mobile menu */
    const mainMenuOverlay = document.querySelector('.header--overlay');
    /* variables for hamburger and menu close icons */
    const mobileHamburger = document.querySelector('.mobile__hamburger');
    const mobileClose = document.querySelector('.mobile__close');
    /* condition for mobile menu | if ul main menu not contains active class */
    /* adds active class (display: block) to ul element and overlay background */
    if (!mainMenu.classList.contains('active')) {
        mainMenu.classList.add('active');
        mainMenuOverlay.classList.add('active');
        /* changing display state of hamburger and close icons */
        mobileHamburger.classList.add('mobile__hamburger--hidden');
        mobileClose.classList.remove('mobile__close--hidden');
    } else {
        /* when functions invoked when active class is assigned changes states */
        mainMenu.classList.remove('active');
        mainMenuOverlay.classList.remove('active');
        mobileHamburger.classList.remove('mobile__hamburger--hidden');
        mobileClose.classList.add('mobile__close--hidden');
    }
}

/* Function to open modal with pledges */
function openModal() {
    /* select html element with modal class */
    const modal = document.querySelector('.modal');
    /* add active class display: block */
    modal.classList.add('active');
}

/* Function to close modal */
function closeModal() {
    /* removing active class boxModal variable changed after opening modal */
    boxModal.classList.remove('active');
    /* select html element with modal class */
    const modal = document.querySelector('.modal');
    /* hiding modal by removing active class */
    modal.classList.remove('active');
}

/* Changing pledge inside opened modal */
function changePledge() {
    /* Removing exisitng active state of selected element */
    boxModal.classList.remove('active');
    /* Assign value of radio input to variable radioModal */
    radioModal = document.querySelector('input[name="pledge-value"]:checked').getAttribute('data-radio-value');
    /* Assign boxModal value of selected input through data-box-value attribute */
    boxModal = document.querySelector('[data-box-value="' + radioModal + '"]');
    /* Select proper input after changing pledge by index */
    inputValue = document.querySelector('[index="' + radioModal + '"]');
    /* Activating selected by radio modal pledge box */
    boxModal.classList.add('active');
}

/* Select all elements with class name button */
function collectPledges() {
    /* Variable for button element*/
    const dataPledgeValue = document.getElementsByClassName('button');
    /* Loop for button elements */
    for (let i = 0; i < dataPledgeValue.length; i++) {
        /* Select elements with data-pledge-value only */
        if (dataPledgeValue[i].hasAttribute('data-pledge-value')) {
            /* Setting event listener for button elements containing value */
            dataPledgeValue[i].addEventListener('click', pledgeClicked(i));
        }

        /* Function invoked by event listener after user click passing pledge value */
        function pledgeClicked(i) {
            return function () {
                /* Passing pledge value into variable */
                let attr = dataPledgeValue[i].getAttribute('data-pledge-value');
                /* Adding attr variable with pledge value into boxModal, radioModal and number input */
                /* data-box-value and value attributes */
                boxModal = document.querySelector('[data-box-value="' + attr + '"]');
                radioModal = document.querySelector('[data-radio-value="' + attr + '"]');
                inputValue = document.querySelector('[index="' + attr + '"]');
                /* Condition for display property of selected pledge */
                if (!boxModal.classList.contains('active')) {
                    boxModal.classList.add('active');
                    radioModal.checked = true;
                } else {
                    boxModal.classList.remove('active');
                    radioModal.checked = false;
                }
            }
        }
    }
}

/* Function invoked by Continue button | Confirmation of succefull pledge */
function success() {
    /* Display property change by adding active class to element with .success class */
    modalSuccess = document.querySelector('.success');
    modalSuccess.classList.add('active');

    /* Variables set to access HTML elements by class */
    const totalText = document.querySelector('.box__total');
    const totalBackers = document.querySelector('.box__backers');
    const totalProgressBar = document.querySelector('.slider__progress');

    /* Updating total variable about input value */
    total = total + parseInt(inputValue.value);

    /* Counting percent of total money backed */
    let totalProgress = ((total * 100) / 100000);

    /* Changing the width od progress bar */
    /* Width cannot be more than 100% */
    if (totalProgress >= 100) {
        totalProgressBar.style.width = 100 + '%';
    } else {
        totalProgressBar.style.width = totalProgress + '%';
    }

    /* Displaying total collected money */
    totalText.innerHTML = '$' + (total.toLocaleString("en-US"));

    /* Updating total backers value | Increment by one */
    backers = backers + 1;

    /* Displaying updated backers */
    totalBackers.innerHTML = backers.toLocaleString("en-US");

    /* Invoking closeModal() function to clear states */
    closeModal();
}

/* Invoked after Got it! button clicked */
function successConfirm() {
    modalSuccess.classList.remove('active');
}