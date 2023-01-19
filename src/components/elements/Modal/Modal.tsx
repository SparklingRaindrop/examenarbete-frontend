import { Wrapper } from './styled';

export default function Modal(props: GeneralProps) {
    const { children } = props;
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}