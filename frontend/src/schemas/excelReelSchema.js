// This schema is passed to read-excel-file package. It has all the required
// fields which are saved to DB.

const excelReelSchema = {
    'S.NO': {
        // JSON object property name.
        prop: 'index',
        type: Number,
        required: true
    },
    'SIZE': {
        prop: 'size',
        type: Number,
        required: true
    },
    'GSM': {
        prop: 'gsm',
        type: Number,
        required: true
    },
    'SHADE': {
        prop: 'shade',
        type: String,
        required: true
    },
    'BF': {
        prop: 'bf',
        type: Number,
        required: true
    },
    'WEIGHT': {
        prop: 'weight',
        type: Number,
        required: true
    },
    'REEL NO': {
        prop: 'reelNo',
        type: String,
        required: true
    },
    'RATE': {
        prop: 'rate',
        type: Number,
        required: true
    }
}

export default excelReelSchema;