var $ = jQuery = require('jquery');
var _ = require('lodash')
var bootstrap = require('bootstrap');
var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));


var React = require('react');
var ReactDom = require('react-dom');
var AptList = require('./AptList');


var MainInterface = React.createClass({
    getInitialState: function() {
        return {
            myAppointments: loadApts
        }
    },

    componentDidUpdate: function() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.myAppointments), 'utf8', 
        function(err) {
            if (err) {
                console.log(err)
            }
        })
    },

    deleteMessage: function(item) {
        var allApts = this.state.myAppointments;
        var newApts = _.without(allApts, item);
        this.setState({
            myAppointments: newApts
        });
    },

    render: function() {
        var myAppointments = this.state.myAppointments;

        myAppointments = myAppointments.map(function(item, index) {
            return(
                <AptList  //props
                    key= {index}
                    singleItem = {item}
                    whichItem = {item}
                    onDelete = {this.deleteMessage}
                />
            ) 
            
        }.bind(this)); //Appointments List

        return (
            <div className="application">
            <div className="container">
             <div className="row">
               <div className="appointments col-sm-12">
                 <h2 className="appointments-headline">Current Appointments</h2>
                 <ul className="item-list media-list">
    
                   {myAppointments}
    
                 </ul>
               </div>{/* col-sm-12 */}
             </div>{/* row */}
            </div>{/* container */}
          </div>
        )
    }
});

ReactDom.render(
    <MainInterface />,
    document.getElementById('petAppointments')
);