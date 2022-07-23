import React, { useEffect, useState } from 'react'
import "./style.css"

//get local storage data

const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist")
    if(lists) {
        return JSON.parse(lists)
    } else {
        return[];
    }
}

const Todo = () => {
    const[inputData,setInputData] = useState("")
    const[items, setItems] = useState([getLocalData()])
    const[isEditItem,setIsEditItem] =useState("")
    const[toggleButton,setToggleButton] = useState(false)

    // add the items
    const addItem =() =>{
        if(!inputData){
            alert('plz fill the data')
        }else{
            const myNewInputData= {
                id:new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items,myNewInputData]);
            setInputData("")
        }
    }


    //edit  the items
const editItem =(index) =>{
     const item_todo_edited = items.find((curElement) =>{
        return curElement.id === index
     })
     setInputData(item_todo_edited.name)
     setIsEditItem(index)
     setToggleButton(true)

}


//  how to delete items
const deleteItem =(index) =>{
    const updatedItems = items.filter((curElement)=>{
        return curElement.id !== index

    })
    setItems(updatedItems)
}

// remove all

const removeAll =() =>{
    setItems([])
}


// adding local storage
useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
}, [items]);


  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="/images/logo.png" alt="logo" />
                <figcaption>Add Your List Here</figcaption>
                            </figure>
                            <div className='addItems'>
                                <input type="text"
                                placeholder='Add Items'
                                className='form-control'
                                value={ inputData }
                                onChange={(event) =>setInputData(event.target.value)}
                                />
                                <i className="fa fa-plus add-btn" onClick={addItem}></i>
             </div>
             {/* SHOW ITEMS */}
             <div className='showItems'>
                {items.map((curElement) =>{
                    return(
                        <div className='eachItem' key={curElement.id}>
                    <h3>{curElement.name}</h3>
                    <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElement.id)}></i>
                    <i className="far fa-trash-alt add-btn"  onClick= {()=>deleteItem(curElement.id)}></i>
                    </div>
                </div>

                    )
                })
                }
                
            
             </div>




             {/* REMOVE ALL IEMS */}
             <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
             </div>
        </div>
    </div>
      
    </>
  )
}

export default Todo
