import { Link } from "react-router-dom";
import imgAccept from "../../assets/images/icon-accept.png";
import imgCansel from "../../assets/images/icon-cansel.png";

function padTo2Digits(num) 
{
    return num.toString().padStart(2, '0');
}
  
function formatDate(date) 
{
    return (...);
}

export default function StatementSearchPreview(props)
{
    if(props.statementPreviewViewModel === null)
    {
        return  <></>;
    }

    const statusLabel = (props.statementPreviewViewModel.status !== null && props.statementPreviewViewModel.status === 1 
        ? " - отправлено"
        : ""
    );

    const userMicroData = (props.statementPreviewViewModel.userMicroViewModel !== null 
        ? props.statementPreviewViewModel.userMicroViewModel.secondname + " " + props.statementPreviewViewModel.userMicroViewModel.firstname
        : "<Ошибка поиска пользователя>"    
    );

    const nominationMicroData = (props.statementPreviewViewModel.nominationMicroViewModel !== null
        ? props.statementPreviewViewModel.nominationMicroViewModel.name
        : "<Ошибка определения номинации>"
    );

    let dateOfUpdateString = "не заполнялось";
    if(props.statementPreviewViewModel.date_of_update !== null)
    {
        dateOfUpdateString = formatDate(new Date(props.statementPreviewViewModel.date_of_update));
    }

    let userExpertGradeCircles = "";
    if(props.statementPreviewViewModel.user_expert_statement_number !== null && props.statementPreviewViewModel.user_expert_statement_appreciated_number)
    {
        let arrayOfIndexes = [];
        for(let i = 1; i <= props.statementPreviewViewModel.user_expert_statement_number; i++)
        {
            arrayOfIndexes.push(i);
        }
        userExpertGradeCircles = arrayOfIndexes.map(number => {
            return <img 
            key={number} 
            className="img-fluid user-expert-statement-grade-is-appreciated" 
            src={number <= props.statementPreviewViewModel.user_expert_statement_appreciated_number ? imgAccept : imgCansel} alt="user-expert-statement-grade-is-appreciated" 
            />
            
        })
    }

    return (
        <div className="col-12">
            <div className="statement-search-preview" 
            >
                <Link to={"/statement/" + props.statementPreviewViewModel.id} target="_blank">
                    <p>{userMicroData} <span>id{props.statementPreviewViewModel.id} {statusLabel}</span></p>
                    <ul className="short-info">
                        <li> Номинация: {nominationMicroData}</li>
                        <li> Последняя дата правки: {dateOfUpdateString}</li>
                        <li>{userExpertGradeCircles}</li>
                    </ul>
                </Link>
            </div>
        </div>
    )
}
