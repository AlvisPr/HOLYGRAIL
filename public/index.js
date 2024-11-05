function PlusMinus(props) {
    function handle(event) {
        const value = event.target.id.includes("minus") ? -1 : 1;
        props.handle({ name: props.section, value: value });
    }
    return (
        <div>
            <img src={`icons/${props.section}_plus.png`} id="plus" onClick={(e) => handle(e)} />
            <img src={`icons/${props.section}_minus.png`} id="minus" onClick={(e) => handle(e)} />
        </div>
    );
}

function update(section, value) {
    return new Promise((resolve, reject) => {
        var url = `/update/${section}/${value}`;
        superagent
            .get(url)
            .end((error, response) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(response.body);
            });
    });
}

function read() {
    return new Promise((resolve, reject) => {
        var url = '/data';
        superagent
            .get(url)
            .end((error, response) => {
                if (error) {
                    reject(null);
                    return;
                }
                resolve(response.body);
            });
    });
}

function Data(props) {
    return (
        <div>
            Header: {props.data.header},
            Left: {props.data.Left},
            Article: {props.data.article},
            Right: {props.data.Right},
            Footer: {props.data.footer}
        </div>
    );
}

function App() {
    const [data, setData] = React.useState({
        header: 0, Left: 0, article: 0, Right: 0, footer: 0
    });

    function handle(section) {
        console.log("Pong", section);
        update(section.name, section.value)
            .then(() => read())
            .then((newData) => {
                setData(newData);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    React.useEffect(() => {
        read().then((initialData) => {
            setData(initialData);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div className="grid">
            <Header handle={handle} data={data} />
            <Left handle={handle} data={data} />
            <Article handle={handle} data={data} />
            <Right handle={handle} data={data} />
            <Footer handle={handle} data={data} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));