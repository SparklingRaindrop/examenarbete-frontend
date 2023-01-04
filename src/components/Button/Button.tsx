import { Wrapper } from './styled';

type Props = {
    onClick?: () => void;
    label: string;
}
export default function Button(props: Props) {
    const { onClick, label } = props;

    return (
        <Wrapper
            onClick={onClick}>
            {label}
        </Wrapper>
    );
}