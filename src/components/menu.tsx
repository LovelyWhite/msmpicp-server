import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import "antd/dist/antd.css";
const { SubMenu } = Menu;

class _LeftMenu extends React.Component<any> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  render() {
    return (
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        style={{ width: 170, height: "100%" }}
        // onClick={(pram) => {
        //   console.log(pram);
        // }}
      >
        <Menu.Item style={styles.menuInline} key="1">
          <MailOutlined />
          <Link to="/main/dash">仪表盘</Link>
        </Menu.Item>
        <Menu.Item style={styles.menuInline} key="2">
          <CalendarOutlined />
          <Link to="/main/hotzone"> 热区</Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <AppstoreOutlined />
              <span>时间表</span>
            </span>
          }
        >
          <Menu.Item key="3">实时数据</Menu.Item>
          <Menu.Item key="4">历史数据</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <SettingOutlined />
              <span>关于</span>
            </span>
          }
        >
          <Menu.Item key="5">设置1</Menu.Item>
          <Menu.Item key="6">设置2</Menu.Item>
          <Menu.Item key="7">设置3</Menu.Item>
          <Menu.Item key="8">设置4</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
let styles = {
  menuInline: {
    marginTop: 0,
    marginBottom: 0,
  },
};
let LeftMenu = withRouter(_LeftMenu);
export default LeftMenu;
