import React, { useRef } from "react";
import styles from "../styles/Package.module.scss";
import cat from "../assets/images/cat.png";
import { useState } from "react";
import { useEffect } from "react";

const Package = ({ pack, setPack }) => {
    const packTarget = useRef();
    const topText = useRef();
    const [selected, setSelected] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const choosePack = () => {
        const target = packTarget.current;

        pack.current !== 0 && setPack({ ...pack, current: (pack.current -= 1) });
        pack.current === 0 && setDisabled(true);
        target.classList.add(`${styles.packageSelected}`);
        setSelected(true);
    };

    const cancelChoice = () => {
        const target = packTarget.current;

        setPack({ ...pack, current: pack.total });
        if (disabled) {
            setDisabled(false);
            target.classList.remove(`${styles.packageDisabled}`);
        }
        target.classList.remove(`${styles.packageSelected}`);
        setSelected(false);
    };

    useEffect(() => {
        const target = packTarget.current;

        if (disabled) {
            target.classList.add(`${styles.packageDisabled}`);
        }
    }, [disabled]);

    return (
        <div className={styles.packageWrapper}>
            <div className={styles.package} ref={packTarget} onClick={choosePack}>
                <p className={styles.packageUpperText} ref={topText}>
                    Сказочное заморское яство
                </p>
                <p className={styles.packageName}>Нямушка</p>
                <p className={styles.packageNameAddition}>{pack.details}</p>
                <p className={styles.packageInfo}>
                    {pack.portions} порций
                    <br />
                    {pack.bonus % 100 !== 11 && pack.bonus % 10 === 1
                        ? `${pack.bonus} мышь`
                        : !(pack.bonus % 100 >= 12 && pack.bonus % 100 <= 14) &&
                          pack.bonus % 10 >= 2 &&
                          pack.bonus % 10 <= 4
                        ? `${pack.bonus} мыши`
                        : `${pack.bonus} мышей`}{" "}
                    в подарок
                </p>
                <img className={styles.packageImg} src={cat} alt="cat"></img>
                <div className={styles.packageWeight}>
                    <span className={styles.packageWeightNum}>
                        {Number.isInteger(pack.weight) ? pack.weight : `${pack.weight}`.split(".").join(",")}
                    </span>
                    <span className={styles.packageWeightUnit}>кг</span>
                </div>
            </div>
            {disabled ? (
                <span className={`${styles.bottomText} ${styles.bottomTextDisabled}`}>
                    Печалька, {pack.details} закончился.
                </span>
            ) : !selected ? (
                <span className={styles.bottomText}>
                    Чего сидишь? Порадуй котэ,{" "}
                    <span className={styles.bottomTextBuy} onClick={choosePack}>
                        купи
                    </span>
                    <span className={styles.bottomTextDot}>.</span>
                </span>
            ) : pack.details === "с фуа-гра" ? (
                <span className={styles.bottomText}>Печень утки разварная с артишоками.</span>
            ) : pack.details === "с рыбой" ? (
                <span className={styles.bottomText}>Головы щучьи с чесноком да свежайшая сёмгушка.</span>
            ) : pack.details === "с курой" ? (
                <span className={styles.bottomText}>Филе из цыплят с трюфелями в бульоне.</span>
            ) : (
                <span></span>
            )}
            {selected && (
                <>
                    <span className={styles.cancel} onClick={choosePack}>
                        Купить еще?
                    </span>
                    <span className={styles.cancel} onClick={cancelChoice}>
                        Отменить выбор?
                    </span>
                </>
            )}
        </div>
    );
};

export default Package;
