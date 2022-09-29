import React, { useState, useContext, useEffect } from 'react'
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from "react-router-dom"
import mdl from "./TaskForm.module.css"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { toast } from 'react-toastify';
import { createTaskActions, updateTaskActions } from "src/redux/taskRedux/taskAction"

function TaskForm(props) {
    // // ----------Localization hooks & Router Hooks-------------
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------
    // 1st way ==> get data from another component ==> by using props 
    const taskField = props.taskField
    const isTaskUpdate = props.isTaskUpdate

    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer


    // // ----------hooks useState--------------------------------------------------
    const [task, setTask] = useStateCallback(taskField); // same API as useState + setState with class base
    const [err, setErr] = useState({})
    const [formEdit, setFormEdit] = useState(isTaskUpdate === true ? true : false)


    // // ----------hooks useEffect--------------------------------------------------
    const { date, title, description, technology, library } = task;
    const { titleErr, uiTechErr, backEndTechErr, } = err

    // // ***To check responce/error after success/error action from reducer***
    const { createTaskResponse, createTaskError, updateTaskResponse, updateTaskError, isLoading } = taskReducer
    const prevPropsState = usePrevious({ createTaskResponse, createTaskError, updateTaskResponse, updateTaskError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.createTaskResponse !== createTaskResponse && createTaskResponse) { // // createTaskResponse !== null && createTaskResponse !== undefined
                history.push('/task/retrieve')
                handleResetTask()
                setTimeout(() => { toast.success("Task Added successfully") }, 500);
            }
            else if (prevPropsState.createTaskError !== createTaskError && createTaskError) {
                setTimeout(() => { toast.error("Something wrong happened.. Not able to create task.") }, 500);
            }
            if (prevPropsState.updateTaskResponse !== updateTaskResponse && updateTaskResponse) {
                history.push('/task/retrieve')
                handleResetTask()
                setTimeout(() => { toast.success("Task Updated successfully!") }, 500);
            }
            else if (prevPropsState.updateTaskError !== updateTaskError && updateTaskError) {
                setTimeout(() => { toast.error("Something wrong happened.. Not able to edit task.") }, 500);
            }
        }
    }, [taskReducer])


    // // ----------hooks useEffect--------------------------------------------------
    const handleInputChange = e => {
        if (e.target.type === "checkbox") {
            // // // ### 1st way to update nested state ###
            let updatedTask = { ...task }
            updatedTask.library[e.target.name] = !updatedTask.library[e.target.name]
            setTask({ ...updatedTask })
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            // // // ###1st way to update nested state###
            let updatedTask = { ...task }
            updatedTask.technology[e.target.name] = e.target.value
            setTask({ ...updatedTask })
            const nameForm = e.target.name
            formValidation(task, nameForm);
        }
        else {
            setTask({ ...task, [e.target.name]: e.target.value },
                task => {
                    const nameForm = e.target.name
                    formValidation(task, nameForm);
                })
        }
    };


    // // ----------handler functions--------------------------------------------------
    const handleCreateTask = async (e) => {
        const nameFormList = ["title", "uiTech", "backEndTech"]
        nameFormList.forEach((nameForm) => {
            formValidation(task, nameForm)
        })
        if (title && technology.uiTech && technology.backEndTech && !titleErr && !uiTechErr && !backEndTechErr) {
            dispatch(createTaskActions(task))
        }
    }

    const handleUpdateTask = async (e) => {
        if (title && technology.uiTech && technology.backEndTech && !titleErr && !uiTechErr && !backEndTechErr) {
            dispatch(updateTaskActions(task))
        }
    }

    const handleResetTask = () => {
        // // 1st way to update nested state.
        setTask({
            date: "",
            title: "",
            description: "",
            technology: { uiTech: "", backEndTech: "" },
            library: { redux: false, saga: false, numpy: false, pandas: false },
        })
        setErr({
            titleErr: "",
            uiTechErr: "",
            backEndTechErr: "",
        })
    }


    const formValidation = (task, nameForm) => {
        switch (nameForm) {
            // // title validation
            case 'title':
                let titleErr = ""
                const regExp = /^[0-9a-zA-Z ]+$/
                const titleValue = task.title
                if (titleValue.trim() === "") {
                    titleErr = "Title must not be empty"
                }
                else {
                    if (titleValue.match(regExp)) {
                        if (titleValue.trim().length < 5) {
                            titleErr = "Title must contain at least 5 characters"
                        }
                        else if (titleValue.trim().length > 15) {
                            titleErr = "Title must not exceed 15 characters"
                        }
                        else {
                            titleErr = ""
                        }
                    }
                    else {
                        titleErr = 'Title must not contain any symbols'
                    }
                }

                // // ###1st way to update state in loop (here forEach loop)###
                err.titleErr = titleErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, titleErr: titleErr })) // useState hook if we update errState normaly in loop then only last state will update 

                break;

            case "uiTech":
                let uiTechErr = ""
                const uiTechValue = task.technology.uiTech
                if (uiTechValue === "") {
                    uiTechErr = "Select UI Technology."
                }
                else {
                    uiTechErr = ""
                }
                // // ###1st way to update state in loop (here forEach loop)###
                err.uiTechErr = uiTechErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, uiTechErr: uiTechErr })) // useState hook if we update errState normaly in loop then only last state will update 
                break

            case "backEndTech":
                let backEndTechErr = ""
                const backEndTechValue = task.technology.backEndTech
                if (backEndTechValue === "") {
                    backEndTechErr = "Select Back End Technology."
                }
                else {
                    backEndTechErr = ""
                }
                // // ###1st way to update state in loop (here forEach loop)###
                err.backEndTechErr = backEndTechErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, backEndTechErr: backEndTechErr })) // useState hook if we update errState normaly in loop then only last state will update 
                break

            default:
                break;
        }
    }

    return (
        <div>
            <form name="myForm" className={mdl.formStyle}>
                <div className={allClass("", "formField col", mdl)}>
                    <label className={mdl.formLable} >Date:</label>
                    <input type="date" name="date" value={date} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                </div>

                <div>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable}>Task Title:</label>
                        <input type="text" name="title" value={title} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter Task Title." />
                    </div>
                    <small style={{ color: "red" }}>{titleErr}</small>
                </div>
                <div className={allClass("", "formField col", mdl)}>
                    <label className={mdl.formLable} >Task description :</label>
                    <textarea rows="6" cols="30" name="description" value={description} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                </div>
                <div>
                    <div className={allClass("", "formField col", mdl)} >
                        <div className={mdl.formLable}  >UI Technology:</div>
                        <select name='uiTech' value={technology.uiTech} onChange={e => handleInputChange(e)} className="form-dropdown text-field">
                            <option value="" > Select </option>
                            <option value="react" > React </option>
                            <option value="angular"> Angular </option>
                            <option value="flutter"> Flutter </option>
                            <option value="vue.js"> Vue.js </option>
                        </select>
                    </div>
                    <small style={{ color: "red" }}>{uiTechErr}</small>
                </div>
                <div>
                    <div className={allClass("", "formField col", mdl)}>
                        <div className={mdl.formLable} >Back-End Technology :</div>
                        <label className={mdl.formBackEndLabel}>Python
                            <input type="radio" name="backEndTech" value="python" onChange={e => handleInputChange(e)} checked={technology.backEndTech === 'python'} />
                        </label>
                        <label className={mdl.formBackEndLabel}>.NET
                            <input type="radio" name="backEndTech" value=".net" onChange={e => handleInputChange(e)} checked={technology.backEndTech === '.net'} />
                        </label>
                        <label className={mdl.formBackEndLabel}>PHP
                            <input type="radio" name="backEndTech" value="php" onChange={e => handleInputChange(e)} checked={technology.backEndTech === 'php'} />
                        </label>
                    </div>
                    <small style={{ color: "red" }}>{backEndTechErr}</small>
                </div>
                <div className={allClass("", "formField col", mdl)}>
                    <div className={mdl.formLable} >Library Used:</div>
                    <label className={mdl.formLibraryLabel}>Redux<input type="checkbox" name="redux" onChange={e => handleInputChange(e)} checked={task.library.redux} /> </label>
                    <label className={mdl.formLibraryLabel}>Saga<input type="checkbox" name="saga" onChange={e => handleInputChange(e)} checked={task.library.saga} /> </label>
                    <label className={mdl.formLibraryLabel}>Numpy<input type="checkbox" name="numpy" onChange={e => handleInputChange(e)} checked={task.library.numpy} /> </label>
                    <label className={mdl.formLibraryLabel}>Pandas<input type="checkbox" name="pandas" onChange={e => handleInputChange(e)} checked={task.library.pandas} /></label>
                </div>

                {formEdit === false ?
                    <div className="field-btn">
                        <button type='button' onClick={event => handleCreateTask(event)} className={allClass("btn btn-success", "buttonStyl", mdl)}>AddTask</button>
                        <button type="reset" onClick={event => handleResetTask(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >Reset</button>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                    </div>
                    :
                    <div className="field-btn">
                        <button type='button' onClick={event => handleUpdateTask(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>Update Task</button>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                    </div>
                }
            </form>
        </div>
    )
}

export default TaskForm
