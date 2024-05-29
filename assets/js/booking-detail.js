import { Notification } from './notification.js';
import * as navbar from '../../navbar/navbar.js';

const popup = Notification({
    position: 'top-right',
    duration: 4000,
    isHidePrev: false,
    isHideTitle: false,
    maxOpened: 3,
});

function registerPayments() {
    const paymentClickHandler = function(element) {
        element = element.target;
        
        const showingModals = document.querySelectorAll('.modal-showing');

        showingModals.forEach((element) => {
            element.classList.remove('modal-showing');
            element.style.display = 'none';
        });

        var paymentElement;

        switch (element.getAttribute('href')) {
            case 'credit-card':
                paymentElement = document.getElementById('child-credit-card');
                break;
            case 'jetelika-pay':
                paymentElement = document.getElementById('child-jetelika-pay');
                break;
        };

        if (!paymentElement) return;

        paymentElement.style.display = 'flex';
        paymentElement.classList.add('modal-showing');

        document.querySelectorAll('.modal-button-inactive').forEach((element) => {
            if (element.className.includes('modal-submit')) return;

            element.classList.remove('modal-button-inactive');
        });

        element.classList.add('modal-button-inactive')
    };

    const paymentButtons = document.querySelectorAll('.modal-button');

    paymentButtons.forEach((element) => {
        if (!element.className.includes('modal-button-style-')) return;
        if (element.className.includes('modal-submit')) return;
        
        element.addEventListener('click', paymentClickHandler);
    });

    const paymentElements = document.querySelectorAll('.modal-child');

    paymentElements.forEach((element) => {
        if (!element.className.includes('modal-child-style-')) return;
        if (element.className.includes('modal-showing')) return;

        element.style.display = 'none';
    });
}

function onFormDetailSubmit(event) {
    console.log(event);
}

function onCardFormSubmit(event) {
    console.log(event);
}

function onFormJetelikaPaySubmit(event) {
    console.log(event);
}

function createErrorMessage(message) {
    const element = document.createElement('p');
    
    element.classList.add('input-field-message');
    element.textContent = message;

    return element;
}

function validateCardNumber(cardNumber) {
    // Remove spaces from the card number
    cardNumber = cardNumber.split(' ').join('');

    // Check if the length is exactly 15
    if (cardNumber.length !== 15) {
        return false;
    }

    // Check if all characters are digits
    for (let i = 0; i < cardNumber.length; i++) {
        if (!isDigit(cardNumber[i])) {
            return false;
        }
    }

    return true;
}

function validateSecurityCode(securityCode) {
    // Check if the length is exactly 3
    if (securityCode.length !== 3) {
        return false;
    }

    // Check if all characters are digits
    for (let i = 0; i < securityCode.length; i++) {
        if (!isDigit(securityCode[i])) {
            return false;
        }
    }

    // If it passes all checks
    return true;
}

function validateExpiryMonth(month) {
    // Check if month is between 01 and 12
    if (month < 1 || month > 12) {
        return false;
    }
    return true; // Valid expiry month
}

function validateExpiryYear(year) {
    const currentYear = new Date().getFullYear();

    // Check if year is the current year or a future year
    if (year < currentYear) {
        return false;
    }
    return true; // Valid expiry year
}

function validatePhoneNumber(phoneNumber) {
    // Check if the phone number starts with '+'
    if (phoneNumber[0] !== '+') {
        return false;
    }

    // Extract the country code from the phone number
    let countryCode = '';
    let i = 1; // Start after the '+' sign
    while (i < phoneNumber.length && phoneNumber[i] >= '0' && phoneNumber[i] <= '9') {
        countryCode += phoneNumber[i];
        i++;
    }

    // Check if the country code is followed by digits only
    if (countryCode.length === 0) {
        return false;
    }

    // Extract the part of the phone number after the country code
    const remainingNumber = phoneNumber.slice(i);

    // Check if the remaining part contains only digits
    for (let j = 0; j < remainingNumber.length; j++) {
        if (remainingNumber[j] < '0' || remainingNumber[j] > '9') {
            return false;
        }
    }

    return true; // Valid phone number
}

function generateTag() {
    // Generate four random digits
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    // Generate four random characters ('A'-'Z')
    let randomChars = '';
    for (let i = 0; i < 4; i++) {
        const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        randomChars += randomChar;
    }

    // Construct the message with the tag and random digits and characters
    const message = `#JETE${randomDigits}${randomChars}`;

    return message;
}


// Helper function to check if a character is a digit
function isDigit(char) {
    return char >= '0' && char <= '9';
}

function validateForm() {
    // reset messages
    document.querySelectorAll('.input-field-message').forEach((element) => {
        element.remove();
    });

    var result = { error: false, message: '' };
    var showing;

    const showingModals = document.querySelectorAll('.modal-showing');

    showingModals.forEach((element) => {
        showing = element.getAttribute('id');
    });

    {
        const element = document.getElementById('input-name');
        
        if (element.value.length === 0) {
            element.insertAdjacentElement('afterend', createErrorMessage('Name can not be empty.'));
            result.error = true;
        }
    }
    {
        var error = false;

        const element = document.getElementById('input-email');
        const email = element.value.trim();

        if (!email.includes('@') || !email.includes('.')) error = true;

        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
            
        if (atIndex < 1 || dotIndex <= atIndex + 1 || dotIndex === email.length - 1) error = true;

        if (error) {
            element.insertAdjacentElement('afterend', createErrorMessage('Email field must be an valid email address.'));
            result.error = true;
        }
    }

    if (showing === 'child-credit-card') {
        {
            const element = document.getElementById('input-card-number');

            if (!validateCardNumber(element.value)) {
                element.insertAdjacentElement('afterend', createErrorMessage('Card number must be exactly 15 digits.'));
                result.error = true;
            }
        }

        {
            const element = document.getElementById('input-security-code');

            if (!validateSecurityCode(element.value)) {
                element.insertAdjacentElement('afterend', createErrorMessage('Security code must be exactly 3 digits.'));
                result.error = true;
            }
        }

        {
            const element = document.getElementById('input-expiry-month');

            if (!validateExpiryMonth(element.value)) {
                element.insertAdjacentElement('afterend', createErrorMessage('Month not valid.'));
                result.error = true;
            }
        }

        {
            const element = document.getElementById('input-expiry-year');

            if (!validateExpiryYear(element.value)) {
                element.insertAdjacentElement('afterend', createErrorMessage('Year not valid.'));
                result.error = true;
            }
        }
    }

    if (showing === 'child-jetelika-pay') {
        {
            const elementLocation = document.getElementById('input-phone-location');
            const elementNumber = document.getElementById('input-phone-number');
    
            const value = elementLocation.value + elementNumber.value;
    
            if (!validatePhoneNumber(value)) {
                elementNumber.parentNode.parentNode.insertAdjacentElement('afterend', createErrorMessage('Phone number not valid.'));
                result.error = true;
            }
        }
    }

    if (result.error) {
        popup.error({
            title: 'Oops',
            message: `An validation has not been fulfilled, please check your inputs.`,
        });
        return;
    }
    
    popup.success({
        title: 'Booked',
        message: `Succesfully booked your detail with the ticket tag of ${generateTag()}, thank you!`
    });

    setTimeout(() => {
        window.open('../book/book.html', '_self');
    }, 10000);
}

function init() {
    navbar.init();

    document.addEventListener('DOMContentLoaded', function() {
        registerPayments();

        document.querySelectorAll('.modal-submit').forEach((element) => {
            element.addEventListener('click', () => validateForm());
        });
    });

}

init();