/*eslint-disable*/
import React, { Component } from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);

export default function FixedPlugin(props) {
  const [bgImage, setBgImage] = React.useState(props.bgImage);

  const handleClick = () => {
    props.handleFixedClick();
  };
  const handleChange = (name) => (event) => {
    switch (name) {
      case "miniActive":
        props.sidebarMinimize();
        break;
      case "image":
        if (event.target.checked) {
          props.handleImageClick(bgImage);
        } else {
          props.handleImageClick();
        }
        setShowImage(event.target.checked);
        break;
      default:
        break;
    }
  };
  const classesObj = useStyles();
  return (
    <div
      className={"fixed-plugin" + (props.rtlActive ? " fixed-plugin-rtl" : "")}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">Color barra lateral</li>
          <li className="adjustments-line">
            <a className="switch-trigger active-color">
              <div className="badge-colors text-center">
                <span
                  className={
                    props.color === "purple"
                      ? "badge filter badge-purple active"
                      : "badge filter badge-purple"
                  }
                  data-color="purple"
                  onClick={() => {
                    props.handleColorClick("purple");
                  }}
                />
                <span
                  className={
                    props.color === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="blue"
                  onClick={() => {
                    props.handleColorClick("blue");
                  }}
                />
                <span
                  className={
                    props.color === "green"
                      ? "badge filter badge-green active"
                      : "badge filter badge-green"
                  }
                  data-color="green"
                  onClick={() => {
                    props.handleColorClick("green");
                  }}
                />
                <span
                  className={
                    props.color === "red"
                      ? "badge filter badge-red active"
                      : "badge filter badge-red"
                  }
                  data-color="red"
                  onClick={() => {
                    props.handleColorClick("red");
                  }}
                />
                <span
                  className={
                    props.color === "orange"
                      ? "badge filter badge-orange active"
                      : "badge filter badge-orange"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("orange");
                  }}
                />
                <span
                  className={
                    props.color === "white"
                      ? "badge filter badge-white active"
                      : "badge filter badge-white"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("white");
                  }}
                />
                <span
                  className={
                    props.color === "rose"
                      ? "badge filter badge-rose active"
                      : "badge filter badge-rose"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("rose");
                  }}
                />
              </div>
              <div className="clearfix" />
            </a>
          </li>
          <li className="header-title">SIDEBAR BACKGROUND</li>
          <li className="adjustments-line">
            <a className="switch-trigger active-color">
              <div className="badge-colors text-center">
                <span
                  className={
                    props.bgColor === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleBgColorClick("blue");
                  }}
                />
                <span
                  className={
                    props.bgColor === "white"
                      ? "badge filter badge-white active"
                      : "badge filter badge-white"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleBgColorClick("white");
                  }}
                />
                <span
                  className={
                    props.bgColor === "black"
                      ? "badge filter badge-black active"
                      : "badge filter badge-black"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleBgColorClick("black");
                  }}
                />
              </div>
              <div className="clearfix" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  miniActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose",
  ]),
  handleBgColorClick: PropTypes.func,
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func,
  sidebarMinimize: PropTypes.func,
  rtlActive: PropTypes.bool,
};
