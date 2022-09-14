import { Button, Card, Divider, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../config';
import Editor from './Editor';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import TableComponent from './TableComponent'
import { stripHtml } from "string-strip-html";



function PageCreator() {

  const [pageslist, setpagelist] = useState([])
  const [Componentval, setComponent] = useState("")

  const [pagename, setpagename] = useState('')
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

    let mdesc=formFields[0].body
    mdesc = stripHtml(mdesc.substring(0, 350));
    mdesc = mdesc.result

    const data = { pagename, pagedata,mdesc }
    console.log(data)

    axios.post(API + `pages/create`, { data }).then(res => {
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
      console.log(res)
      setpagelist(res.data.data)

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

          <Grid container>
            <Grid item sm>
              <Button onClick={() => handleChangeComponent("create")} sx={{ textTransform: 'none' }}>Create page</Button>

            </Grid>
            <Grid item />
            <Grid item />

            <Grid item sm>
              <Button onClick={() => handleChangeComponent("")} sx={{ textTransform: 'none' }}>Back</Button>

            </Grid>


          </Grid>


          {Componentval === "" && (<TableComponent headers={["Page Name", "Page Route"]} rows={pageslist} />)}


          {Componentval === "create" && (

            <>


              <form onSubmit={submit}>

                <TextField sx={{ paddingBottom: '10px' }} value={pagename} onChange={handlepagename} fullWidth label="Page Name" placeholder='Please Enter your page name' />
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

                <Button xs={{ paddingTop: '20px', paddingBottom: 20 }} variant='contained' onClick={submit}>Submit</Button>

              </div>

            </>
          )}




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