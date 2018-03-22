let Hamoni = require("hamoni-sync");

let hamoni = new Hamoni("AccountID", "APP_ID");

hamoni
  .connect()
  .then(response => {
    hamoni
      .createList("react-spreadsheet", [
        { id: 0, name: "James K", age: 21 },
        { id: 1, name: "Jimmy M", age: 45 }
      ])
      .then(() => console.log("create success"))
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
