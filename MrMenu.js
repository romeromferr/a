 {
        const tabsContainer = document.getElementById('tabs');
        let isDragging = false;
        let startX;
        let scrollLeft;
    
        tabsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - tabsContainer.offsetLeft;
        scrollLeft = tabsContainer.scrollLeft;
        });
    
        tabsContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        });
    
        tabsContainer.addEventListener('mouseup', () => {
        isDragging = false;
        });
    
        tabsContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tabsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed if necessary
        tabsContainer.scrollLeft = scrollLeft - walk;
        });
}

function toggleModal() {
    const modal = document.getElementById('MrModal');
    if (modal.style.visibility === 'hidden' || modal.style.visibility === '') {
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
    } else {
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    }
}

// Event listener for the "Delete" key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete') {
        toggleModal();
    }
});

// Event listener for the "Close" button
document.getElementById('mrClose').addEventListener('click', function() {
    toggleModal();
});

document.querySelectorAll('#tabs > button.tab').forEach(button => {
    button.addEventListener('click', event => {
      // Get the tab index from the clicked button's custom attribute
      const tabIndex = event.target.getAttribute('tab');
      
      // Remove the 'active' class from all tab items
      document.querySelectorAll('div#MrModal > div#tabItem > div').forEach(tabItem => {
        tabItem.classList.remove('active');
      });
      
      // Add the 'active' class to the target tab item
      const targetTabItem = document.querySelectorAll('div#MrModal > div#tabItem > div');
      
      // Ensure tabIndex is valid and convert tabIndex to an integer before using
      if (targetTabItem[tabIndex]) {
        targetTabItem[tabIndex].classList.add('active');
      }
    });
  });
  
  