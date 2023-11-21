import constant from "../utils/GlobalVariables";


export default class UserExpertStatementGradeService
{
    async adminAdd(
        jwt,
        setIsLoading,
        user_expert_id,
        statement_id,
        successCallback
    ){
        setIsLoading(true);
        try
        {
            return await fetch(constant.baseDomain + "/api/user_expert_statement_grade/admin/add",
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Bearer '+ jwt, 
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "user_expert_id" : user_expert_id,
                    "statement_id" : statement_id
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && successCallback !== null)
                {
                    successCallback();
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    alert("Эксперту уже назначена данная заявка");
                } else
                {
                    alert("Ошибка сети");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Ошибка сети");
            })
        } catch(error)
        {
            console.log(error);
            alert("Ошибка сети");
        } finally
        {
            setIsLoading(false);
        }
    }
}