import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../superComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../superComponents/c2-SuperButton/SuperButton";
import SuperCheckbox from "../superComponents/c3-SuperCheckbox/SuperCheckbox";
import s from "./TestPage.module.css"

export const TestPage = () => {

    const [text, setText] = useState<string>("");
    const error = text ? "" : "error";
    const showAlert = () => {
        if (error) {
            alert("введите текст...");
        } else {
            alert(text); // если нет ошибки показать текст
        }
    }

    const [checked, setChecked] = useState<boolean>(false);
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return(
        <div>
            <hr/>
            <div className={s.column}>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    //className={s.blue} // проверьте, рабоет ли смешивание классов
                />
                <SuperButton
                    red // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}
                >delete</SuperButton>
                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >some text</SuperCheckbox>
                <SuperCheckbox
                    checked={checked}
                    onChange={testOnChange}
                />
            </div>
        </div>
    )
}