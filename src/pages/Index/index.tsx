import React, { useState, useRef } from "react"
import "./index.less"
import Block, { RefHandle } from "./components/Block"
import Console from "./components/Console"

function Index() {
    const ref = useRef<RefHandle>(null)

    function onConsoleChange(filterValue: string) {
        ref.current!.setStyle(filterValue)
    }
    return (
        <div className="index">
            <div className="index-child">
                <div className="index-header">Filter It</div>
                <div className="index-console">
                    <Console onChange={onConsoleChange} />
                </div>
                <div className="index-block">
                    <Block ref={ref} />
                </div>
            </div>
        </div>
    )
}

export default Index
