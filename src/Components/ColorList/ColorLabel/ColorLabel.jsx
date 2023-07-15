import s from "./ColorLabel.module.scss";

export const ColorLabel = ({
        color,
        check,
        selectedColor,
        handleColorChange,
    }) => {
    return (
        <label className={s.color} style={{"--data-color": color?.code}}>
            <input   
                className={s.input}
                type='radio'
                name='color'
                value={color?.title}
                checked={selectedColor ? selectedColor === color?.title : check}
                onChange={handleColorChange}
            />
            <span className={s.colorCheck}></span>
        </label>
    )
}