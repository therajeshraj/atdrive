const CardView = (props) => {

    return (
        <div className="parentCard card">
            {props.children}
        </div>
    )
    
}

export default CardView