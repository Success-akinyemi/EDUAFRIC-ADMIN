const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    try {
        const rawData = atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    } catch (error) {
        console.error("Failed to decode base64 string:", error);
        throw error;
    }
};

const saveSubscription = async (subscription) => {
    const body = { data: subscription, email: 'edu1@gmail.com', accountType: 'student' }
    const response = await fetch(`http://localhost:9000/api/pushNotification/saveSubscription`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return response.json();
};

self.addEventListener("activate", async (e) => {
    try {
        const subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BDXELyv2zHIyLhO3iKcEPL_Gwsrfio_7g258GX8xBt5lp-TvYBb0nBEbysp-ZsR4jjW9rS9a0xCmHWSIYeB-ajQ") // Replace with a valid public key
        });

        const response = await saveSubscription(subscription);
        console.log("Subscription saved successfully:", response);
    } catch (error) {
        console.error("Error subscribing to push notifications:", error);
    }
});

self.addEventListener("push", (e) => {
    const rawData = e.data.text() || "Welcome to EduAfrica";
    const title = rawData?.title
    const message = rawData?.message
    console.log('object push',rawData, title, message)
    let msgTitle
    let msgBody
    if(e.data.text()){
        try {
            const data = JSON.parse(rawData);
            const { title, message } = data
            msgTitle = title
            msgBody = message
        } catch (error) {
            console.error("Failed to parse data:", rawData);
        }
    }
    self.registration.showNotification("EduAfrica", { body: `${e.data.text() ? `${msgTitle} - ${msgBody}` : `${rawData}`}` });
});
