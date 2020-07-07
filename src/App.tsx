import React from "react";
import Login from "./pages/index";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./pages/main";
import { Alert, Col } from "antd";
interface States {
  errorVisible: boolean;
  errorMsg: string;
  warningVisible: boolean;
  warningMsg: string;
}
class App extends React.Component<{}, States> {
  static bHistory: any;
  constructor(props: {}) {
    super(props);
    if (!App.bHistory) {
      App.bHistory = createBrowserHistory();
    }
    this.state = {
      errorVisible: false,
      errorMsg: "",
      warningVisible: false,
      warningMsg: "",
    };
    this.showError = this.showError.bind(this);
    this.showWarning = this.showWarning.bind(this);
    this.disableWarning = this.disableWarning.bind(this);
    this.disableError = this.disableError.bind(this);
    this._handleWarningCb = this._handleWarningCb.bind(this);
    global["showWarning"] = this.showWarning;
    global["showError"] = this.showError;
    global["disableWarning"] = this.disableWarning;
    global["disableError"] = this.disableError;
  }

  disableWarning() {
    if (!this.state.warningVisible)
    this.setState({
      warningVisible: false,
    });
  }
  disableError() {
    if (this.state.errorVisible)
      this.setState({
        errorVisible: false,
      });
  }
  showError(msg: string) {
    if (!this.state.errorVisible)
      this.setState({
        errorVisible: true,
        errorMsg: msg,
      });
    else
      this.setState({
        errorMsg: msg,
      });
  }
  showWarning(msg: string) {
    if (!this.state.warningVisible)
      this.setState({
        warningVisible: true,
        warningMsg: msg,
      });
    else
      this.setState({
        warningMsg: msg,
      });
  }
  _handleWarningCb() {
    this.setState({
      warningVisible: false,
      warningMsg: "",
    });
  }
  render() {
    let { errorVisible, warningVisible } = this.state;
    return (
      <Col style={{ height: "100%" }}>
        {errorVisible ? (
          <Alert type="error" message={this.state.errorMsg} banner />
        ) : null}
        {warningVisible ? (
          <Alert
            type="warning"
            message={this.state.warningMsg}
            banner
            closable
            afterClose={this._handleWarningCb}
          />
        ) : null}
        <Router history={App.bHistory}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
          </Switch>
        </Router>
      </Col>
    );
  }
}
export default App;
