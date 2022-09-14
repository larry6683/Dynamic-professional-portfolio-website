import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { API } from '../../config';
import axios from 'axios';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Multiselect from 'multiselect-react-dropdown';
import Snackbar from '@mui/material/Snackbar';




function App() {

    const [pagelist, setpagelist] = useState([])
    const [len,setlen]=useState(0)
    // const [fixed,setfixed] =useState([])
    // const [dropdown,setdropdown]=useState([])

    const [id,setid]=useState([])

    const [selectedvalue, setselectedvalue] = useState([])
    const [options, setoptions] = useState([{ name: '', slug: "" }])

    const [formFields, setFormFields] = useState([
        { name: '' },
    ])


    const [open, setOpen] = useState(false);
    const [msg, setmsg] = useState('')
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  


    //for dropdown menu 
    const [formFields1, setFormFields1] = useState([
        { name: '', selectedvalue: [] },
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }


    const addFields = () => {
        let object = {
            name: '',
            selectedvalue: []
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }



    const onSelect = (selectedList, selectedItem,index) => {

        let data = [...formFields1];
        data[index]["selectedvalue"] = selectedList;
        setFormFields1(data);


        // setselectedvalue(selectedList)
        // console.log(selectedList, selectedItem)

    }

    const onRemove = (selectedList, removedItem,index) => {
        // setselectedvalue(selectedList)
        let data = [...formFields1];
        data[index]["selectedvalue"] = selectedList;
        setFormFields1(data);

    }



    const handleFormChange1 = (event, index) => {
        let data = [...formFields1];
        data[index][event.target.name] = event.target.value;
        setFormFields1(data);
    }



    const addFields1 = () => {
        let object = {
            name: '',
            selectedvalue: []
        }
        setFormFields1([...formFields1, object])
    }

    const removeFields1 = (index) => {
        let data = [...formFields1];
        data.splice(index, 1)
        setFormFields1(data)
    }




    React.useEffect(() => {
        axios.get(API + 'pagelist/getpagelist').then(res => {
            setpagelist(res.data.data)
            setoptions(res.data.data)
        })
    }, [])



    React.useEffect(() => {
        axios.get(API + 'navbar/get').then(res => {


            if(res.status===200)
            {
                const result = res.data.result[0]
                console.log(result)
                setid(result._id)
  
                setlen(result.fixed.length+result.dropdown.length)
                setFormFields(result.fixed)
                setFormFields1(result.dropdown)
                

            }

           

         
        })
    }, [])


    const submit = (e) => {
        e.preventDefault();

        const dropdown=formFields1
        const  fixed= formFields

        axios.post(API+'navbar/create-navbar',{dropdown,fixed}).then(res=>{
            if(res.status===200)
            {
                setOpen(true)
                setmsg(res.data.msg)
            }
            
        })
        
    }

   

    const UpdateValues = (e) => {
        e.preventDefault();

        const dropdown=formFields1
        const  fixed= formFields
        axios.post(API+'navbar/update',{dropdown,fixed,id}).then(res=>{

            console.log(res)
            if(res.status===200)
            {
                setOpen(true)
                setmsg(res.data.msg)
            }
        })
        
    }



    return (
        <div className="App">


            <Grid container spacing={2}>
                <Grid item  xs={12} md={6} lg={6} >
                <Typography sx={{fontSize:'25px'}}>Please select Navbar menu</Typography>

                <form onSubmit={submit}>
                {formFields.map((form, index) => {
                    return (
                        <div key={index}>
                          

                            <Box sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Select Page</InputLabel>
                                <FormControl fullWidth>
                                    
                                    <Select
                                        name='name'
                                        placeholder='Name'
                                        onChange={event => handleFormChange(event, index)}
                                        value={form.name}
                                    >

                                        {pagelist.map(list => (<MenuItem value={list.name}>{list.name}</MenuItem>))}


                                    </Select>
                                </FormControl>
                            </Box>

                            <Button onClick={() => removeFields(index)}>Remove</Button>
                        </div>
                    )
                })}
            </form>
            <Button onClick={addFields}>Add More..</Button>
                </Grid>

                <Grid item xs={6} md={6} lg={6}>
            <div className="App">
            <Typography  sx={{fontSize:'25px'}}>Please select below for dropdown menu</Typography>
                <form onSubmit={submit}>
                    {formFields1.map((form, index) => {
                        return (
                            <div key={index}>
                                 <InputLabel id="demo-simple-select-label">Enter Dropdown Header</InputLabel>
                                <TextField
                                    name='name'
                                    // label="Name"
                                    fullWidth
                                    placeholder='Name'
                                    onChange={event => handleFormChange1(event, index)}
                                    value={form.name}
                                    sx={{paddingBottom:'10px'}}
                                />
                                <Multiselect
                                    options={options} // Options to display in the dropdown
                                    selectedValues={formFields1.selectedvalue} // Preselected value to persist in dropdown
                                    onSelect={(selectedList, selectedItem) => onSelect(selectedList, selectedItem, index)} // Function will trigger on select event
                                    onRemove={(selectedList, removedItem) => onRemove(selectedList, removedItem, index)} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                                <Button onClick={() => removeFields(index)}>Remove</Button>
                            </div>
                        )
                    })}
                </form>
                <Button onClick={addFields1}>Add More..</Button>
                <br />
            
            </div>


                </Grid>

                <Grid item xs={12}>

                <br />


{len>0 ?<Button variant='contained' onClick={UpdateValues}>Update</Button> : <Button variant='contained' onClick={submit}>Submit</Button>  }
                
                

         

                </Grid>

            </Grid>
            
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
      // action={action}
      />


          





        </div>
    );
}

export default App;