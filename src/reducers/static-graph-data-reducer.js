/**
 * Created by soroush on 7/16/18.
 */
export default function () {
    return {
        "nodes":[
            {"id": "a", "group": 1},
            {"id": "b", "group": 1},
            {"id": "c", "group": 1},
            {"id": "d", "group": 1},
            {"id": "e", "group": 1},
            {"id": "f", "group": 1},
            {"id": "g", "group": 1},
            {"id": "h", "group": 1},
            {"id": "i", "group": 1},
            {"id": "j", "group": 1},
            {"id": "k", "group": 1},
            {"id": "l", "group": 1},
            {"id": "m", "group": 1}
        ],
        "links":[
            {"source": "a", "target": "b", "value": 1},
            {"source": "b", "target": "c", "value": 1},
            {"source": "b", "target": "d", "value": 1},
            {"source": "c", "target": "f", "value": 1},
            {"source": "d", "target": "h", "value": 1},
            {"source": "f", "target": "h", "value": 1},
            {"source": "g", "target": "d", "value": 1},
            {"source": "a", "target": "d", "value": 1},
            {"source": "c", "target": "h", "value": 1},
            {"source": "e", "target": "g", "value": 1},
            {"source": "l", "target": "m", "value": 1},
            {"source": "m", "target": "a", "value": 1},
            {"source": "k", "target": "d", "value": 1},
            {"source": "f", "target": "j", "value": 1},
            {"source": "i", "target": "b", "value": 1},
            {"source": "k", "target": "b", "value": 1},
            {"source": "m", "target": "j", "value": 1},
            {"source": "i", "target": "h", "value": 1}
        ]
    }
}