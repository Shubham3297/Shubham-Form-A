import React, { Component } from "react";
import './inputForm.css'
import Output from "./Output";

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskList: [],
            date: '',
            taskTitle: '',
            description: '',
            uiTechnology: '',
            backEndTechnology: '',
            
            library: { redux: false, saga: false, numpy: false, pandas: false }
            // library:[]
            // library: ['redux','saga','nump',"pandas"]
        }
    }
    dateChange = event => {
        this.setState({
            date: event.target.value
        })
    }
    taskTitleChange = event => {
        this.setState({
            taskTitle: event.target.value
        })
    }
    descriptionChange = event => {
        this.setState({
            description: event.target.value
        })
    }
    uiTechnologyChange = event => {
        this.setState({
            uiTechnology: event.target.value
        })
    }
    backEndTechnologyChange = event => {
        this.setState({
            backEndTechnology: event.target.value
        })
    }
    libraryChange = event => {
        console.log(event)
        this.setState({
            library: { ...this.state.library, [event.target.name]: !this.state.library[event.target.name] }
        })
        // console.log("hiiii"+event.library);
    }

    modifyLibraryValues=(libraryObj)=>{
        let libraryNameList=Object.keys(libraryObj);
        let newLibraryArray=[]
        //["redux","saga","numpy"]
        libraryNameList.forEach((lib,index)=>{
            let value= libraryObj[lib];
            if(value){
                newLibraryArray.push(lib," ")
            }
        })

        return newLibraryArray
    }

    handleSubmitAction = (event) => {
        event.preventDefault();

        let newTask = {
            date: this.state.date,
            taskTitle:this.state.taskTitle,
            description: this.state.description,
            uiTechnology: this.state.uiTechnology,
            backEndTechnology: this.state.backEndTechnology,
            library: this.modifyLibraryValues({...this.state.library})
        }

        // console.log("hii",newTask);

        let newTaskList = this.state.taskList
        newTaskList.push(newTask)
        this.setState({taskList:newTaskList})

        this.setState({
            taskList: newTaskList,
            date: '',
            taskTitle: '',
            description: '',
            uiTechnology: '',
            backEndTechnology: '',
            library: { redux: false, saga: false, numpy: false, pandas: false }
            // library: [redux,saga,nump,pandas]
           
        })
    }

    render() {
        // console.log("state", this.state)
        return (
            <>
                <form >
                    <div className='form'>
                        <label id='date' className="col-25"> Date: </label>
                        <div className='col-75'>
                            <input type="date" value={this.state.date} onChange={this.dateChange} />
                        </div>

                        <label id='task' className="col-25" > Task Title:</label>
                        <div className='col-75'>
                            <input type="text" value={this.state.taskTitle} onChange={this.taskTitleChange} placeholder='Enter Task Title' />
                        </div>

                        <label id='description' className="col-25"> Task Description: </label>
                        <div className='col-75'>
                            <textarea value={this.state.description} onChange={this.descriptionChange}></textarea>
                        </div>

                        <label id='uiTech' className="col-25"> UI Technology:</label>
                        <div className='col-75'>
                            <select value={this.state.uiTechnology} onChange={this.uiTechnologyChange}>
                                <option disabled>Select</option>
                                <option value='react'>React</option>
                                <option value='angular'>Angular</option>
                                <option value='flutter'>Flutter</option>
                                <option value='vue.js'>Vue.js</option>
                            </select>
                        </div>


                        <label id='beTech' className="col-25">Back-End Technology:</label>

                        <div className='redio'  >
                            <label className='redio-label' >Python
                                <input type="radio" name="backendTech" value={"python"} onChange={this.backEndTechnologyChange} />
                                {/* </div> */}</label>

                            <label className='redio-label'>.NET</label>
                            {/* <div className='redio'> */}
                            <input type="radio" name="backendTech" value={".net"} onChange={this.backEndTechnologyChange} />
                            {/* </div> */}

                            <label className='redio-label' >PHP</label>
                            {/* <div className='redio'> */}
                            <input type="radio" name="backendTech" value={"php"} onChange={this.backEndTechnologyChange} />
                        </div>

                        <label id='library' className="col-25">Library Used:</label>
                        <div className='check' onChange={this.libraryChange}>
                            <label className='check-label' >Redux</label>
                            <input type="checkbox" name="redux" onChange={this.libraryChange} checked={this.state.library.redux}  />

                            <label className='check-label'>Saga</label>
                            <input type="checkbox" name="saga" onChange={this.libraryChange} checked={this.state.library.saga}  />

                            <label className='check-label'>Numpy</label>
                            <input type="checkbox" name="numpy" onChange={this.libraryChange} checked={this.state.library.numpy}  />

                            <label className='check-label'>Pandas</label>
                            <input type="checkbox" name="pandas" onChange={this.libraryChange} checked={this.state.library.pandas}  />
                        </div>

                        <div>

                            <button onClick={this.handleSubmitAction}>submit</button>
                            <button >Reset</button>
                            <button>Cancel</button>
                        </div>

                    </div>

                </form>
                <Output data={this.state.taskList} />

                
                
            </>
        )
    }
}
export default Form;