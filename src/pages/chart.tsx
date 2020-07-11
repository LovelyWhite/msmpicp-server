import "./styles.css";
import React from "react";
import {
  fetchData,
  showError,
  ContextData,
  getTimeString,
  disableWarning,
  disableError,
} from "../utils";
import {
  Table,
  Space,
  DatePicker,
  Button,
  Input,
  Select,
  Tag,
  Spin,
} from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import "echarts";
import FileSaver from "file-saver";
import ECharts from "echarts/lib/echarts";
import theme from "../static/theme.json";
import Column from "antd/lib/table/Column";
import { Parser } from "json2csv";
interface Props {
  history: any;
}
interface States {
  phoneModelLoading: boolean;
  phoneModelList: string[];
  dataSource: ContextData[];
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
  limit: number;
  skip: number;
  phoneModel: string;
  startTime: number;
  stopTime: number;
  contextDataLoading: boolean;
  exportLoading: boolean;
}
ECharts.registerTheme("walden", theme);
export default class Chart extends React.Component<Props, States> {
  token: string;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      phoneModelLoading: true,
      contextDataLoading: false,
      exportLoading: false,
      phoneModelList: [],
      dataSource: [],
      minLng: undefined,
      maxLng: undefined,
      minLat: undefined,
      maxLat: undefined,
      phoneModel: undefined,
      startTime: undefined,
      stopTime: undefined,
      limit:undefined,
      skip:undefined,
    };
    this.getContextData = this.getContextData.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
  }
  componentDidMount() {
    this.token = localStorage.getItem("token");
    this.getModel();
  }

  async getContextData() {
    this.setState({
      contextDataLoading: true,
      dataSource: [],
    });
    disableError();
    let {
      minLng,
      maxLng,
      minLat,
      maxLat,
      phoneModel,
      startTime,
      stopTime,
      skip,
      limit
    } = this.state;
    try {
      let contextData = await fetchData(
        "/download/contextdata",
        {
          minLng,
          maxLng,
          minLat,
          maxLat,
          phoneModel,
          startTime,
          stopTime,
          skip,
          limit
        },
        undefined,
        this.token
      );
      if (contextData && contextData.data) {
        if (contextData.data.code === 1) {
          console.log(contextData.data.data);
          this.setState({
            dataSource: contextData.data.data ? contextData.data.data : [],
          });
        } else {
          showError(contextData.data.msg);
        }
      }
    } catch (e) {
      showError(e + "");
      console.log(e);
    } finally {
      this.setState({
        contextDataLoading: false,
      });
    }
  }
  async exportExcel() {
    if (this.state.dataSource.length == 0) {
      showError("当前搜索结果为空");
    } else {
      this.setState({
        exportLoading: true,
      });
      String.prototype["replaceAll"] = function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
      };
      let _data: {
        "磁场(x)": number;
        "磁场(y)": number;
        "磁场(z)": number;
        "姿态(x)": number;
        "姿态(y)": number;
        "姿态(z)": number;
        海拔: number;
        气压: number;
        "加速度(x)": number;
        "加速度(y)": number;
        "加速度(z)": number;
        日期: string;
        时间: string;
        "位置(精确度)": number;
        经度: number;
        纬度: number;
        品牌名:string,
        设备名称:string;
      }[] = [];
      this.state.dataSource.forEach((e: any) => {
        let msg = new Date(e.location.time);
        let msgDate = msg.getDate();
        let msgYear = msg.getFullYear();
        let msgMouth = msg.getMonth() + 1;
        let msgHours = msg.getHours();
        let msgMinutes = msg.getMinutes();
        let msgSecond = msg.getSeconds();
        _data.push({
          "磁场(x)": e.magnetometerData.x,
          "磁场(y)": e.magnetometerData.y,
          "磁场(z)": e.magnetometerData.z,
          "姿态(x)": e.gyroscopeData.x,
          "姿态(y)": e.gyroscopeData.y,
          "姿态(z)": e.gyroscopeData.z,
          海拔: e.location.altitude,
          气压: e.barometerData.pressure,
          "加速度(x)": e.accelerometerData.x,
          "加速度(y)": e.accelerometerData.y,
          "加速度(z)": e.accelerometerData.z,
          日期: msgYear + "-" + msgMouth + "-" + msgDate,
          时间: msgHours + ":" + msgMinutes+":"+msgSecond,
          "位置(精确度)": e.location.accuracy,
          经度: e.location.longitude,
          纬度: e.location.latitude,
          品牌名:e.model[0].brandName,
          设备名称:e.model[0].phoneModelName,
        });
      });
      let r: any = JSON.stringify(_data);
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(JSON.parse(r));
      let blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, getTimeString(new Date().getTime()) + ".csv");
      this.setState({
        exportLoading: false,
      });
    }
  }
  async getModel() {
    try {
      let modelData = await fetchData(
        "/download/modeldata",
        {},
        undefined,
        this.token
      );
      if (modelData && modelData.data) {
        if (modelData.data.code === 1) {
          this.setState({
            phoneModelList: modelData.data.data,
          });
        } else {
          showError(modelData.data.msg);
        }
      }
    } catch (e) {
      showError(e + "");
      console.log(e);
    } finally {
      this.setState({
        phoneModelLoading: false,
      });
    }
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginRight: 10,
            marginLeft: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Space>
            <Input.Group compact>
              <Input
                type="number"
                value={this.state.minLng}
                style={{ width: 100, textAlign: "center" }}
                placeholder="最小经度"
                onChange={(e) => {
                  this.setState({
                    minLng: Number.parseFloat(e.currentTarget.value)
                      ? Number.parseFloat(e.currentTarget.value)
                      : undefined,
                  });
                }}
              />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="~"
                disabled
              />
              <Input
                type="number"
                value={this.state.maxLng}
                className="site-input-right"
                style={{
                  width: 100,
                  textAlign: "center",
                }}
                onChange={(e) => {
                  this.setState({
                    maxLng: Number.parseFloat(e.currentTarget.value)
                      ? Number.parseFloat(e.currentTarget.value)
                      : undefined,
                  });
                }}
                placeholder="最大经度"
              />
            </Input.Group>
            <Input.Group compact>
              <Input
                type="number"
                value={this.state.minLat}
                style={{ width: 100, textAlign: "center" }}
                placeholder="最小纬度"
                onChange={(e) => {
                  this.setState({
                    minLat: Number.parseFloat(e.currentTarget.value)
                      ? Number.parseFloat(e.currentTarget.value)
                      : undefined,
                  });
                }}
              />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="~"
                disabled
              />
              <Input
                type="number"
                value={this.state.maxLat}
                className="site-input-right"
                style={{
                  width: 100,
                  textAlign: "center",
                }}
                placeholder="最大纬度"
                onChange={(e) => {
                  this.setState({
                    maxLat: Number.parseFloat(e.currentTarget.value)
                      ? Number.parseFloat(e.currentTarget.value)
                      : undefined,
                  });
                }}
              />
            </Input.Group>
            <Select
              defaultValue="手机型号（全部）"
              style={{ width: 200 }}
              onChange={(value) => {
                this.setState({
                  phoneModel: value ? value : undefined,
                });
              }}
              loading={this.state.phoneModelLoading}
            >
              <Select.Option value={undefined}>手机型号（全部）</Select.Option>
              {this.state.phoneModelList.map((v: any, i) => {
                return (
                  <Select.Option key={i} value={v._id}>
                    {v.modelName}
                  </Select.Option>
                );
              })}
            </Select>
            <DatePicker.RangePicker
              onChange={(v) => {
                console.log(v);
                let start = v[0];
                let end = v[1];
                this.setState({
                  startTime: start.toDate().setHours(0, 0, 0, 0),
                  stopTime: end.toDate().setHours(0, 0, 0, 0),
                });
              }}
              placeholder={["开始时间", "结束时间"]}
              style={{ width: 260 }}
            />
            <Input
              type="number"
              value={this.state.skip}
              className="site-input-right"
              style={{
                width: 150,
                textAlign: "center",
              }}
              placeholder="跳过数据条数(0)"
              onChange={(e) => {
                this.setState({
                  skip: Number.parseInt(e.currentTarget.value)
                    ? Number.parseInt(e.currentTarget.value)
                    : undefined,
                });
              }}
            />
            <Input
              type="number"
              value={this.state.limit}
              className="site-input-right"
              style={{
                width: 150,
                textAlign: "center",
              }}
              placeholder="数据总量(100)"
              onChange={(e) => {
                this.setState({
                  limit: Number.parseInt(e.currentTarget.value)
                    ? Number.parseInt(e.currentTarget.value)
                    : undefined,
                });
              }}
            />
            <Button
              type="primary"
              loading={this.state.contextDataLoading}
              onClick={this.getContextData}
              icon={<SearchOutlined />}
            >
              筛选
            </Button>
            <Button
              type="ghost"
              loading={this.state.exportLoading}
              onClick={this.exportExcel}
              icon={<FileExcelOutlined />}
            >
              导出
            </Button>
          </Space>
        </div>
        <div>
          <Spin spinning={this.state.contextDataLoading}>
            <Table
              dataSource={this.state.dataSource}
              style={{ marginRight: 10, marginLeft: 10 }}
            >
              <Column
                title="加速计"
                dataIndex="accelerometerData"
                key="accelerometerData"
                render={(data) => (
                  <Space direction="vertical">
                    <Tag color="blue" key="x">
                      x:{data.x}
                    </Tag>
                    <Tag color="blue" key="y">
                      y:{data.y}
                    </Tag>
                    <Tag color="blue" key="z">
                      z: {data.z}
                    </Tag>
                  </Space>
                )}
              />
              <Column
                title="GPS"
                dataIndex="location"
                key="location"
                render={(data) => (
                  <Space direction="vertical">
                    <Tag color="purple" key="longitude">
                      经度:{data.longitude}
                    </Tag>
                    <Tag color="purple" key="latitude">
                      纬度:{data.latitude}
                    </Tag>
                    <Tag color="purple" key="time">
                      时间:{getTimeString(data.time)}
                    </Tag>
                    <Tag color="purple" key="altitude">
                      海拔:{data.altitude}
                    </Tag>
                    <Tag color="purple" key="accuracy">
                      位置精确度:{data.accuracy}
                    </Tag>
                  </Space>
                )}
              />
              <Column
                title="陀螺仪"
                dataIndex="gyroscopeData"
                key="gyroscopeData"
                render={(data) => (
                  <Space direction="vertical">
                    <Tag color="green" key="x">
                      x:{data.x}
                    </Tag>
                    <Tag color="green" key="y">
                      y:{data.y}
                    </Tag>
                    <Tag color="green" key="z">
                      z: {data.z}
                    </Tag>
                  </Space>
                )}
              />
              <Column
                title="磁力计"
                dataIndex="magnetometerData"
                key="magnetometerData"
                render={(data) => (
                  <Space direction="vertical">
                    <Tag color="grey" key="x">
                      x:{data.x}
                    </Tag>
                    <Tag color="grey" key="y">
                      y:{data.y}
                    </Tag>
                    <Tag color="grey" key="z">
                      z: {data.z}
                    </Tag>
                  </Space>
                )}
              />

              <Column
                title="气压计"
                dataIndex="barometerData"
                key="barometerData"
                render={(data) => (
                  <Space direction="vertical">
                    <Tag color="red" key="pressure">
                      气压:{data.pressure}
                    </Tag>
                  </Space>
                )}
              />
              <Column
                title="设备信息"
                dataIndex="model"
                key="model"
                render={(data) => (
                  <Space direction="vertical">
                    <Tag color="yellow" key="pressure">
                      品牌名:{data[0].brandName}
                    </Tag>
                    <Tag color="yellow" key="pressure">
                      设备名称:{data[0].phoneModelName}
                    </Tag>
                  </Space>
                )}
              />
            </Table>
          </Spin>
        </div>
      </div>
    );
  }
}
