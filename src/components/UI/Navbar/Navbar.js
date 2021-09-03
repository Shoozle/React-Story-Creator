import classes from './navbar.module.css'

const Navbar = () => {

    return (
    <nav className={classes.Navbar}>
        <ul>
            <li>Home</li>
            <li>Browse</li>
            <li>Sign in</li>
        </ul>
    </nav>
    )
}

export default Navbar;