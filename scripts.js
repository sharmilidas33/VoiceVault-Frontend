$(document).ready(function () {
  $(".category-filters button").click(function () {
    let category = $(this).data("category");

    // Remove active class from all buttons and add it to the clicked button
    $(".category-filters button").removeClass("active");
    $(this).addClass("active");

    // Show or hide petitions based on category
    if (category === "all") {
      $(".petition-card").show();
    } else {
      $(".petition-card").hide();
      $('.petition-card[data-category="' + category + '"]').show();
    }
  });

  // Handle form submission
  $('.create-petition').on('submit', function (event) {
    event.preventDefault();

    // Simple client-side validation
    let isValid = true;
    $('.create-petition [required]').each(function () {
      if ($(this).val() === '') {
        isValid = false;
        $(this).addClass('is-invalid');
      } else {
        $(this).removeClass('is-invalid');
      }
    });

    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate form data processing
    const petitionData = {
      title: $('#petitionTitle').val(),
      category: $('#petitionCategory').val(),
      description: $('#petitionDescription').val(),
      signatureGoal: $('#signatureGoal').val(),
      targetAudience: $('#targetAudience').val(),
      deadline: $('#deadline').val(),
      image: $('#petitionImage')[0].files[0]
    };

    console.log('Petition Data:', petitionData);

    // Simulate successful form submission
    alert('Petition created successfully!');

    // Optionally, reset the form
    $('.create-petition')[0].reset();
  });

  // Remove invalid class on input change
  $('.create-petition [required]').on('input change', function () {
    if ($(this).val() !== '') {
      $(this).removeClass('is-invalid');
    }
  });


  // Handle form submission
  $('.sign-petition form').on('submit', function (e) {
    e.preventDefault();

    // Get form inputs
    let fullName = $('input[placeholder="Full Name"]').val().trim();
    let email = $('input[placeholder="Email"]').val().trim();
    let message = $('textarea[placeholder="Why is this important to you? (Optional)"]').val().trim();

    // Simple frontend validation
    if (fullName === "") {
      alert('Please enter your full name.');
      return;
    }

    if (email === "") {
      alert('Please enter your email address.');
      return;
    }

    // Email format validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate successful submission
    alert('Thank you for signing the petition, ' + fullName + '!');

    // Create a new signature element
    let newSignature = `
      <div class="signature-item">
          <img src="./images/dp.avif" alt="${fullName}" class="signature-avatar">
          <div class="signature-info">
              <h4>${fullName}</h4>
              <p>${message ? message : 'No comment provided.'}</p>
              <span class="signature-time">Just now</span>
          </div>
      </div>
  `;

    // Prepend the new signature to the list so it appears at the top
    $('.signatures-list').prepend(newSignature);

    // Clear the form
    $(this).trigger('reset');
  });


  // Search Members
  $('.admin-card .search-bar input[placeholder="Search members..."]').on('keyup', function () {
    let query = $(this).val().toLowerCase();
    $('.member-list .member-item').filter(function () {
      $(this).toggle($(this).find('.member-info h3').text().toLowerCase().indexOf(query) > -1);
    });
  });

  // Search Petitions
  $('.admin-card .search-bar input[placeholder="Search petitions..."]').on('keyup', function () {
    let query = $(this).val().toLowerCase();
    $('.petition-list .petition-item').filter(function () {
      $(this).toggle($(this).find('.petition-info h3').text().toLowerCase().indexOf(query) > -1);
    });
  });

  // Block Member
  $('.member-actions .btn-warning').on('click', function () {
    let memberName = $(this).closest('.member-item').find('.member-info h3').text();
    alert(memberName + ' has been blocked.');
    // Here you can add AJAX code to update the backend
  });

  // Delete Member
  $('.member-actions .btn-danger').on('click', function () {
    let memberItem = $(this).closest('.member-item');
    let memberName = memberItem.find('.member-info h3').text();
    if (confirm('Are you sure you want to delete ' + memberName + '?')) {
      memberItem.remove();
      alert(memberName + ' has been deleted.');
      // Here you can add AJAX code to update the backend
    }
  });

  // View Petition
  $('.petition-actions .btn-info').on('click', function (e) {
    e.preventDefault();
    let petitionTitle = $(this).closest('.petition-item').find('.petition-info h3').text();
    alert('Viewing details for petition: ' + petitionTitle);
    window.location.href = $(this).parent().attr('href');
  });

  // Delete Petition
  $('.petition-actions .btn-danger').on('click', function () {
    let petitionItem = $(this).closest('.petition-item');
    let petitionTitle = petitionItem.find('.petition-info h3').text();
    if (confirm('Are you sure you want to delete the petition "' + petitionTitle + '"?')) {
      petitionItem.remove();
      alert('Petition "' + petitionTitle + '" has been deleted.');
    }
  });

});

