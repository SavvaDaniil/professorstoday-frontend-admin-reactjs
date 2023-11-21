import constant from "../utils/GlobalVariables";


export default class StatementService
{

    async adminGet(
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
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/admin/statement/" + statement_id,
            {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userStatementViewModel !== null)
                {
                    if(jsonAnswerStatus.nominationMicroViewModels !== null)
                    {
                        setNominationMicroViewModels(jsonAnswerStatus.nominationMicroViewModels);
                    }

                    if(jsonAnswerStatus.leagueParticipationMembershipStatusMicroViewModels !== null)
                    {
                        setLeagueParticipationMembershipStatusMicroViewModels(jsonAnswerStatus.leagueParticipationMembershipStatusMicroViewModels);
                    }
                    
                    ...

                    setUserStatementViewModel(jsonAnswerStatus.userStatementViewModel);
                } else 
                {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }


    async adminSearch(
        jwt,
        setIsLoading,
        setIsError,
        page,
        is_need_statistic,
        setIsNeedStatistic,
        is_need_count,
        setIsNeedCount,
        query_string,
        query_status,
        setStatementPreviewViewModels,
        setCountStatementSearchQueryAll,
        setCountStatementStatus1,
        setCountStatementStatus0,
        setCountStatementSearchQuery,
        setPages,
        setNominationMicroViewModels,
        setRegionMicroViewModels,
        setUniversityMicroViewModels,
        nominationId,
        regionId,
        universityId,
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            return await fetch(constant.baseDomain + "/api/admin/statement/search",
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                //credentials: 'include',
                headers: {
                    'Authorization': 'Bearer '+ jwt, 
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "page" : page,
                    "query_string" : query_string,
                    "is_need_statistic" : is_need_statistic,
                    "status" : query_status,
                    "is_need_count" : is_need_count,
                    "nomination_id" : nominationId,
                    "region_id" : regionId,
                    "university_id" : universityId
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.statementPreviewViewModels !== null)
                {
                    setStatementPreviewViewModels(jsonAnswerStatus.statementPreviewViewModels);

                    if(jsonAnswerStatus.count_statement_search_query !== null 
                        && typeof(jsonAnswerStatus.count_statement_search_query) !== "undefined")
                    {
                        if(is_need_statistic)
                        {
                            setCountStatementSearchQueryAll(jsonAnswerStatus.count_statement_search_query);
                            
                            ...

                            setPages(Math.ceil(jsonAnswerStatus.count_statement_search_query / 20));
                        } else if(is_need_count)
                        {
                            ...
                        }
                    }
                } else
                {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }
}