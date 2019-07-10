import React, { Component } from 'react'
import axios from 'axios'
import { Divider, Button, Image, Card, Icon } from 'semantic-ui-react'

import styles from './gallery.scss'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            name: null,
            movies: [],
            id: null,
            page: '1',
            // total_pages: null,
            genre: '',
        }

        this.load = this.load.bind(this);
        this.update = this.update.bind(this);
        this.filter = this.filter.bind(this);
        this.first = this.first.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
    }

    load() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=636ceb3ef92f634bab892dbfd51a41ee&include_adult=false&language=en-US&with_genres=${this.state.genre}&sort_by=popularity.desc&page=${this.state.page}`)
            .then(function (response) {
                this.setState({
                    // total_pages: response.data.total_pages,
                    movies: response.data.results,
                });
            }.bind(this));
    }

    filter(e) {
        var filterType = e.target.id;
        this.setState({
            genre: filterType,
            page: '1',
        }, () => this.load());
    }

    first(e) {
        this.setState({
            page: '1',
        }, () => this.load());
    }

    prev(e) {
        var currentPage = Number(this.state.page);
        if (currentPage === '1') {
            return;
        }
        this.setState({
            page: (currentPage - 1).toString(),
        }, () => this.load());
    }

    next(e) {
        var currentPage = Number(this.state.page);
        if (currentPage === this.state.total_pages) {
            return;
        }
        this.setState({
            page: (currentPage + 1).toString(),
        }, () => this.load());
    }

    last(e) {
        this.setState({
            page: '1000', // can only request up to page 1000
        }, () => this.load());
    }

    update(index) {
        this.props.history.push({
            pathname: '/detail',
            id: index,
            movies: this.state.movies
        });
    }

    componentDidMount() {
        this.load();
    }

    render() {
        return (
            <div className="Gallery">
                <div className="options">
                    <Button className="button" id={this.props.genre} onClick={this.filter}>All</Button>
                    <Button className="button" id="28" onClick={this.filter}>Action</Button>
                    <Button className="button" id="35" onClick={this.filter}>Comedy</Button>
                    <Button className="button" id="18" onClick={this.filter}>Drama</Button>
                    <Button className="button" id="27" onClick={this.filter}>Horror</Button>
                    <Button className="button" id="10749" onClick={this.filter}>Romance</Button>
                </div>
                <div className="movies">
                    <Card.Group className="movies_card" itemsPerRow={5}> {
                        this.state.movies.map((movie, index) => {
                            return (
                                <Card className="hover" key={index + "card"}>
                                    <Image onClick={function () { this.update(index) }.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "poster"} />
                                </Card>
                            )
                        })
                    }
                    </Card.Group>
                </div>
                <div className="navigation">
                    <Button className="button" onClick={this.first}>
                        <Icon name='angle double left'></Icon>
                    </Button>
                    <Button className="button" onClick={this.prev}>
                        <Icon name='angle left'></Icon>
                    </Button>
                    <Button className="button" onClick={this.next}>
                        <Icon name='angle right'></Icon>
                    </Button>
                    <Button className="button" onClick={this.last}>
                        <Icon name='angle double right'></Icon>
                    </Button>
                </div>
            </div>
        )
    }
}

export default Gallery
