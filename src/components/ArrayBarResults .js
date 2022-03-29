import React, { useState, useEffect, useRef } from 'react';
// import { Table } from 'react-bootstrap';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Data from "../db.json";



const ArrayBarResults = (props) => {

    const { name,
        length,
        lengthA,
        lengthB,
        force,
        load,
        pointForce,
        pointMoment,
        forceType,
        maxMoment,
        maxShearForce,
        setName,
        setLength,
        setLengthA,
        setLengthB,
        setForce,
        setLoad,
        setPointForce,
        setPointMoment,
        setForceType,
        setMaxMoment,
        setMaxShearForce,
        formData,
        setFormData
    } = props;


    // pyyntö POST fetch-kutsuun
    const [postQuery, setPostQuery] = useState(false);
    const [deleteQuery, setDeleteQuery] = useState("");
    const [haeQuery, setHaeQuery] = useState("");
    const [editQuery, setEditQuery] = useState("");
    const [edit, setEdit] = useState(false);

    const [id, setId] = useState("");

    // State 
    const [tulokset, setTulokset] = useState([]);
    const [tulos, setTulos] = useState([]);

    // Reference
    const pituusRef = useRef();
    const pituusARef = useRef();
    const pituusBRef = useRef();
    const kuormaRef = useRef();
    const tyyppiRef = useRef();
    const maxMRef = useRef();
    const maxVRef = useRef();



    // Fetch Tulokset
    useEffect(() => {
        const fetchTulokset = async () => {
            const res = await fetch('http://localhost:4000/tulokset')
            const data = await res.json()
            setTulokset(data);
            console.log("data :", data);
        }
        fetchTulokset();
    }, [])

    // Fetch Tulos
    useEffect(() => {
        const fetchTulos = async (id) => {
            const res = await fetch(`http://localhost:4000/tulokset/` + haeQuery)
            const data = await res.json()
            console.log("data.id :", data.id);
            console.log("data :", data);
            // setTulos({ id: data.id, nimi: data.nimi, pituus: data.pituus, kuorma: data.kuorma, tyyppi: data.tyyppi, maxM: data.maxM, maxV: data.maxV });
            setTulos({
                id: data.id,
                nimi: data.nimi,
                pituusL: data.pituusL,
                pituusA: data.pituusA,
                pituusB: data.pituusB,
                kuormaTV: data.kuormaTV,
                kuormaPK: data.kuormaPK,
                kuormaPM: data.kuormaPM,
                tyyppi: data.tyyppi,
                maxM: data.maxM,
                maxV: data.maxV
            });
            /*
            if (data.kuormaTV != "") {
                setId(data.id);
                setName(data.nimi);
                setLength(data.pituusL);
                setLoad(data.kuormaTV);
                setForceType(data.tyyppi);
                setMaxMoment(data.maxM);
                setMaxShearForce(data.maxV);
            } else if (data.kuormaPK != "") {
                setId(data.id);
                setName(data.nimi);
                setLength(data.pituusL);
                setLengthA(data.pituusA);
                setLengthB("201");
                setPointForce(data.kuormaPK);
                setForceType(data.tyyppi);
                setMaxMoment(data.maxM);
                setMaxShearForce(data.maxV);
            } else if (data.kuormaPM != "") {
                setId(data.id);
                setName(data.nimi);
                setLengthA(data.pituusA);
                setLengthB(data.pituusB);
                setPointMoment(data.kuormaPM);
                setForceType(data.tyyppi);
                setMaxMoment(data.maxM);
                setMaxShearForce(data.maxV);
            }
            
            setId(data.id);
            setName(data.nimi);
            setLength(data.pituusL);
            // setLengthA(data.pituusA);
            // setLengthB(data.pituusB);
            setLoad(data.kuormaTV);
            setPointForce(data.kuormaPK);
            setPointMoment(data.kuormaPM);
            setForceType(data.tyyppi);
            setMaxMoment(data.maxM);
            setMaxShearForce(data.maxV);
            */

            // Tällä aktivoidaan PUT-pyyntö <-- tämä poistettu käytöstä 30.1
            setEdit(true);
        }
        if (haeQuery != '') {
            fetchTulos();
        }
    }, [haeQuery]);

    // Add Tulos
    useEffect(() => {
        // let tulos = { nimi: name, pituus: length, kuorma: force, tyyppi: forceType, maxM: maxMoment, maxV: maxShearForce };


        const addTask = async () => {
            const res = await fetch('http://localhost:4000/tulokset', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            // lisätään tulokset-listaan data-tulos 
            setTulokset([...tulokset, data]);
            setPostQuery(false);
        }
        if (postQuery != '') {
            addTask();
        }
    }, [postQuery]);



    // Delete Tulos
    useEffect(() => {
        const deleteTulos = async () => {
            const res = await fetch(`http://localhost:4000/tulokset/` + deleteQuery, {
                method: 'DELETE',
            })

        }
        if (deleteQuery != '') {
            deleteTulos();
        }
    }, [deleteQuery]);

    // Edit Tulos
    useEffect(() => {
        // let tulos = { nimi: name, pituus: length, kuorma: force, tyyppi: forceType, maxM: maxMoment, maxV: maxShearForce };
        /*
        let tulos = {
            nimi: name,
            pituusL: length,
            pituusA: lengthA,
            pituusB: lengthB,
            kuormaTV: load,
            kuormaPK: pointForce,
            kuormaPM: pointMoment,
            tyyppi: forceType,
            maxM: maxMoment,
            maxV: maxShearForce
        };
        */
        console.log("tulos: ", tulos);
        const editTulos = async () => {
            const res = await fetch('http://localhost:4000/tulokset/' + editQuery, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(tulos),
            })

            const data = await res.json()

            // lisätään tulokset-listaan data-tulos 
            // setTulokset([...tulokset, data])
            const resNew = await fetch('http://localhost:4000/tulokset')
            const dataNew = await resNew.json()
            setTulokset(dataNew);
            console.log("dataNew :", dataNew);
            setEdit(false);
        }

        if (editQuery != '') {
            editTulos();
        }
    }, [editQuery]);


    const onAdd = () => {
        setPostQuery(true);
    }

    const onDelete = (id, pituus) => {
        let d = "";
        if (id !== "") {
            d = id;
            setDeleteQuery(d);
        }

        // Päivitetään taulukko
        const uusiTaulukko = tulokset.filter(m => m.id !== id);
        // sijoitetaan uusi taulukko taulukko-statemuuttujaan
        setTulokset([...uusiTaulukko]);
    }

    const haeTulos = (id) => {
        setHaeQuery(id);
    }

    const onEdit = (id) => {
        console.log("onEdit-funktiossa", id);
        let d = "";
        if (id !== "") {
            d = id;
            setEditQuery(d);
        }
    }

    // Bonus Section
    //////////////////////////////////////////
    // Downloading JSON File
    const saveData = jsonDate => {
        const fileData = JSON.stringify(jsonDate);

        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        // create link
        const link = document.createElement('a');
        // point link to file to be downloaded
        link.download = 'newData.json';
        link.href = url;
        // trigger download
        link.click();
    }

    return (
        <div >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <button onClick={e => saveData(tulokset)}>Tallenna JSON-data</button>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell>Id</TableCell>
                                    <TableCell>Nimi</TableCell>
                                    <TableCell>L [m]</TableCell>
                                    <TableCell>a [m]</TableCell>
                                    <TableCell>b [m]</TableCell>
                                    <TableCell>q [kN/m]</TableCell>
                                    <TableCell>P [kN/m]</TableCell>
                                    <TableCell>M [kNm]</TableCell>
                                    <TableCell>Tyyppi</TableCell>
                                    <TableCell>Max M</TableCell>
                                    <TableCell>Max V</TableCell>
                                    <TableCell>Muokkaus</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tulokset.map((t) => {
                                        return (<TableRow key={t.id} hover>

                                            <TableCell>{t.id}</TableCell>
                                            <TableCell>{t.nimi}</TableCell>
                                            <TableCell>{t.pituusL}</TableCell>
                                            <TableCell>{t.pituusA}</TableCell>
                                            <TableCell>{t.pituusB}</TableCell>
                                            <TableCell>{t.kuormaTV}</TableCell>
                                            <TableCell>{t.kuormaPK}</TableCell>
                                            <TableCell>{t.kuormaPM}</TableCell>
                                            <TableCell>{t.tyyppi}</TableCell>
                                            <TableCell>{t.maxM}</TableCell>
                                            <TableCell>{t.maxV}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button
                                                        onClick={() => { haeTulos(t.id) }}>Hae tulos muokattavaksi {t.id} </Button>
                                                    <Button
                                                        onClick={() => { if (window.confirm("Haluatko varmasti poistaa tuloksen " + t.nimi + " ?")) onDelete(t.id, t.pituus) }} >Poista tulos {t.id}</Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)


                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={4}>
                    {
                        !edit ?
                            <div className="row" >
                                <div className="col-md-6" >
                                    <h2>Lisää Tulos Taulukkoon</h2>
                                    <input
                                        type="text"
                                        name="nimi"
                                        required="required"
                                        placeholder="Lisää nimi..."
                                        value={formData.nimi}
                                        onChange={(e) => {
                                            setFormData({ ...formData, nimi: e.target.value });
                                        }}

                                    />
                                    <input
                                        type="text"
                                        name="pituus"
                                        placeholder="Lisää pituus L..."
                                        value={formData.pituusL}
                                        onChange={(e) => {
                                            setFormData({ ...formData, pituusL: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="pituusA"
                                        placeholder="Lisää pituus A ..."
                                        value={formData.pituusA}
                                        onChange={(e) => {
                                            setFormData({ ...formData, pituusA: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="pituusB"
                                        placeholder="Lisää pituus B..."
                                        value={formData.pituusB}
                                        onChange={(e) => {
                                            setFormData({ ...formData, pituusB: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="kuorma"
                                        placeholder="Lisää tasainen kuorma..."
                                        value={formData.kuormaTV}
                                        onChange={(e) => {
                                            setFormData({ ...formData, kuormaTV: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="kuorma"
                                        placeholder="Lisää Pistekuorma..."
                                        value={formData.kuormaPK}
                                        onChange={(e) => {
                                            setFormData({ ...formData, kuormaPK: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="kuorma"
                                        placeholder="Lisää Pistemomentti..."
                                        value={formData.kuormaPM}
                                        onChange={(e) => {
                                            setFormData({ ...formData, kuormaPM: e.target.value });
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="tyyppi"
                                        required="required"
                                        placeholder="Lisää kuormatyyppi..."
                                        value={formData.tyyppi}
                                        onChange={(e) => {
                                            setFormData({ ...formData, tyyppi: e.target.value });
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="maxM"
                                        required="required"
                                        placeholder="Lisää maksimi momentti..."
                                        value={formData.maxM}
                                        onChange={(e) => {
                                            setFormData({ ...formData, maxM: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="maxV"
                                        required="required"
                                        placeholder="Lisää maksimi leikkausvoima..."
                                        value={formData.maxV}
                                        onChange={(e) => {
                                            setFormData({ ...formData, maxV: e.target.value });
                                        }}
                                    />

                                    <button onClick={() => onAdd()}>Lisää Tulos</button>
                                </div>
                            </div>
                            :
                            <div className="row" >
                                <div className="col-md-6" >
                                    <h2>Muokkaa Tulos Taulukkoon</h2>
                                    <input
                                        type="text"
                                        // value={id}
                                        // onChange={(e) => setId(e.target.value)}
                                        value={tulos.id}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, id: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        // value={name}
                                        // onChange={(e) => setName(e.target.value)}
                                        placeholder="Lisää nimi ..."
                                        value={tulos.nimi}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, nimi: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        // value={length}
                                        // onChange={(e) => setLength(e.target.value)}
                                        placeholder="Lisää pituus L ..."
                                        value={tulos.pituusL}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, pituusL: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="pituusA"
                                        placeholder="Lisää pituus A ..."
                                        // value={lengthA}
                                        // onChange={(e) => setLengthA(e.target.value)}
                                        value={tulos.pituusA}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, pituusA: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="pituusB"

                                        placeholder="Lisää pituus B..."
                                        // value={lengthB}
                                        // onChange={(e) => setLengthB(e.target.value)}
                                        value={tulos.pituusB}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, pituusB: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="kuorma"
                                        placeholder="Lisää tasainen kuorma..."
                                        // value={load}
                                        // onChange={(e) => setLoad(e.target.value)}
                                        value={tulos.kuormaTV}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, kuormaTV: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="kuorma"

                                        placeholder="Lisää Pistekuorma..."
                                        // value={pointForce}
                                        // onChange={(e) => setPointForce(e.target.value)}
                                        value={tulos.kuormaPK}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, kuormaPK: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="kuorma"

                                        placeholder="Lisää Pistemomentti..."
                                        // value={pointMoment}
                                        // onChange={(e) => setPointMoment(e.target.value)}
                                        value={tulos.kuormaPM}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, kuormaPM: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        // value={forceType}
                                        // onChange={(e) => setForceType(e.target.value)}
                                        placeholder="Lisää tyyppi..."
                                        value={tulos.tyyppi}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, tyyppi: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        // value={maxMoment}
                                        // onChange={(e) => setMaxMoment(e.target.value)}
                                        placeholder="Lisää maxM..."
                                        value={tulos.maxM}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, maxM: e.target.value });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        // value={maxShearForce}
                                        // onChange={(e) => setMaxShearForce(e.target.value)}
                                        placeholder="Lisää maxV..."
                                        value={tulos.maxV}
                                        onChange={(e) => {
                                            setTulos({ ...tulos, maxV: e.target.value });
                                        }}
                                    />
                                    <button onClick={() => onEdit(tulos.id)}>Muokkaa Tulos</button>
                                </div>
                            </div>
                    }
                </Grid>
            </Grid>
        </div >

    )
}

export default ArrayBarResults
