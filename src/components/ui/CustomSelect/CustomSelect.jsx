import React, { useEffect, useRef, useState } from 'react';
import cls from "../CustomSelect/CustomSelect.module.css"

const CustomSelect = ({ children, name, id, onChange, value, ...props }) => {
    const parentRef = useRef(null);
    const optionsMenuRef = useRef(null);
    const selectRef = useRef(null);
    const [optionElems, setOptionElems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectionName, setSelectionName] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [isActive, setIsActive] = useState(false)


    function displayOptions(ev) {
        ev.stopPropagation();
        setIsActive(true);

        document.addEventListener("click", hideOptions);
    }

    function hideOptions(ev) {
        if (parentRef.current && !parentRef.current.contains(ev.target)) {
            setIsActive(false);
            document.removeEventListener("click", hideOptions);
        }
    }

    function handleChanges(ev) {
        ev.stopPropagation();
    }

    function selectValue(ev) {
        if (selectRef.current) {
            let optionId = ev.target.getAttribute("data-option-id")
            Array.from(selectRef.current.children).forEach(child => {
                child?.setAttribute("selected", false)
            });
            let selectedOption = document.getElementById(optionId);
            selectedOption.selected = true;
            // setSelectedValue(selectedOption.value)
            // selectRef.current.value = selectedOption.value
            setIsActive(false)
            setSelectionName(selectedOption.innerText)
            onChange(selectRef.current.value)
            console.log(selectRef.current.value);
        }

    }

    useEffect(() => {
        let options = children.map(({ props: _props }, index) => {
            return (<button onClick={selectValue} data-option-id={_props.id} key={index} name={_props.children}> {_props.children} </button>)
        })
        setOptionElems(options)
        setIsLoading(false)
        // setSelectedValue(children[0].props.value)
        // if (!selectionName) setSelectionName(children[0].props.children);
        // selectRef.current.value = children[0].props.value
    }, [children]);

    useEffect(() => {
        // setSelectedValue(value)
        if (value) {
            let name = children.find(el => el.props.value === value).props.children
            setSelectionName(name)
            console.log(name);
        }
        else {
            if (!selectionName) setSelectionName(children[0].props.children);
        }
    }, [value])


    useEffect(() => {
        if (optionsMenuRef.current) {
            optionsMenuRef.current.style.display = isActive ? "flex" : "none"
        }
    }, [isActive])


    if (isLoading) return <div>Loading...</div>

    return (
        <div ref={parentRef} role='button' className={cls.customSelect} {...props} onClick={displayOptions}>
            {selectionName}
            <div ref={optionsMenuRef} className={cls.options} onClick={handleChanges}>
                {optionElems}
            </div>
            <select ref={selectRef} value={value} onChange={onChange} {...{ name }} {...{ id }}>
                {children}
            </select>
        </div>
    )
}

export default CustomSelect