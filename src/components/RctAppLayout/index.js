/**
 * App Routes
 */
import React, { Component } from "react";
import $ from "jquery";
import LogoutConfirmation from "../../components/TimerApp/LogoutConfirmation";

const timer = 1800000;
const checkTimer = 2000;

class MainApp extends Component {
  state = {
    loadingHeader: true,
    loadingSidebar: true,
    time: 0
  };

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    const { windowWidth } = this.state;
    window.addEventListener("resize", this.updateDimensions);
    if (process.env.NODE_ENV === "production" ? true : false && windowWidth > 600) {
      setTimeout(() => {
        this.props.startUserTour();
      }, 2000);
    }
    setTimeout(() => {
      this.setState({ loadingHeader: false, loadingSidebar: false });
    }, 114);
    this.setTime();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    const { windowWidth } = this.state;
    if (nextProps.location !== this.props.location) {
      if (windowWidth <= 1199) {
        this.props.collapsedSidebarAction(false);
      }
    }
  }

  updateDimensions = () => {
    this.setState({
      windowWidth: $(window).width(),
      windowHeight: $(window).height()
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  //timer Settings
  setTime() {
    let now = new Date().getTime();
    this.timer = setInterval(() => {
      this.setState({
        time: now
      });
      this.checkTime();
    }, checkTimer);
    console.log("timer started");
  }

  checkTime() {
    let nowTime = new Date().getTime();
    if (nowTime - this.state.time > timer) {
      this.onTimeoutLogout();
    } else {
      console.log("sessiontimer: timer not activated yet");
      console.log(nowTime - this.state.time + "  time passed ");
      console.log(nowTime - this.state.time - timer + "time left");
    }
  }

  onTimeoutLogout() {
    this.refs.LogoutConfirmation.open();
    console.log("modal timer activated, interval cleared");
    clearInterval(this.timer);
  }

  onTimeoutLogoutCancel() {
    // clearInterval(this.interval);
    console.log("logout cancelled, timer reset");
    this.refs.LogoutConfirmation.close();
    this.setTime();
  }

  logOut = () => {
    localStorage.clear();
    window.location.replace("https://app.monedix.io/signin");
  };

  render() {
    return (
      <div className="app">
        
        <LogoutConfirmation
          title="Session Timeout"
          message="Your session has timedout. Your will be logged out in 1 minute."
          onConfirm={() => {
            this.logOut();
          }}
          onCancel={() => {
            this.onTimeoutLogoutCancel();
          }}
          ref="LogoutConfirmation"
        />
      </div>
    );
  }
}

export default MainApp;
