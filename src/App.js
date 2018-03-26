import React, { Component } from "react";
import Grid from "./Grid";
import { Input } from "react-spreadsheet-grid";
import logo from "./logo.svg";
import "./App.css";
import Hamoni from "hamoni-sync";

class App extends Component {
  constructor(props) {
    super(props);

    // Rows are stored in the state.
    this.state = {
      rows: [],
      columns: this.initColumns(),
      blurCurrentFocus: true,
      name: "",
      age: 0
    };
  }
  componentDidMount() {
    let hamoni = new Hamoni("AccountID", "APP_ID");

    hamoni
      .connect()
      .then(response => {
        hamoni
          .get("react-spreadsheet")
          .then(listPrimitive => {
            this.listPrimitive = listPrimitive;
            // this.listPrimitive.update(4, { id: 4, name: "Me", age: 21 });
            this.setState({
              rows: [...listPrimitive.getAll()]
            });
            console.log(listPrimitive.getAll());

            listPrimitive.onItemAdded(item => {
              console.log("item added");
              console.log(item);
              this.setState({ rows: [...this.state.rows, item.value] });
            });
            listPrimitive.onItemUpdated(item => {
              console.log("item updated");
              console.log(item);

              let rows = [
                ...this.state.rows.slice(0, item.index),
                item.value,
                ...this.state.rows.slice(item.index + 1)
              ];
              console.log("here");
              console.log(rows);

              this.setState({
                rows: rows
              });
            });

            listPrimitive.onSync(rows => {
              console.log("item synced");
              console.log(rows);

              this.setState({
                rows: rows
              });
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  // A callback called every time a value changed.
  // Every time it save a new value to the state.
  onFieldChange(rowId, field, value) {
    // const payload = { rowId, field, value };
    let row = this.state.rows[rowId];
    row[field] = value;
    this.listPrimitive.update(rowId, row);
  }

  initColumns() {
    return [
      {
        title: () => "Name",
        value: (row, { focus }) => {
          // You can use the built-in Input.
          return (
            <Input
              value={row.name}
              focus={focus}
              onChange={this.onFieldChange.bind(this, row.id, "name")}
            />
          );
        }
      },
      {
        title: () => "Age",
        value: (row, { focus }) => {
          // You can use the built-in Select.
          return (
            <Input
              value={row.age}
              focus={focus}
              onChange={this.onFieldChange.bind(this, row.id, "age")}
            />
          );
        }
      }
    ];
  }

  handleChange = event => {
    if (event.target.name === "name")
      this.setState({ name: event.target.value });
    if (event.target.name === "age") this.setState({ age: event.target.value });
  };

  handleSubmit = event => {
    this.listPrimitive.push({
      id: this.state.rows.length,
      name: this.state.name,
      age: this.state.age
    });
    // console.log({ name: this.state.name, age: this.state.age });
    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
          <form onSubmit={this.handleSubmit}>
            <h3>Create new record</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.handleChange}
              />
            </label>
            {"   "}
            <input type="submit" value="Add" />
          </form>
          <br />
          <Grid
            rows={this.state.rows}
            columns={this.state.columns}
            blurCurrentFocus={this.state.blurCurrentFocus}
          />
        </div>
      </div>
    );
  }
}

export default App;
