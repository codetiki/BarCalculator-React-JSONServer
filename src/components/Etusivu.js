import React from 'react'
import palkki from '../images/SimpleBeam.png';

const Etusivu = () => {

    return (
        <div style={{ margin: 50 }}>
            <h1>Ohjelman kuvaus</h1>
            <p>1- aukkoisen palkin taivutusmomentin ja leikkausvoiman laskenta</p>
            <p>Tulokset näytetään graafisena ja maksimitulokset voidaan tallentaa </p>
            <p>halutessaan json-serverille .json-tiedostoon</p>
            <p>.json-tiedosto voidaan tallentaa ja lähettää edelleen.</p>
            {/*
                <img src={palkki} style={{ width: 800 }} />
            */}

        </div>

    )
}

export default Etusivu