import "./styles.css";
import React from "react";
import { fetchData, showError } from "../utils";
import "echarts";
import ECharts from "echarts/lib/echarts";
import { DropboxOutlined, TagOutlined } from "@ant-design/icons";
interface Props {
  history: any;
}
export default class DashBoard extends React.Component<Props> {
  token: string;
  dailyDataEchart: ECharts.ECharts;
  dailyData: HTMLDivElement;
  modelData: HTMLDivElement;
  modelDataEchart: ECharts.ECharts;
  constructor(props: Readonly<Props>) {
    super(props);
    this.token = localStorage.getItem("token");
    this.getDailyData = this.getDailyData.bind(this);
  }
  componentDidMount() {
    this.getDailyData();
    // this.getModelData();
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
            // xAxisData.push(e._id);
            // yAxisData.push(e.total);
          });
          this.modelDataEchart = ECharts.init(this.modelData);
          this.modelDataEchart.setOption({
            tooltip: {
              trigger: "axis",
            },
            xAxis: [
              {
                type: "category",
                data: xAxisData,
              },
            ],
            grid: {
              top: 10,
              bottom: 30,
              right: 10,
            },
            yAxis: [
              {
                type: "value",
                name: "台",
                show: true,
                axisLine: {
                  lineStyle: {
                    color: "#5793f3",
                  },
                },
              },
            ],
            series: [
              {
                name: "台",
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
          this.dailyDataEchart = ECharts.init(this.dailyData);
          this.dailyDataEchart.setOption({
            tooltip: {
              trigger: "axis",
            },
            xAxis: [
              {
                type: "category",
                data: xAxisData,
              },
            ],
            grid: {
              top: 10,
              bottom: 30,
              right: 10,
            },
            yAxis: [
              {
                type: "value",
                name: "数据量",
                show: true,
                axisLine: {
                  lineStyle: {
                    color: "#5793f3",
                  },
                },
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
              <TagOutlined style={{ fontSize: "18px", color: "#eee" }} />
              <span
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: "#eee",
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
                color: "#eee",
                fontSize: 35,
              }}
            >
              <span>30</span>
            </div>
          </div>
          <div
            className="keyValueContainer"
            style={{ backgroundColor: "#36cfc9" }}
          ></div>
          <div
            className="keyValueContainer"
            style={{ backgroundColor: "#73d13d" }}
          ></div>
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
    height: 200,
    width: 270,
    minHeight: 200,
    minWidth: 270,
    paddingTop: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  } as React.CSSProperties,
};
