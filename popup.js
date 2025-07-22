chrome.storage.session.get('copied_text').then(({ copied_text }) => {
  document.getElementById('out').textContent =
    copied_text || '[nothing stored]';
});
