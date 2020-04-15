import React from "react";
import { Input, Button, Checkbox, Col, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { fetchData, showError, showWarning } from "../utils";
import { AxiosResponse } from "axios";
interface States {
  isLogining: boolean;
  userName: string;
  password: string;
}
interface Props {
  history: any;
}
export default class Login extends React.Component<Props, States> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isLogining: false,
      userName: "",
      password: "",
    };
    this.login = this.login.bind(this);
  }
  async login() {
    let { userName, password } = this.state;
    let result: AxiosResponse<any>;
    try {
      this.setState({
        isLogining: true,
      });
      result = await fetchData("/verify/login", { userName, password });
    } catch (e) {
      console.log(e);
      showError("" + e);
    } finally {
      this.setState({
        isLogining: false,
      });
      if (result && result.data) {
        if (result.data.code !== 1) {
          showWarning(result.data.msg);
        } else {
          localStorage.setItem("token", result.data.data.token);
          this.props.history.push("/main/dash");
        }
      }
    }
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/main/dash");
    }
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          <img
            width={521 / 2}
            height={78 / 2}
            src={process.env.PUBLIC_URL + "/intro.png"}
            alt="首页图标"
            style={{ marginBottom: 20 }}
          />
          <Space direction="vertical" style={{ width: 300 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                prefix={<UserOutlined />}
                placeholder="输入账号"
                maxLength={18}
                onChange={(e) => {
                  this.setState({
                    userName: e.target.value,
                  });
                }}
              />
              <Input.Password
                onPressEnter={this.login}
                prefix={<LockOutlined />}
                placeholder="输入密码"
                maxLength={18}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />
            </Space>
            <Space>
              <Checkbox> 记住我</Checkbox>
            </Space>
            <Space>
              <Button
                loading={this.state.isLogining}
                type="primary"
                onClick={this.login}
                className="login-form-button"
              >
                登陆
              </Button>
              <Button type="ghost" className="login-form-button">
                注册
              </Button>
            </Space>
          </Space>
        </Col>
      </div>
    );
  }
}
