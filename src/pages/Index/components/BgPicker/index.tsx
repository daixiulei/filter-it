import React from "react"
import "./index.less"

import { PickerItem } from "../Block"

interface IProps {
    pickerList: PickerItem[]
    onChange: (item: PickerItem) => void
}

function BgPicker(props: IProps) {
    const { pickerList, onChange } = props

    function onClickItem(item: PickerItem) {
        onChange(item)
    }

    return (
        <div className="bg-picker">
            {pickerList.map(item => {
                return (
                    <div
                        className="bg-picker-item"
                        style={{
                            backgroundImage: item.type === "color" ? item.background : `url(${item.background})`,
                            borderImage: item.type === "color" ? item.background : `url(${item.background})`
                        }}
                        onClick={() => onClickItem(item)}
                    ></div>
                )
            })}
        </div>
    )
}

export default BgPicker
