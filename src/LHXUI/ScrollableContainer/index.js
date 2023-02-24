import React, {useEffect, useRef, useState} from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import {enhance} from '../_utility/color'

function ScrollableContainer({className = '', color = '#aaaaaa', children}) {

    const scRef = useRef()
    const Sx = () => {
        try {
            return (
                <style>
                    {scRef.current.parentNode.parentNode.children[1].children[0].style.width === '0px' ? '' : `
                        .LHXUI-ScrollableContrainer > div:nth-child(2) {
                            background: ${enhance('lighter', color)}
                        }
                        .LHXUI-ScrollableContrainer > div:nth-child(2) > div {
                            background: ${color}
                        }
                    `}
                    {scRef.current.parentNode.parentNode.children[2].children[0].style.height === '0px' ? '' : `
                        .LHXUI-ScrollableContrainer > div:nth-child(3) {
                            background: ${enhance('lighter', color)}
                        }
                        .LHXUI-ScrollableContrainer > div:nth-child(3) > div {
                            background: ${color}
                        }
                    `}
                </style>
            )
        } catch {
            return null
        }
    }
    const [sx, _sx] = useState(Sx())
    useEffect(() => {
        _sx(Sx())
    }, [scRef.current, color])

    return (
        <Scrollbars
            className={`LHXUI-ScrollableContrainer ${className}`.trim()}
            autoHide
        >
            <div
                className={'LHXUI-ScrollableContrainer-Ref'}
                ref={scRef}
                style={{display: 'none'}}
            />
            {sx}
            {children}
        </Scrollbars>
    )
}

export default ScrollableContainer
