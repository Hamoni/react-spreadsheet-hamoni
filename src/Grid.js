import React, { Component } from "react";
import { Grid, Input } from "react-spreadsheet-grid";
// import axios from "axios";
// import Pusher from "pusher-js";

export default class RealtimeGrid extends Component {
  // constructor(props) {
  //   super(props);

  //   // Rows are stored in the state.
  //   this.state = {
  //     rows: [],
  //     columns: this.initColumns(),
  //     blurCurrentFocus: true
  //   };
  // }
  // componentDidMount() {
  //   const pusher = new Pusher("da857397f8eec3092630", {
  //     cluster: "eu",
  //     encrypted: true
  //   });
  //   const channel = pusher.subscribe("sheet");

  //   channel.bind("added", row => {
  //     this.setState({ rows: [...this.state.rows, row] });
  //   });

  //   channel.bind("updated", updateInfo => {
  //     let rows = this.state.rows;
  //     console.log(rows);
  //     rows[updateInfo.rowId][updateInfo.field] = updateInfo.value;
  //     // console.log(rows);

  //     this.setState({
  //       rows: [...rows]
  //     });
  //   });

  //   axios.get("http://localhost:5000/records").then(response => {
  //     // console.log(response.data);
  //     // Rows are stored in the state.
  //     this.setState({
  //       rows: [...response.data]
  //     });
  //   });
  // }

  // // A callback called every time a value changed.
  // // Every time it save a new value to the state.
  // onFieldChange(rowId, field, value) {
  //   const payload = { rowId, field, value };
  //   axios.post("http://localhost:5000/update", payload);
  // }

  // initColumns() {
  //   return [
  //     {
  //       title: () => "Name",
  //       value: (row, { focus }) => {
  //         // You can use the built-in Input.
  //         return (
  //           <Input
  //             value={row.name}
  //             focus={focus}
  //             onChange={this.onFieldChange.bind(this, row.id, "name")}
  //           />
  //         );
  //       }
  //     },
  //     {
  //       title: () => "Age",
  //       value: (row, { focus }) => {
  //         // You can use the built-in Select.
  //         return (
  //           <Input
  //             value={row.age}
  //             focus={focus}
  //             onChange={this.onFieldChange.bind(this, row.id, "age")}
  //           />
  //         );
  //       }
  //     }
  //   ];
  // }

  render() {
    console.log("render");
    // console.log(this.props.rows);
    return (
      <Grid
        columns={this.props.columns}
        rows={this.props.rows}
        getRowKey={row => row.id}
        // Don't forget to blur focused cell after a value has been changed.
        blurCurrentFocus={this.props.blurCurrentFocus}
      />
    );
  }
}
