import React, { Component } from 'react';

import './css/menuContent.css';

class MenuContent extends Component {
    constructor(props) {
        super(props)
        this.myApp = this.props.myParent;
        this.myParent = this.props.myParent;
    }

    render() {
        const activePageStyle = {
            backgroundColor: "#31b1ca"
            , color: "#fff"
        };
        const activePage = this.myParent.state.historyPages[this.myParent.state.historyPages.length - 1];

        return (

            <div className="nav_container w-container">
                <div>

                    <div
                        style={activePage === "home"
                            ? activePageStyle : {}}
                        onClick={() => {
                            this.myApp.navigator.ChangePage("home"
                                , null)
                        }}
                        className="nav_link w-nav-link">
                        <div className="menu-image-title-after">
                            <span className="menu-image-title">דף הבית</span>
                        </div>
                    </div>

                    <div
                        style={activePage === "broadcastSchedule"
                            ? activePageStyle : {}}
                        onClick={() => {
                            this.myApp.navigator.ChangePage("broadcastSchedule"
                                , null)
                        }}
                        className="nav_link w-nav-link">
                        <div className="menu-image-title-after">
                            <span className="menu-image-title">לוח שידורים</span>
                        </div>
                    </div>

                    <div
                        style={activePage === "programs"
                            ? activePageStyle : {}}
                        onClick={() => {
                            this.myApp.navigator.ChangePage("programs"
                                , null)
                        }}
                        className="nav_link w-nav-link">
                        <div className="menu-image-title-after">
                            <span className="menu-image-title">תכניות</span>
                        </div>
                    </div>

                    {/*     <div
                        style={activePage === "x"
                            ? activePageStyle : {}}
                        className="nav_link w-nav-link">
                        <div href="http://radio.eol.co.il/allbroadcasters" className="menu-image-title-after">
                            <span className="menu-image-title">שדרנים</span>
                        </div>
                    </div>

                    <div
                        style={activePage === "x"
                            ? activePageStyle : {}}
                        className="nav_link w-nav-link">
                        <div href="https://radio.eol.co.il/mahutv/" className="menu-image-title-after">
                            <span className="menu-image-title">מהות<span className="en">TV</span></span>
                        </div>
                    </div>

                    <div
                        style={activePage === "x"
                            ? activePageStyle : {}}
                        className="nav_link w-nav-link">
                        <div href="http://radio.eol.co.il/podcasts/" className="menu-image-title-after">
                            <span className="menu-image-title">ערוץ הפודקאסטים</span>
                        </div>
                    </div>
                    <div
                        style={activePage === "x"
                            ? activePageStyle : {}}
                        className="nav_link w-nav-link">
                        <div href="http://radio.eol.co.il/podcasts/" className="menu-image-title-after">
                            <span className="menu-image-title">אודות</span>
                        </div>
                    </div>
                    <div
                        style={activePage === "x"
                            ? activePageStyle : {}}
                        className="nav_link w-nav-link">
                        <div href="http://radio.eol.co.il/podcasts/" className="menu-image-title-after">
                            <span className="menu-image-title">צור קשר</span>
                        </div>
                    </div>
                    <div
                        style={activePage === "x"
                            ? activePageStyle : {}}
                        className="nav_link w-nav-link">
                        <div href="http://radio.eol.co.il/podcasts/" className="menu-image-title-after">
                            <span className="menu-image-title">הרשמה לניוזלטר</span>
                        </div>
                    </div> */}
                </div>


                {/* <div className="social-links">
                    <div href="https://soundcloud.com/search?q=EOL%20radio" aria-label="ערוץ הסאונדקלאוד של רדיו מהות החיים">
                        <picture>
                            <source srcSet="https://radio.eol.co.il/wp-content/uploads/2018/03/soundcloud-01.svg" media="(min-width: 640px)" />
                            <img src="true"alt="" className="social-link-item-1" />
                        </picture>
                    </div>
                    <div href="https://www.facebook.com/radio.eol.co.il/" aria-label="עמוד הפייסבוק של רדיו מהות החיים">
                        <picture>
                            <source srcSet="https://radio.eol.co.il/wp-content/uploads/2018/03/face-01.svg" media="(min-width: 640px)" />
                            <img src="true"alt="" className="social-link-item-2" />
                        </picture>
                    </div>
                    <div href="https://www.youtube.com/user/MahutHahaim" aria-label="ערוץ היוטיוב של רדיו מהות החיים">
                        <picture>
                            <source srcSet="https://radio.eol.co.il/wp-content/uploads/2018/03/youtube-01.svg" media="(min-width: 640px)" />
                            <img src="true"alt="" className="social-link-item-3" />
                        </picture>
                    </div>
                </div> */}
            </div>

        )
    }
}

// MenuContent.PropTypes = {
//   closeCallback: React.PropTypes.func.isRequired
// }

export default MenuContent
