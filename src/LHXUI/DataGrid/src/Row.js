import {DataCell, HeaderCell} from "./Cell";
import {Button, ClickAwayListener} from "@mui/material";
import {useState} from "react";

function HeaderRow({matrix, utility, disableProperty}) {
    return (
        <div className='LHXUI-DataGrid-Row LHXUI-DataGrid-TH'>
            {
                matrix.header.map((value, index) => (
                    <HeaderCell
                        key={`th-${index}`}
                        cell={value}
                        columnId={index}
                        utility={utility}
                        disableProperty={disableProperty}
                    />
                ))
            }
        </div>
    )
}

function DataRow({matrix, rowId, utility}) {

    const [rowActive, _rowActive] = useState(false)

    return (
        <ClickAwayListener onClickAway={() => _rowActive(false)}>
            <div
                className='LHXUI-DataGrid-Row'
                onDoubleClick={() => _rowActive(true)}
                style={{background: rowActive ? '#eeeeeeaa' : '#eeeeee00'}}
            >
                {
                    matrix.data[rowId].map((value, index) => (
                        <DataCell
                            key={`${rowId}-${index}`}
                            value={value}
                            column={matrix.header[index]}
                            cellId={[rowId, index]}
                            utility={utility}
                        />
                    ))
                }
            </div>
        </ClickAwayListener>
    )
}

function FooterRow({utility}) {
    return (
        <div className='LHXUI-DataGrid-Cell LHXUI-DataGrid-TF'>
            <div className='LHXUI-DataGrid-Cell-Wrapper'>
                <Button onClick={utility.addRow} fullWidth>New Row</Button>
            </div>
        </div>
    )
}

export {
    HeaderRow,
    DataRow,
    FooterRow
}
