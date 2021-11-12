import {
  Snackbar,
  Alert as MUIAlert,
  AlertProps,
  Slide,
  SlideProps,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';

export type NotificationProps = {
  notification: Notification;
  onDismiss: (id: string) => void;
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Notification({
  notification,
  onDismiss,
}: NotificationProps): JSX.Element {
  return (
    <Snackbar open autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
}

export default function TransitionsSnackbar() {
  const [state, setState] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message="I love snacks"
        key={state.Transition.name}
      />
    </div>
  );
}
