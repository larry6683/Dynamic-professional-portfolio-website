import { Button, Card, Divider, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../config';
import Editor from './Editor';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import TableComponent from './TableComponent'




function PageCreator() {



  const [pageslist, setpagelist] = useState([])
  const [Componentval, setComponent] = useState("")

  const [pagename, setpagename] = useState('')
  const [id,setid]=useState('')
  const [formFields, setFormFields] = useState([
    { body: '', gridSize: '' },
  ])

  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handlebodydata = (event, index) => {
    let data = [...formFields];
    data[index]['body'] = event;
    setFormFields(data);
  }
  const handlechange = (event, index) => {
    let data = [...formFields];
    data[index]['gridSize'] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    const pagedata = JSON.stringify(formFields)
    const data = { pagename, pagedata,id }
    console.log(data)

    axios.post(API + `pages/update`, { data }).then(res => {
      console.log(res)
      if (res.status === 200) {

        setOpen(true)
        setmsg(res.data.msg)

        // toast(res.data.msg)
      }
    })

  }

  const addFields = () => {
    let object = {
      body: '',
      gridSize: ''
    }
    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const handlepagename = (e) => {
    setpagename(e.target.value)
  }


  useEffect(() => {
    axios.get(API + 'pagelist/getpagelist').then(res => {
      
      setpagelist(res.data.data)

    })
  }, [])


  useEffect(() => {
    const url = window.location.href
    console.log(url.length)
    let string
    for (var i = url.length - 1; i >= 0; i--) {
        console.log(url[i])
        if (url[i] !== "/") {
            if (string === undefined) {
                string = url[i]
            }
            else {
                string = string + url[i]

            }
        }
        else {
            break;
        }

    }

    string = [...string].reverse().join("");
    var pagename = string
    console.log(pagename)
    axios.post(API + 'pages/getpage', { pagename }).then(res => {
        console.log(res)

        if (res.status === 200) {

           
            setpagename(res.data.data.name)
            setid(res.data.data._id)
            setFormFields(res.data.data.pagedata)
           
        }


    })

}, [])



  const handleChangeComponent = (text) => {

    console.log(text)
    setComponent(text)


  }

  return (
    <div sx={{ backgroundColor: '#D3D3D3' }}>
      <div>
        <Card style={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px' }}>

 


            <>


              <form onSubmit={submit}>

                <TextField disabled sx={{ paddingBottom: '10px' }} value={pagename} onChange={handlepagename} fullWidth label="Page Name" placeholder='Please Enter your page name' />
                {formFields.map((form, index) => {
                  return (
                    <div key={index}>
                      <TextField type={"number"} sx={{ paddingBottom: '10px' }} value={form.gridSize} onChange={(e) => handlechange(e, index)} fullWidth label="Grid Size" placeholder='Please Enter Grid Size in percentage' />
                      <Editor handlechange={(e) => handlebodydata(e, index)} value={form.body} />
                      <div style={{ marginTop: '70px' }}>
                        <Button onClick={() => removeFields(index)}>Remove Grid</Button>

                      </div>

                    </div>
                  )
                })}
              </form>

              <div style={{ margin: '10px' }}>
                <Button onClick={addFields}>Add Grid</Button>
                <Divider />

                <Button xs={{ paddingTop: '20px', paddingBottom: 20 }} variant='contained' onClick={submit}>Update</Button>

              </div>

            </>
     
        </Card>


      </div>

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

export default PageCreator;