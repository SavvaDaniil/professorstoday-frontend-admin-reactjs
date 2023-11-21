import { Button } from "react-bootstrap";

export function SystemErrorBlock(props)
{
    const errorMessage = props.errorMessage !== null ? "Ошибка:" : "Извините, на стороне сервера произошла ошибка, либо на сервере идут работы";

    return (
        <div className="row ...">
            <div className="col-4 d-none d-md-block"></div>
            <div className="col-12 col-lg-4 col-md-4">
                <p>{errorMessage}</p>
                <Button variant="primary" type="button" onClick={props.tryAgain}>Еще раз</Button>
            </div>
        </div>
    )
}