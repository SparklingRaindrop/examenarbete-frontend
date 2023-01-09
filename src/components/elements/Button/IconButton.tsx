import { Icon } from '../Icon';
import { Path } from '../Icon/path';
import Button, { ButtonProps } from './Button';

type Props = {
    name: string;
} & ButtonProps;

export default function IconButton(props: Props) {
    const { name, disabled, onClick } = props;

    return (
        <Button onClick={onClick} disabled={disabled}>
            <Icon name={name as Path} />
        </Button>
    );
}