function Right(props){
    return (
        <>
        <aside>
            <PlusMinus section="Right" handle={props.handle}/>
            <div className="section">Right:{props.data.Right}</div>
            <Data data={props.data}/>
        </aside>
        </>
    );
}