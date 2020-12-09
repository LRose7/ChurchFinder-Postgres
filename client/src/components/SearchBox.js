import React from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        // this.onChangeSearchChurch = this.onChangeSearchChurch.bind(this);
        this.retrieveChurches = this.retrieveChurches.bind(this);
        // this.searchChurch = this.searchChurch.bind(this);

        this.state = {
            churches: [],
            currentIndex: -1,
            // searchChurch: ''
        };
    }

    componentDidMount() {
        this.retrieveChurches();
    }

    // onChangeSearchChurch = async (e) => {
    //     try {
    //         console.log(e.target.value);
    //     const searchChurch = e.target.value;

    //     this.setState({
    //         searchChurch: searchChurch
    //     });
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    //Retrieves all churches from the database and lists them under the map
    retrieveChurches = async () => {
        try {
            const response = await fetch('/churches');
            const jsonData = await response.json();

            this.setState({
                churches: jsonData
            });
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    //Searches for churches by denomination
    // searchChurch = async (denomination) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/churches/${denomination}`);
    //         const jsonData = await response.json();

    //         this.setState({
    //             churches: jsonData
    //         });
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    render() {
        const { churches, currentIndex } = this.state;
        return (
            // <div id='churchsearch-display'>
            //     <input
            //         type='text'
            //         className='form-control'
            //         placeholder='Search by denomination'
            //         value={searchChurch}
            //         onChange={this.onChangeSearchChurch}
            //     />
            //     <button
            //         type='button'
            //         onClick={this.searchChurch}>Search</button>
                <div id='churchsearch-display'>
                    <h1>Churches List</h1>
                    <ul className='list-group'>
                        {churches && churches.map((church, index) => (
                            <li
                                className={
                                    'list-group-item' +
                                    (index === currentIndex ? 'active' : '')
                                }
                                key={index}>
                                <h3>{church.name}</h3>
                                {church.mailing_one}<br></br>
                                {church.city}, {church.state}, {church.postal_code} <br></br>
                                {church.denomination}<br></br>
                                <a
                                    className='church-links'
                                    href={church.web_url}>{church.web_url} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            // </div>
        )
    }
}

export default SearchBox;