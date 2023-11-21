import AdminMiddleware from "../utils/AdminMiddleware";
import constant from "../utils/GlobalVariables";

export default class AdminService 
{
    constructor()
    {
        this.isLoading = false;
    }

    async profileUpdate(
        jwt,
        setIsLoading,
        setWarning,
        username,
        position,
        passwordNew,
        passwordNewAgain,
        passwordCurrent
    ){
        if(passwordNew !== "" && passwordNew !== passwordNewAgain)
        {
            setWarning("Пароли не совпадают");
            return;
        } else if(passwordNew !== "" && passwordCurrent === "")
        {
            setWarning("Введите пожалуйста текущий пароль");
            return;
        }
        setIsLoading(true);
        setWarning("");
        try
        {
            await fetch(constant.baseDomain + "/api/admin/profile", 
            {
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : "Bearer " + jwt
                },
                body: JSON.stringify({
                    "username" : username,
                    "position" : position,
                    "password_new" : passwordNew,
                    "password_current" : passwordCurrent
                })
            })
            .then(response => response.json())
            .then(jsonAnswerStatus => {
                if(jsonAnswerStatus.status === "success")
                {
                    setWarning("Успешно сохранено");
                    if(jsonAnswerStatus.access_token !== null)
                    {
                        const adminMiddleWare = new AdminMiddleware();
                        adminMiddleWare.setJWTToCookie(jsonAnswerStatus.access_token);
                    }
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "..."){
                    setWarning("Логин уже есть в базе");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "..."){
                    setWarning("Неверное введён текущий пароль");
                } else {
                    setWarning("Ошибка: " + jsonAnswerStatus.errors);
                }
            })
            .catch(error => {
                console.log("AdminService profileGet error: " + error);
                setWarning("Ошибка: " + error);
            });
        } catch(error)
        {
            console.log("AdminService profileGet error: " + error);
            setWarning("Ошибка: " + error);
        } finally
        {
            setIsLoading(false);
        }
    }

    async profileGet(
        jwt,
        setIsLoading,
        setIsError,
        setUsername,
        setPosition
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/admin/profile", 
            {
                method : "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : "Bearer " + jwt
                }
            })
            .then(response => response.json())
            .then(jsonAnswerStatus => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.adminProfileLiteViewModel !== null)
                {
                    setUsername(jsonAnswerStatus.adminProfileLiteViewModel.username);
                    setPosition(jsonAnswerStatus.adminProfileLiteViewModel.position);
                } else {
                    setIsError(true);
                }
            })
            .catch(error => {
                console.log("AdminService profileGet error: " + error);
                setIsError(true);
            });
        } catch(error)
        {
            console.log("AdminService profileGet error: " + error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }

    async login(
        username, 
        password, 
        warningCallback, 
        loginCallback,
        navigateCallback
    ){
        if(this.isLoading)return;
        console.log("username: " + username);
        
        warningCallback("");
        if(username === "" || typeof(username) === "undefined" || password === "" || typeof(password) === "undefined"){
            warningCallback("Все поля обязательны для заполнения");
            return;
        }
        
        this.isLoading = true;
        try {
            const data = {
                username: username,
                password : password
            }
            await fetch(constant.baseDomain + "/api/admin/login", 
                {
                    method : "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                console.log(jsonAnswerStatus);
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.access_token != null)
                {
                    const adminMiddleWare = new AdminMiddleware();
                    adminMiddleWare.setJWTToCookie(jsonAnswerStatus.access_token);
                    loginCallback();
                    ...
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    warningCallback("Неверный логин или пароль");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    warningCallback("Извините, запрещен доступ в систему");
                } else {
                    warningCallback("Неизвестная ошибка на сервере");
                }
                },
                (error) => {
                    warningCallback("Ошибка на стороне сервера");
                }
            )
        } catch(e) {
            warningCallback("Неизвестная ошибка: " + e);
        } finally {
            this.isLoading = false;
        }
    }


}