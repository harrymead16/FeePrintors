// Load navbar from external file
function loadNavbar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'navbar.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('navbar-placeholder').innerHTML = xhr.responseText;

            // Once the navbar is loaded, attach the event listener
            const burger = document.querySelector('.burger');
            const navLinks = document.querySelector('.nav-links');

            if (burger && navLinks) {
                burger.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
                    burger.setAttribute('aria-expanded', !expanded);
                });
            } else {
                console.error("Burger button or navLinks element not found.");
            }
        } else if (xhr.readyState === 4) {
            console.error("Failed to load navbar.");
        }
    };
    xhr.send();
}

// Load footer from external file
function loadFooter() {
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open('GET', 'footer.html', true);
    xhrFooter.onreadystatechange = function () {
        if (xhrFooter.readyState === 4 && xhrFooter.status === 200) {
            document.getElementById('footer-placeholder').innerHTML = xhrFooter.responseText;
        } else if (xhrFooter.readyState === 4) {
            console.error("Failed to load footer.");
        }
    };
    xhrFooter.send();
}

// Call functions once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadFooter();
});


// Function to apply the active class to navbar links
function applyActiveClass() {
    const currentPage = document.body.getAttribute('data-page');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    navLinksItems.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.style.color = 'black'; // Change text color to black
            if (window.matchMedia('(max-width: 700px)').matches) {
                link.style.backgroundColor = 'white'; // Set background color to white for mobile
            }
        }
    });
}
// Load the navbar
document.addEventListener('DOMContentLoaded', () => {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // Call the function to apply active class after loading the navbar
            applyActiveClass();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonials__carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    const testimonialWidth = testimonials[0].offsetWidth + 20; // Width of a single testimonial plus gap
    let currentIndex = 0;

    // Function to update the carousel position
    function updateCarousel() {
        // Adjust the scroll position based on current index
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`; // Scroll to the testimonial
    }

    // Move to the next testimonial
    nextBtn.addEventListener('click', () => {
        currentIndex++;

        if (currentIndex === totalTestimonials) {
            // If we're at the last testimonial, loop to the first one (without a gap)
            currentIndex = 0;
            setTimeout(updateCarousel, 100); // Slight delay to reset without visible jump
        } else {
            updateCarousel();
        }
    });

    // Move to the previous testimonial
    prevBtn.addEventListener('click', () => {
        currentIndex--;

        if (currentIndex < 0) {
            // If we're at the first testimonial, loop to the last one (without a gap)
            currentIndex = totalTestimonials - 1;
            setTimeout(updateCarousel, 100); // Slight delay to reset without visible jump
        } else {
            updateCarousel();
        }
    });

    // Initialize the carousel
    updateCarousel();
});
