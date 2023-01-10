import { Icon } from '../Icon';
import { Path } from '../Icon/path';
import Button, { ButtonProps } from './Button';

type Props = {
    name: string;
} & ButtonProps;

export default function IconButton(props: Props) {
    const { name, disabled, variant, onClick } = props;

    return (
        <Button onClick={onClick} disabled={disabled} variant={variant}>
            <Icon name={name as Path} />
        </Button>
    );
}