import React from 'react';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

(function() {
    console.log("help")
})();

export class App extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <Body />
                <Footer />
            </>
        )
    }
}

export default App