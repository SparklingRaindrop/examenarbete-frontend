import { Icon } from '../Icon';
import { Path } from '../Icon/path';
import { ButtonProps } from './Button';
import { IconButtonWrapper } from './styled';

type Props = {
    name: string;
} & ButtonProps;

export default function IconButton(props: Props) {
    const { name, disabled, variant, onClick, onMouseUp, onMouseDown } = props;

    return (
        <IconButtonWrapper
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            disabled={disabled}
            variant={variant}
            {...props}>
            <Icon name={name as Path} />
        </IconButtonWrapper>
    );
}