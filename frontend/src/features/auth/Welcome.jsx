import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth();

    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "2-digit"
    }).format(date);

    const content = (
        <section className="welcome-panel">
           <p>{today}</p>

           <h1>Welcome {username}!</h1>

              <p><Link to="/dash">Open dashboard</Link></p>
              <p><Link to="/dash/notes">View notes</Link></p>
              {(isManager || isAdmin) && (
                <p><Link to="/dash/users">View users</Link></p>
              )}
              {(isManager || isAdmin) && (
                <p><Link to="/dash/users/new">Add new user</Link></p>
              )}
        </section>
        
    );
    return content;
 
}

export default Welcome;