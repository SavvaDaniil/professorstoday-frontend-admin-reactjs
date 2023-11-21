import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminMiddleware from "../utils/AdminMiddleware";
import StatementService from "../services/StatementService";
import { SystemLoadingBlock } from "../components/SystemLoadingBlock";
import { SystemErrorBlock } from "../components/SystemErrorBlock";
import constant from "../utils/GlobalVariables";
import { Button, Tab, Tabs } from "react-bootstrap";
import UserExpertStatementGradeBlock from "../components/statement/UserExpertStatementGradeBlock";
import ModalNewUserExpertStatementGrade from "../components/statement/ModalNewUserExpertStatementGrade";


export default function StatementPage(props)
{
    const {statement_id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [nominationMicroViewModels, setNominationMicroViewModels] = useState([]);
    const [userStatementViewModel, setUserStatementViewModel] = useState(null);
    const [isModalNewUserExpertStatementGradeShow, setIsModalNewUserExpertStatementGradeShow] = useState(false);


    const [leagueParticipationMembershipStatusMicroViewModels, setLeagueParticipationMembershipStatusMicroViewModels] = useState([]);
    const [regionMicroViewModels, setRegionMicroViewModels] = useState([]);
    const [universityMicroViewModels, setUniversityMicroViewModels] = useState([]);
    const [userExpertStatementGradeEditViewModels, setUserExpertStatementGradeEditViewModels] = useState([]);

    const [statementPage, setStatementPage] = useState(1);

    

    useEffect(() => {
        const adminMiddleware = new AdminMiddleware();
        const jwt = adminMiddleware.getJWTFromCookie();

        async function get()
        {
            const statementService = new StatementService();
            await statementService.adminGet(
                jwt,
                setIsLoading,
                setIsError,
                statement_id,
                setNominationMicroViewModels,
                setUserStatementViewModel,
                setLeagueParticipationMembershipStatusMicroViewModels,
                setRegionMicroViewModels,
                setUniversityMicroViewModels,
                setUserExpertStatementGradeEditViewModels,
            );
        }
        get();

        return () => {
            //console.log("useEffect empty");
        }
    }, []);

    

    const successfullAddUserExpertStatementGradeCallback = () => {
        window.location.reload();
    }


    if(isLoading)
    {
        return (
            <SystemLoadingBlock />
        )
    }

    if(isError)
    {
        return (
            <SystemErrorBlock />
        )
    }


    const statementsHeaders = [
        "Заявление",
        "Степени и звания",
        "Стаж и дополнительное образование",
        "Общественная и научная активность",
        "Преподавательская деятельность",
        "Прочие данные"
    ];

    const changePage = (value) => {
        if(value)
        {
            if(statementPage >= 6)
            {
                return;
            }
            setStatementPage(statementPage + 1);
        } else 
        {
            if(statementPage === 1)
            {
                return;
            }
            setStatementPage(statementPage - 1);
        }
    }


    const userProfileLiteViewModel = userStatementViewModel.userProfileLiteViewModel;

    let nominationMicroOptions = nominationMicroViewModels.map((nominationMicroViewModel, index) => {
        return <option key={index} value={nominationMicroViewModel.id}>{nominationMicroViewModel.name}</option>
    });

    let hrefToStatementFile = "";
    if(userStatementViewModel.hasOwnProperty("statement_file_src") && userStatementViewModel.statement_file_src !== null && userStatementViewModel.statement_file_src !== "")
    {
        hrefToStatementFile = <span><Link to={constant.baseDomain + "/" + userStatementViewModel.statement_file_src} target="_blank">Загруженное заявление</Link></span>;
    }

    let userPosterImg = "";
    if(userStatementViewModel.hasOwnProperty("photo_file_src") && userStatementViewModel.photo_file_src !== null && userStatementViewModel.photo_file_src !== "")
    {
        userPosterImg = <img className="img-fluid user-poster" src={constant.baseDomain + "/" + userStatementViewModel.photo_file_src} alt="user-poster" />
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

    let hrefToProcessDataApplicationFile = "";
    if(userStatementViewModel.hasOwnProperty("process_data_application_file_src") && userStatementViewModel.process_data_application_file_src !== null && userStatementViewModel.process_data_application_file_src !== "")
    {
        hrefToProcessDataApplicationFile = <span><Link to={constant.baseDomain + "/" + userStatementViewModel.process_data_application_file_src} target="_blank">Загруженный файл</Link></span>;
    }

    let userExpertStatementGradeBlocks = "";
    if(userExpertStatementGradeEditViewModels !== null && userExpertStatementGradeEditViewModels.length > 0)
    {
        ...
    }

    return(
        <div className="page statement-admin">
            <h5>
                Заявление ID {statement_id}
            </h5>
            <p><b>Логин пользователя:</b> {userProfileLiteViewModel.username}</p>
            <p><b>ФИО пользователя:</b> {userProfileLiteViewModel.secondname + " " + userProfileLiteViewModel.firstname + " " + userProfileLiteViewModel.patronymic}</p>
            <p><b>Номинация:</b> {userStatementViewModel.nominationMicroViewModel != null ? userStatementViewModel.nominationMicroViewModel.name : "<не указано>"}</p>
            <p><b>Статус:</b> {userStatementViewModel.status === 1 ? "Отправлена" : "Не отправлена"}</p>
            
            <Button type="button" className="new-statement-grade btn-warning" variant="default"
                onClick={() => setIsModalNewUserExpertStatementGradeShow(true)}
            >
                Назначить экспертизу
            </Button>

            <hr />

            <div className="row statement-control">
                <div className="col-6 col-lg-2 col-md-2 col-sm-3">
                    <Button variant={"info " + (statementPage <= 1 || isSaving ? "disabled" : "")} disabled={statementPage <= 1 ? "disabled" : ""} onClick={() => changePage(false)}>Пред</Button>
                </div>
                <div className="col-2 d-md-none">
                    <Button variant={"info " + (statementPage >= 6 || isSaving ? "disabled" : "")} onClick={() => changePage(true)}>След</Button>
                    <br />
                </div>

                <div className="col-12 col-lg-8 col-md-8 col-sm-6">
                    <p className="statement-page-header">Стр. {statementPage}/6 {statementsHeaders[statementPage-1]}</p>
                </div>
                <div className="col-2 d-none d-md-block">
                    <Button variant={"info " + (statementPage >= 6 || isSaving ? "disabled" : "")} onClick={() => changePage(true)}>След</Button>
                    <br />
                </div>
            </div>

            <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
                <Tab eventKey={0} title="Заявление">

                    <div className={"statement-page " + (statementPage === 1 ? "active" : "")}>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1">Фотография</label> <br />
                            {userPosterImg}
                        </div>

                        <div className="form-group">
                            <label htmlFor="statement_file">Заявление участника конкурса (Формат JPG, PNG, PDF не более 1МБ)*
                            </label>
                            
                            <br />
                            {hrefToStatementFile}
                            <br />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomination_id">Номинация*</label>
                            <select id="inputOrganization" name="nomination_id" className="form-control" defaultValue={userStatementViewModel.nomination_id} onChange={formListener}>
                                <option value={0}>Выбрать</option>
                                {nominationMicroOptions}
                            </select>
                        </div>

                    </div>

                    <div className={"statement-page " + (statementPage === 2 ? "active" : "")}>

                        <hr />

                        <div className="form-group">
                            <label>Образование*</label>
                            <input type="text" name="education" className="form-control" defaultValue={userStatementViewModel.education} onChange={formListener} />
                        </div>
                        ...

                        <div className="form-group">
                            <label>Наличие отраслевых наград, почетных званий и других отличий</label>
                            <input type="text" name="academic_rewards" className="form-control" defaultValue={userStatementViewModel.academic_rewards} onChange={formListener} />
                        </div>

                    </div>


                    <div className={"statement-page " + (statementPage === 3 ? "active" : "")}>

                        <hr />

                        <div className="form-group">
                            <label>Прохождение курсов, стажировок, присвоение степени или звания и других мероприятий повышения квалификации за последние 3 года</label>
                            <input type="text" name="another_courses_and_other" className="form-control" defaultValue={userStatementViewModel.another_courses_and_other} onChange={formListener} />
                        </div>

                        ...

                    </div>


                    <div className={"statement-page " + (statementPage === 4 ? "active" : "")}>

                        <hr />

                        <div className="form-group">
                            <label>Являюсь экспертом (указать организацию и профиль)</label>
                            <input type="text" name="expert_of" className="form-control" defaultValue={userStatementViewModel.expert_of} onChange={formListener} />
                        </div>

                        ...
                        
                    </div>


                    <div className={"statement-page " + (statementPage === 5 ? "active" : "")}>

                        <hr />

                        <div className="form-group">
                            <label htmlFor="practice_oriented_teaching">Ведение практико-ориентированной преподавательской деятельности
                            </label>
                            <input type="text" className="form-control" id="practice_oriented_teaching" name="practice_oriented_teaching" defaultValue={userStatementViewModel.practice_oriented_teaching} onChange={formListener} />
                        </div>

                        ...

                    </div>


                    <div className={"statement-page " + (statementPage === 6 ? "active" : "")}>

                        <hr />

                        <div className="form-group">
                            <label htmlFor="other_social_public_educational_work">Прочая социальная, общественная, воспитательная работа</label>
                            <input type="text" className="form-control" id="other_social_public_educational_work" name="other_social_public_educational_work" defaultValue={userStatementViewModel.other_social_public_educational_work} onChange={formListener} />
                        </div>

                        ...

                        <div className="form-group">
                            <label htmlFor="applications_and_characteristics_files">
                                Ходатaйства и характеристики по одному до 40 шт. (Формат JPG, PNG, PDF не более 1МБ каждый)
                                <br /> 
                            </label> 
                            <br />

                            {list_of_statement_applications_and_characteristics_files}
                        </div>
                        
                        ...

                        <div className="form-group">
                            <label htmlFor="process_data_application_file">Заявление на разрешение обработки персональных данных* (Формат JPG, PNG, PDF не более 1МБ)</label> <br />
                            {hrefToProcessDataApplicationFile}
                            <br />
                        </div>

                    </div>

                    <hr />
                    <div className="statement-control">

                    </div>
                </Tab>
                
                {userExpertStatementGradeBlocks}
            </Tabs>

            <ModalNewUserExpertStatementGrade
                isModalNewUserExpertStatementGradeShow={isModalNewUserExpertStatementGradeShow}
                setIsModalNewUserExpertStatementGradeShow={setIsModalNewUserExpertStatementGradeShow}
                statementId={statement_id}
                successfullAddUserExpertStatementGradeCallback={successfullAddUserExpertStatementGradeCallback}
            />
        </div>
    )
}