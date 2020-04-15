import React from "react";
import { Card } from "antd";
import { fetchData } from "../utils";
interface Props {
    history: any;
}
export default class DashBoard extends React.Component<Props>{
    token: string;
    constructor(props: Readonly<Props>) {
        super(props);
        this.token = localStorage.getItem('token');
        console.log(this.token)
    }
    async componentDidMount() {
        try {
            let result = await fetchData("/download/contextdata", {}, undefined, this.token);
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <Card>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>)
    }
}