let highestZIndex = 1000; // keep track of stacking order
let modalCounter = 0; // offset new modals so they don’t overlap

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('keyword')) {
        const title = event.target.dataset.title;
        const definition = event.target.dataset.definition;

        // avoid duplicate modals for the same layer
        const existingModalId = `modal_for_${title.replace(/\s+/g, '_')}`;
        if (document.getElementById(existingModalId)) return;

        createModal(title, definition);
    }

    if (event.target.classList.contains('close-btn')) {
        event.target.closest('.modal').remove();
    }
});

function createModal(title, content) {
    const newModal = document.createElement('div');
    newModal.className = 'modal';
    newModal.id = `modal_for_${title.replace(/\s+/g, '_')}`;

    // stagger new modals slightly so each is visible
    const topPosition = 100 + (modalCounter * 20);
    const leftPosition = 100 + (modalCounter * 20);
    if (window.innerWidth <= 768) {
        // set different positions for small screens
        topPosition = 50;
        leftPosition = 50;
    }
    newModal.style.top = topPosition + 'px';
    newModal.style.left = leftPosition + 'px';

    newModal.style.zIndex = ++highestZIndex;

    newModal.innerHTML = `
        <div class="modal-header">
            <span>${title}</span>
            <span class="close-btn" tabindex="0">X</span>
        </div>
        <div class="modal-content">
            <p>${content}</p>
        </div>
    `;

    document.body.appendChild(newModal);
    dragElement(newModal);

    modalCounter++;

    const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = newModal.querySelectorAll(focusableElementsSelector);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Set initial focus on the close button
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }

    newModal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // If Shift + Tab are pressed
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // If only Tab is pressed
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });

    // Keyboard support for close button 
    const closeBtn = newModal.querySelector('.close-btn');
    closeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // prevent space scrolling
            newModal.remove();
        }
    });

    //  Escape key support 
    newModal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            newModal.remove();
        }
    });
}

function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    const header = elmnt.querySelector(".modal-header");

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        elmnt.style.zIndex = ++highestZIndex; // bring to front when clicked
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = elmnt.offsetTop - pos2;
        let newLeft = elmnt.offsetLeft - pos1;

        // constrain modal within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = elmnt.offsetWidth;
        const modalHeight = elmnt.offsetHeight;

        if (newTop < 0) newTop = 0;
        if (newLeft < 0) newLeft = 0;
        if (newTop > viewportHeight - modalHeight) newTop = viewportHeight - modalHeight;
        if (newLeft > viewportWidth - modalWidth) newLeft = viewportWidth - modalWidth;

        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

}
