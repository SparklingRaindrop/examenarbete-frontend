import styled from 'styled-components';

export const Wrapper = styled.input.attrs(() => ({
    type: 'checkbox'
}))`
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;

    flex-shrink: 0; 

    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 0.15rem solid ${({ theme }) => theme.palette.primary.original};
    outline: none;
    cursor: pointer;

    &:checked {
        background-color: ${({ theme }) => theme.palette.primary.original};
        position: relative;
    }

    &:checked::before {
        content:'\\2713';
        color: ${({ theme }) => theme.palette.white};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &:disabled {
        border-color: ${({ theme }) => theme.palette.primary.disabled};
        background-color: ${({ theme }) => theme.palette.primary.disabled};
    }
`;

interface LabelProps {
    isCrossedOff?: boolean;
}

export const Label = styled.label<LabelProps>`
    width: 100%;
    text-decoration: ${({ isCrossedOff }) => {
        if (!isCrossedOff) {
            return 'none';
        } else {
            return isCrossedOff ? 'none' : 'line-through';
        }
    }};
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
`;