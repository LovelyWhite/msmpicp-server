import React from "react";
import { Menu, Row, Space } from "antd";
import { SettingOutlined, AreaChartOutlined, DashboardOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

const { SubMenu } = Menu;

class _Nav extends React.Component<any> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  state = {
    current: "mail",
  };

  handleClick = (e: { key: any }) => {
    console.log("click ", e);
    if (e.key === "exit") {
      localStorage.removeItem("token");
      this.props.history.push("/")
    }
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ height: "100%" }}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item
          key={"home"}
        >
          <Link to="/main/dash">
            <DashboardOutlined
              style={{
                marginRight: 0,
              }}
            />
          </Link>
        </Menu.Item>
        <Menu.Item
          key={"chart"}
        >
          <Link to="/main/chart">
          <AreaChartOutlined
            style={{
              marginRight: 0,
            }}
            />
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <SettingOutlined
              style={{
                marginRight: 0,
              }}
            />
          }
        >
          <Menu.Item key="exit">退出</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
const Nav = withRouter(_Nav);
export default Nav;
