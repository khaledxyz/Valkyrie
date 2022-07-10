import styled from 'styled-components';
import { darken, cssVar } from 'polished'

const variants = {
    primary: {
        background: 'var(--azure-radiance)',
        color: 'var(--lavender-blush)',
    },
    white: {
        background: 'var(--lavender-blush)',
        color: 'var(--bright-gray)',
    },
    danger: {
        background: 'var(--error-danger)',
        color: 'var(--lavender-blush)',
    }
}

const Button = styled.button`
    cursor: pointer;
    
    width: 100%;
    height: 50px;

    border-radius: var(--border-radius);

    // Default
    background-color: var(--azure-radiance);
    color: var(--lavender-blush);

    // Variants
    background-color: ${
        ({ variant }) => variants[variant] ? variants[variant].background : null
    };

    color: ${
        ({ variant }) => variants[variant] ? variants[variant].color : null
    };

    // States
    &:hover{
            background-color: ${
            ({ variant }) => variants[variant] ? darken(0.09, cssVar(variants[variant].background.slice(4, -1))) : null
        };
    };

    &:active{
        background-color: ${
            ({ variant }) => variants[variant] ? darken(0.15, cssVar(variants[variant].background.slice(4, -1))) : null
        };
    }

    transition: background-color 0.2s ease;
    font-weight: 600;
`;
 
export default Button;