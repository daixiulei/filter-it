import React, { useState, useEffect, useMemo } from "react"
import "./index.less"
import { Input, Slider, Radio, RadioChangeEvent } from "antd"

import DropShadowInput from "./DropShadowInput"

import filterOptions from "../../../../constances/filterValues"
import type { FilterValue } from "../../../../constances/filterValues"

interface IProps {
    onChange: (values: any) => void
}

function Console(props: IProps) {
    const { onChange } = props
    const [valueList, setValueList] = useState<FilterValue[]>([])
    const [filter, setFilter] = useState("drop-shadow")
    const [filterValue, setFilterValue] = useState<string | number>("")

    function onFilterChange(e: RadioChangeEvent) {
        setFilter(e.target.value)
        let selected = filterOptions.find(item => item.property === e.target.value)
        if (selected?.value) {
            setValueList(selected?.value!)
            if (selected.value.length === 1) {
                setFilterValue(selected.value[0].defaultValue!)
            }
        } else {
            setValueList([])
        }
    }

    useEffect(() => {
        onConsoleChange()
    }, [filter, filterValue])

    useEffect(() => {
        if (filter) {
            let selected = filterOptions.find(item => item.property === filter)
            setValueList(selected!.value! || [])
        }
    }, [])

    function onConsoleChange() {
        let selected = filterOptions.find(item => item.property === filter)
        let filterValueWithUnit = ""
        if (selected?.value?.length === 1) {
            filterValueWithUnit = filterValue + (selected.value[0]?.unit || "")
        } else {
            filterValueWithUnit = filterValue as string
        }
        onChange(`${selected!.property}${filterValueWithUnit ? `(${filterValueWithUnit})` : filterValueWithUnit}`)
    }

    function onSliderChange(val: number) {
        setFilterValue(val)
    }

    function onDropShadowChange(changedVal: string) {
        setFilterValue(changedVal)
    }

    const renderController = useMemo(() => {
        if (filter === "none" || filter === "initial" || filter === "inherit") {
            return null
        } else if (filter === "drop-shadow") {
            return <DropShadowInput list={valueList} onChange={onDropShadowChange} />
        } else if (filter === "url") {
            return <Input />
        } else {
            let value = valueList[0]
            const marks: { [propsName: number | string]: string } = {}
            marks[value.min!] = value.min! + value.unit!
            marks[value.max!] = value.max! + value.unit!
            marks[value.defaultValue!] = value.defaultValue! + value.unit!
            return (
                <div style={{ width: 500 }}>
                    <Slider max={value.max} min={value.min} marks={marks} value={filterValue as number} onChange={onSliderChange} />
                </div>
            )
        }
    }, [valueList, filter, filterValue])

    return (
        <div className="console">
            <div className="console-radio">
                <Radio.Group buttonStyle="solid" onChange={onFilterChange} value={filter}>
                    {filterOptions.map(item => (
                        <Radio.Button value={item.property}>{item.property}</Radio.Button>
                    ))}
                </Radio.Group>
            </div>
            <div className="console-input">{renderController}</div>
        </div>
    )
}

export default Console
