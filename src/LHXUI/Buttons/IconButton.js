import {IconButton as Button, Tooltip} from "@mui/material";

function IconButton({
                        active,
                        children,
                        className,
                        component,
                        disabled,
                        onClick,
                        rotateOnActive,
                        size = 30,
                        tooltip,
                        tooltipPosition = 'top'
                    }) {

    const render = () => (<Button
        className={className}
        color={active ? 'secondary' : 'primary'}
        component={component}
        disabled={disabled}
        onClick={onClick}
        sx={{
            height: `${size}px`,
            margin: '0 1px',
            minHeight: `${size}px`,
            minWidth: `${size}px`,
            padding: 0,
            transform: `rotate(${rotateOnActive ? active ? -90 : 0 : 0}deg)`,
            transition: 'all .3s ease',
            width: `${size}px`,
            '& svg': {
                height: `${size * 0.66}px`,
                minHeight: `${size * 0.66}px`,
                minWidth: `${size * 0.66}px`,
                width: `${size * 0.66}px`,
            }
        }}
    >
        {children}
    </Button>)

    return (tooltip ? <Tooltip placement={tooltipPosition} title={tooltip}>
        {render()}
    </Tooltip> : render())
}

export default IconButton