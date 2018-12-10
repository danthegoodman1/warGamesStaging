import React from 'react'


export default class Table extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
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

    componentDidMount() {
        console.log('fetching')
        fetch('http://localhost:8080/api/leaderBoard?raw=true', {
            mode: 'no-cors'
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            let tempItems = []
            res.forEach((e, i) => {
                tempItems.push({
                    fn: e.firstName,
                    ln: e.lastName,
                    un: e.userName,
                    pt: e.allPoints
                })
            })
            tempItems.sort(this.compareValues('allPoints', 'desc'))
            this.setState({items: tempItems})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {

        const { items } = this.props

        const rootThang = (
            <table className="table table-hover table-striped">
                <thead className="thead table-primary">
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.items.map((i, index) => {
                            return (
                                <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{i.fn}</td>
                                <td>{i.ln}</td>
                                <td>{i.un}</td>
                                <td style={{textAlign: 'center'}}>{i.pt}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )


        return rootThang
    }
}
