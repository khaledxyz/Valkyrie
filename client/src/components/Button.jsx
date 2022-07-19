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
    transparent: {
        background: 'transparent',
        color: 'var(--lavender-blush)',
    },
    danger: {
        background: 'var(--error-danger)',
        color: 'var(--lavender-blush)',
    }
}

const Button = styled.button`
    cursor: pointer;
    
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '50px'};

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

    transition: background-color 0.2s ease;
    font-weight: 600;
`;
 
export default Button;