import React from "react";
import "antd/dist/antd.css";
import Nav from "../components/nav";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import DashBoard from "./dash";
import Chart from "./chart";
const { Header, Content, Sider } = Layout;
interface States { }
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
            height: 50,
          }}
        >
          <img
            width={521 / 3}
            src={process.env.PUBLIC_URL + "/intro.png"}
            alt="首页图标"
          />
          <Nav />
        </Header>
        <Layout>
          <Route path="/main/dash" component={DashBoard} />
          <Route path="/main/chart" component={Chart} />
        </Layout>
      </Layout>
    );
  }
}
