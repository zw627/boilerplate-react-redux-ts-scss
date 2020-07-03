// Replacement for babel polyfill, see https://babeljs.io/docs/en/babel-polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "Store/index";
import Scoreboard from "Components/Scoreboard";
import NotificationStorage from "Components/NotificationStorage";
import "Styles/index.scss";

render(
  <Provider store={store}>
    <Scoreboard />
    <NotificationStorage />
  </Provider>,
  document.getElementById("root")
);
