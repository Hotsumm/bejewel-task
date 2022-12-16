import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing:border-box;
    }
    html, body {
     height: 100%;
    }

    html, body, div, span, iframe,
    h1, h2, h3, h4, h5, h6, p, ol, ul, li,section, button, input {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    
    footer, header, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }

    input {
        background:white;
        border:none;
        padding:0;
    }
    button {
        background:transparent;
        color:inherit;
        border:none;
        cursor:pointer;
    }

    img {
        display:block;
        max-width: 100%;
    }
    a {
        color: inherit;
        text-decoration: none;
    }

`;

export default GlobalStyles;
