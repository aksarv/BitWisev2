document.addEventListener("DOMContentLeaded", () => {
  emailjs.init('KEYGOESHERE');
  document.getElementById('emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', this)
      .then(function (response) {
        alert('Message sent successfully');
        document.getElementById('emailForm').reset();
      }, function (error) {
        alert('There was an error, try again')
      });
  });
});
