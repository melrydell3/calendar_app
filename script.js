let currentDate = new Date();
let selectedDate = null;

const monthYear = document.getElementById('monthYear');
const calendarDates = document.getElementById('calendarDates');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Set month and year in header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Clear previous dates
    calendarDates.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Add dates from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dateDiv = createDateElement(daysInPrevMonth - i, true);
        calendarDates.appendChild(dateDiv);
    }
    
    // Add dates of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = createDateElement(day, false);
        
        // Check if it's today
        const today = new Date();
        if (day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()) {
            dateDiv.classList.add('today');
        }
        
        calendarDates.appendChild(dateDiv);
    }
    
    // Add dates from next month
    const totalCells = calendarDates.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dateDiv = createDateElement(day, true);
        calendarDates.appendChild(dateDiv);
    }
}

function createDateElement(day, isOtherMonth) {
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    dateDiv.textContent = day;
    
    if (isOtherMonth) {
        dateDiv.classList.add('other-month');
    }
    
    dateDiv.addEventListener('click', function() {
        // Remove previous selection
        const previousSelected = document.querySelector('.date.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        
        // Add selection to clicked date
        if (!isOtherMonth) {
            dateDiv.classList.add('selected');
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            console.log('Selected date:', selectedDate.toDateString());
        }
    });
    
    return dateDiv;
}

// Event listeners for navigation
prevMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();
