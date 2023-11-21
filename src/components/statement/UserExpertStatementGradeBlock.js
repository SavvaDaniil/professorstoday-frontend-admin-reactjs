import { Link } from "react-router-dom";
import constant from "../../utils/GlobalVariables";
import UserExpertStatementGradePointBlock from "./UserExpertStatementGradePointBlock";

export default function UserExpertStatementGradeBlock(props)
{

    if(props.userStatementViewModel == null)
    {
        return <p>Нет модели заявления</p>;
    }
    if(props.statementPage == null)
    {
        return <p>Не найден номер страницы</p>;
    }
    
    if(props.userExpertStatementGradeEditViewModel === null)
    {
        return <p>Нет модели экспертизы</p>;
    }
    if(props.userExpertStatementGradeEditViewModel.userExpertMicroViewModel === null)
    {
        return <p>Нет модели эксперта</p>;
    }

    const userExpertStatementGradeEditViewModel = props.userExpertStatementGradeEditViewModel
    const userExpertMicroViewModel = props.userExpertStatementGradeEditViewModel.userExpertMicroViewModel;
    const userStatementViewModel = props.userStatementViewModel;
    const statementPage = props.statementPage;
    
    const formListener = (e) => {

    }

    
    let list_of_statement_applications_and_characteristics_files = "";
    let statement_applications_and_characteristics_file_index = 1;
    if(userStatementViewModel.userStatementApplicationsAndCharacteristicsFileViewModels !== null)
    {
        list_of_statement_applications_and_characteristics_files = <ul className="files-list">
            {userStatementViewModel.userStatementApplicationsAndCharacteristicsFileViewModels.map(userStatementApplicationsAndCharacteristicsFileViewModel => {
                return <li key={userStatementApplicationsAndCharacteristicsFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementApplicationsAndCharacteristicsFileViewModel.src} target="_blank">
                Файл №{statement_applications_and_characteristics_file_index++}</Link>
                </li>
            })}
        </ul>
    }

    let list_of_other_files = "";
    let other_file_number = 1;
    if(userStatementViewModel.userStatementOtherFileViewModels !== null)
    {
        list_of_other_files = <ul className="files-list">
            {userStatementViewModel.userStatementOtherFileViewModels.map(userStatementOtherFileViewModel => {
                return <li key={userStatementOtherFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementOtherFileViewModel.src} target="_blank">
                Файл №{other_file_number++}</Link>
                </li>;
            })}
        </ul>
    }

    return(
        
        <form className="statement-grade" encType="multipart/form-data">

            <div className={"statement-page " + (statementPage === 1 ? "active" : "")}>

                <p className="statement-page-header">Данные эксперта</p>
                <p><b>Логин эксперта:</b> {userExpertMicroViewModel.username}</p>
                <p><b>ФИО эксперта:</b> {userExpertMicroViewModel.secondname + " " + userExpertMicroViewModel.firstname}</p>

            </div>


            <div className={"statement-page " + (statementPage === 2 ? "active" : "")}>

                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label>Образование*</label>
                        <p>{userStatementViewModel.education} </p>
                    </div>
                    <UserExpertStatementGradePointBlock
                    nameOfValue="education"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.education}
                    />
                </div>
                ...

                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label>Наличие отраслевых наград, почетных званий и других отличий</label>
                        <p>{userStatementViewModel.academic_rewards}</p>
                    </div>
                    <UserExpertStatementGradePointBlock 
                    nameOfValue="academic_rewards"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.academic_rewards}
                    />
                </div>

            </div>


            <div className={"statement-page " + (statementPage === 3 ? "active" : "")}>
                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label>Прохождение курсов, стажировок, присвоение степени или звания и других мероприятий повышения квалификации за последние 3 года</label>
                        <p>{userStatementViewModel.another_courses_and_other}</p>
                    </div>
                    <UserExpertStatementGradePointBlock 
                    nameOfValue="another_courses_and_other"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.another_courses_and_other}
                    />
                </div>

                ...

            </div>


            <div className={"statement-page " + (statementPage === 4 ? "active" : "")}>
                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label>Являюсь экспертом (указать организацию и профиль)</label>
                        <p>{userStatementViewModel.expert_of}</p>
                    </div>
                    <UserExpertStatementGradePointBlock 
                    nameOfValue="expert_of"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.expert_of}
                    />
                </div>
                
                ...

            </div>


            <div className={"statement-page " + (statementPage === 5 ? "active" : "")}>

                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label htmlFor="practice_oriented_teaching">Ведение практико-ориентированной преподавательской деятельности
                        </label>
                        <p>{userStatementViewModel.practice_oriented_teaching}</p>
                    </div>
                    <UserExpertStatementGradePointBlock 
                    nameOfValue="practice_oriented_teaching"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.practice_oriented_teaching}
                    />
                </div>
                
                ...

            </div>


            <div className={"statement-page " + (statementPage === 6 ? "active" : "")}>

                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label htmlFor="other_social_public_educational_work">Прочая социальная, общественная, воспитательная работа</label>
                        <p>{userStatementViewModel.other_social_public_educational_work}</p>
                    </div>
                    <UserExpertStatementGradePointBlock 
                    nameOfValue="other_social_public_educational_work"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.other_social_public_educational_work}
                    />
                </div>
                
                ...

                <hr /><div className="form-group row">
                    <div className="col-10">
                        <label htmlFor="applications_and_characteristics_files">
                            Ходатaйства и характеристики по одному до 40 шт. (Формат JPG, PNG, PDF не более 1МБ каждый)
                        </label> 
                        <br />

                        {list_of_statement_applications_and_characteristics_files}

                    </div>
                    <UserExpertStatementGradePointBlock 
                    nameOfValue="applications_and_characteristics_files"
                    formListener={formListener}
                    value={userExpertStatementGradeEditViewModel.applications_and_characteristics_files}
                    />
                </div>
                
                ...

                <hr /><div className="mb-3">
                    <label htmlFor="comment">Комментарий от эксперта</label>
                    <textarea className="form-control" id="comment" name="comment" rows={8} maxLength="5000" placeholder="" defaultValue={userExpertStatementGradeEditViewModel.comment} onChange={formListener}></textarea>
                </div>

            </div>

            <hr />

        </form>
    )
}