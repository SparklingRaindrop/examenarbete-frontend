import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Wrapper } from './styled';

type Props = {
    zIndex?: number;
}

export default function Overlay(props: Props) {
    const { zIndex } = props;
    return createPortal(<Wrapper zIndex={zIndex} />, document.body);
}