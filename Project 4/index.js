function submitMessage() {
  document.getElementById('last-message').textContent = document.getElementById('input-message').value
  document.getElementById('input-message').value = ""
}