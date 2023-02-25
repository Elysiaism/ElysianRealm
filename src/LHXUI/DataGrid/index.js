import {Box} from '@mui/material'
import {Component, createRef} from 'react'
import './main.css'
import DEFAULT from "./src/DEFAULT";
import Toolbar from "./src/Toolbar"
import {DataRow, HeaderRow} from "./src/Row";
import ScrollableContainer from "../ScrollableContainer";

export default class DataGrid extends Component {

    constructor(props, context) {
        super(props, context);
        this.title = this.props.title ?? 'LHXUI DataGrid'
        this.onChange = this.props.onChange ?? (() => undefined)
        this.disableToolbar = this.props.disableToolbar


        this.state = {
            matrix: this.props.matrix ?? DEFAULT.MATRIX, staticFooter: false, _: false
        }
        this.ref = createRef()
        this.scRef = createRef()


        this._matrix = (setState, callback = this.forceReRender) => {
            this.setState({matrix: setState(this.state.matrix)}, callback)
        }
        this.forceReRender = () => {
            this.setState((prevState) => ({_: !prevState._}))
            this.onChange(this.state.matrix)
        }
        this.generateSx = () => {
            let sx = {}
            for (let i = 0; i < this.state.matrix.header.length; i++) {
                let width = this.state.matrix.header[i].width
                sx[`& .LHXUI-DataGrid-Row>div:nth-of-type(${i + 1})`] = {
                    width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px`
                }
            }
            return sx
        }
        this.setCellValue = (cellId, value) => {
            this._matrix((x) => {
                x.data[cellId[0]][cellId[1]] = value
                return x
            })
        }
        this.setSelectorChoice = (command, columnId, name, newName) => {
            switch (command) {
                case "Delete":
                    this._matrix((x) => {
                        for (let i = 0; i < x.header[columnId].choice.length; i++) {
                            if (x.header[columnId].choice[i] === name) x.header[columnId].choice.splice(i, 1)
                        }
                        return x
                    })
                    break
                case "Add":
                    this._matrix((x) => {
                        x.header[columnId].choice.push(name)
                        return x
                    })
                    break
                case "Modify":
                    this._matrix((x) => {
                        for (let i = 0; i < x.header[columnId].choice.length; i++) {
                            if (x.header[columnId].choice[i] === name) x.header[columnId].choice[i] = newName
                        }
                        return x
                    })
                    break
                default:
                    break
            }
        }
        this.setColumnProperty = (columnId, propertyId, propertyValue) => {
            this._matrix((x) => {
                x.header[columnId][propertyId] = propertyValue
                if (propertyId === 'type' && propertyValue === 'Select' && x.header[columnId].choice === undefined) {
                    let a = []
                    for (let i = 0; i < x.data.length; i++) {
                        let v = x.data[i][columnId]
                        if (v !== '' && (!a.includes(v))) a.push(v)
                    }
                    x.header[columnId].choice = a
                }
                return x
            })
        }
        this.addColumn = (columnId, anchor) => {
            if (anchor === 'right') columnId++
            this._matrix((x) => {
                x.header.splice(columnId, 0, {name: 'Column', type: 'Text', width: 160})
                for (let i = 0; i < x.data.length; i++) {
                    x.data[i].splice(columnId, 0, '')
                }
                return x
            })
        }
        this.addRow = () => {
            this._matrix((x) => {
                x.data.push(Array(x.header.length).fill(''))
                return x
            })
        }
        this.scrollToLeft = () => this.scRef.current.scrollToLeft()
        this.scrollToRight = () => this.scRef.current.scrollToRight()
        this.utility = {
            setCellValue: this.setCellValue,
            setSelectorChoice: this.setSelectorChoice,
            setColumnProperty: this.setColumnProperty,
            insertColumn: this.addColumn,
            addRow: this.addRow,
            scrollToLeft: this.scrollToLeft,
            scrollToRight: this.scrollToRight,
        }
    }

    render() {
        return (<div className={'LHXUI-DataGrid-Container'}>
                <Toolbar
                    disabled={this.disableToolbar}
                    title={this.title}
                    utility={this.utility}
                />
                <ScrollableContainer
                    color={'#a6d8ce'}
                    ref={this.scRef}
                    scrollX
                    scrollY
                >
                    <Box
                        className={'LHXUI-DataGrid'}
                        ref={this.ref}
                        sx={this.generateSx()}
                    >
                        <HeaderRow
                            matrix={this.state.matrix}
                            utility={this.utility}
                            disableProperty={this.props.disableProperty}
                        />
                        {this.state.matrix.data.map((value, index) => (<DataRow
                            key={`tr-${index}`}
                            matrix={this.state.matrix}
                            rowId={index}
                            utility={this.utility}
                        />))}
                    </Box>
                </ScrollableContainer>
            </div>

        )
    }
}


