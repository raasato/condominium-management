// Select the hamburger menu button from the HTML using its CSS class name
const menuToggle = document.querySelector('.menu-toggle');

// Select the navigation menu (the list of links) from the HTML using its ID
const navigationMenu = document.querySelector('#primary-navigation');

// Check if both elements exist before running the code
// This prevents errors if the elements are missing from the HTML
if (menuToggle && navigationMenu) {
	
	// Add a click event listener to the hamburger button
	// When the user clicks the button, the code inside the arrow function runs
	menuToggle.addEventListener('click', () => {
		// Toggle the 'is-open' class on the navigation menu
		// If the class exists, it gets removed (menu closes)
		// If the class doesn't exist, it gets added (menu opens)
		// The result (true/false) is stored in the isOpen variable
		const isOpen = navigationMenu.classList.toggle('is-open');

		// Update the 'aria-expanded' attribute to tell screen readers if the menu is open
		// aria-expanded is for accessibility - it helps people using screen readers
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		
		// Update the button label for screen readers based on whether the menu is open
		// If menu is open, label says "Close navigation menu"
		// If menu is closed, label says "Open navigation menu"
		menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
	});

	// Add a click event listener to the navigation menu itself
	// This handles clicks anywhere inside the menu
	navigationMenu.addEventListener('click', (event) => {
		// Check if the user clicked on a link (the 'a' tag)
		// event.target.closest('a') finds the nearest link element
		const clickedLink = event.target.closest('a');
		if (clickedLink) {
			// Check if the link has a submenu (if its parent li has a submenu child)
			const parentLi = clickedLink.closest('li');
			const hasSubmenu = parentLi && parentLi.querySelector('.submenu');
			
			// If there's a submenu and we're on mobile, toggle it instead of closing the menu
			if (hasSubmenu && window.innerWidth < 768) {
				event.preventDefault();
				parentLi.classList.toggle('submenu-open');
			} else {
				// Otherwise, close the main menu when a regular link is clicked
				navigationMenu.classList.remove('is-open');
				menuToggle.setAttribute('aria-expanded', 'false');
				menuToggle.setAttribute('aria-label', 'Open navigation menu');
			}
		}
	});
}

// Select only the contact form by matching its submit destination.
// This keeps the validation separate from the resident login form.
const contactForm = document.querySelector('form[action="submit.php"]');

// Only add these validation rules when the contact form exists on the page.
if (contactForm) {
	// Listen for the form's submit event, which runs when the user clicks Submit.
	contactForm.addEventListener('submit', (event) => {
		// Find each field by its ID so we can read and validate its value.
		const firstName = document.querySelector('#fName');
		const lastName = document.querySelector('#lName');
		const email = document.querySelector('#email');
		const phone = document.querySelector('#phone');
		const message = document.querySelector('#message');

		// Remove extra spaces from the beginning and end of each value.
		const firstNameValue = firstName.value.trim();
		const lastNameValue = lastName.value.trim();
		const emailValue = email.value.trim();
		const phoneValue = phone.value.trim();
		const messageValue = message.value.trim();

		// Count only digits so phone numbers such as (808) 555-1234 are accepted.
		const phoneDigits = phoneValue.replace(/\D/g, '');

		// Start with no custom error messages on any of the fields.
		firstName.setCustomValidity('');
		lastName.setCustomValidity('');
		email.setCustomValidity('');
		phone.setCustomValidity('');
		message.setCustomValidity('');

		// Names must contain at least one non-space character.
		if (!firstNameValue) {
			firstName.setCustomValidity('Please enter your first name.');
		}

		if (!lastNameValue) {
			lastName.setCustomValidity('Please enter your last name.');
		}

		// The browser checks the email format, while this message handles an empty value.
		if (!emailValue) {
			email.setCustomValidity('Please enter your email address.');
		}

		// Require at least seven digits, while still allowing spaces, dashes, and parentheses.
		if (phoneDigits.length < 7) {
			phone.setCustomValidity('Please enter a valid phone number.');
		}

		// A contact request should include a message.
		if (!messageValue) {
			message.setCustomValidity('Please enter a message.');
		}

		// Stop the form from submitting if any custom or native validation failed.
		if (!contactForm.checkValidity()) {
			event.preventDefault();
			contactForm.reportValidity();
		}
	});

	// Clear custom messages when the user resets the form.
	contactForm.addEventListener('reset', () => {
		contactForm.querySelectorAll('input, textarea').forEach((field) => {
			field.setCustomValidity('');
		});
	});
}
