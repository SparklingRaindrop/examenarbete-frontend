import { Icon } from '../Icon';
import { Path } from '../Icon/path';
import Button, { ButtonProps } from './Button';

type Props = {
    name: string;
} & ButtonProps;

export default function IconButton(props: Props) {
    const { name, disabled, variant, onClick, onMouseUp, onMouseDown } = props;

    return (
        <Button
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            disabled={disabled}
            variant={variant}
            {...props}>
            <Icon name={name as Path} />
        </Button>
    );
}