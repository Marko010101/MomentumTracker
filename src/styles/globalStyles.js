import { createGlobalStyle } from "styled-components";
import "@fontsource/firago";
import "@fontsource/firago/300.css";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/600.css";

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: "Fredoka One";
    src: url("/src/assets/fonts/FredokaOne-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

:root {
  --color-white: #FFFFFF;
  --color-gray-light: #DEE2E6;
  --color-white-smoke: #F8F9FA;
  --color-gray-dark:#474747;;
  --color-gray: #CED4DA;
  --color-grayish-blue: #343A40;
  --color-gray-muted: #ADB5BD;
  --color-text: #212529;
  --color-text-dark: #0D0F10;
  --color-midnight-blue: rgba(2, 21, 38, 0.8);
  --color-black: #000000;
  --color-purple: #8338EC;
  --color-purple-soft:#B588F4;
  --color-purple-light:#F8F3FEA6;
  --color-yellow: #F7BC30;
  --color-yellow-golden:#FFBE0B;
  --color-orange: #FB5607;
  --color-pink: #FF006E;
  --color-pink-light: #FF66A8;
  --color-red:#FA4D4D;
  --color-green:#08A508;
  --color-blue: #3A86FF;


  --color-blue-light: #7FBFFF;  
  --color-green-light: #7BCF96; 
  --color-orange-light: #FF9C5F; 
  --color-blue-dark:rgb(25, 59, 116); 
  --color-teal: #125353;  




  /* Font weights */
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;

  --font-size-nano: 1rem;
  --font-size-micro: 1.2rem;
  --font-size-mini: 1.4rem;
  --font-size-medium-small: 1.5rem;
  --font-size-tiny: 1.6rem;
  --font-size-small: 1.8rem;
  --font-size-medium: 2rem;
  --font-size-big: 2.4rem;
  --font-size-large: 3.2rem;
  --font-size-huge: 3.4rem;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: color 0.2s , background-color 0.2s, border-width 0.2s , opacity 0.2s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Firago", sans-serif;
  color: var(--color-text); 
  background-color: var(--color-white);
  min-height: 100vh;
  line-height: 100%;
  font-size: 1.6rem;
}



input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

/* select:disabled,
input:disabled {
  background-color: var(--color-gray-200);
  color: var(--color-gray-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
} */

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
    line-height: normal;
}

img {
  max-width: 100%;
}





`;

export default GlobalStyles;
