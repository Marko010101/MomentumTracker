import { createGlobalStyle } from "styled-components";
import "@fontsource/firago";
import "@fontsource/firago/400.css";
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
  --color-text: #212529;
  --color-text-dark: #0D0F10;
  --color-purple: #8338EC;
  --color-soft-purple:#B588F4;
  --color-gray: #CED4DA;
  --color-gray-light: #DEE2E6;
  --color-midnight-blue: #021526CC;


  /* Font weights */
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;


  --font-size-mini: 1.4rem;
  --font-size-tiny: 1.6rem;
  --font-size-small: 1.8rem;
  --font-size-medium: 2rem;
  --font-size-big: 2.4rem;
  --font-size-huge: 3.4rem;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.2s, border 0.2s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Firago", sans-serif;
  transition: color 0.2s, background-color 0.2s;
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
}

img {
  max-width: 100%;
}



/* @media (max-width: 1200px) {
  html {
    font-size: 60%;
  }
}
@media (max-width: 992px) {
  html {
    font-size: 57.5%;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 52.5%;
  }
} */

`;

export default GlobalStyles;
