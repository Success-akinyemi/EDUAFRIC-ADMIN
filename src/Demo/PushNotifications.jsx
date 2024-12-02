import { checkPermission, requestNotificationPermission, registerSW } from './Helpers/script';

const PushNotifications = () => {
    const enableNotifications = async () => {
        try {
            checkPermission();
            await requestNotificationPermission();
            await registerSW();
            alert('Notifications enabled!');
        } catch (error) {
            console.error("Error enabling notifications:", error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={enableNotifications}>
                Enable Notifications
            </button>
        </div>
    );
};

export default PushNotifications;
