const items = document.querySelectorAll('button.menu-button');

items.forEach(item => {
  item.addEventListener('click', () => {
    const targetTab = item.getAttribute('data-tab');
    const contents = document.querySelectorAll('div.MrMenuUI > div.content > div');

    items.forEach(btn => btn.classList.remove('active'));

    contents.forEach(content => {
      const contentTab = content.getAttribute('data-tab');

      if (contentTab === targetTab) {
        content.style.display = 'block';
        item.classList.add('active');
      } else {
        content.style.display = 'none';
      }
    });
  });
});
