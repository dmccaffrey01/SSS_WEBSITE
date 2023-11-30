emailjs.init("zL866IgY-iWSHExyd");

const form = document.querySelector('.contact-form');
const notification = document.querySelector('.notification-container');
const notificationText = document.querySelector('.notification-text');

const notificationClose = document.querySelector('.notification-close');

notificationClose.addEventListener('click', () => {
    notification.classList.remove('show');
});

const sendEmailResponse = (success) => {

    if (success) {
        let name = form.querySelector("#name");
        name.value = "";
        let email = form.querySelector("#email");
        email.value = "";
        let message = form.querySelector("#message");
        message.value = "";

        notificationText.innerText = "Email sent successfully!";
        notification.classList.add("show");
    } else {
        notificationText.innerText = "Email failed to send, Try again or contact info@socialstrivestudio.com";
        notification.classList.add("show");
    }

    window.setTimeout(() => {
        notification.classList.remove("show");
    }, 3500);
}

const sendEmail = (emailParams) => {
    // Send the email using the template and service you've created
    emailjs.send("default_service", "template_k2nosxe", emailParams)
    .then(function(response) {
        sendEmailResponse(true);
    })
    .catch(function(error) {
        sendEmailResponse(false);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = form.querySelector("#name").value;
    let email = form.querySelector("#email").value;
    let message = form.querySelector("#message").value;

    const emailParams = {
        email: email,
        name: name,
        message: message,
    };

    sendEmail(emailParams);
});