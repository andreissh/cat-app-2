import React, { useRef } from "react";
import styles from "../styles/Package.module.scss";
import cat from "../assets/images/cat.png";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const Package = ({ addInfo, quantity, bonus, weight, weightTotal, setWeightTotal }) => {
    const pack = useRef();
    const topText = useRef();
    const [selected, setSelected] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleClick = useCallback(() => {
        const target = pack.current;

        weightTotal >= weight ? setWeightTotal(weightTotal - weight) : setDisabled(true);
        target.classList.add(`${styles.packageSelected}`);
        setSelected(true);
    }, [setWeightTotal, weight, weightTotal]);

    const handleClickSelected = useCallback(() => {
        const target = pack.current;

        setWeightTotal(25.5);
        target.classList.remove(`${styles.packageSelected}`);
        setSelected(false);
    }, [setWeightTotal]);

    useEffect(() => {
        const target = pack.current;

        target.addEventListener("click", handleClick);
    });

    useEffect(() => {
        const target = pack.current;
        const text = topText.current;

        const onMouseLeaveSelected = () => {
            text.innerText = "Сказочное заморское яство";
            text.style.color = "#666";
        };

        if (selected && !disabled) {
            target.addEventListener("mouseleave", onMouseLeaveSelected);
        }

        return () => {
            target.removeEventListener("mouseleave", onMouseLeaveSelected);
        };
    }, [disabled, selected]);

    useEffect(() => {
        const target = pack.current;
        const text = topText.current;

        if (disabled) {
            target.classList.add(`${styles.packageDisabled}`);
            text.innerText = "Сказочное заморское яство";
            text.style.color = "#666";
        }
    }, [disabled]);

    return (
        <div className={styles.packageWrapper}>
            <div className={styles.package} ref={pack} onClick={handleClick}>
                <p className={styles.packageUpperText} ref={topText}>
                    Сказочное заморское яство
                </p>
                <p className={styles.packageName}>Нямушка</p>
                <p className={styles.packageNameAddition}>{addInfo}</p>
                <p className={styles.packageInfo}>
                    {quantity} порций
                    <br />
                    {!bonus ? "мышь" : bonus === 2 ? `${bonus} мыши` : `${bonus} мышей`} в подарок
                </p>
                <img className={styles.packageImg} src={cat} alt="cat"></img>
                <div className={styles.packageWeight}>
                    <span className={styles.packageWeightNum}>
                        {Number.isInteger(weight) ? weight : `${weight}`.split(".").join(",")}
                    </span>
                    <span className={styles.packageWeightUnit}>кг</span>
                </div>
            </div>
            {disabled ? (
                <span className={styles.bottomText} style={{ color: "#ffff66" }}>
                    Печалька, {addInfo} закончился.
                </span>
            ) : !selected ? (
                <span className={styles.bottomText}>
                    Чего сидишь? Порадуй котэ,{" "}
                    <span className={styles.bottomTextBuy} onClick={handleClick}>
                        купи
                    </span>
                    <span className={styles.bottomTextDot}>.</span>
                </span>
            ) : addInfo === "с фуа-гра" ? (
                <span className={styles.bottomText}>Печень утки разварная с артишоками.</span>
            ) : addInfo === "с рыбой" ? (
                <span className={styles.bottomText}>Головы щучьи с чесноком да свежайшая сёмгушка.</span>
            ) : addInfo === "с курой" ? (
                <span className={styles.bottomText}>Филе из цыплят с трюфелями в бульоне.</span>
            ) : (
                <span></span>
            )}
            {selected && (
                <>
                    <span className={styles.cancel} onClick={handleClick}>
                        Купить еще?
                    </span>
                    <span className={styles.cancel} onClick={handleClickSelected}>
                        Отменить выбор?
                    </span>
                </>
            )}
        </div>
    );
};

export default Package;
