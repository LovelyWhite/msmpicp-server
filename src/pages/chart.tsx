import "./styles.css";
import React from "react";
import { fetchData, showError } from "../utils";
import { Table, Tag, Space, DatePicker, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import "echarts";
import ECharts from "echarts/lib/echarts";
import theme from "../static/theme.json";
interface Props {
  history: any;
}
interface States {
}
ECharts.registerTheme("walden", theme);
export default class Chart extends React.Component<Props, States> {
  token: string;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
    };
    this.token = localStorage.getItem("token");
  }
  componentDidMount() {
  }
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ marginTop: 10, marginBottom: 10, marginRight: 10, marginLeft: 10, display: "flex", justifyContent: "flex-end" }}>

          <Space>
            <div>
              <text>气压值 </text>
              <Input style={{ width: 100, textAlign: 'center' }} placeholder="最小值" />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Input
                style={{
                  width: 100,
                  textAlign: 'center',
                }}
                placeholder="最大值"
              />
            </div>
            <DatePicker.RangePicker placeholder={["开始时间","结束时间"]} style={{ width: 260 }} />
            <Button type="primary" icon={<SearchOutlined />}>筛选</Button>
          </Space>

        </div>
        <div>
          <Table style={{ marginRight: 10, marginLeft: 10 }} dataSource={dataSource} columns={columns} />
        </div>
      </div>
    );
  }
}

