
export default function UserExpertStatementGradePointBlock(props)
{
    return(
        <div className="col-2">
            <label>Оценка</label>
            <select name={props.nameOfValue} className="form-control" defaultValue={props.value} onChange={props.formListener}>
                <option value="-1">- не выбрано</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
    )
}