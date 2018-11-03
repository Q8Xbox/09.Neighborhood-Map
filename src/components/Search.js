import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Restaurant from 'material-ui/svg-icons/maps/restaurant'
import LocalLibrary from 'material-ui/svg-icons/maps/local-library'
import LocalCafe from 'material-ui/svg-icons/maps/local-cafe'
import LocalGroceryStore from 'material-ui/svg-icons/maps/local-grocery-store'
import Terrain from 'material-ui/svg-icons/maps/terrain'
import School from 'material-ui/svg-icons/social/school'
import Palac from 'material-ui/svg-icons/maps/local-offer'
import Activity from 'material-ui/svg-icons/maps/local-activity'

class Search extends Component {
  state = {
    query: '',
  }

  // The structure of the controlled component for the search bar is based on
  // the information provided in the 'Building With React, Lesson 3: State
  // Management' videos
  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.props.setMarkerQuery(query)
    this.props.updateFilteredPlaces(query)
  }

  render() {
    // The use of regular expressions and sorting below is based on the
    // information provided in one of the videos in "Introduction To React,
    // Lesson: 3, State Management"
    let showingPlaces
    let { query } = this.state
    let { placesList } = this.props
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingPlaces = placesList.filter((place) => match.test(place.title))
    } else {
      showingPlaces = placesList
    }
    showingPlaces.sort(sortBy('title'))
    return (
      <div role="Menu" className="search-format">
        <input
          className='search-locations'
          type='text'
          placeholder='Search'
          value={query}
          id="searchEntry"
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <List className="list-style">
          {showingPlaces.map((place) => {
            let optionalIcon
            if (place.placeType === 'restaurant') {
              optionalIcon = <Restaurant />
            } else if (place.placeType === 'book') {
              optionalIcon = <LocalLibrary />
            } else if (place.placeType === 'cafe') {
              optionalIcon = <LocalCafe />
            } else if (place.placeType === 'store') {
              optionalIcon = <LocalGroceryStore />
            } else if (place.placeType === 'palac') {
              optionalIcon = <Palac />
            } else if (place.placeType === 'park') {
              optionalIcon = <Terrain />
            } else if (place.placeType === 'university') {
              optionalIcon = <School />
            } else if (place.placeType === 'museum') {
              optionalIcon = <Activity />
            } else if (place.placeType === 'stadium') {
              optionalIcon = <Activity />
            }
            return (
              <ListItem
                key={place.title}
                tabIndex={0}
                role="Menuitem"
                primaryText={place.title}
                rightIcon={optionalIcon}
                onClick={() => {
                  this.props.setAnimationConstant(1)
                  setTimeout(() => this.props.setAnimationConstant(0), 2000)
                  this.props.setCurrentPlace(place.title)
                  this.props.setClicked(true)
                }}
              />
            )
          })}
        </List>
      </div>
    )
  }
}

export default Search;
