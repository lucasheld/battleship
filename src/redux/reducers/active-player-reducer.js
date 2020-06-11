export default function (state = null, action) {
    //console.log(state + " " + action)
    switch (action.type) {
        case "ACTIVE_PLAYER":
            /*if(state != null) {
                for(let v in state) {
                    console.log(v + state.name);
                }
            }
            console.log(action.data.name);*/
            return action.data;
        default:
            console.log(state)
            return state;
    }
}
