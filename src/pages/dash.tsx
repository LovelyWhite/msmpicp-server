import "./styles.css";
import React from "react";
import { fetchData, showError } from "../utils";
import "echarts";
import ECharts from "echarts/lib/echarts";
import theme from "../static/theme.json";

import {
  DropboxOutlined,
  TagOutlined,
  CompassOutlined,
  AimOutlined,
} from "@ant-design/icons";
interface Props {
  history: any;
}
interface States {
  todayData: number; //今日数据量
  popularRegion: string; //热门区域
  maxMagnetic: number; //最高磁力
}
ECharts.registerTheme("walden", theme);
export default class DashBoard extends React.Component<Props, States> {
  token: string;
  dailyDataEchart: ECharts.ECharts;
  dailyData: HTMLDivElement;
  modelData: HTMLDivElement;
  modelDataEchart: ECharts.ECharts;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      todayData: -1,
      popularRegion: "",
      maxMagnetic: -1,
    };
    this.token = localStorage.getItem("token");
    this.getDailyData = this.getDailyData.bind(this);
    this.getModelData = this.getModelData.bind(this);
    this.getKeyValue = this.getKeyValue.bind(this);
  }
  componentDidMount() {
    this.getDailyData();
    this.getModelData();
    this.getKeyValue();
  }
  //获取关键信息
  async getKeyValue() {
    let todayData = await fetchData(
      "/download/todayData",
      {},
      undefined,
      this.token
    );
    if (todayData && todayData.data) {
      if (todayData.data.code === 1) {
        this.setState({
          todayData: todayData.data.data,
        });
      } else {
        showError(todayData.data.msg);
      }
    }
  }
  async getModelData() {
    try {
      let result = await fetchData(
        "/download/modeldata",
        {},
        undefined,
        this.token
      );
      if (result && result.data) {
        if (result.data.code === 1) {
          let xAxisData = [];
          let yAxisData = [];
          result.data.data.forEach((e: any) => {
            xAxisData.push(e.modelName);
            yAxisData.push(e.total);
          });
          // console.log(xAxisData, yAxisData);
          this.modelDataEchart = ECharts.init(this.modelData, "walden");
          this.modelDataEchart.setOption({
            tooltip: {
              trigger: "axis",
            },
            xAxis: [
              {
                name: "机型",
                type: "category",
                data: xAxisData,
                axisLabel: {
                  fontSize: 10,
                  formatter: (arg: string) => {
                    return arg.replace(" ", "\n");
                  },
                },
              },
            ],
            grid: {
              top: 30,
              bottom: 60,
              right: 40,
            },
            dataZoom: [
              {
                type: "slider",
              },
            ],
            yAxis: [
              {
                minInterval: 1,
                type: "value",
                name: "台",
                show: true,
              },
            ],
            series: [
              {
                name: "数量",
                type: "bar",
                data: yAxisData,
                barMaxWidth: 30,
              },
            ],
          });
        } else {
          showError(result.data.msg);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getDailyData() {
    try {
      let result = await fetchData(
        "/download/dailydata",
        {},
        undefined,
        this.token
      );
      if (result && result.data) {
        if (result.data.code === 1) {
          let xAxisData = [];
          let yAxisData = [];
          result.data.data.forEach((e: any) => {
            xAxisData.push(e._id);
            yAxisData.push(e.total);
          });
          this.dailyDataEchart = ECharts.init(this.dailyData, "walden");
          this.dailyDataEchart.setOption({
            tooltip: {
              trigger: "axis",
            },
            xAxis: [
              {
                name: "日期",
                type: "category",
                data: xAxisData,
                axisLabel: {
                  fontSize: 10,
                },
              },
            ],
            grid: {
              top: 30,
              bottom: 60,
              right: 40,
            },
            dataZoom: [
              {
                type: "slider",
              },
            ],
            yAxis: [
              {
                minInterval: 1,
                type: "value",
                name: "数据量",
                show: true,
              },
            ],
            series: [
              {
                name: "数据量",
                type: "line",
                data: yAxisData,
              },
            ],
          });
        } else {
          showError(result.data.msg);
        }
      }
    } catch (e) {
      showError(e + "");
      console.log(e);
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="keyValueContainer"
            style={{ backgroundColor: "#69c0ff" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TagOutlined style={{ fontSize: "15px" }} />
              <span
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                }}
              >
                今日数据量
              </span>
            </div>
            <div
              style={{
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              <span>{this.state.todayData}</span>
            </div>
          </div>
          <div
            className="keyValueContainer"
            style={{ backgroundColor: "#36cfc9" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AimOutlined style={{ fontSize: "15px" }} />
              <span
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                }}
              >
                热门区域
              </span>
            </div>
            <div
              style={{
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              <span>{this.state.popularRegion}</span>
            </div>
          </div>
          <div
            className="keyValueContainer"
            style={{ backgroundColor: "#73d13d" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CompassOutlined style={{ fontSize: "15px" }} />
              <span
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                }}
              >
                最高磁场
              </span>
            </div>
            <div
              style={{
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              <span>{this.state.maxMagnetic}</span>
            </div>
          </div>
        </div>
        <div style={styles.graphContainer}>
          <span style={{ fontSize: 10 }}>每日数据趋势</span>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            ref={(ref: HTMLDivElement) => {
              this.dailyData = ref;
            }}
          >
            <DropboxOutlined style={{ fontSize: 20 }} />
          </div>
        </div>
        <div style={styles.graphContainer}>
          <span style={{ fontSize: 10 }}>机型数量统计</span>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            ref={(ref: HTMLDivElement) => {
              this.modelData = ref;
            }}
          >
            <DropboxOutlined style={{ fontSize: 20 }} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  graphContainer: {
    float: "left",
    height: 350,
    width: 600,
    minHeight: 200,
    minWidth: 270,
    padding: "15px 10px 5px 3px",
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  } as React.CSSProperties,
};
