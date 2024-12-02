// src/notificationUtils.js

export const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API");
    }
};

export const registerSW = async () => {
    const registration = await navigator.serviceWorker.register(`/sw.js`);
    return registration;
};

export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted");
    }
};
