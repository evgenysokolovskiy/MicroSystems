import React from 'react'
import { renderToString } from "react-dom/server"
//import App from '../../../../client/src/pages/content/Tech/components/Content/App'

module.exports = function() {



    const jsx = renderToString( `<h1>HELLO WORLD! THIS IS TITLE FROM SERVER!</h1>` )































    return jsx
}



/*
function template() {
    return `
        <h1>HELLO WORLD! THIS IS TITLE FROM SERVER!</h1>
    `
}
*/