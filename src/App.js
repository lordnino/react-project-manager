import React, {
  Component
} from 'react';
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import uuid from 'uuid';
import './App.css';
import $ from 'jquery';
import Todos from './components/Todos';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super(); // we must use super in case we are using state
    this.state = { // this is a state
      projects: [],
      todos: []
    }
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ todos: data }, function () {
          console.log(this.state);
        })
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design',
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Developmnet',
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category: 'Web Development',
        }
      ]
    });
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({ projects: projects });
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({ projects: projects });
  }

  render() {
    return (
      <div className="App" >
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects onDelete={this.handleDeleteProject.bind(this)} projects={this.state.projects} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;