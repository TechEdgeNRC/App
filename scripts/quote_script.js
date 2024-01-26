function composeEmail() {
    var sendTo = document.getElementById('sendTo').value;
    var cc = document.getElementById('cc').value;
    var subject = document.getElementById('subject').value;
    var bodyTemplate = document.getElementById('body');

    var selectedTemplate = bodyTemplate.value;
    var placeholder = (selectedTemplate.includes('Billet de réparation:')) ? 'Billet de réparation:' : 'Repair tag:';
    var numericPart = subject.replace(/\D/g, '');
    var updatedBody = selectedTemplate.replace(placeholder, placeholder + ' ' + numericPart);
    var updatedSubject = (selectedTemplate.includes('Bonjour')) ? 'Mise à jour réparation Patterson Dentaire:  ' + numericPart : 'Patterson Dental repair update tag: ' + numericPart;

    // Create an array to store the mailto parameters
    var mailtoParams = [
        'subject=' + encodeURIComponent(updatedSubject),
        'body=' + encodeURIComponent(updatedBody)
    ];

    // Add 'cc' parameter if CC is not empty
    if (cc.trim() !== '') {
        mailtoParams.push('cc=' + encodeURIComponent(cc));
    }

    // Join the parameters into a single string
    var mailtoLink = 'mailto:' + encodeURIComponent(sendTo) + '?' + mailtoParams.join('&');

    window.open(mailtoLink, '_blank');
}


function validateEmail() {
    var sendToInput = document.getElementById('sendTo');
    var isValidEmail = isValidEmailAddress(sendToInput.value);

    // Change border color based on email validity
    if (isValidEmail) {
        sendToInput.style.border = '2px solid #4CAF50'; // Green border for a valid email
    } else {
        sendToInput.style.border = '2px solid #f44336'; // Red border for an invalid email
    }
}

function isValidEmailAddress(email) {
    // Basic email validation, you can enhance this as needed
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function copyToClipboard(key, text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    var copiedMessageWrapper = document.getElementById('copiedMessageWrapper');

    // Check if the element exists and is not null before modifying its style
    if (copiedMessageWrapper !== null && typeof copiedMessageWrapper !== 'undefined') {
        copiedMessageWrapper.style.display = 'inline-block';

        setTimeout(function () {
            copiedMessageWrapper.style.display = 'none';
        }, 5000);
    }
}
