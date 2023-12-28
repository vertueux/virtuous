const hamburgerToggler = document.querySelector(".hamburger")
const navLinksContainer = document.querySelector(".navlinks-container")
const search = document.querySelector('.input-group input');
const search_button = document.querySelector('.search__button');
const table_rows = document.querySelectorAll('tbody tr');
const lastwelcome = document.querySelector('.lastwelcome');
const navbar = document.querySelector("nav");
const footer = document.querySelector("footer");

let root = document.documentElement;

const toggleNav = () => {
    hamburgerToggler.classList.toggle("open")
    const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgerToggler.setAttribute("aria-expanded", ariaToggle)
    if (ariaToggle == "true") {
        root.style.setProperty('--blurred-background', "blur(0px)"); // Change to 2px to affect page.
        root.style.setProperty('--darken-background', "rgb(130, 130, 130)");
        root.style.setProperty('--nav-background-color', "transparent");
    } else {
        root.style.setProperty('--blurred-background', "blur(0px)");
        root.style.setProperty('--darken-background', "white");
        root.style.setProperty('--nav-background-color', "white");
    }
    navLinksContainer.classList.toggle("open")
}

hamburgerToggler.addEventListener("click", toggleNav)

new ResizeObserver(entries => {
    if (entries[0].contentRect.width <= 1600) {
        navLinksContainer.style.transition = "transform 0.2s ease-out"
    } else {
        navLinksContainer.style.transition = "none";
        root.style.setProperty('--blurred-background', "blur(0px)");
        root.style.setProperty('--darken-background', "white");
        root.style.setProperty('--nav-background-color', "white");
    }
}).observe(document.body)

if (search_button || search) {
    search_button.addEventListener('click', searchTable)
    search.addEventListener('keypress', searchTableEnter);
}

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();
            row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
            row.style.setProperty('--delay', i/25 + 's');
    })
}

function searchTableEnter(event) {
    if (event.keyCode === 13) { 
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase(),
                search_data = search.value.toLowerCase();
                row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
                row.style.setProperty('--delay', i/25 + 's');
        })
    }
}

// For the animation. 
if (lastwelcome) {
    lastwelcome.addEventListener("animationend", () => {
        lastwelcome.classList.toggle('cursor');
    });
}

window.addEventListener('scroll', function () {
    const navrect = navbar.getBoundingClientRect();
    const footrect = footer.getBoundingClientRect();

    if (navrect.top <= footrect.top + footrect.height && navrect.top + navrect.height > footrect.top
        && (search || search_button)) { 
        // Touching or overlapping.
        navbar.style.setProperty('background-color', "white");
    } else { 
        if (search || search_button) 
            navbar.style.setProperty('background-color', "transparent");
    } 
});