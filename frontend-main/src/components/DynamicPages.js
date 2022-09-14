import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import MainFeaturedPost from './Banner';
import {Helmet} from "react-helmet";



export default function DynamicPages(props) {

    const [htmldata, sethtmldata] = useState([])
    const [mdesc,setmdesc]=useState("")



    const [mainFeaturedPost, setmainfeaturedpost] = useState({
        title: 'Loading',
        image: 'https://source.unsplash.com/random'

    })




    useEffect(() => {
        const url = window.location.href


        // if(url==='https://localhost:3000' || url==='http://localhost:3000' || url ==="https://asrao.in" || url==="http://asrao.in" || url==="https://asrao.vercel.app/")
        // {

        // }
        // console.log(url.length)



        let string
        for (var i = url.length - 1; i >= 0; i--) {

            if (url[url.length - 1] === "/") {
                string = "emoh"
            }

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
            console.log(res,"pages")

            if (res.status === 200) {

                if (res.data.data.slug === "home") {
                    setmainfeaturedpost({
                        ...mainFeaturedPost, title: "Prof Allam Srinivas Rao", image: 'https://picsum.photos/1230/168',
                    })
                }
                else {
                    setmainfeaturedpost({
                        ...mainFeaturedPost, title: res.data.data.name, image: 'https://picsum.photos/1230/168'
                    })

                }

     


                const resdata = res.data.data.pagedata
                console.log(res)
                let array = []
                for (var i = 0; i < resdata.length; i++) {
                    let gridsize = resdata[i].gridSize

                    const gridsizeval = gridsize * 12 / 100

                    let obj = {
                        body: resdata[i].body,
                        width: gridsizeval
                    }
                    array.push(obj)

                }
                setmdesc(res.data.data.mdesc )
                sethtmldata(array)
            }


        })

    }, [])


    return (
        <>
            <Helmet>
      <title>{mainFeaturedPost.title}</title>
      <meta name="keywords" content="physics,applied physics,atmospheric sciences" />
      <meta
        name="description"
        content={mdesc}
      />
    </Helmet>

            <Box sx={{ flexGrow: 1 }}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '50px' }}>
                    <MainFeaturedPost post={mainFeaturedPost} />

                </div>

                <Grid container spacing={2} padding={5}>

                    {htmldata.map(item => (
                        <Grid item xs={12} lg={item.width} md={item.width}>
                            <div dangerouslySetInnerHTML={{ __html: item.body }}></div>
                        </Grid>
                    ))}

                </Grid>
            </Box>



        </>
    )
}
