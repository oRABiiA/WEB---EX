// Selecting DOM elements
const header = document.querySelector('h1'); 
const app = document.getElementById('app'); 
const ddMenu = document.querySelector('#mobileMenu'); 
const sandwitch = document.querySelectorAll('svg'); 
const html = document.documentElement; 

// Global menu items
const menuItems = [
    { name: 'Calculator', action: 'setView("Calculator")' },
    { name: 'About', action: 'setView("About")' },
    { name: 'Contact', action: 'setView("Contact")' },
];

// Function to toggle dark mode
const toggle = () => html.classList.toggle('dark');

// Function to set the view based on menu item clicked
const setView = (v) => {
    header.innerText = v; 
    toggleMenu(true); // Hide the menu after selecting an option

    // Depending on the selected view, render corresponding content
    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
};

// Function to toggle the mobile menu visibility
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden'); // Toggle visibility of mobile menu
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden'); // Toggle visibility of all SVG elements
        });
    } else {
        ddMenu.classList.add('hidden'); // Hide mobile menu
        document.querySelectorAll('svg')[0].classList.remove('hidden'); // Show first SVG icon
        document.querySelectorAll('svg')[1].classList.add('hidden'); // Hide second SVG icon
    }
};

// Function to add a row of content to a container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`; 
    container.insertAdjacentHTML('beforeend', row); 
};

// Function to add a monitor to a container
const addMonitor = (container, text) => {
    const t = text ?? ''; 
    const monitor = `<div id='monitor' class="bg-white dark:bg-gray-300 border-4 border-blue-400 dark:border-blue-500 h-20 flex items-center col-span-5 text-blue-800 dark:text-gray-500 p-2 rounded-lg mb-2 font-bold text-4xl ">${t}</div>`; 
    container.insertAdjacentHTML('beforeend', monitor); 
};

// Function to generate a button with specified text
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

// Function to add multiple buttons to a container
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join(''); // Generate HTML for each button
    addRow(container, btnHTML);
};

// Function to handle button click events
const click = (event) => {
    const monitor = document.getElementById('monitor'); 
    const bac = monitor.innerText.trim(); 
    const a = event.target.innerText; 
    console.log(a);

    // Handle different button actions
    if (a === 'clear') {
        monitor.innerText = ''; // Clear monitor content
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac); // Perform calculation
    } else {
        monitor.innerText += a; // Append button text to monitor
    }
};

// Function to render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']; // Calculator buttons/labels
    app.innerHTML = ''; // Clear app content
    addMonitor(app); 
    addButtons(app, labels); 
    const buttons = document.querySelectorAll('.d-btn'); // Select all buttons
    buttons.forEach((el) => el.addEventListener('click', click)); // Add click event listener to each button
};

// Function to render the About view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center dark:text-black">Temp for About</div>';
};

// Function to render the Contact view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center dark:text-black">Temp for Contact</div>'; 
};

// Function to render the menu
const renderMenu = () => {
    const mobileMenu = menuItems // Generate mobile menu buttons HTML
        .map((item) => `<button class="block py-1 px-2" onclick='${item.action}'>${item.name}</button>`)
        .join('');
    const desktopMenu = menuItems // Generate desktop menu buttons HTML
        .map((item) => `<button onclick='${item.action}'>${item.name}</button>`)
        .join('');

    ddMenu.innerHTML = mobileMenu; // Insert mobile menu into mobileMenu container
    document.querySelector('#desktopMenu').innerHTML = desktopMenu; // Insert desktop menu into desktopMenu container
};

// Function to render the theme toggle buttons
const renderThemeToggle = () => {
    const darkButton = `<button class="dark:hidden block" onclick="toggle()">Dark</button>`; 
    const lightButton = `<button class="hidden dark:block" onclick="toggle()">Light</button>`; 

    const themeContainer = document.querySelector('#themeToggle'); // Select theme toggle container
    themeContainer.innerHTML = darkButton + lightButton; // Insert toggle buttons into themeContainer
};

// Initial render functions
renderMenu(); 
renderThemeToggle(); 
renderCalculator(); 
