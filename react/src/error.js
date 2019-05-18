import React from 'react';
import { RecomendItem } from './pages/home'
import $ from 'jquery';


export default class Error extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         error: null,
    //         isLoaded: false,
    //         items: []
    //         , hasError: false
    //     }
    // }
    render() {
        const { title, code, showRecomends, myApp } = this.props;
        return (
            <div className="content_section w-clearfix">
                {code === "no_records_were_found" ?
                    <div>   <div class="top_title_group">
                        <div class="top_title_txt">לא נמצאו תוצאות</div>
                        <div class="top_title_txt to">ל</div>
                        <div class="top_title_txt key">{title}</div>
                    </div>
                        <div class="top_title_group subtitle">
                            <div class="top_title_txt">הנה כמה המלצות של צוות הרדיו</div>
                        </div></div>
                    : <div className="content_section program">
                        <div className="program_title_group _404">
                            <h1 className="program_main_title _404">{title === null ? "שגיאה" : title}</h1>
                            {
                                code !== 404 &&
                                <h3 onClick={() => { window.location.reload(); }} style={{ color: "#fff" }}>לחץ כאן לרענון האפליקציה</h3>
                            }

                            <div>
                                {code === 404 && <div> מחפשים תוכן ולא מוצאים? הכול טוב :)<br />לפעמים שעמום הוא דבר חיובי.</div>}
                            </div>
                        </div>
                    </div>
                }
                {showRecomends &&
                    (<RecomendItems myApp={myApp} myParent={this} />)
                }

            </div>);
    }

}




export class RecomendItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            items: []
            , hasError: false
        };
        this.myApp = this.props.myApp;
    }
    componentDidCatch(error, info) {
        console.log(
            'class component error at:RecomendItems(error.js). '
            , new Error()
            , 'error message:', JSON.stringify(error)
            , 'info message:', JSON.stringify(info));
        this.setState({ hasError: true });
        // logErrorToMyService(error, info);
    }


    componentDidMount() {
        const fthis = this;
        if (this.myApp.state.recomendItems.length > 0) {
            fthis.setState({
                isLoaded: true,
                items: this.myApp.state.recomendItems
            });
        }
        else
            $.ajax({
                url: "https://api.eol.co.il/radio/v1/hp-recommended",
                type: 'GET',
                dataType: "json",
                contentType: 'application/json; charset = utf-8',
                success: function (results) {
                    fthis.setState({
                        isLoaded: true,
                        items: results
                    });
                },
                error: function (req, status) {//
                    //    alert("error ajax"+ req+status)
                    console.log(req, status);
                    fthis.setState({
                        isLoaded: true,
                        error: true
                    });
                }
            });
    }

    render() {

        const { error, isLoaded, items, hasError } = this.state;

        if (hasError) {
            return (
                <Error showRecomends={false} />
            );
        } else {
            if (error) {
                return <Error title={"תקלת תקשורת"} showRecomends={false} />;
            } else if (!isLoaded) {

                return (
                    <div>

                        <div className="item_group w-clearfix" style={{ width: "100%" }}>
                            <div className="item_pict_group loadingBackgrounAnimation">
                                <div className="item_pict_link w-inline-block"></div>    {/* a */}
                                <div className="item_pict_infogroup">
                                    <h3 className="loadingBackgrounAnimation"> </h3>
                                    <div className="item_cat_group">
                                        <div className="item_cat_link loadingBackgrounAnimation"> </div>
                                        <div className="item_cat_bullet" />
                                        <div className="loadingBackgrounAnimation"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item_date_group">
                                <div className="loadingBackgrounAnimation" style={{ width: "55px" }}> <h3> </h3> </div>
                                <div className="item_time_group">
                                    <div className="item_time loadingBackgrounAnimation">
                                        --
                                </div>
                                    <div>דקות</div>
                                </div>
                            </div>
                            <div className="item_txt loadingBackgrounAnimation" style={{ width: "100%", height: "100px", marginRight: "0" }}>
                            </div><div className="item_play_link">להאזנה</div>
                            <div className="item_social_group">
                                <div className="share_basic w-inline-block">
                                    <div className="share_basic_icon"><img src="images/ic_share.svg" alt="" /></div>
                                    <div className="share_txt">שתף</div>
                                </div>
                            </div>
                        </div>
                        <div className="item_group w-clearfix" style={{ width: "100%" }}>
                            <div className="item_pict_group loadingBackgrounAnimation">
                                <div className="item_pict_link w-inline-block"></div>    {/* a */}
                                <div className="item_pict_infogroup">
                                    <h3 className="loadingBackgrounAnimation"> </h3>
                                    <div className="item_cat_group">
                                        <div className="item_cat_link loadingBackgrounAnimation"> </div>
                                        <div className="item_cat_bullet" />
                                        <div className="loadingBackgrounAnimation"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item_date_group">
                                <div className="loadingBackgrounAnimation" style={{ width: "55px" }}> <h3> </h3> </div>
                                <div className="item_time_group">
                                    <div className="item_time loadingBackgrounAnimation">
                                        00
                                </div>
                                    <div>דקות</div>
                                </div>
                            </div>
                            <div className="item_txt loadingBackgrounAnimation" style={{ width: "100%", height: "100px", marginRight: "0" }}>
                            </div><div className="item_play_link">להאזנה</div>
                            <div className="item_social_group">
                                <div className="share_basic w-inline-block">
                                    <div className="share_basic_icon"><img src="images/ic_share.svg" alt="" /></div>
                                    <div className="share_txt">שתף</div>
                                </div>
                            </div>
                        </div>
                        <div className="item_group w-clearfix" style={{ width: "100%" }}>
                            <div className="item_pict_group loadingBackgrounAnimation">
                                <div className="item_pict_link w-inline-block"></div>    {/* a */}
                                <div className="item_pict_infogroup">
                                    <h3 className="loadingBackgrounAnimation"> </h3>
                                    <div className="item_cat_group">
                                        <div className="item_cat_link loadingBackgrounAnimation"> </div>
                                        <div className="item_cat_bullet" />
                                        <div className="loadingBackgrounAnimation"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item_date_group">
                                <div className="loadingBackgrounAnimation" style={{ width: "55px" }}> <h3> </h3> </div>
                                <div className="item_time_group">
                                    <div className="item_time loadingBackgrounAnimation">
                                        00
                                </div>
                                    <div>דקות</div>
                                </div>
                            </div>
                            <div className="item_txt loadingBackgrounAnimation" style={{ width: "100%", height: "100px", marginRight: "0" }}>
                            </div><div className="item_play_link">להאזנה</div>
                            <div className="item_social_group">
                                <div className="share_basic w-inline-block">
                                    <div className="share_basic_icon"><img src="images/ic_share.svg" alt="" /></div>
                                    <div className="share_txt">שתף</div>
                                </div>
                            </div>
                        </div>
                    </div>);
            } else {
                return (
                    <div>
                        {this.props.myParent.props.code !== "no_records_were_found" &&
                            <div className="top_title_group">
                                <div className="top_title_txt">בינתיים, אולי תרצו להכיר תכנים חדשים ומעניינים?</div>
                            </div>

                        }

                        {
                            items.map((item, index) => {
                                return <RecomendItem key={index} item={item} index={index} myApp={this.props.myApp} noResults={true} />
                            })
                        }

                    </div>

                );
            }
        }
    }
}



export class ErrorConnection extends React.Component {

    render() {
        return <div className="content_section program">
            <div className="program_title_group _404">
                <h1 className="program_main_title _404">אין חיבור לאינטרנט</h1>
                <div>אנו זקוקים לאינטרנט לשם הפעלת האפליקציה.<br />אנא הפעילו את האינטרנט במכשיר ונסו להיכנס שוב.</div>
            </div>
        </div>

    }
}