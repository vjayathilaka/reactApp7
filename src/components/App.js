import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className="ui container">
                    <Header/>
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/stream/create" component={StreamCreate}/>
                    <Route path="/stream/edit" component={StreamEdit}/>
                    <Route path="/stream/delete" component={StreamDelete}/>
                    <Route path="/stream/show" component={StreamShow}/>
                </div>
            </BrowserRouter>

        </div>
    );
};

export default App;
