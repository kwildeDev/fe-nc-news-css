import { Link } from "react-router-dom"
import UserContext from "../contexts/userContext"
import { useContext } from "react"


const Header = () => {

    const user = useContext(UserContext)

    return (
        <div className = "header">
        <header>
            <p className="welcome-user">Welcome {user}!</p>
            <h1 id="home-link">
                <Link to="/">NC News</Link>
            </h1>
        </header>
        </div>
    )
}

export default Header
