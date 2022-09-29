import React, { useEffect, useState } from "react";
import Output from "./Output";


function FormFunction() {

    //--------------------------input fild state-----------------------------------
    const [taskList, setTaskList] = useState([]);
    const [id, setId] = useState(null);
    const [enterDate, setEnterDate] = useState('');
    const [enterTitle, setEnterTitle] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [enterUiTechnology, setUiTechnology] = useState('');
    const [enterBackEndTechnology, setBackEndTechlogy] = useState('');
    const [enterLibrary, setLibrary] = useState({
        redux: false,
        saga: false,
        numpy: false,
        pandas: false
    });

    //------------------use effect for get item from local storage-----------------------
    useEffect(() => {
        const data = localStorage.getItem('taskList')

        if (data) {
            return setTaskList(JSON.parse(data))
        }
        else {
            return []
        }
    }, [])

    //--------------- Error state-------------------------------
    const [dateError, setDateError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [uiTechError, setUiTechError] = useState('');
    const [backEndError, SetBackEndError] = useState('');
    const [libraryError, setLibraryError] = useState('');

    //-------------- Error handlers------------------------------------
    const dateHandler = (event) => {
        setEnterDate(event.target.value);
        setDateError("");
    }

    const titleChangeHandler = (event) => {
        let TitleValue = event.target.value
        handleTitleError(TitleValue);
        setEnterTitle(event.target.value);
    }
    const handleTitleError = (value) => {
        if (value.length < 5) {
            setTitleError('Title length should be grater than 5.');
        } else if (value.length > 10) {
            setTitleError('Title length should be less than 10.');
        } else {
            setTitleError("");
        }
    }

    //--------------- handlers ------------------------------------
    const descriptionHandler = (event) => {
        setEnterDescription(event.target.value);
    }
    const uiTechChangeHandler = (event) => {
        setUiTechnology(event.target.value);
        setUiTechError("");
    }
    const bachEndTechHandel = (event) => {
        setBackEndTechlogy(event.target.value);
        SetBackEndError("");
    }
    const libraryHandler = (event) => {
        setLibrary({
            ...enterLibrary,
            [event.target.name]: !enterLibrary[event.target.name]
        });
        setLibraryError("");
        // console.log(event.value);
    }

    //------------ to get library value form a key---------------------------
    const modifyLibraryValues = (libraryObj) => {
        let libraryNameList = Object.keys(libraryObj);
        let newLibraryArray = []
        libraryNameList.forEach((lib, index) => {
            let value = libraryObj[lib];
            if (value) {
                newLibraryArray.push(lib)
            }
        })
        return newLibraryArray
    }


    const formSumbitHandler = () => {

        let id = Math.random();

        //------------------- set Errors--------------------        
        if (enterTitle == "") {
            setTitleError("Title is required.")
        }
        if (enterDate == "") {
            setDateError("Please select Date.")
        }
        if (enterUiTechnology == "") {
            setUiTechError("Please Select UI Technology");
        }
        if (enterBackEndTechnology == "") {
            SetBackEndError("Please Select Back-End Technology");
        }
        if (!enterLibrary.redux && !enterLibrary.saga && !enterLibrary.numpy && !enterLibrary.pandas) {
            setLibraryError("Please Select Library");
        }

        //----------validetion----------
        if (enterDate != '' && enterTitle != '' && enterUiTechnology != '' && enterBackEndTechnology != '' && modifyLibraryValues(enterLibrary).length > 0) {
            // -------------set data to veriable that sent to props-------------------
            const formSubmitted = {
                id: id,
                date: enterDate,
                title: enterTitle,
                description: enterDescription,
                uiTechnology: enterUiTechnology,
                backEndTechnology: enterBackEndTechnology,
                library: modifyLibraryValues({ ...enterLibrary })
            }

            //------------------- set Data--------------------------------
            let newTaskList = taskList
            newTaskList.push(formSubmitted)
            setTaskList([...taskList, formSubmitted])
            setEnterDate('')
            setEnterTitle('')
            setEnterDescription('')
            setUiTechnology('')
            setBackEndTechlogy('')
            setLibrary({
                redux: false,
                saga: false,
                numpy: false,
                pandas: false
            })

            localStorage.setItem('taskList', JSON.stringify(newTaskList));
            getDataFromLocalStore();
        }
    }
    //-------------------- Delete & Edit & update-----------------------------------
    const handleDeleteItem = (item) => {
        const newTaskList = taskList.filter(element => element.id !== item.id)
        setTaskList(newTaskList)
        localStorage.setItem('taskList', JSON.stringify(newTaskList));
    }

    const handaleEdit = (item) => {
        // console.log(item.id);
        setId(item.id)
        setEnterDate(item.date)
        setEnterTitle(item.title)
        setEnterDescription(item.description)
        setUiTechnology(item.uiTechnology)
        setBackEndTechlogy(item.backEndTechnology)
        let newObj = {}
        item.library.forEach((item) => {
            newObj[item] = true
        })
        setLibrary(newObj)
    }

    const updateHandler = () => {
        let newTasklist = taskList.map((task) => {
            if (task.id === id) {
                const newTak = {
                    id: id,
                    date: enterDate,
                    title: enterTitle,
                    description: enterDescription,
                    uiTechnology: enterUiTechnology,
                    backEndTechnology: enterBackEndTechnology,
                    library: modifyLibraryValues({ ...enterLibrary })
                };
                return newTak
            }
            return task
        })
        setTaskList(newTasklist)
        localStorage.setItem('taskList', JSON.stringify(newTasklist));

    }

    //------------------------Local store------------------------------------
    const getDataFromLocalStore = () => {
        const data = localStorage.getItem('taskList')
        if (data) {
            setTaskList(JSON.parse(data))
        }
        else {
            return []
        }
    }
    return (
        <>
            <h1>Task Form</h1>
            <form>
                <div className='form'>
                    <label id='date' className="col-25"> Date: </label>
                    <div className='col-75'>
                        <input type="date" value={enterDate} onChange={dateHandler} />
                        <div className="errors">
                            {(dateError) && dateError}
                        </div>
                    </div>

                    <label id='task' className="col-25" > Task Title:</label>
                    <div className='col-75'>
                        <input type="text" placeholder='Enter Task Title' value={enterTitle} onChange={titleChangeHandler} />
                        <div className="errors">
                            {(titleError) && titleError}
                        </div>
                    </div>

                    <label id='description' className="col-25"> Task Description: </label>
                    <div className='col-75'>
                        <textarea onChange={descriptionHandler} value={enterDescription}></textarea>
                    </div>

                    <label id='uiTech' className="col-25"> UI Technology:</label>
                    <div className='col-75'>
                        <select onChange={uiTechChangeHandler} value={enterUiTechnology} >
                            <option>Select</option>
                            <option value='react'>React</option>
                            <option value='angular'>Angular</option>
                            <option value='flutter'>Flutter</option>
                            <option value='vue.js'>Vue.js</option>
                        </select>
                        <div className="errors">
                            {(uiTechError) && uiTechError}
                        </div>
                    </div>

                    <label id='beTech' className="col-25">Back-End Technology:</label>
                    <div className='redio'  >
                        <label className='redio-label' >Python</label>

                        <input type="radio" className='redio-label' name="backendTech" value={"python"} onChange={bachEndTechHandel} checked={enterBackEndTechnology == "python"} />

                        <label className='redio-label'>.NET</label>

                        <input type="radio" className='redio-label' name="backendTech" value={".net"} onChange={bachEndTechHandel} checked={enterBackEndTechnology == ".net"} />

                        <label className='redio-label' >PHP</label>

                        <input type="radio" className='redio-label' name="backendTech" value={"php"} onChange={bachEndTechHandel} checked={enterBackEndTechnology == "php"} /><br />
                    </div>
                    <div className="errors">
                        {(backEndError) && backEndError}
                    </div>

                    <label id='library' className="col-25">Library Used:</label>
                    <div className='check' onChange={libraryHandler} >
                        <label className='check-label' >Redux</label>
                        <input type="checkbox" className='check-label' name="redux" onChange={libraryHandler} checked={enterLibrary.redux} />

                        <label className='check-label'>Saga</label>
                        <input type="checkbox" className='check-label' name="saga" onChange={libraryHandler} checked={enterLibrary.saga} />

                        <label className='check-label'>Numpy</label>
                        <input type="checkbox" className='check-label' name="numpy" onChange={libraryHandler} checked={enterLibrary.numpy} />

                        <label className='check-label'>Pandas</label>
                        <input type="checkbox" className='check-label' name="pandas" onChange={libraryHandler} checked={enterLibrary.pandas} />
                    </div>
                    <div className="errors">
                        {(libraryError) && libraryError}
                    </div>

                    <div>
                        <button type="button" onClick={formSumbitHandler}>submit</button>
                        <button type="button" onClick={updateHandler}>Update</button>
                        
                    </div>
                </div>
            </form>
            <Output data={taskList} deleteAtParent={handleDeleteItem} editAtFrom={handaleEdit} />

        </>
    )
}

export default FormFunction
