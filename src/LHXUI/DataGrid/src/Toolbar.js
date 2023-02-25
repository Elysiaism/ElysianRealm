import IconButton from "../../Buttons/IconButton";

function Toolbar({title, utility, disabled}) {
    return (disabled ? null : <div className={'LHXUI-DataGrid-Toolbar'}>
        <div className={'LHXUI-DataGrid-Title'}>
            {title}
        </div>
        <div className={'LHXUI-DataGrid-Buttons'}>
            <IconButton onClick={utility.scrollToLeft}/>
            <IconButton onClick={utility.scrollToRight}/>
            <IconButton onClick={utility.addRow}/>
        </div>
    </div>)
}

export default Toolbar