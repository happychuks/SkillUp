
import { 
  Link 
  } from "react-router-dom";

const Homepage = () => {
    return ( 
        <>
            <p>lorem ipsum.</p>
            <ul>
           
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Register">Register</Link></li>
                <li><Link to="/DashboardPage">My Dashboard</Link></li>
                <li><Link to="/InstructorRegister">Become an instructor</Link></li>
            </ul>
        </>
     );
}
 
export default Homepage;