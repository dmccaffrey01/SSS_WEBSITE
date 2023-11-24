emailjs.init("C1R_MKyMngtyen65P");

const form = document.querySelector('.contact-form');
const notification = document.querySelector('.notification-container');
const notificationText = document.querySelector('.notification-text');

const sendEmailResponse = (success) => {

    if (success) {
        let name = form.querySelector("#name");
        name.value = "";
        let email = form.querySelector("#email");
        email.value = "";
        let message = form.querySelector("#message");
        message.value = "";

        notificationText.innerText = "Email sent successfully!";
        notification.style.display = "flex";
    } else {
        notificationText.innerText = "Email failed to send, Try again or contact info@socialstrivestudio.com";
        notification.style.display = "flex";
    }
}

const sendEmail = (emailParams) => {
    // Send the email using the template and service you've created
    emailjs.send("service_tpbjt5l", "template_ds4svuk", emailParams)
    .then(function(response) {
        sendEmailResponse(true);
        console.log("Email sent successfully", response);
    })
    .catch(function(error) {
        sendEmailResponse(false);
        console.error("Email sending failed", error);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = form.querySelector("#name").value;
    let email = form.querySelector("#email").value;
    let message = form.querySelector("#message").value;

    const emailParams = {
        from_email: email,
        from_name: name,
        message: message,
        reply_to: email,
    };

    sendEmail(emailParams);
});