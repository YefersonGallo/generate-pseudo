import React, { useState, useEffect } from 'react';

function Distributions() {
    const [numIntervalos, setNumIntervalos] = useState(0);
    const [xi, setXi] = useState([]);
    const [ri, setRi] = useState([]);
    const [option, setOption] = useState(true);
    const [table_uniform, setTable_uniform] = useState(true);
    const [table_normal, setTable_normal] = useState(true);
    const [size, setSize] = useState();
    const [intervals, setIntervals] = useState();
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    useEffect(() =>{
        fetch('https://dcb-node-deploy-poker.herokuapp.com/ping')
            .then(res => res.json())
            .then(data => console.log(data))
    });

    let send_request_normal = async () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ n: size})
        };
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/generaterandom', requestOptions)
        const res = await responseP.json();
        setXi(res)
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numIntervalos: numIntervalos, ri: res})
        };
        const responseP1 = await fetch('https://dcb-node-deploy-poker.herokuapp.com/GnormalStd', requestOptions1)
        const res1 = await responseP1.json();
        console.log(res1)
        setNumIntervalos('')
        setSize('')
    }

    let send_request_uniform = async () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ n: size})
        };
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/generaterandom', requestOptions)
        const res = await responseP.json();
        setXi(res)
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ri: res, min: min, max: max})
        };
        const responseP1 = await fetch('https://dcb-node-deploy-poker.herokuapp.com/normalize', requestOptions1)
        const res1 = await responseP1.json();
        setRi(res1)
        setNumIntervalos('')
        setSize('')
        setMin('')
        setMax('')
        setTable_uniform(false)
    }

    return (
        <div className="tile is-parent">
            <div className="tile is-child is-3 pl-5 mr-5">
                    <aside className="menu">
                        <p className="menu-label">
                            Distribuciones
                        </p>
                        <ul className="menu-list">
                            <li><a href='#normal' onClick={() => {
                                setOption(true)
                            }}>Distribución Normal</a></li>
                            <li><a href='#uniform' onClick={() => {
                                setOption(false)
                            }}>Distribución Uniforme</a></li>
                        </ul>
                    </aside>
                </div>
            <div className="is-vertical">
                <div className={"tile is-child mb-2 box is-8 "+(option?"":"is-hidden")}>
                    <div className="field">
                        <label className="label">Distribución Normal</label>
                        <div className="field is-horizontal">
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese la cantidad de números"
                                value={size}
                                onChange={(e) => {setSize( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese la cantidad de intervalos"
                                value={intervals}
                                onChange={(e) => {setIntervals( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        </div>
                        <button
                            className="button is-primary mt-3"
                            onClick={() => {send_request_normal()}}>
                            Generar
                        </button>
                    </div>
                </div>
                <div className={"tile is-child mb-2 box is-8 "+(option?"is-hidden":"")}>
                    <div className="field">
                        <label className="label">Distribución Uniforme</label>
                        <div className="field is-horizontal">
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese la cantidad de números"
                                value={size}
                                onChange={(e) => {setSize( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese el número menor del rango"
                                value={min}
                                onChange={(e) => {setMin( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese el número mayor del rango"
                                value={max}
                                onChange={(e) => {setMax( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        </div>
                        <button
                            className="button is-primary mt-3"
                            onClick={() => {send_request_uniform()}}>
                            Generar
                        </button>
                    </div>
                </div>
                <div className={"tile is-child box "+(table_uniform?"is-hidden":"")}>
                    <h1>Números Generados</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th><a download='xi.txt' href={URL.createObjectURL(new Blob([xi.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Xi</a></th>
                            <th><a download='ri.txt' href={URL.createObjectURL(new Blob([ri.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Ri</a></th>
                        </tr>
                        {xi.map((row, i) =>
                            <tr>
                                <td>{row}</td>
                                <td>{ri[i]}</td>
                            </tr>
                        )}
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Distributions;
