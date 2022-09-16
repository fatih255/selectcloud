import * as React from "react";
import { render } from "react-dom";
import SelectCloud from ".";
import { clean } from "./SelectCloudWorker";

type Props = {};

type State = {
  selectable: boolean;
  todos:
  | {
    content: string;
    isCompleted: boolean;
    id: string;
  }[]
  | null;
};
const APIBASE_URL = "https://631e2890cc652771a4928394.mockapi.io";

export default class ReactTest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectable: true,
      todos: []
    };
  }
  async componentDidMount() {
    const todos = await (
      await fetch(`${APIBASE_URL}/todos`, { method: "GET" })
    ).json();
    this.setState({
      todos: todos
    });
  }

  render() {
    const data: string[] = ["1", "2", "3"];
    return (
      <div>
        <SelectCloud
          selectable={this.state.selectable}
          loadingComponent={<div>Loading...</div>}
          options={{
            itemsClass: "note",
            containerClass: "cloud-selection-box",
            crossEffect: ({ style, classList }) => {
              style.color = "yellow";
              classList.add("test");
            },
            onComplete: ({ getAttributes, elements }) => {
              console.log(getAttributes("data-id"));
            }
          }}>
          <div
            style={{
              height: 200,
              background: "yellow"
            }}></div>
          <div
            style={{ marginLeft: 50, marginRight: 50 }}
            className="cloud-selection-box">
            {this.state.todos && this.state.todos?.length > 0 &&
              this.state.todos.map((item) => (
                <h1
                  key={item.id}
                  data-id={item.id}
                  style={{ background: "red", width: 100 }}
                  className="note">
                  {item.content}
                </h1>
              ))}
          </div>
        </SelectCloud>
        <button onClick={() => this.setState({ selectable: true })}>
          selectable
        </button>
        <button onClick={() => this.setState({ selectable: false })}>
          selectablenone
        </button>
        <button onClick={() => clean()}>remove selection</button>
        <button
          onClick={() => {
            const selectionbox = document.querySelector(".cloud-selection-box");
            const newitem = document.createElement("h1") as HTMLElement;
            newitem.innerText = "new";
            newitem.classList.add("note");
            newitem.style.width = 100 + "px";
            newitem.style.backgroundColor = "red";
            if (selectionbox) selectionbox.append(newitem);
          }}>
          add Item
        </button>
      </div>
    );
  }
}

// render(<ReactTest />, document.getElementById("root"));
