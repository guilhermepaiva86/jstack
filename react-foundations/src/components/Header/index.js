import React from "react";

import { Container } from './styles';

export default function Header({ onToggleTheme, selectedTheme }) {
    return (
    <Container>
        <h1>Imóveis Mogi</h1>
        <button type="button" onClick={onToggleTheme}>
            {selectedTheme === 'dark' ? '☀️' : '🌑'}    
        </button>
    </Container>
    );
}