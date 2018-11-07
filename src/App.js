import React, { Component } from 'react'
import MyMap from './components/MyMap'
import Search from './components/Search'
import InfoTab from './components/InfoTab'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import escapeRegExp from 'escape-string-regexp'
import { GOOGLE_MAP_API_KEY } from './api/APIkey'

class App extends Component {
  state = {
    placesList: [
      { title: "Ciutadella Park", placeType: "park", location: {lat: 41.388123, lng: 2.186015}, forStreetView: {lat: 41.388123, lng: 2.186015}},
      { title: "Museum of History of Catalonia", placeType: "museum", location: {lat: 41.380714, lng: 2.186015}, forStreetView: {lat: 41.380714, lng: 2.186015}},
      { title: "Palau Nacional", placeType: "palac", location: {lat: 	41.368809, lng: 2.153392}, forStreetView: {lat: 41.368809, lng: 2.153392} },
      { title: "Palau Güell", placeType: "palac", location: {lat: 41.378883, lng: 2.174240}, forStreetView: {lat: 41.378883, lng: 2.174240}},
      { title: "The Fish & Chips Shop", placeType: "restaurant", location: {lat: 41.378491, lng: 2.154611}, forStreetView: {lat: 41.378491, lng: 2.154611}},
      { title: "Mercado de La Boqueria", placeType: "store", location: {lat: 41.381660, lng: 2.174920}, forStreetView: {lat: 41.381660, lng: 2.174920}},
    ],
    filterQuery: '',
    imageSrc: '',
    itemClicked: false, // whether a specific item has been clicked
    currentPlace: '', // place being considered
    filteredPlaces: [],
    animationConstant: 0,
  }

  componentDidMount() {
    this.resetFilteredPlaces()
  }

  setClicked(status) {
    this.setState({
      itemClicked: status,
    })
  }

  setMarkerQuery(newQuery) {
    this.setState({
      filterQuery: newQuery,
    })
  }

  setCurrentPlace(name) {
    this.setState({
      currentPlace: name,
    })
  }

  // Set a value in {0,1,2} for the type of animation displayed for the
  // currently selected place, as given by currentPlace
  setAnimationConstant(animationType) {
    this.setState({
      animationConstant: animationType,
    })
  }

  resetFilteredPlaces() {
    this.setState({
      filteredPlaces: this.state.placesList
    })
  }

  updateFilteredPlaces(query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState({
      filteredPlaces: this.state.placesList.filter((place) => match.test(place.title))
    })
  }

  render() {
    const api = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAP_API_KEY + '&v=3.exp&libraries=geometry,drawing,places'

    setTimeout(function () {
      try{
          if (!window.google || !window.google.maps) {
            //This will Throw the error if 'google' is not defined
            alert("Google is not responding. Check your connection or come back later.")
          }
      }
      catch (e) {
          //You can write the code for error handling here
          //Something like alert('Ah...Error Occurred!');
      }
    }, 5000);

    return (
      <MuiThemeProvider>
        <div role="Application">
          <header className="welcome-sign">
            <div className="page-banner" role="banner">Barcelona is not Spain</div>
          </header>
          <main className="app-format">
            {!this.state.itemClicked &&
              <form className="search-order">
                <Search
                  placesList={this.state.placesList}
                  setCurrentPlace={this.setCurrentPlace.bind(this)}
                  setClicked={this.setClicked.bind(this)}
                  setMarkerQuery={this.setMarkerQuery.bind(this)}
                  setAnimationConstant={this.setAnimationConstant.bind(this)}
                  updateFilteredPlaces={this.updateFilteredPlaces.bind(this)}
                />
              </form>}
            {this.state.itemClicked &&
              <div role="Contentinfo" className="info-tab-order">
                <InfoTab
                  setClicked={this.setClicked.bind(this)}
                  resetFilteredPlaces={this.resetFilteredPlaces.bind(this)}
                  currentPlace={this.state.currentPlace}/>
              </div>}
            <MyMap
              googleMapURL={api}
              loadingElement={<div style={{ height: `100%`, margin: `auto`, fontSize: `28px` }}>The map view is loading.</div>}
              containerElement={<div className="map-order" />}
              mapElement={<div style={{ height: `100%` }} />}
              center={{ lat: 41.377000, lng: 2.171156 }}
              zoom={14}
              filteredPlaces={this.state.filteredPlaces}
              setClicked={this.setClicked.bind(this)}
              setCurrentPlace={this.setCurrentPlace.bind(this)}
              currentPlace={this.state.currentPlace}
              resetFilteredPlaces={this.resetFilteredPlaces.bind(this)}
              animationConstant={this.state.animationConstant}
            />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
