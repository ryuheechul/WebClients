import { classnames } from '../../helpers';

export interface Props {
    className?: string;
}

const ContextSeparator = ({ className = '', ...rest }: Props) => {
    return <hr className={classnames(['m-0', className])} {...rest} />;
};

export default ContextSeparator;
