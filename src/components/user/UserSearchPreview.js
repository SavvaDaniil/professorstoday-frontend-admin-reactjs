import imgUserDefault from "../../assets/images/user.png";

export default function UserSearchPreview(props)
{
    if(props.userPreviewViewModel === null)
    {
        return  <></>;
    }

    const isExpert = props.userPreviewViewModel.is_expert !== null ? props.userPreviewViewModel.is_expert ? " - Эксперт" : "" : "";
    const regionName = props.userPreviewViewModel.regionMicroViewModel !== null ? props.userPreviewViewModel.regionMicroViewModel.name : "<не указано>";
    const leagueParticipationMembershipStatusName = props.userPreviewViewModel.leagueParticipationMembershipStatusMicroViewModel !== null ? props.userPreviewViewModel.leagueParticipationMembershipStatusMicroViewModel.name : "<не указано>";

    return(
        <div className="col-12">
            <div className="user-search-preview" 
            onClick={() => props.getUserProfileById(props.userPreviewViewModel.id)}
            >
                <img src={imgUserDefault} className="img-fluid" alt="user-poster" loading="lazy" />
                <p>{props.userPreviewViewModel.secondname} {props.userPreviewViewModel.firstname} <span>id{props.userPreviewViewModel.id}{isExpert}</span></p>
                <ul className="short-info">
                    <li> Логин: {props.userPreviewViewModel.username}</li>
                    <li> Регион: {regionName}</li>
                    <li> Статус участия в конкурсе: {leagueParticipationMembershipStatusName}</li>
                </ul>
            </div>
        </div>
    )
}