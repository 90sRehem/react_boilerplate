import { useNotificationStore } from '@/stores';
import { Stack } from '@mui/material';
import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </Stack>
  );
};
