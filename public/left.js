function Left(props){
    return (
        <>
        <aside>
            <PlusMinus section="Left" handle={props.handle}/>
            <div className="section">Left:{props.data.Left}</div>
            <Data data={props.data}/>  
        </aside>
        </>
    );
}