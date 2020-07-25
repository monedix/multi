/**
 * Delete Confirmation Dialog
 */
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
class LogoutConfirmation extends Component {
  state = {
    open: false,
    times: 0,
  };

  // open dialog
  open() {
    this.setState({ open: true });
    let now = new Date().getTime();
    this.timer = setInterval(() => {
      this.setState({
        times: now,
      });
      this.timeoutLogout();
    }, 60000);
    console.log("open modal");
  }

  // close dialog
  close() {
    this.setState({ open: false });
    clearInterval(this.timer);
    console.log("close modal");
  }

  timeoutLogout() {
    localStorage.clear();
    window.location.replace("https://app.monedix.io/signin");
  }

  render() {
    const { title, message, onConfirm, onCancel } = this.props;
    return (
      <Dialog
        open={this.state.open}
        onClose={() => this.close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} className="btn-danger text-white">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="btn-primary text-white"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LogoutConfirmation;
