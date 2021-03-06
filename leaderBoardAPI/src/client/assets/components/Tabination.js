import React from 'react'
import Table from './Table'
import store from './sampleStore'
import { observer } from 'mobx-react'

/** 
 * @param content (String) message
 * @param caret (Boolean) whether the last character should have the vim caret
 * @param extraMessage (String) extra message to say
 */
const Tabination = observer(class Tabination extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: [true],
            tableData: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    compareValues(key, order='asc') {
        return function(a, b) {
          if(!a.hasOwnProperty(key) || 
             !b.hasOwnProperty(key)) {
              return 0; 
          }
          const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
            
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order == 'desc') ? 
            (comparison * -1) : comparison
          );
        };
      }

    tabClickHandler(e) {
        let activeIndex = [...this.state.activeIndex]
        activeIndex = activeIndex.map((el, ind) => {
            return false
        })
        activeIndex[e.target.id] = true
        this.setState({ activeIndex })
        if (e.target.id === '1') {
            this.fetchDataEpisode(e.target.id.toString())
        } else {
            this.fetchData()
        }
    }

    fetchData() {
        fetch('http://udwargames.com/api/leaderBoard?raw=true')
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            let tempItems = []
            res.forEach((e, i) => {
                tempItems.push({
                    firstName: e.firstName,
                    lastName: e.lastName,
                    userName: e.userName,
                    points: e.allPoints
                })
            })
            tempItems.sort(this.compareValues('allPoints', 'desc'))
            store.tableData = tempItems
            console.log(tempItems)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    fetchDataUser(userName) {
        fetch(`http://udwargames.com/api/leaderBoard/${userName}?raw=true`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            res.points = res.allPoints
            console.log(res)
            // this.setState({tableData: [res]})
            store.tableData = [res]
        })
        .catch((err) => {
            console.log(err)
        })
    }

    fetchDataEpisode(episodeID) {
        fetch(`http://udwargames.com/api/leaderBoard/episode/${episodeID}?raw=true`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            // this.setState({tableData: res})
            store.tableData = res
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // exampleGuys = [
    //     {
    //       num: 3,
    //       fn: 'danffff',
    //       ln: 'goodman',
    //       un: 'danthegoodman'
    //     },
    //     {
    //       num: 4,
    //       fn: 'fan',
    //       ln: 'foodman',
    //       un: 'fanthefoodman'
    //     }
    //   ]

    render() {

        const { content, extraMessage } = this.props

        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a id={0} className={`nav-link${this.state.activeIndex[0] ? " active" : ""}`} style={{cursor: "pointer"}} onClick={this.tabClickHandler.bind(this)}>All Time</a>
                    </li>
                    <li className="nav-item" href="">
                        <a id={1} className={`nav-link${this.state.activeIndex[1] ? " active" : ""}`} style={{cursor: "pointer"}} onClick={this.tabClickHandler.bind(this)}>Episode 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled">Episode 2</a>
                    </li>
                </ul>
                {store.tableData && <Table items={store.tableData}/>}
            </div>
        )
    }
})

export default Tabination
