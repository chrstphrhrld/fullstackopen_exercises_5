const Filter = ({onChangeAction}) => {
    return (
        <div>
            filter shown with: <input onChange={onChangeAction}/>
        </div>
    )
}

export default Filter