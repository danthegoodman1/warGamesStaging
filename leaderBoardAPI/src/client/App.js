import React, { Component } from 'react'
import './app.css'
import './assets/css/bootstrap4-neon-glow.css'
import Table from './assets/components/Table'
import Welcome from './assets/components/Welcome'
import Statement from './assets/components/Statement'
import Tabination from './assets/components/Tabination'

export default class App extends Component {
  state = {

  }

  componentDidMount() {
    console.log('ready')
  }


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center m-4">
          <div className="col-md-12">
            <Welcome />
          </div>
        </div>
        <div className="row justify-content-center m-4">
          <div className="col-md-8">
            <Statement content="Upcoming" extraMessage="Episode 1: The Wrapping of Cats"/>
          </div>
        </div>
        <div className="row justify-content-center m-4">
          <div className="col-md-8">
          </div>
        </div>
        <div className="row justify-content-center m-4">
          <div className="col-md-8">
            <Tabination />
          </div>
        </div>

        {/* <div>

          <div id="ht-tm-sidenav" class="ht-tm-sidenav fixed">
        <a class="ht-tm-toggle-sidenav" href="#!"><span class="fa fa-minus"></span></a>

        <div class="ht-tm-sidenav-title">
          <span class="ht-tm-sidenav-title-text">
            Apply modifier classes
          </span>
          <span class="ht-tm-sidenav-title-bar"></span>
          <a href="#!" class="ht-tm-sidenav-title-bar-help" data-toggle="popover" data-trigger="focus" data-placement="top" title="" data-content="Here you can switch the component's modifier classes for color and size. Eg. btn-primary, btn-secondary, btn-lg, btn-sm, etc. Hover over the buttons to see which class they stand for. Classes will only switch where applicable." data-original-title="Modifier classes"><span class="fa fa-question-circle"></span></a>
        </div>

        <div class="ht-tm-sidenav-modifiers">
          <div class="ht-tm-sidenav-size">
            <a href="#!" data-sizepicker="sm" class="ht-tm-sizepicker btn btn-outline-primary" title="-sm- class (where available)">Small <span class="fa fa-check"></span></a>
            <a href="#!" data-sizepicker="default" class="ht-tm-sizepicker btn btn-outline-primary active-size" title="Default size">Default <span class="fa fa-check"></span></a>
            <a href="#!" data-sizepicker="lg" class="ht-tm-sizepicker btn btn-outline-primary" title="-lg- size (where available)">Large <span class="fa fa-check"></span></a>
          </div>
        </div>

        <div class="ht-tm-sidenav-title mt-3">
          <span class="ht-tm-sidenav-title-text">
            Get the markup
          </span>
          <span class="ht-tm-sidenav-title-bar"></span>
          <a href="#!" class="ht-tm-sidenav-title-bar-help" data-toggle="popover" data-trigger="focus" data-placement="top" title="" data-content="Toggle the Picker and Inspector here. The Picker allows you to copy a component's source code directly into the clipboard. The Inspector will display the source code in a dialog. Activate a tool, then click on components." data-original-title="Picker / Inspector"><span class="fa fa-question-circle"></span></a>
        </div>

        <div class="ht-tm-sidenav-mainbuttons">
          <a href="#!" id="ht-tm-picker" class="btn btn-outline-primary mr-1 text-left my-1  ht-tm-picker-toggled" title="Toggle Code Picker">
            <span class="fa fa-eyedropper mr-xl-2"></span>
            <span class="hidden-lg-down">Picker</span>
          </a>
          <a href="#!" id="ht-tm-inspector" class="btn btn-outline-primary my-1 text-left ht-tm-picker-toggled" title="Toggle Code Inspector">
            <span class="fa fa-crosshairs mr-xl-2"></span>
            <span class="hidden-lg-down">Inspector</span>
          </a>
        </div>

        <div class="ht-tm-sidenav-title mt-3">
          <span class="ht-tm-sidenav-title-text">
            Quicknav
          </span>
          <span class="ht-tm-sidenav-title-bar"></span>
        </div>

        <div class="ht-tm-sidenav-nav">
          <a href="#alerts"><span class="fa fa-angle-right text-primary"></span>Alerts</a>
          <a href="#badges"><span class="fa fa-angle-right text-primary"></span>Badges</a>
          <a href="#buttons"><span class="fa fa-angle-right text-primary"></span>Buttons</a>
          <a href="#cards"><span class="fa fa-angle-right text-primary"></span>Cards</a>
          <a href="#carousel"><span class="fa fa-angle-right text-primary"></span>Carousel</a>
          <a href="#forms"><span class="fa fa-angle-right text-primary"></span>Forms</a>
          <a href="#jumbotron"><span class="fa fa-angle-right text-primary"></span>Jumbotron</a>
          <a href="#lists"><span class="fa fa-angle-right text-primary"></span>Lists</a>
          <a href="#navigation"><span class="fa fa-angle-right text-primary"></span>Navigation</a>
          <a href="#pagination"><span class="fa fa-angle-right text-primary"></span>Pagination</a>
          <a href="#popovers"><span class="fa fa-angle-right text-primary"></span>Popovers</a>
          <a href="#progress"><span class="fa fa-angle-right text-primary"></span>Progress</a>
          <a href="#tables"><span class="fa fa-angle-right text-primary"></span>Tables</a>
          <a href="#tooltips"><span class="fa fa-angle-right text-primary"></span>Tooltips</a>
          <a href="#typography"><span class="fa fa-angle-right text-primary"></span>Type</a>
          <a href="#theme-specials"><span class="fa fa-angle-right text-primary"></span>Theme Specials</a>
        </div>
      </div>



        </div> */}
      </div>
    )
  }
}
