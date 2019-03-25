const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
  TODO_LIST: "todo-list"
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

// Main/Parent Compoent
class TodoApp extends React.Component {
  state = {
    todos: []
  };

  constructor(props) {
    super(props);

    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }

  // Method to get unique keys to assign to react components
  getKey() {
    return this.keyCount++;
  }

  //arrow function to handle inserts
  handleAddition = todos => {
    const newTodos = [...this.state.todos];
    const length = newTodos.length;
    newTodos.push({ id: `${this.getKey()}`, value: todos, checked: false });
    this.setState({ todos: newTodos });
  };

  // arrow function to handle Checkbox change events
  handleChange = todo => {
    const newTodos = [...this.state.todos];
    const index = newTodos.indexOf(todo);
    newTodos[index] = { ...todo };
    newTodos[index].checked = !newTodos[index].checked;
    this.setState({ todos: newTodos });
  };

  // arrow function to handle Deletes
  handleDelete = todoId => {
    const todos = this.state.todos.filter(c => c.id !== todoId);
    this.setState({ todos: todos });
  };

  render() {
    //Rendering the itemcount
    ReactDOM.render(
      React.createElement("p", null, this.state.todos.length),
      itemCountSpan
    );
    const unckeckedCount = this.state.todos.filter(c => c.checked === false)
      .length;
    // Rendering the unchecked checkbox count
    ReactDOM.render(
      React.createElement("p", null, unckeckedCount),
      uncheckedCountSpan
    );
    // Returning List of Todo's
    return React.createElement(Todos, {
      onChange: this.handleChange,
      onDelete: this.handleDelete,
      onAddition: this.handleAddition,
      todos: this.state.todos
    });
  }
}

// Parent component for actual Todo.
class Todos extends React.Component {
  render() {
    return React.createElement("div", { className: classNames.TODO_LIST }, [
      this.props.todos.map(todo =>
        React.createElement(Todo, {
          key: todo.id,
          onDelete: () => `${this.props.onDelete(todo.id)}`,
          onAddition: () => `${this.props.onAddition(todo)}`,
          onChange: () => `${this.props.onChange(todo)}`,
          todo: todo
        })
      )
    ]);
  }
}

// Component to hold todo's
class Todo extends React.Component {
  render() {
    console.log("Todo props = ", this.props);
    return React.createElement("div", { className: classNames.TODO_ITEM }, [
      React.createElement("input", {
        key: `checkbox-${this.props.todo.id}`,
        id: "checkbox",
        type: "checkbox",
        onChange: () => `${this.props.onChange(this.props.todo)}`,
        className: classNames.TODO_CHECKBOX
      }),
      React.createElement("input", {
        key: `input-${this.props.todo.id}`,
        type: "textArea",
        placeholder: "Enter Todo Text",
        className: classNames.TODO_TEXT
      }),
      React.createElement(
        "button",
        {
          key: `button-${this.props.todo.id}`,
          onClick: () => `${this.props.onDelete(this.props.todo.id)}`,
          className: classNames.TODO_DELETE
        },
        "Delete"
      )
    ]);
  }
}

function newTodo() {
  // getting React dom as a variable reference and invoking its method to handle addition
  const currentDom = ReactDOM.render(
    React.createElement(TodoApp),
    document.getElementById("todo-list")
  );
  currentDom.handleAddition();
}
