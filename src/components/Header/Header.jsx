import { Nav } from "../Nav/Nav";
import "./Header.css";

export const Header = () => {
    return (
        <header>
            <Link to={"/"}>LOGO</Link>
            <Nav />
        </header>
    );
};