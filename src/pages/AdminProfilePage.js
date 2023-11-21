import { useEffect, useState } from "react"
import AdminService from "../services/AdminService";
import AdminMiddleware from "../utils/AdminMiddleware";
import { SystemLoadingBlock } from "../components/SystemLoadingBlock";
import { SystemErrorBlock } from "../components/SystemErrorBlock";
import { Button } from "react-bootstrap";


export function AdminProfilePage(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [warning, setWarning] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [username, setUsername] = useState();
    const [position, setPosition] = useState();
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordNewAgain, setPasswordNewAgain] = useState("");
    const [passwordCurrent, setPasswordCurrent] = useState("");

    const adminService = new AdminService();
    const adminMiddleware = new AdminMiddleware();
    const jwt = adminMiddleware.getJWTFromCookie();

    const formListener = (e) => {
       setWarning("");
       switch(e.target.name)
       {
            case "username":
                setUsername(e.target.value);
                break;
            case "position":
                setPosition(e.target.value);
                break;
            
            ...
            
            case "password_current":
                setPasswordCurrent(e.target.value);
                break;
            default:
                break;
       }
    }

    useEffect(() => {
        //document.title = "Профиль";
        setWarning("");
        const adminService = new AdminService();
        const adminMiddleware = new AdminMiddleware();
        const jwt = adminMiddleware.getJWTFromCookie();
        const fetchProfileGet = async() =>
        {
            await adminService.profileGet(
                jwt,
                setIsLoading,
                setIsError,
                setUsername,
                setPosition
            );
        }
        fetchProfileGet();

    }, []);

    if(isLoading)
    {
        return <SystemLoadingBlock />
    }

    if(isError)
    {
        return <SystemErrorBlock tryAgain={async() => {
            await adminService.profileGet(
                jwt,
                setIsLoading,
                setIsError,
                setUsername,
                setPosition
            );
        }} />
    }

    return <div className="row">
        <div className="col-12 col-lg-8 col-md-8 col-sm-10">
        <form className="profile">
            <div className="form-group">
                <label htmlFor="username">Логин:</label>
                <input className="form-control" type="text" name="username" id="username" defaultValue={username} onChange={formListener} />
            </div>
            <div className="form-group">
                <label htmlFor="position">Должность:</label>
                <input className="form-control" type="text" name="position" id="position" defaultValue={position} onChange={formListener} />
            </div>
            
            ...

            <div className="form-group">
                <label htmlFor="password_current">Текущий пароль:</label>
                <input className="form-control" type="password" name="password_current" id="password_current" defaultValue={passwordCurrent} onChange={formListener} />
            </div>
            <Button variant="success" type="button" disabled={isSaving} onClick={async() => {
                await adminService.profileUpdate(
                    jwt,
                    setIsSaving,
                    setWarning,
                    username,
                    position,
                    passwordNew,
                    passwordNewAgain,
                    passwordCurrent
                )
            }}>Сохранить</Button><p className="result">{warning}</p>
        </form>
        </div>
    </div>
    
}