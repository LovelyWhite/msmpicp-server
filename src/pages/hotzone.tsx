import "./styles.css";
import React from "react";
import { Map, APILoader, Marker } from "@uiw/react-baidu-map";
import { fetchData, showError, ContextData } from "../utils";
import coordtransform from "coordtransform";
interface Props {
  history: any;
}
interface States {
  points: any[];
}
export default class HotZone extends React.Component<Props, States> {
  token: string;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      points: [],
    };
    this.token = localStorage.getItem("token");
    this.getContextData = this.getContextData.bind(this);
    this.trasnlatePoint = this.trasnlatePoint.bind(this);
  }
  trasnlatePoint(lng: number, lat: number) {
    let wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);
    console.log(wgs84togcj02);
    let gcj02tobd09 = coordtransform.gcj02tobd09(
      wgs84togcj02[0],
      wgs84togcj02[1]
    );
    return {
      lng: gcj02tobd09[0],
      lat: gcj02tobd09[1],
    };
  }
  async getContextData() {
    try {
      let result = await fetchData(
        "/download/contextdata",
        {},
        undefined,
        this.token
      );
      if (result && result.data) {
        if (result.data.code === 1) {
          let p_point: BMap.Point[] = [];
          let p_data = [];
          let datas: ContextData[] = result.data.data;
          datas.forEach((e) => {
            p_data.push(
              <Marker
                position={this.trasnlatePoint(
                  e.location.longitude,
                  e.location.latitude
                )}
              />
            );
          });
          this.setState({
            points: p_data,
          });
        } else {
          showError(result.data.msg);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {
    this.getContextData();
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <APILoader akay="oSCkZpIGEsEBPlS6geTAsqGG8YIAcguU">
          <Map
            ref={(props) => {
              if (props && props.map) {
                props.map.enableScrollWheelZoom();
              }
            }}
            zoom={3}
          >
            {this.state.points}
          </Map>
        </APILoader>
      </div>
    );
  }
}
