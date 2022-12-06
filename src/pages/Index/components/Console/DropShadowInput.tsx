/*
 * @Author: xiulei.dai
 * @Date: 2022-12-06 16:17:54
 * @LastEditors: xiulei.dai
 * @LastEditTime: 2022-12-06 17:48:42
 * @Description:
 */
import React, { useMemo, useState, useRef, useEffect } from "react"
import { Input, Popover } from "antd"
import { SketchPicker } from "react-color"
import "./index.less"

interface IProps {
    list: any
    onChange: (changedVal: string) => void
}

function DropShadowInput(props: IProps) {
    const { list, onChange } = props
    const [color, setColor] = useState<string | number>("#fff")
    const [inputValue, setInputValue] = useState<Array<string>>(["0px", "0px", "0px"])
    const ref = useRef<HTMLDivElement>(null)

    function onChangeComplete(color: any) {
        setColor(color.hex)

        ref.current!.style.backgroundColor = color.hex
    }

    useEffect(() => {
        onChange(inputValue.join(" ") + " " + color)
    }, [color, inputValue])

    function onInputChange(val: string, index: number) {
        let newVal = [...inputValue]
        newVal[index] = val
        console.log(newVal)
        setInputValue(newVal)
    }

    const renderInput = useMemo(() => {
        const [offsetX, offsetY, blurRadius, shadowRadius] = list
        return (
            <>
                {offsetX && (
                    <Input
                        style={{ width: 100 }}
                        placeholder={offsetX.placeholder}
                        addonAfter={offsetX.unit}
                        defaultValue={offsetX.defaultValue}
                        onChange={e => onInputChange(e.target.value + offsetX.unit, 0)}
                    />
                )}
                {offsetY && (
                    <Input
                        style={{ width: 100 }}
                        placeholder={offsetY.placeholder}
                        addonAfter={offsetY.unit}
                        defaultValue={offsetY.defaultValue}
                        onChange={e => onInputChange(e.target.value + offsetY.unit, 1)}
                    />
                )}
                {blurRadius && (
                    <Input
                        style={{ width: 100 }}
                        placeholder={blurRadius.placeholder}
                        addonAfter={blurRadius.unit}
                        defaultValue={blurRadius.defaultValue}
                        onChange={e => onInputChange(e.target.value + blurRadius.unit, 2)}
                    />
                )}
                <Popover content={<SketchPicker onChangeComplete={onChangeComplete} color={color} />}>
                    <div className="drop-shadow-color">
                        <div className="drop-shadow-color__child" ref={ref}></div>
                    </div>
                </Popover>
            </>
        )
    }, [color, list, inputValue])
    return <div className="drop-shadow-input">{renderInput}</div>
}

export default DropShadowInput
