import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./Container";


function App() {
    const { store } = useContext(Context);
    console.log(store.page);
    return <div className="container mx-auto max-w-screen-2xl">
        <h1>App</h1>
        <div>{store.page}</div>
        <button onClick={()=>{store.setPage(store.page+1)}}>Next Page</button>
    </div>
}

export default observer(App) 