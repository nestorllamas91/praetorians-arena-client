import React from 'react';
import styles, { stylesMaterialUI } from '$root/components/alert/styles';
import { withStyles } from '@material-ui/styles';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

function Alert(props) {
  const { classes } = props;

  function handleClose(event, reason) {
    if (reason === 'clickaway') return;
    props.setOpened(false);
  }

  return (
    <div>
      <Snackbar
        open={props.opened}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={
            {
              success: classes.success,
              error: classes.error
            }[props.type]
          }
          aria-describedby="client-snackbar"
          message={
            <span className={classes.message}>
              {
                {
                  success: <CheckCircleIcon classes={{ root: classes['icon-type'] }} />,
                  error: <ErrorIcon classes={{ root: classes['icon-type'] }} />
                }[props.type]
              }
              {props.message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon classes={{ root: classes['icon-close'] }} />
            </IconButton>
          ]}
        />
      </Snackbar>
      <style jsx>{styles}</style>
    </div>
  );
}
export default withStyles(stylesMaterialUI)(Alert);
