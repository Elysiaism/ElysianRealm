import React, {Component, createRef} from 'react'
import {Scrollbars} from 'react-custom-scrollbars-2'
import {enhance} from "../_utility/color";

class ScrollableContainer extends Component {

    constructor(props) {
        super(props)
        this.className = this.props.className ?? ''
        this.color = this.props.color ?? '#aaaaaa'
        this.scrollX = this.props.scrollX
        this.scrollY = this.props.scrollY
        this.ref = createRef()
        this.renderThumb = ({style, ...props}) => <div
            style={{...style, background: this.color, borderRadius: "inherit"}} {...props}/>
        this.scrollToLeft = () => this.ref.current.view.scroll({
            left: this.ref.current.getScrollLeft() - 200, behavior: 'smooth'
        })
        this.scrollToRight = () => this.ref.current.view.scroll({
            left: this.ref.current.getScrollLeft() + 200, behavior: 'smooth'
        })
    }

    render() {
        return (<Scrollbars
            className={`LHXUI-ScrollableContrainer ${this.className}`.trim()}
            renderThumbHorizontal={this.renderThumb}
            renderThumbVertical={this.renderThumb}
            ref={this.ref}
        >
            <style>
                {`
                .LHXUI-ScrollableContrainer > div:nth-child(2) {
                    background: ${enhance('lighter', this.color)};
                    ${this.scrollX ? '' : 'display: none;'}
                }
                .LHXUI-ScrollableContrainer > div:nth-child(3) {
                    background: ${enhance('lighter', this.color)};
                    ${this.scrollY ? '' : 'display: none;'}
                }
                `}
            </style>
            {this.props.children}
        </Scrollbars>)
    }
}

export default ScrollableContainer
