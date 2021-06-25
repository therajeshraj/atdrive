import {Link} from 'react-router-dom'

const NavBar = () => {

    return (
        
        <nav>
            <div class="nav-wrapper white">
                <div class="container">
                    <Link to={"/"} class="brand-logo left">AtDrive Test</Link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li>
                            <Link to="/create">Add</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      
    )

}

export default NavBar