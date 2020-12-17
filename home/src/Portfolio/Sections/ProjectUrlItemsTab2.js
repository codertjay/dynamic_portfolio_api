import React from 'react'
import axios from 'axios'
import useSelector from 'react-redux'



const ProjectUrlItemsTab2 = (props) => {

    const username = useSelector(state => state.user_detail.username)

    axios.get(`http://127.0.0.1:8000/?username=${username}`)
        .then(res => {
            console.log('the data', res.data)
        })
        .catch(err => {
            console.error(err)
        })

    return (
        <div>

        </div>
    )
}


export default ProjectUrlItemsTab2

