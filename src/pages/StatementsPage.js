import { useEffect, useRef, useState } from "react";
import StatementService from "../services/StatementService";
import AdminMiddleware from "../utils/AdminMiddleware";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { SystemLoadingBlock } from "../components/SystemLoadingBlock";
import { SystemErrorBlock } from "../components/SystemErrorBlock";
import StatementSearchPreview from "../components/statement/StatementSearchPreview";



export default function StatementsPage(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState();
    const [isNeedCount, setIsNeedCount] = useState(true);
    const [isNeedStatistic, setIsNeedStatistic] = useState(true);
    const [countStatementSearchQueryAll, setCountStatementSearchQueryAll] = useState(0);
    const [countStatementStatus1, setCountStatementStatus1] = useState(0);
    const [countStatementStatus0, setCountStatementStatus0] = useState(0);
    const [isModalFilterShow, setIsModalFilterShow] = useState(false);
    
    const [nominationMicroViewModels, setNominationMicroViewModels] = useState([]);
    const [regionMicroViewModels, setRegionMicroViewModels] = useState([]);
    const [universityMicroViewModels, setUniversityMicroViewModels] = useState([]);
    const [nominationId, setNominationId] = useState(0);
    const [regionId, setRegionId] = useState(0);
    const [universityId, setUniversityId] = useState(0);

    const [statementSearchingFilter, setStatementSearchingFilter] = useState({
        currentPage : 1,
        isNeedCount : true,
        queryString : "",
        queryStatus : 0
    });
    const [queryString, setQueryString] = useState("");

    const refInputSearch = useRef();
    const [statementPreviewViewModels, setStatementPreviewViewModels] = useState([]);
    const [countStatementSearchQuery, setCountStatementSearchQuery] = useState(0);
    const [pages, setPages] = useState(0);

    const searchStatementsWithNewQuery = async () => {
        let copiedStatementSearchingFilter = {...statementSearchingFilter};
       ...
        updateStatementSearchingFilter(copiedStatementSearchingFilter);
    }

    const searchByPage = (newPage) => {
        let copiedStatementSearchingFilter = {...statementSearchingFilter};
        ...
    }
    
    const inputSearchHandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchStatementsWithNewQuery();
        }
    }

    const searchFromTop = () => {
        setQueryString("");
        setIsNeedCount(true);
        let copiedStatementSearchingFilter = {...statementSearchingFilter};
        ...
        updateStatementSearchingFilter(copiedStatementSearchingFilter);
    }

    const changeFilter = (status) => {
        setIsNeedCount(true);
        let copiedStatementSearchingFilter = {...statementSearchingFilter};
        copiedStatementSearchingFilter.queryStatus = status;
        ...
        updateStatementSearchingFilter(copiedStatementSearchingFilter);
    }

    const updateStatementSearchingFilter = (copiedStatementSearchingFilter) => {
        setStatementSearchingFilter(() => ({
            ...copiedStatementSearchingFilter
        }));
    }

    useEffect(() => {
        const statementService = new StatementService();
        const adminMiddleware = new AdminMiddleware();
        const jwt = adminMiddleware.getJWTFromCookie();
        statementService.adminSearch(
            jwt,
            setIsLoading,
            setIsError,
            statementSearchingFilter.currentPage,
            isNeedStatistic,
            ...
        );
        
        return () => {
            //console.log("useEffect empty");
        }
    }, [statementSearchingFilter]);

    const inputSearchListener = (e) => {
        setQueryString(e.target.value);
    }

    const formFilterListener = (e) => {
        switch(e.target.name)
        {
            case "nomination_id":
                setNominationId(e.target.value);
                break;
            case "region_id":
                setRegionId(e.target.value);
                break;
            case "university_id":
                setUniversityId(e.target.value);
                break;
            default:
                break;
        }
        searchFromTop();
    }



    let nominationMicroOptions = nominationMicroViewModels.map((nominationMicroViewModel, index) => {
        return <option key={index} value={nominationMicroViewModel.id}>{nominationMicroViewModel.name}</option>
    });
    ...


    let isPaginationLeftEnabled = false;
    let pagePaginationMin = statementSearchingFilter.currentPage;
    let isPaginationRightEnabled = false;
    let pagePaginationMax = statementSearchingFilter.currentPage;
    if(statementSearchingFilter.currentPage - 1 > 0)
    {
        pagePaginationMin = statementSearchingFilter.currentPage - 1;
    }

    ...

    let paginationPages = [];
    for(var i = pagePaginationMin; i <= pagePaginationMax; i++){
        paginationPages.push(i);
    }
    const paginationBtns = paginationPages.map((page) => {
        return <li key={page} className={page === statementSearchingFilter.currentPage ? "active" : ""} 
        onClick={() => searchByPage(page)}
        >{page}
        </li>
    })


    let statementSearchPreviewsContent = "";
    if(isLoading)
    {
        statementSearchPreviewsContent = <SystemLoadingBlock />
    } else if(isError)
    {
        statementSearchPreviewsContent = <SystemErrorBlock />
    } else
    {
        statementSearchPreviewsContent = statementPreviewViewModels.map((statementPreviewViewModel, index) => {
            return <StatementSearchPreview
            key={index}
            statementPreviewViewModel={statementPreviewViewModel}
        />
        });
    }

    return(
        <div className="row page users">
        <div className="col-3" >
            <div className="filter-global">
                <p>Фильтрация</p>
                <ul>
                    <li className={statementSearchingFilter.queryStatus === 0 ? "active" : ""} //</ul>
                    onClick={() => changeFilter(0)}
                    >Все <span>{countStatementSearchQueryAll}</span></li>

                    ...
                </ul>

                <hr />

                <div className="form-group">
                    <label htmlFor="nomination_id">Номинация</label>
                    <select id="inputOrganization" name="nomination_id" className="form-control" defaultValue={nominationId} onChange={formFilterListener}>
                        <option value={0}>Любая</option>
                        {nominationMicroOptions}
                    </select>
                </div>

                <div className="form-group">
                    <label>Регион</label>
                    <select name="region_id" className="form-control" defaultValue={regionId} onChange={formFilterListener} >
                        <option value={0}>Любой</option>
                        {regionMicroOptions}
                    </select>
                </div>

                ...


            </div>
        </div>
        <div className="col-9 right-block-preview-results">
            <div className="col-12 row filter">
                <div className="col-10">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Поиск заявлений" maxLength="256"
                        defaultValue={queryString}
                        onKeyDown={inputSearchHandleKeyDown}
                        onChange={inputSearchListener}
                        ref={refInputSearch}
                        />
                    </InputGroup>
                </div>
                <div className="col-2">
                    <Button variant="success" 
                        onClick={searchStatementsWithNewQuery} 
                        disabled={isLoading}
                    >
                        Поиск
                    </Button>

                </div>
                <div className={isLoading ? "hide" : "col-12 results-pagination"}
                >
                    <p className="find">Найденное:</p>
                    <p className="find-count">{countStatementSearchQuery} заявлений ({pages} страниц)</p>
                    <ul>
                        <li className={isPaginationLeftEnabled ? "" : "disabled"}
                        ><i className="fa fa-angle-left"></i></li>

                        {paginationBtns}

                        ...
                    </ul>
                </div>
            </div>
            <div className="col-12 row">
                {statementSearchPreviewsContent}
            </div>

        </div>

        <Modal
            show={isModalFilterShow}
            onHide={() => setIsModalFilterShow(false)}
            animation={false}
            size="lg"
            >
            <Modal.Header closeButton>
                <Modal.Title>Фильтрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsModalFilterShow(false)}>
                    Закрыть 
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    )
}

/*


                    <Button variant="info" 
                        onClick={() => setIsModalFilterShow(true)}
                        disabled={isLoading}
                    >
                        Фильтр
                    </Button>
*/