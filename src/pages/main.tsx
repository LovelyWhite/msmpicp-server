import React from "react";
import "antd/dist/antd.css";
import LeftMenu from "../components/menu";
import Nav from "../components/nav";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import DashBoard from "./dash";
const { Header, Content, Sider } = Layout;
interface States {}
interface Props {
  history: any;
}
export default class Main extends React.Component<Props, States> {
  constructor(props: Readonly<Props>) {
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
            paddingLeft: 20,
            paddingRight: 12,
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
          <Sider width={170} style={{ backgroundColor: "#00000000" }}>
            <LeftMenu />
          </Sider>
          <Content style={{ padding: 15 }}>
            <Route path="/main/dash" component={DashBoard} />
            <Route path="/main/hotpoint" component={DashBoard} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
