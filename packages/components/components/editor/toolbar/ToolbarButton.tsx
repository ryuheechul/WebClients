import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';



import { classnames } from '../../../helpers';
import Tooltip from '../../tooltip/Tooltip';


const ToolbarButton = ({
    children,
    disabled = false,
    className = '',
    title,
    onClick,
    ...rest
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
    <Tooltip title={title}>
        <button
            type="button"
            disabled={disabled}
            className={classnames(['editor-toolbar-button interactive-pseudo-inset m-0 flex', className])}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    </Tooltip>
);

export default ToolbarButton;