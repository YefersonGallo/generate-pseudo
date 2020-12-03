import React, { useState, useEffect } from 'react';

function MeanSquares() {
    const [seed, setSeed] = useState();
    const [size, setSize] = useState();
    const [xi, setXi] = useState([]);
    const [xi2, setXi2] = useState([]);
    const [extention, setExtention] = useState([]);
    const [extraction, setExtraction] = useState([]);
    const [ri, setRi] = useState([]);
    const [visible, setVisible] = useState(true);

    useEffect(() =>{
        fetch('https://dcb-node-deploy-poker.herokuapp.com/ping')
            .then(res => res.json())
            .then(data => console.log(data))
    });

    let send_request = async () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ semilla: seed, size: size})
        };
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/cuadradosmedios', requestOptions)
        const res = await responseP.json();
        setXi(res.xi)
        setXi2(res.xi2)
        setExtraction(res.extraccion)
        setExtention(res.extension)
        setRi(res.ri)
        setVisible(false)
        setSeed('')
        setSize('')
    }

    return (
        <div className="tile is-parent p-5 m-5 is-vertical">
            <div className="tile is-child box">
                <div className="control">
                    <label className="label">Cuadrados Medios</label>
                    <div className="field tiles is-horizontal">
                        <input
                            className="input mr-2"
                            type="text"
                            placeholder="Ingrese el número semilla para generar el número"
                            value={seed}
                            onChange={(e) => {setSeed( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        <input
                            className="input"
                            type="text"
                            placeholder="Ingrese el tamaño"
                            value={size}
                            onChange={(e) => {setSize( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                    </div>
                    <button
                        className="button is-primary mt-3"
                        onClick={() => {send_request()}}>
                        Generar
                    </button>
                </div>
            </div>
            <div className={"tile is-child box "+(visible?"is-hidden":"")}>
                <h1>Números Generados</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th><a download='xi.txt' href={URL.createObjectURL(new Blob([xi.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Xi</a></th>
                            <th><a download='xi2.txt' href={URL.createObjectURL(new Blob([xi2.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Xi^2</a></th>
                            <th><a download='extension.txt' href={URL.createObjectURL(new Blob([extention.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Extensión</a></th>
                            <th><a download='extracción.txt' href={URL.createObjectURL(new Blob([extraction.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Extracción</a></th>
                            <th><a download='ri.txt' href={URL.createObjectURL(new Blob([ri.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Ri</a></th>
                        </tr>
                        {xi.map((row, i) =>
                            <tr>
                                <td>{row}</td>
                                <td>{xi2[i]}</td>
                                <td>{extention[i]}</td>
                                <td>{extraction[i]}</td>
                                <td>{ri[i]}</td>
                            </tr>
                        )}
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default MeanSquares;
