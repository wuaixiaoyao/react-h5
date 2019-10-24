
/**
 * @author wuaixiaoyao
 * @date 2019/10/24
 * @Description:
*/
import React , { Component }from 'react';
import { Route ,withRouter } from 'react-router'
import { } from 'react-router-dom'
//todo;待完善
const loadBranchData = (location) => {
  const branch = matchRoutes(routes, location.pathname)

  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  })

  return Promise.all(promises)
}

// useful on the server for preloading data
loadBranchData(req.url).then(data => {
  putTheDataSomewhereTheClientCanFindIt(data)
})

class PendingNavDataLoader extends Component {
    state = {
      previousLocation: null,
      currentLocation: this.props.location
    }

    static getDerivedStateFromProps(props, state) {
      const currentLocation = props.location
      const previousLocation = state.currentLocation

      const navigated = currentLocation !== previousLocation
      if (navigated) {
        // save the location so we can render the old screen
        return {
          previousLocation,
          currentLocation
        }
      }

      return null
    }

    componentDidUpdate(prevProps) {
      const navigated = prevProps.location !== this.props.location

      if (navigated) {
        // load data while the old screen remains
        loadNextData(routes, this.props.location).then(data => {
          putTheDataSomewhereRoutesCanFindIt(data)
          // clear previousLocation so the next screen renders
          this.setState({
            previousLocation: null
          })
        })
      }
    }

    render() {
      const { children, location } = this.props
      const { previousLocation } = this.state

      // use a controlled <Route> to trick all descendants into
      // rendering the old location
      return (
        <Route
          location={previousLocation || location}
          render={() => children}
        />
      )
    }
}

// wrap in withRouter
export default withRouter(PendingNavDataLoader)