import React from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';

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