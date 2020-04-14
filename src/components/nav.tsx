import React from "react";
import { Menu, Row, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <SubMenu
          title={
            <SettingOutlined
              style={{
                marginRight: 0,
              }}
            />
          }
        >
          <Menu.Item key="setting:1">管理员</Menu.Item>
          <Menu.Item key="setting:2">退出</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
const Nav = withRouter(_Nav);
export default Nav;
