import Router from "next/router";
import React, { Component } from "react";
import { routes } from "../util/routes";

export default class Error404 extends Component {
  componentDidMount = () => {
    Router.push(routes.home);
  };

  render() {
    return <div />;
  }
}
