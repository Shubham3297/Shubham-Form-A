import React, { useEffect, useState } from 'react'

function Output(props) {
  //delete handler
  const deleteHandler = (item) => {
    props.deleteAtParent(item)
}

const editHandler = (item) =>{
    props.editAtFrom(item)
}

    return (
        <>

            <h1>Form Data</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>UI Technology</th>
                        <th>Back-End Technology</th>
                        <th>Library</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.length > 0 &&
                        props.data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.uiTechnology}</td>
                                    <td>{item.backEndTechnology}</td>
                                    <td>{item.library.join(", ")}</td>
                                    <td>
                                        <button onClick={()=> editHandler(item)}>Edit</button>
                                        <button onClick={()=> deleteHandler(item)}>Delete</button>
                                    </td>
                                </tr>

                            )
                        })

                        }
                </tbody>

            </table>
            {(!props.data || props.data.length == 0)&&
                <p> 
                Data is Not avalible
                </p>
            }
        </>
    )
}

export default Output

