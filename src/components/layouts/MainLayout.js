import { Component } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../store/UserContext";
import AdminMiddleWare from "../../utils/AdminMiddleware";
import { Button } from "react-bootstrap";

class MainLayoutClass extends Component 
{
    static contextType = UserContext;

    constructor(props)
    {
        super(props);
        this.actionLogout = this.actionLogout.bind(this);
    }

    actionLogout()
    {
        const adminMiddleWare = new AdminMiddleWare();
        adminMiddleWare.clearJWTCookie();
        const { logout } = this.context;
        logout();
        ...
    }

    ...

    render()
    {

        let title = "Рабочий стол";
        
        if((window.location.pathname).indexOf("/profile") + 1){title = "Профиль";}
        if((window.location.pathname).indexOf("/users") + 1){title = "Пользователи";}
        if((window.location.pathname).indexOf("/statements") + 1){title = "Заявления";}
        if((window.location.pathname).indexOf("/statement/") + 1){title = "Заявление";}

        return (
            <>
                <div className="header">
                    <div className="left-panel">
                        <div className="short-info">
                            <p className="firstname">{localStorage.getItem("firstname")}</p>
                            <p className="position">Должность</p>
                        </div>
                    </div>
                    <div className="header-data">
                        <div className="row">
                            <div className="col-8">
                                <h3>{title}</h3>
                            </div>
                            <div className="col-4">
                                <div className="logout">
                                    <Button variant="danger" className="btn btn-sm" onClick={this.actionLogout}>Выйти</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div className="title">
                        <p>Навигация</p>
                    </div>
                    <ul>
                        <li><NavLink exact="true" activeclassname="active" to="/"><i className="fa fa-home"></i> Рабочий стол</NavLink></li>
                        <li><NavLink exact="true" activeclassname="active" to="/profile"><i className="fa fa-user"></i> Профиль</NavLink></li>
                        <li><NavLink exact="true" activeclassname="active" to="/users"><i className="fa fa-users"></i> Пользователи</NavLink></li>
                        <li><NavLink exact="true" activeclassname="active" to="/statements"><i className="fa fa-list"></i> Заявления</NavLink></li>

                        
                    </ul>
                </div>

                <div className="main">
                    <Outlet changeTitle={this.changeTitle} />
                </div>

            </>
        )
    }
}

export default function MainLayout(props)
{
    const navigate = useNavigate();
    return(<MainLayoutClass {...props} navigate={navigate} params={useParams()}></MainLayoutClass>)
};