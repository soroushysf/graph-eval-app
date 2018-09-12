/**
 * Created by soroush on 9/12/18.
 */

export default function (state = null, action) {

    switch (action.type) {
        case 'DISTANCE_ARRAY_MADE':
            return action.payload;
    }

    return state;
}