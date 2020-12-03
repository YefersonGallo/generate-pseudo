import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MeanSquares from "./MeanSquares";
import About from "./About";
import Congruentials from "./Congruentials";
import Distributions from "./Distributions";
function Header() {
    return (
        <Router>
            <div className="tile is-ancestor is-vertical">
                <nav className="navbar tile is-parent box" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <h1 className="navbar-item">
                            Generación de Números Pseudoaleatorios
                        </h1>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-end">
                            <Link className="navbar-item" to="/">
                                Cuadrados Medios
                            </Link>
                            <Link className="navbar-item" to="/congruentials">
                                Congruenciales
                            </Link>
                            <Link className="navbar-item" to="/distributions">
                                Distribuciones
                            </Link>
                            <Link className="navbar-item" to="/about">
                                Acerca de
                            </Link>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <MeanSquares />
                    </Route>
                    <Route path="/congruentials">
                        <Congruentials/>
                    </Route>
                    <Route path="/distributions">
                        <Distributions />
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Header;
