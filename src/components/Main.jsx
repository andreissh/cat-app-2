import React, { useState } from "react";
import styles from "../styles/Main.module.scss";
import Package from "./Package";

const Main = () => {
    const [smallPack, setSmallPack] = useState({
        details: "с фуа-гра",
        portions: 10,
        weight: 0.5,
        bonus: 1,
        total: 7,
        current: 7,
    });

    const [mediumPack, setMediumPack] = useState({
        details: "с рыбой",
        portions: 40,
        weight: 2,
        bonus: 2,
        total: 5,
        current: 5,
    });

    const [bigPack, setBigPack] = useState({
        details: "с курой",
        portions: 100,
        weight: 5,
        bonus: 5,
        total: 4,
        current: 4,
    });

    return (
        <div className={styles.outerContent}>
            <div className={styles.innerContent}>
                <h1 className={styles.title}>Ты сегодня покормил кота?</h1>
                <div className={styles.packagesContainer}>
                    <Package pack={smallPack} setPack={setSmallPack} />
                    <Package pack={mediumPack} setPack={setMediumPack} />
                    <Package pack={bigPack} setPack={setBigPack} />
                </div>
            </div>
        </div>
    );
};

export default Main;
