import React, { useState } from "react";
import styles from "../styles/Main.module.scss";
import Package from "./Package";

const Main = () => {
    const [weightTotal, setWeightTotal] = useState(25.5);

    return (
        <div className={styles.outerContent}>
            <div className={styles.innerContent}>
                <h1 className={styles.title}>Ты сегодня покормил кота?</h1>
                <div className={styles.packagesContainer}>
                    <Package
                        addInfo="с фуа-гра"
                        quantity={10}
                        weight={0.5}
                        weightTotal={weightTotal}
                        setWeightTotal={setWeightTotal}
                    />
                    <Package
                        addInfo="с рыбой"
                        quantity={40}
                        bonus={2}
                        weight={2}
                        weightTotal={weightTotal}
                        setWeightTotal={setWeightTotal}
                    />
                    <Package
                        addInfo="с курой"
                        quantity={100}
                        bonus={5}
                        weight={5}
                        weightTotal={weightTotal}
                        setWeightTotal={setWeightTotal}
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;
