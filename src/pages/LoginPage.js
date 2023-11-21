import { useContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { useNavigate } from "react-router";
import UserContext from "../store/UserContext";


export function LoginPage(props)
{
    const context = useContext(UserContext);
    const {login} = context;

    document.title = "Вход | Professorstoday";
    const adminService = new AdminService();

    const navigate = useNavigate();
    const [warning, setWarning] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setWarning("");
    }, [username, password]);

    const handleUsername = event => {
        setUsername(event.target.value);
        console.log("event.keyCode: " + event.keyCode);
    }
    const handlePassword = event => setPassword(event.target.value);

    return (
        <>
            <div className="row auth">
                <div className="col-4 d-none d-lg-block d-md-block d-sm-block col-lg-4 col-md-4 col-sm-3"></div>
                <div className="col-12 col-lg-4 col-md-4 col-sm-6">
                    <div className="block">
                        <div className="row title">
                            <div className="col-12">
                                <p>PROFESSORSTODAY</p>
                            </div>
                            <div className="col-12">
                                <h3>Вход</h3>
                            </div>

                        </div>
                        
                        <form>
                            <div className="form-group">
                                <label>Логин</label>
                                <input type="email" name="username" className="form-control" onChange={handleUsername} />
                            </div>
                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" name="password" className="form-control" onChange={handlePassword} />
                            </div>

                            <hr />

                            <button type="button" className="btn btn-success" onClick={() => {
                                adminService.login(username, password, setWarning, login, navigate);
                            }
                            }>Войти</button>

                            <hr />

                            <p className="warning">{warning}</p>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}