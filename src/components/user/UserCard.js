import { useEffect, useState } from "react"
import UserService from "../../services/UserService";
import AdminMiddleware from "../../utils/AdminMiddleware";
import { SystemLoadingBlock } from "../SystemLoadingBlock";
import { SystemErrorBlock } from "../SystemErrorBlock";
import imgUserDefault from "../../assets/images/user.png";
import { Button, Form } from "react-bootstrap";


export default function UserCard(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [statusOfUpdate, setStatusOfUpdate] = useState("");
    const [userProfileLiteViewModel, setUserProfileLiteViewModel] = useState(null);
    const [userId, setUserId] = useState(null);


    const [leagueParticipationMembershipStatusMicroViewModels, setLeagueParticipationMembershipStatusMicroViewModels] = useState([]);
    const [regionMicroViewModels, setRegionMicroViewModels] = useState([]);
    const [universityMicroViewModels, setUniversityMicroViewModels] = useState([]);

    const userService = new UserService();
    const adminMiddleWare = new AdminMiddleware();
    const jwt = adminMiddleWare.getJWTFromCookie();

    const formListener = (e) => {
        setStatusOfUpdate("");
        let copiedUserProfileLiteViewModel = {...userProfileLiteViewModel};
        copiedUserProfileLiteViewModel[e.target.name] = e.target.value;
        setUserProfileLiteViewModel(() => ({
            ...copiedUserProfileLiteViewModel
        }));
    }

    useEffect(() => {
        if(props.userId !== null && typeof(props.userId) !== "undefined")
        {
           setUserId(props.userId);
        }
        return () => {
            console.log("UserCard useEffect props.userId: " + props.userId);
        }
    }, [props.userId])

    useEffect(() => {
        if(userId !== null)
        {
            setStatusOfUpdate("");
            const userService = new UserService();
            const adminMiddleWare = new AdminMiddleware();
            userService.getById(
                adminMiddleWare.getJWTFromCookie(),
                setIsLoading,
                setIsError,
                userId,
                setUserProfileLiteViewModel,
                setLeagueParticipationMembershipStatusMicroViewModels,
                setRegionMicroViewModels,
                setUniversityMicroViewModels,
            );
        }
    }, [userId])


    if(isLoading)
    {
        return <SystemLoadingBlock />
    } else if(isError || userProfileLiteViewModel === null)
    {
        return <SystemErrorBlock />
    }

    if(props.userId === null)
    {
        return <>
            Данных не получено
        </>
    }
    

    let leagueParticipationMembershipStatusOptions = leagueParticipationMembershipStatusMicroViewModels.map((leagueParticipationMembershipStatusMicroViewModel, index) => {
        return <option 
        key={index} 
        value={leagueParticipationMembershipStatusMicroViewModel.id}>
            {leagueParticipationMembershipStatusMicroViewModel.name}
        </option>
    })
    let regionMicroOptions = regionMicroViewModels.map((regionMicroViewModel, index) => {
        return <option key={index} value={regionMicroViewModel.id}>{regionMicroViewModel.name}</option>
    });
    let universityMicroOptions = universityMicroViewModels.map((universityMicroViewModel, index) => {
        return <option key={index} value={universityMicroViewModel.id}>{universityMicroViewModel.name}</option>
    });

    let dateOfAddStr = "<Не обнаружено>";
    if(userProfileLiteViewModel.date_of_add !== null && userProfileLiteViewModel.date_of_add !== "")
    {
        const dateOfAdd = new Date(userProfileLiteViewModel.date_of_add);
        dateOfAddStr = dateOfAdd.getDate() 
        + "." + (dateOfAdd.getMonth() < 10 ? "0" + dateOfAdd.getMonth() : dateOfAdd.getMonth()) 
        + "." + dateOfAdd.getFullYear() 
        + " " + (dateOfAdd.getHours() < 10 ? "0" + dateOfAdd.getHours() : dateOfAdd.getHours())

        ...

    }

    return(
        <div className="col-12 row page user">
            <div className="col-3 preview">
                <div className="text-center">
                    <img src={imgUserDefault} className="img-fluid poster" alt="user_poster" />
                    <h4>{userProfileLiteViewModel.secondname} {userProfileLiteViewModel.firstname}</h4>
                </div>
                <p className="title">Даты</p>
                <p>
                    Дата регистрации: {dateOfAddStr}
                </p>
            </div>

            <div className="col-9">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"
                        >Профиль</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="activity-tab" data-bs-toggle="tab" data-bs-target="#activity" type="button" role="tab" aria-controls="activity" aria-selected="false"
                        >Заявки</button>
                    </li>

                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active user-profile" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        <Form>
                            <Form.Group controlId="formProfileUserId">
                                <Form.Label>id в базе данных</Form.Label>
                                <Form.Control type="text" name="user_id" maxLength="512" defaultValue={userProfileLiteViewModel.id}
                                disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="formPoints">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control type="text" name="username" maxLength="512" defaultValue={userProfileLiteViewModel.username} onChange={formListener}
                                />
                            </Form.Group>
                            <Form.Group controlId="secondname">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control type="text" name="secondname" maxLength="216" defaultValue={userProfileLiteViewModel.secondname} onChange={formListener}
                                />
                            </Form.Group>

                            ...

                            <div className="form-group">
                                <label>Пол*</label>
                                <select name="gender" className="form-control" defaultValue={userProfileLiteViewModel.gender} onChange={formListener}>
                                    <option value={0}>- не выбрано</option>
                                    <option value={1}>Женский</option>
                                    <option value={2}>Мужской</option>
                                </select>
                            </div>

                            ...
                            
                            <div className="form-group">
                                <label>Участие в Лиге Преподавателей Высшей Школы*</label>
                                <select name="league_participation_is_membership" className="form-control" defaultValue={userProfileLiteViewModel.league_participation_is_membership} onChange={formListener}>
                                    <option value={0}>- не выбрано</option>
                                    <option value={1}>Не являюсь участником Лиги Преподавателей Высшей Школы</option>
                                    <option value={2}>Являюсь участником Лиги Преподавателей Высшей Школы</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Статус участия в конкурсе*</label>
                                <select name="league_participation_membership_status_id" className="form-control" defaultValue={userProfileLiteViewModel.league_participation_membership_status_id} onChange={formListener}>
                                    <option value={0}>- не выбрано</option>

                                    {leagueParticipationMembershipStatusOptions}

                                </select>
                            </div>

                            <hr />

                            <div className="form-group">
                                <label>Эксперт</label>
                                <select name="is_expert" className="form-control" defaultValue={userProfileLiteViewModel.is_expert} onChange={formListener}>
                                    <option value={false}>Нет</option>
                                    <option value={true}>Да</option>
                                </select>
                            </div>

                            <Form.Group controlId="password">
                                <Form.Label>Новый пароль</Form.Label>
                                <Form.Control type="password" name="password" maxLength="216"
                                />
                            </Form.Group>

                            <hr />

                            <Button variant="success"
                            onClick={() => userService.updateByAdmin(
                                jwt,
                                setIsSaving,
                                setStatusOfUpdate,
                                userProfileLiteViewModel
                            )}
                            disabled={isSaving}
                            >Сохранить</Button>

                            <p>{statusOfUpdate}</p>

                        </Form>
                    </div>
                    <div className="tab-pane fade user-activity" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                        
                        <div
                            userId={props.userId}
                        />
                    </div>
                </div>
            </div>



        </div>
    )
}