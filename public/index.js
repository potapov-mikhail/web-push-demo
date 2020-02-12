const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const button = document.querySelector('#btn-push');
const buttonTimout = document.querySelector('#btn-push-timout');

const VAPID_PUBLICK_KEY =
  'BL2Vf8UY-zOGNc65xFcUvbQSEvuCuUHYRwdqXVgWMjjhEBOs6eeYVifrVijNEOAu0SF2jTsLZK4wdwGgpp8pfQA';
const APPLICATION_SERVER_KEY = urlBase64ToUint8Array(VAPID_PUBLICK_KEY);
let subscription = null;

const initSW = async () => {
  try {
    const register = await navigator.serviceWorker.register('/worker.js', {
      scope: '/'
    });

    subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: APPLICATION_SERVER_KEY
    });
  } catch (e) {
    throw e;
  }
};

if ('serviceWorker' in navigator) {
  initSW().catch(console.error);
}

button.addEventListener('click', async () => {
  await fetch('/push', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
});

buttonTimout.addEventListener('click', async () => {
  await fetch('/push-timout', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
});
