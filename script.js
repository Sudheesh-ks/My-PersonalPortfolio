document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
      
      const form = e.target;
      const formData = new FormData(form);
      const result = document.getElementById('result');
      
      // Clear previous result messages
      result.innerHTML = "";
  
      // Check for form validity
      if (!form.checkValidity()) {
          result.innerHTML = "Please fill out all required fields correctly.";
          return;
      }
  
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
  
      if (!name.match(/^[A-Za-z ]+$/)) {
          result.innerHTML = "Name should contain only letters and spaces.";
          return;
      }
      if (!email.match(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)(.[a-zA-Z]+)?$/)) {
          result.innerHTML = "Email should be correctly entered";
          return;
      }
      if (message.length < 10) {
          result.innerHTML = "Message should be at least 10 characters long.";
          return;
      }
  
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
  
      result.innerHTML = "Please wait...";
  
      fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: json
      })
      .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
              result.innerHTML = "Form submitted successfully";
          } else {
              result.innerHTML = json.message || "Something went wrong!";
          }
      })
      .catch(error => {
          result.innerHTML = "Something went wrong!";
          console.error(error);
      })
      .finally(() => {
          form.reset();
          setTimeout(() => {
              result.style.display = "none";
          }, 3000);
      });
  });