import React from "react";
import "antd/dist/antd.css";
import LeftMenu from "../components/menu";
import Nav from "../components/nav";
import { Col, Layout, Row } from "antd";
import { Route } from "react-router-dom";
import Login from ".";
const { Header, Content, Sider } = Layout;
interface States {}
export default class Main extends React.Component<{}, States> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 12,
            height: 55,
          }}
        >
          <img
            width={521 / 3}
            height={78 / 3}
            src={process.env.PUBLIC_URL + "/intro.png"}
            alt="首页图标"
          />
          <Nav />
        </Header>
        <Layout>
          <Sider width={170}>
            <LeftMenu />
          </Sider>
          <Content>ceshi1</Content>
        </Layout>
      </Layout>
    );
  }
}
