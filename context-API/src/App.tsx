
//import { useAuth } from "./hooks/use-auth"

import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import { useAuth } from "./hooks/use-auth";

const App = () => {


    const { user } = useAuth();

    if (!user) {
        return (
            <div className="container">
                <h1>Please log in.</h1>
                <LoginButton/>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <LogoutButton/>
            
        </div>
    )
}

export default App


/* import Card from "./components/Card";

const App = () => {
    return (
        <div className="container mx-auto my-5">
            <Card>
                <h2 className="card-title">Card Title</h2>
                <p className="card-text">This is a simple card component.</p>
                <button className="btn btn-primary">Click Me</button>
            </Card>
            <Card>
                <h2 className="card-title">Card Title</h2>
                <p className="card-text">This is a simple card component.</p>
            </Card>
            <Card>
                <p className="card-text">This is a simple card component.</p>
            </Card>
        </div>
    );
};
export default App; */

