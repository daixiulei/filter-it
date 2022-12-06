import React, { useRef, useImperativeHandle, forwardRef, Ref, useState } from "react"
import "./index.less"
import BgPicker from "../BgPicker"

interface IProps {}

export interface RefHandle {
    setStyle: (style: string) => void
}

export interface PickerItem {
    type: "color" | "image"
    background: string
}

function Block(props: IProps, ref: Ref<RefHandle>) {
    const pickerData: PickerItem[] = [
        {
            type: "color",
            background: "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
        },
        {
            type: "color",
            background: "linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)"
        },
        {
            type: "color",
            background: "linear-gradient( 135deg, #F6CEEC 10%, #D939CD 100%)"
        },
        {
            type: "color",
            background: "linear-gradient( 135deg, #FFF720 10%, #3CD500 100%)"
        },
        {
            type: "image",
            background: "https://images.unsplash.com/photo-1670189577367-2c6ef31a4b8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        },
        {
            type: "image",
            background: "https://images.unsplash.com/photo-1670148570351-601dd7bebcd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        },
        {
            type: "image",
            background: "https://images.unsplash.com/photo-1670031652349-1b65e8af026c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        }
    ]
    const [show, setShow] = useState<PickerItem>(pickerData[0])
    const blockRef = useRef<HTMLDivElement>(null)

    useImperativeHandle<RefHandle, RefHandle>(ref, () => {
        return {
            setStyle(style) {
                if (blockRef.current) {
                    blockRef.current!.style["--webkit-filter" as any] = style
                    blockRef.current!.style.filter = style
                }
            }
        }
    })

    function onPickerChange(item: PickerItem) {
        setShow(item)
        // blockRef.current!.style.backgroundImage = item.type === "color" ? item.background : `url(${item.background})`
    }

    return (
        <div className="block">
            <div className="block-show" ref={blockRef} style={{ backgroundImage: show.type === "color" ? show.background : `url(${show.background})` }}></div>
            <BgPicker pickerList={pickerData} onChange={onPickerChange} />
        </div>
    )
}

export default forwardRef(Block)
