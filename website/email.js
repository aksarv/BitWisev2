document.addEventListener("DOMContentLeaded", () => {
  emailjs.init('dPeK7DrYFsRqEmkos');
  document.getElementById('emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_vv06rdn', 'template_3mpe1yq', this)
      .then(function (response) {
        alert('Message sent successfully');
        document.getElementById('emailForm').reset();
      }, function (error) {
        alert('There was an error, try again')
      });
  });
});
