import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { Dropdown, Form, Button, Image, Card, Icon, Radio } from 'semantic-ui-react'

import styles from './list.scss'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            id: null,
            release_date: null,
            poster: null,
            movies: [],
            isAscending: false,
            currentFilter: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.filterByTitle = this.filterByTitle.bind(this);
        this.filterByPopularity = this.filterByPopularity.bind(this);
        this.filterByVoteAvg = this.filterByVoteAvg.bind(this);
        this.filterByReleaseDate = this.filterByReleaseDate.bind(this);
        this.order = this.order.bind(this);
        this.ascend = this.ascend.bind(this);
        this.descend = this.descend.bind(this);
        this.update = this.update.bind(this);
    }

    handleChange(e) {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=636ceb3ef92f634bab892dbfd51a41ee&include_adult=false&language=en-US&sort_by=title.desc&query=' + e.target.value)
            .then(function (response) {
                this.setState(function () {
                    return {
                        movies: response.data.results,
                    }
                });
            }.bind(this));
    }

    filter(e, data) {
        this.setState(function () {
            return {
                currentFilter: data.value,
            }
        }, () => (this.sort.call(this)));
    }

    sort() {
        if (this.state.currentFilter === 'title') {
            this.filterByTitle.call(this);
        }
        else if (this.state.currentFilter === 'popularity') {
            this.filterByPopularity.call(this);
        }
        else if (this.state.currentFilter === 'vote_average') {
            this.filterByVoteAvg.call(this);
        } else {
            this.filterByReleaseDate.call(this);
        }
    }

    filterByTitle() {
        let currMovies = this.state.movies;
        if (this.state.isAscending === 'false') {
            currMovies.sort(function (first, second) {
                return first.title.localeCompare(second.title);
            })
        }
        else {
            currMovies.sort(function (first, second) {
                return second.title.localeCompare(first.title);
            })
        }
        this.setState(function () {
            return {
                movies: currMovies,
            }
        });
    }

    filterByPopularity() {
        let currMovies = this.state.movies;
        if (this.state.isAscending === 'false') {
            currMovies.sort(function (first, second) {
                return first.popularity - second.popularity;
            })
        }
        else {
            currMovies.sort(function (first, second) {
                return second.popularity - first.popularity;
            })
        }
        this.setState(function () {
            return {
                movies: currMovies,
            }
        });
    }

    filterByVoteAvg() {
        let currMovies = this.state.movies;
        if (this.state.isAscending === 'false') {
            currMovies.sort(function (first, second) {
                return first.vote_average - second.vote_average;
            })
        }
        else {
            currMovies.sort(function (first, second) {
                return second.vote_average - first.vote_average;
            })
        }
        this.setState(function () {
            return {
                movies: currMovies,
            }
        });
    }

    filterByReleaseDate() {
        let currMovies = this.state.movies;
        if (this.state.isAscending === 'false') {
            currMovies.sort(function (first, second) {
                var firstDate = new Date(first.release_date);
                var secondDate = new Date(second.release_date);
                return firstDate.getTime() - secondDate.getTime();
            })
        }
        else {
            currMovies.sort(function (first, second) {
                var firstDate = new Date(first.release_date);
                var secondDate = new Date(second.release_date);
                return secondDate - firstDate.getTime();
            })
        }
        this.setState(function () {
            return {
                movies: currMovies,
            }
        });
    }

    order(e, data) {
        if (data.value === 'true') {
            this.setState(function () {
                return {
                    isAscending: true,
                }
            }, () => (this.ascend.call(this)));
        }
        else {
            this.setState(function () {
                return {
                    isAscending: false,
                }
            }, () => (this.descend.call(this)));
        }
    }

    ascend() {
        let currMovies = this.state.movies;
        if (this.state.currentFilter === 'title') {
            currMovies.sort(function (first, second) {
                return first.title.localeCompare(second.title);
            })
        }
        else if (this.state.currentFilter === 'popularity') {
            currMovies.sort(function (first, second) {
                return first.popularity - second.popularity;
            })
        }
        else if (this.state.currentFilter === 'vote_average') {
            currMovies.sort(function (first, second) {
                return first.vote_average - second.vote_average;
            })
        } else {
            currMovies.sort(function (first, second) {
                var firstDate = new Date(first.release_date);
                var secondDate = new Date(second.release_date);
                return firstDate.getTime() - secondDate.getTime();
            });
        }
        this.setState(function () {
            return {
                movies: currMovies,
            }
        });
    }

    descend() {
        let currMovies = this.state.movies;
        if (this.state.currentFilter === 'title') {
            currMovies.sort(function (first, second) {
                return second.title.localeCompare(first.title);
            })
        }
        else if (this.state.currentFilter === 'popularity') {
            currMovies.sort(function (first, second) {
                return second.popularity - first.popularity;
            })
        }
        else if (this.state.currentFilter === 'vote_average') {
            currMovies.sort(function (first, second) {
                return second.vote_average - first.vote_average;
            })
        } else {
            currMovies.sort(function (first, second) {
                var firstDate = new Date(first.release_date);
                var secondDate = new Date(second.release_date);
                return secondDate.getTime() - firstDate.getTime();
            });
        }
        this.setState(function () {
            return {
                movies: currMovies,
            }
        });
    }

    update(index) {
        this.props.history.push({
            pathname: '/detail',
            id: index,
            movies: this.state.movies,
        });
    }

    convertDate(release_date) {
        var date = new Date(release_date)
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    }

    // changeFilter = (e, { value }) => {
    //     this.setState({ value })
    //     this.filter.bind(this);
    // }

    render() {
        const { currentFilter } = this.state
        const options = [
            { key: 'title', text: 'Title', value: 'title' },
            { key: 'popularity', text: 'Popularity', value: 'popularity' },
            { key: 'vote_average', text: 'Rating', value: 'vote_average' },
            { key: 'release_date', text: 'Release Date', value: 'release_date' }
        ]
        return (
            <div className="List">
                <div className="searchBar">
                    <Form>
                        <Form.Field>
                            <input type='text' onChange={e => this.handleChange(e)} placeholder='Search Movies' />
                        </Form.Field>
                    </Form>
                    {/* <Form>
                        <Form.Field>
                            Filter By:
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Popularity'
                                name='radioGroup'
                                value='popularity'
                                checked={this.state.value === 'popularity'}
                                onChange={this.changeFilter}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Average Vote'
                                name='radioGroup'
                                value='vote_average'
                                checked={this.state.value === 'vote_average'}
                                onChange={this.changeFilter}
                            />
                        </Form.Field>
                    </Form> */}
                    <Dropdown placeholder='Filter By' fluid selection options={options} selection value={currentFilter} onChange={this.filter.bind(this)} />
                    <Button.Group fluid>
                        <Button className="arrows" value="false" onClick={this.order.bind(this)}>
                            <Icon name='sort amount down'></Icon>
                        </Button>
                        <Button.Or text='O'/>
                        <Button className="arrows" value="true" onClick={this.order.bind(this)}>
                            <Icon name='sort amount up'></Icon>
                        </Button>
                    </Button.Group>
                </div>
                <Card.Group itemsPerRow={5} className="movies"> {
                    this.state.movies.map((movie, index) => {
                        return (
                            <Card className="hoverover" key={index + "item"}>
                                <Image className="center" onClick={function () { this.update(index) }.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "image"} />
                                <Card.Content key={index + "title"}>
                                    {movie.title} ({this.convertDate(movie.release_date)})
                                </Card.Content>
                                <Card.Content extra key={index + "popularity"}>
                                    Popularity: {movie.popularity}
                                </Card.Content>
                                <Card.Content extra key={index + "vote_average"}>
                                    Rating: {movie.vote_average /** 10* + '%'*/}
                                </Card.Content>
                            </Card>
                        )
                    })
                }
                </Card.Group>
            </div>
        )
    }
}

render(<List />, document.getElementById('app'))

export default List
