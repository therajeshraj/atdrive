import {Link} from 'react-router-dom'

const PersonCell = (props) => {

    return (

        <tr key={props.no + 1}>
            
            <td>{props.no + 1}</td>
            <td><img src={props.avatar} width={50} alt="" /></td>
            <td><Link to={ "/edit/"+props._id }>{props.name}</Link></td>
            <td>{props.email}</td>
            <td>{props.age}</td>
            <td><button onClick={props.delete}>Delete</button></td>

        </tr>

    );

}

export default PersonCell

// O8v9^$SE