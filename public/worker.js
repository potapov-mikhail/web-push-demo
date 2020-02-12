self.addEventListener('push', e => {
  const response = e.data.json();
  const { title, body } = response;

  self.registration.showNotification(title, { body });
});
