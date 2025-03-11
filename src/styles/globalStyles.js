import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

  /* Font weights */
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;


  --font-size-mini: 1rem;
  --font-size-tiny: 1.2rem;
  --font-size-small: 1.4rem;
  --font-size-medium: 1.6rem;
  --font-size-big: 1.8rem;
  --font-size-huge: 2.2rem;

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

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
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
