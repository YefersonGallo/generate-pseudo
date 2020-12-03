import React, {useEffect, useState} from 'react';

function Congruentials() {
    const [visibleTable, setVisibleTable] = useState(true);
    const [x0, setX0] = useState();
    const [k, setK] = useState();
    const [c, setC] = useState();
    const [g, setG] = useState();
    const [t, setT] = useState();
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [option, setOption] = useState(true);
    const [range, setRange] = useState(true);
    const [xi, setXi] = useState([]);
    const [ri_open, setRi_open] = useState([]);
    const [ri_close, setRi_close] = useState([]);
    const [ni_open, setNi_open] = useState([]);
    const [ni_close, setNi_close] = useState([]);

    useEffect(() =>{
        fetch('https://congruentialmethods.herokuapp.com/ping')
            .then(res => res.json())
            .then(data => console.log(data))
    });

    let generate = async (value) =>{
        if (value === 'linear'){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x0: x0, k: k, c: c, g: g})
            };
            const response = await fetch('https://congruentialmethods.herokuapp.com/linear_congruence', requestOptions)
            const res = await response.json();
            setXi(res.xi)
            setRi_open(res.Ri_open)
            setRi_close(res.Ri_close)
        }else if (value === 'linear_range'){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x0: x0, k: k, c: c, g: g, min: min, max: max})
            };
            const response = await fetch('https://congruentialmethods.herokuapp.com/linear_congruence_range', requestOptions)
            const res = await response.json();
            setXi(res.xi)
            setRi_open(res.Ri_open)
            setRi_close(res.Ri_close)
            setNi_open(res.Ni_open)
            setNi_close(res.Ni_close)
        }else if (value === 'multi'){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x0: x0, t: t, g: g})
            };
            const response = await fetch('https://congruentialmethods.herokuapp.com/multi_congruence', requestOptions)
            const res = await response.json();
            setXi(res.xi)
            setRi_open(res.Ri_open)
            setRi_close(res.Ri_close)
        }else if (value === 'multi_range'){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x0: x0, t: t, g: g, min: min, max: max})
            };
            const response = await fetch('https://congruentialmethods.herokuapp.com/multi_congruence_range', requestOptions)
            const res = await response.json();
            setXi(res.xi)
            setRi_open(res.Ri_open)
            setRi_close(res.Ri_close)
            setNi_open(res.Ni_open)
            setNi_close(res.Ni_close)
        }
        setVisibleTable(false)
        setX0('')
        setC('')
        setT('')
        setG('')
        setMax('')
        setMin('')
        setK('')
    }

    return (
        <div className="tile is-parent">
            <div className="tile is-child is-3 pl-5 mr-5">
                <aside className="menu">
                    <p className="menu-label">
                        Métodos Congruenciales
                    </p>
                    <ul className="menu-list">
                        <li><a href='#normal' onClick={() => {
                            setOption(true);
                            setVisibleTable(true)
                        }}>Congruencial Lineal</a></li>
                        <li><a href='#uniform' onClick={() => {
                            setOption(false);
                            setVisibleTable(true)
                        }}>Congruencial Multiplicativo</a></li>
                    </ul>
                </aside>
            </div>
            <div className="is-vertical">
                <div className={"tile is-child box "+(option?"":"is-hidden")}>
                    <label className="label">Congruencial Lineal</label>
                    <div className="control">
                        <div className="field is-horizontal">
                            <input
                                className="input mr-2 is-3"
                                type="text"
                                placeholder="Ingrese el número inicial x0"
                                value={x0}
                                onChange={(e) => {setX0( e.target.value.toString().replace(/[^0-9]+/, ''))}}
                                required={true}/>
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese el número k"
                                value={k}
                                onChange={(e) => {setK( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        </div>
                        <div className="field is-horizontal">
                            <input
                                className="input mr-2"
                                type="text"
                                placeholder="Ingrese el número c"
                                value={c}
                                data-tooltip="Ingrese el valor de c"
                                onChange={(e) => {setC( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese el número g"
                                value={g}
                                onChange={(e) => {setG( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        </div>
                        <div className="field is-horizontal">
                            <button
                                className={range?"button is-info mr-2":"button is-success mr-2"}
                                data-tooltip="Números normalizados"
                                onClick={() => {setRange(!range)}}>
                                ¿Números entre un rango?
                            </button>
                            <input
                                className={"input mr-2 "+(range?"is-hidden":"")}
                                type="text"
                                placeholder="Ingrese el número menor"
                                value={min}
                                onChange={(e) => {setMin( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                            <input
                                className={"input "+(range?"is-hidden":"")}
                                type="text"
                                placeholder="Ingrese el número mayor"
                                value={max}
                                onChange={(e) => {setMax( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        </div>
                        <button
                            className="button is-primary mt-3"
                            onClick={() => {generate(!range?'linear_range':'linear')}}>
                            Generar
                        </button>
                    </div>
                </div>
                <div className={"tile is-child box "+(option?"is-hidden":"")}>
                    <label className="label">Congruencial Multiplicativo</label>
                    <div className="field is-horizontal">
                        <input
                            className="input mr-2"
                            type="text"
                            placeholder="Ingrese el número x0"
                            value={x0}
                            onChange={(e) => {setX0( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        <input
                            className="input mr-2"
                            type="text"
                            placeholder="Ingrese el número t"
                            value={t}
                            onChange={(e) => {setT( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        <input
                            className="input"
                            type="text"
                            placeholder="Ingrese el número g"
                            value={g}
                            onChange={(e) => {setG( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                    </div>
                    <div className="field is-horizontal">
                        <button
                            className={range?"button is-info mr-2":"button is-success mr-2"}
                            data-tooltip="Números normalizados"
                            onClick={() => {setRange(!range)}}>
                            ¿Números entre un rango?
                        </button>
                        <input
                            className={"input mr-2 "+(range?"is-hidden":"")}
                            type="text"
                            placeholder="Ingrese el número menor"
                            value={min}
                            onChange={(e) => {setMin( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                        <input
                            className={"input "+(range?"is-hidden":"")}
                            type="number"
                            placeholder="Ingrese el número mayor"
                            value={max}
                            onChange={(e) => {setMax( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                    </div>
                    <button
                        className="button is-primary mt-3"
                        onClick={() => {generate(!range?'multi_range':'multi')}}>
                        Generar
                    </button>
                </div>
                <div className={"tile is-child box " + (visibleTable ? "is-hidden" : "")}>
                    <h1>Números Generados</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th><a download='xi.txt' href={URL.createObjectURL(new Blob([xi.toString().replaceAll(',', '\n')], {type: 'text/plain'}))} >Xi</a></th>
                            <th><a download='ri_abierto.txt' href={URL.createObjectURL(new Blob([ri_open.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Ri Intervalo Abierto</a></th>
                            <th><a download='ri_cerrado.txt' href={URL.createObjectURL(new Blob([ri_close.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Ri Intervalo Cerrado</a></th>
                            <th className={ni_open.length === 0?"is-hidden":""}><a download='ni_abierto.txt' href={URL.createObjectURL(new Blob([ni_open.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Ni Intervalo Abierto</a></th>
                            <th className={ni_close.length === 0?"is-hidden":""}><a download='ni_cerrado.txt' href={URL.createObjectURL(new Blob([ni_close.toString().replaceAll(',', '\n')], {type: 'text/plain'}))}>Ni Intervalo Cerrado</a></th>
                        </tr>
                        {xi.map((num, i) =>
                            <tr>
                                <td>{num}</td>
                                <td>{ri_open[i]}</td>
                                <td>{ri_close[i]}</td>
                                <td className={ni_open.length === 0?"is-hidden":""}>{ni_open[i]}</td>
                                <td className={ni_open.length === 0?"is-hidden":""}>{ni_close[i]}</td>
                            </tr>
                        )}
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Congruentials;
