import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import UserSearchPreview from "../components/user/UserSearchPreview";
import { useEffect, useRef, useState } from "react";
import AdminMiddleware from "../utils/AdminMiddleware";
import UserService from "../services/UserService";
import { SystemLoadingBlock } from "../components/SystemLoadingBlock";
import { SystemErrorBlock } from "../components/SystemErrorBlock";
import UserCard from "../components/user/UserCard";


export function UsersPage(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState();
    const [isFirstSearching, setIsFirstSearching] = useState(true);
    const [isNeedCount, setIsNeedCount] = useState(true);
    const [countUserSearchQueryAll, setCountUserSearchQueryAll] = useState(0);
    const [countUserSearchQueryOnlyExperts, setCountUserSearchQueryOnlyExperts] = useState(0);

    const [userSearchingFilter, setUserSearchingFilter] = useState({
        currentPage : 1,
        isOnlyExperts : false,
        queryStatus : 0,
        queryString : ""
    });
    const [queryString, setQueryString] = useState("");

    const refInputSearch = useRef();
    const [userPreviewViewModels, setUserPreviewViewModels] = useState([]);
    const [countUserSearchQuery, setCountUserSearchQuery] = useState(0);
    const [pages, setPages] = useState(0);

    const searchUsersWithNewQuery = async () => {
        setIsNeedCount(true);
        let copiedUserSearchingFilter = {...userSearchingFilter};
        copiedUserSearchingFilter.queryString = queryString;
        copiedUserSearchingFilter.currentPage = 1;
        updateUserSearchingFilter(copiedUserSearchingFilter);
    }

    const searchByPage = (newPage) => {
        let copiedUserSearchingFilter = {...userSearchingFilter};
        copiedUserSearchingFilter.currentPage = newPage;
        updateUserSearchingFilter(copiedUserSearchingFilter);
    }
    
    const inputSearchHandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchUsersWithNewQuery();
        }
    }

    const searchFromTop = () => {
        setQueryString("");
        refInputSearch.current.value = "";
        let copiedUserSearchingFilter = {...userSearchingFilter};
        ...
        updateUserSearchingFilter(copiedUserSearchingFilter);
    }

    const searchAllExperts = () => {
        setQueryString("");
        setIsNeedCount(true);
        refInputSearch.current.value = "";
        let copiedUserSearchingFilter = {...userSearchingFilter};
        copiedUserSearchingFilter.queryString = "";
        copiedUserSearchingFilter.queryStatus = 0;
        
        ...
        updateUserSearchingFilter(copiedUserSearchingFilter);
    }

    const searchOnlyExperts = () => {
        setQueryString("");
        setIsNeedCount(true);
        refInputSearch.current.value = "";
        let copiedUserSearchingFilter = {...userSearchingFilter};
        ...
        copiedUserSearchingFilter.isOnlyExperts = true;
        copiedUserSearchingFilter.currentPage = 1;
        updateUserSearchingFilter(copiedUserSearchingFilter);
    }

    const updateUserSearchingFilter = (copiedUserSearchingFilter) => {
        setUserSearchingFilter(() => ({
            ...copiedUserSearchingFilter
        }));
    }

    useEffect(() => {
        const userService = new UserService();
        const adminMiddleware = new AdminMiddleware();
        const jwt = adminMiddleware.getJWTFromCookie();
        userService.search(
            jwt,
            setIsLoading,
            setIsError,
            userSearchingFilter.currentPage,
            isFirstSearching,
            ...
        );
        
        return () => {
            
        }
    }, [userSearchingFilter]);

    const inputSearchListener = (e) => {
        setQueryString(e.target.value);
    }

    const [workingWithUserData, setWorkingWithUserData] = useState({
        userId : null,
        isWorkingWithUser : false
    });
    const getUserProfileById = (userIdForSearching) => {
        let copiedWorkingWithUserData = {...workingWithUserData};
        ...
        setWorkingWithUserData(() => ({
            ...copiedWorkingWithUserData
        }));
    }
    
    const closeUserCard = () => {
        let copiedWorkingWithUserData = {...workingWithUserData};
        ...
        setWorkingWithUserData(() => ({
            ...copiedWorkingWithUserData
        }));
    }
    

    useEffect(() => {
        return() => {
            
        }
    },[workingWithUserData]);
    


    let isPaginationLeftEnabled = false;
    let pagePaginationMin = userSearchingFilter.currentPage;
    let isPaginationRightEnabled = false;
    let pagePaginationMax = userSearchingFilter.currentPage;
    if(userSearchingFilter.currentPage - 1 > 0){
        pagePaginationMin = userSearchingFilter.currentPage - 1;
    }
    
    ...

    const paginationBtns = paginationPages.map((page) => {
        return <li key={page} className={page === userSearchingFilter.currentPage ? "active" : ""} 
        onClick={() => searchByPage(page)}
        >{page}
        </li>
    })


    let userSearchPreviewsContent = "";
    if(isLoading)
    {
        userSearchPreviewsContent = <SystemLoadingBlock />
    } else if(isError)
    {
        userSearchPreviewsContent = <SystemErrorBlock />
    } else
    {
        userSearchPreviewsContent = userPreviewViewModels.map((userPreviewViewModel, index) => {
            return <UserSearchPreview
            key={index}
            userPreviewViewModel={userPreviewViewModel}
            getUserProfileById={getUserProfileById}
        />
        });
    }

    return <div className="row page users">
        <div className={ !workingWithUserData.isWorkingWithUser ? "col-3" : "hide"} >
            <div className="filter-global">
                <p>Фильтрация</p>
                <ul>
                    <li className={userSearchingFilter.queryStatus === 0 ? "active" : ""} //</ul>
                    onClick={searchAllExperts}
                    >Все <span>{countUserSearchQueryAll}</span></li>
                </ul>

                <ul>
                    <li className={userSearchingFilter.queryStatus === 1 ? "active" : ""} //</ul>
                    onClick={searchOnlyExperts}
                    >Только эксперты <span>{countUserSearchQueryOnlyExperts}</span></li>
                </ul>

            </div>
        </div>
        <div className={ !workingWithUserData.isWorkingWithUser ? "col-9 right-block-preview-results" : "hide"}>
            <div className="col-12 row filter">
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
                        onClick={searchUsersWithNewQuery} 
                        disabled={isLoading}
                    >
                        Поиск
                    </Button>

                </div>
                <div className={isLoading ? "hide" : "col-12 results-pagination"}
                >
                    <p className="find">Найденное:</p>
                    <p className="find-count">{countUserSearchQuery} пользователей ({pages} страниц)</p>
                    <ul>
                        <li className={isPaginationLeftEnabled ? "" : "disabled"}
                        ><i className="fa fa-angle-left"></i></li>

                        {paginationBtns}

                        <li className={isPaginationRightEnabled ? "" : "disabled"}
                        ><i className="fa fa-angle-right"></i></li>
                    </ul>
                </div>
            </div>
            <div className="col-12 row">
                {userSearchPreviewsContent}
            </div>

        </div>


        <div className={workingWithUserData.isWorkingWithUser ? "col-12 row" : "hide"}
        >
            <div className="col-12">
                <Button variant="danger" type="button"
                onClick={closeUserCard}
                >Закрыть</Button>
            </div>

            <div/>
            <UserCard
                userId={workingWithUserData.userId}
            />
        </div>

    </div>
}