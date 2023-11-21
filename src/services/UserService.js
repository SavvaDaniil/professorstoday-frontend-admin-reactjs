import constant from "../utils/GlobalVariables";

export default class UserService
{
    async updateByAdmin(
        jwt, 
        setIsLoading, 
        setStatusOfUpdate,
        userProfileLiteViewModel
    ){
        setIsLoading(true);
        setStatusOfUpdate("Идёт сохранение...");
        
        try
        {
            await fetch(constant.baseDomain + "/api/admin/user/profile",
            {
                method: 'PUT',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "id" : userProfileLiteViewModel.id,
                    "username" : userProfileLiteViewModel.username,
                    "secondname" : userProfileLiteViewModel.secondname,
                    ...
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success")
                {
                    setStatusOfUpdate("Успешно сохранено");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setStatusOfUpdate("Неверное введен текущий пароль");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setStatusOfUpdate("Логин уже зарегистрирован в базе");
                } else
                {
                    setStatusOfUpdate("Неизвестная ошибка");
                }
            })
            .catch((error) => {
                console.log(error);
                setStatusOfUpdate("Неизвестная ошибка");
            })
        } catch(error)
        {
            console.log(error);
            setStatusOfUpdate("Неизвестная ошибка");
        } finally
        {
            setIsLoading(false);
        }
    }


    async getById(
        jwt,
        setIsLoading,
        setIsError,
        user_id,
        setUserProfileViewModel,
        setLeagueParticipationMembershipStatusMicroViewModels,
        setRegionMicroViewModels,
        setUniversityMicroViewModels,
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            console.log("jwt: " + jwt);
            return await fetch(constant.baseDomain + "/api/admin/user/" + user_id,
            {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Bearer '+ jwt, 
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userProfileLiteViewModel !== null && setUserProfileViewModel !== null)
                {
                    if(jsonAnswerStatus.leagueParticipationMembershipStatusMicroViewModels !== null)
                    {
                        setLeagueParticipationMembershipStatusMicroViewModels(jsonAnswerStatus.leagueParticipationMembershipStatusMicroViewModels);
                    }
                    ...
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

    async searchExperts(
        jwt,
        setIsLoading,
        setWarning,
        query_string,
        setUserPreviewViewModels,
        setIsEmptySearching,
    ){
        setIsLoading(true);
        setWarning("Выполняется запрос...");
        //console.log("query_string: " + query_string);
        try
        {
            return await fetch(constant.baseDomain + "/api/admin/user/search_experts",
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
                    "query_string" : query_string
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                setWarning("");
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userPreviewViewModels !== null)
                {
                    setUserPreviewViewModels(jsonAnswerStatus.userPreviewViewModels);
                    if(jsonAnswerStatus.userPreviewViewModels.length === 0 && setIsEmptySearching !== null)
                    {
                        ...
                    }
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Найдено больше 10 пользователей");
                } else
                {
                    setWarning("Ошибка сети");
                }
            })
            .catch((error) => {
                console.log(error);
                setWarning("Ошибка сети");
            })
        } catch(error)
        {
            console.log(error);
            setWarning("Ошибка сети");
        } finally
        {
            setIsLoading(false);
        }
    }

    async search(
        jwt,
        setIsLoading,
        setIsError,
        page,
        is_first_launch,
        setIsFirstSearching,
        is_need_count,
        setIsNeedCount,
        query_string,
        is_only_experts,
        setUserPreviewViewModels,
        setCountUserSearchQueryAll,
        setCountUserSearchQueryOnlyExperts,
        setCountUserSearchQuery,
        setPages
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            return await fetch(constant.baseDomain + "/api/admin/user/search",
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
                    "is_only_experts" : is_only_experts,
                    "is_need_count" : is_need_count
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userPreviewViewModels !== null)
                {
                    setUserPreviewViewModels(jsonAnswerStatus.userPreviewViewModels);

                    if(jsonAnswerStatus.count_user_search_query !== null 
                        && typeof(jsonAnswerStatus.count_user_search_query) !== "undefined")
                    {
                        if(is_first_launch)
                        {
                            setCountUserSearchQueryAll(jsonAnswerStatus.count_user_search_query);
                            ...
                        } else if(is_need_count)
                        {
                            setCountUserSearchQuery(jsonAnswerStatus.count_user_search_query);
                            setPages(Math.ceil(jsonAnswerStatus.count_user_search_query / 20));
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