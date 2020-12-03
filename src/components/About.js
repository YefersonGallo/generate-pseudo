function About() {
    return (
        <div className="box m-5">
            <h1 className="title is-1"> Acerca de</h1>
            <p>Esta aplicación se hace como parte del primer taller de la asignatura Simulación por Computdor, de la escuela de Ingeniería de Sistemas y Computación de la
             Universidad Pedagógica y Tecnológica de Colombia</p>
            <h2 className="title is-2">Integrantes</h2>
            <div className="control is-horizontal">
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-5">José Daza</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-5">Yeferson Gallo</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-5">Diego Sánchez</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
