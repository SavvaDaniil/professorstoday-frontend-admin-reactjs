import { useRef, useState } from "react";
import UserService from "../../services/UserService";
import AdminMiddleware from "../../utils/AdminMiddleware";
import { SystemLoadingBlock } from "../SystemLoadingBlock";
import UserSearchPreview from "../user/UserSearchPreview";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import UserExpertStatementGradeService from "../../services/UserExpertStatementGradeService";

export default function ModalNewUserExpertStatementGrade(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isEmptySearching, setIsEmptySearching] = useState(false);
    const [queryString, setQueryString] = useState("");
    const [warning, setWarning] = useState("");
    const [isUserExpertSearching, setIsUserExpertSearching] = useState(false);
    const [userPreviewViewModels, setUserPreviewViewModels] = useState([]);
    const refInputSearch = useRef();

    if(props.statementId === null 
        || props.isModalNewUserExpertStatementGradeShow === null 
        || props.setIsModalNewUserExpertStatementGradeShow === null
    ){
        return <></>;
    }

    const statementId = props.statementId;

    const searchExperts = () => {
        if(queryString === null || queryString === "")
        {
            setWarning("Введите в поле запрос");
            return;
        }
        const userService = new UserService();
        const adminMiddleware = new AdminMiddleware();
        const jwt = adminMiddleware.getJWTFromCookie();
        return userService.searchExperts(
            jwt,
            setIsLoading,
            setWarning,
            queryString,
            setUserPreviewViewModels,
            setIsEmptySearching
        )
    }

    const adminAdd = (userExpertId) => {
        const userExpertStatementGradeService = new UserExpertStatementGradeService();
        const adminMiddleware = new AdminMiddleware();
        const jwt = adminMiddleware.getJWTFromCookie();
        return userExpertStatementGradeService.adminAdd(
            jwt,
            setIsLoading,
            userExpertId,
            statementId,
            props.successfullAddUserExpertStatementGradeCallback
        )
    }

    const inputSearchListener = (e) => {
        if(isEmptySearching)
        {
            setIsEmptySearching(false);
        }
        setWarning("");
        setQueryString(e.target.value);
    }
    
    const inputSearchHandleKeyDown = (e) => {
        if (e.key === 'Enter') 
        {
            searchExperts();
        }
    }

    let userSearchPreviewsContent = "";
    if(isLoading)
    {
        userSearchPreviewsContent = <SystemLoadingBlock />
    } else if(warning !== null && warning !== "")
    {
        userSearchPreviewsContent = <div className="col-12">
            <p className="warning text-center">{warning}</p>
        </div>;
    } else
    {
        if(userPreviewViewModels !== null && userPreviewViewModels.length > 0)
        {
            userSearchPreviewsContent = userPreviewViewModels.map((userPreviewViewModel, index) => {
                return <UserSearchPreview
                key={index}
                userPreviewViewModel={userPreviewViewModel}
                getUserProfileById={adminAdd}
            />
            });
        } else if(isEmptySearching)
        {
            userSearchPreviewsContent = <div className="col-12">
                <p className="text-center">
                    Данных не найдено    
                </p>
            </div>;
        }
    }

    return(
        <Modal
            show={props.isModalNewUserExpertStatementGradeShow}
            onHide={() => props.setIsModalNewUserExpertStatementGradeShow(false)}
            animation={false}
            size="lg"
            className="modal-new-user-expert-statement-grade"
            >
            <Modal.Header closeButton>
                <Modal.Title>Новая экспертиза</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row filter">
                    <div className="col-10">
                        <InputGroup>
                            <Form.Control type="text" placeholder="Поиск пользователей" maxLength="256"
                            defaultValue={queryString}
                            onKeyDown={inputSearchHandleKeyDown}
                            onChange={inputSearchListener}
                            ref={refInputSearch}
                            />
                        </InputGroup>
                    </div>
                    <div className="col-2">
                        <Button variant="success" 
                            onClick={searchExperts} 
                            disabled={isUserExpertSearching}
                        >
                            Поиск
                        </Button>

                    </div>
                </div>
                <div className="row">
                    {userSearchPreviewsContent}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setIsModalNewUserExpertStatementGradeShow(false)}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    )
}