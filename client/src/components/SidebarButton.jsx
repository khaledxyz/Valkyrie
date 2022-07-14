import { lighten, cssVar } from 'polished'
import styled from "styled-components"

export const SidebarButton = styled.button`
    cursor: pointer;

    width: 100%;
    height: 50px;

    background-color: transparent;
    color: var(--lavender-blush);

    display: flex;
    align-items: center;
    justify-content: start;
    
    font-size: 1.05rem;

    padding: var(--base-padding);
    border-radius: var(--border-radius);

    & > *{margin-right: 10px;}
    &:hover{background-color: ${lighten(0.05, '#0e2339')};}
    
    transition: background-color 0.2s ease;
`

export const Conversation = styled(SidebarButton)`
    position: relative;
    padding: calc(var(--base-padding) / 4);
    font-size: 1rem;
    color: #b9bbbe;
`
