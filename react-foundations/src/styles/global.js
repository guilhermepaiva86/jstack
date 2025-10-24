import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        background: ${props => props.theme.backgroundColor};
        font-family: sans-serif;
        color: ${props => props.theme.textColor};
    }
`;