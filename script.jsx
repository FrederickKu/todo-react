class TodoItem extends React.Component {
    render() {
        return(
            <React.Fragment>
                    <p>{this.props.item.item}</p>
                    <p>{this.props.item.date}</p>
                    <button value={this.props.index} onClick={this.props.remove}>Remove from list</button>
            </React.Fragment>
        )

    }
}

class ItemList extends React.Component {


    render() {
        var list = this.props.list.map( (item,index) => {
            return (
                <div key={index}>
                    <TodoItem item={item} remove={this.props.remove} index={index} />
                </div>

            )
        });

        return (
            <React.Fragment>
                {list}
            </React.Fragment>
        )
    }
}

class Form extends React.Component {
    render(){
        return(
            <React.Fragment>
                {this.props.error ? <p>Input must be more than 1 character and less than 200 characters</p> : null}
                <input onChange={this.props.changeHandler} onKeyDown={this.props.enter} value={this.props.word}/>
                <button onClick={this.props.addItem}>Add item</button>
            </React.Fragment>

        );
    }
}


class ToDoApp extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : [],
      error : false
    }

    this.removeFromList = this.removeFromList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.keypressHandler = this.keypressHandler.bind(this);
  }

  addItem(){
    if (this.state.word.length >=1 && this.state.word.length <=200 ){
        let updatedList = this.state.list;
        console.log(moment());
        updatedList.push({item: this.state.word, date: moment().format('MMMM Do YYYY, h:mm:ss a')});
        this.setState({word: "", list: updatedList, error: false});
    } else {
        this.setState({error: true})
    }
  }

  keypressHandler(event){
      if (event.keyCode === 13) {
          this.addItem();
      }
  }

  changeHandler(event){
    this.setState({word: event.target.value.trim()});
  }

  removeFromList(event){
    let updatedList = this.state.list;
    updatedList.splice(parseInt(event.target.value),1)
    this.setState({list: updatedList})

  }

  render() {
      // render the list with a map() here

      return (
        <React.Fragment>
            <div className={"offset-3 col-6 form-container"}>
                <Form changeHandler = {this.changeHandler} addItem = {this.addItem} error = {this.state.error} word = {this.state.word} enter={this.keypressHandler} />
            </div>
            <div className={"offset-3 col-6 list-container"}>
                <ItemList list={this.state.list} remove={this.removeFromList} />
            </div>
        </React.Fragment>

      );
  }
}

ReactDOM.render(
    <div className={"row"}>
        <h1 className={"offset-3 col-6"}>To-Do-List</h1>
        <ToDoApp />
    </div>,
    document.getElementById('root')
);

