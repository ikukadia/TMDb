import React, { Component } from 'react'
import { Divider, Card, Image, Button, Icon, Feed } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import axios from 'axios'

import styles from './detail.scss'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.id,
            movies: this.props.location.movies,
            recommendedId: null,
            recommendedTitle: null,
        }

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.getRecommendedMovie = this.getRecommendedMovie.bind(this);
    }

    next() {
        if (this.state.movies[this.state.id + 1] === undefined) {
            return;
        }
        let inc = this.state.id + 1;
        this.setState(function () {
            return {
                id: inc
            }
        });
    }

    prev() {
        if (this.state.id === 0) {
            return;
        }
        let dec = this.state.id - 1;
        this.setState(function () {
            return {
                id: dec
            }
        });
    }

    jumpTo() {
        var target = this.state.recommendedId
        var index = this.state.movies.findIndex(function(element) {
            return element.id == target;
        });
        if (index === -1) {
            return;
        }
        this.setState(function () {
            return {
                id: index,
            }
        })
    }

    getRecommendedMovie() {
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movies[this.state.id].id}/recommendations?api_key=636ceb3ef92f634bab892dbfd51a41ee&language=en-US&page=1`)
            .then(function (response) {
                if (response.data.results[0] == undefined) {
                    return;
                }
                this.setState(function () {
                    return {
                        recommendedId: response.data.results[0].id,
                        recommendedTitle: response.data.results[0].title,
                    }
                });
            }.bind(this));
        // {console.log(this.state.recommendedTitle)}
    }

    render() {
        this.getRecommendedMovie()
        // console.log(this.state.recommendedTitle)
        return (
            <div className="Detail">
                <div className="center">
                    <Button className="button" onClick={function () { this.prev() }.bind(this)}>
                        <Icon name='arrow alternate circle left'></Icon>
                    </Button>
                    <Button className="button" onClick={function () { this.next() }.bind(this)}>
                        <Icon name='arrow alternate circle right'></Icon>
                    </Button>
                    <Divider hidden />
                    <Card.Group>
                        {/* <Card>
                            <Card.content>
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label image src={'https://image.tmdb.org/t/p/w500' + this.state.movies[this.state.id].poster_path}/>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </Card.content>
                        </Card> */}
                        <Card>
                            <Card.Content>
                                <Image size="large" src={'https://image.tmdb.org/t/p/w500' + this.state.movies[this.state.id].poster_path} />
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    {this.state.movies[this.state.id].title}
                                </Card.Header>
                                <Card.Description>
                                    {this.state.movies[this.state.id].overview}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                Rating: {this.state.movies[this.state.id].vote_average}
                            </Card.Content>
                            <Button className="button" onClick={function () { this.jumpTo() }.bind(this)}>Recommended: {this.state.recommendedTitle}</Button>
                        </Card>
                    </Card.Group>
                </div>
            </div>
        )
    }
}

Detail.propTypes = {
    location: PropTypes.shape({
        id: PropTypes.number,
        movies: PropTypes.array
    })
}

export default Detail
