const csv = require('csv-parser');
const fs = require('fs');

class DatasetCreator {
    constructor(csvFile, targetColumn) {
        this.csvFile = csvFile;
        if (typeof targetColumn == 'string') {
            this.targetColumn = targetColumn;
        }
    }

    // encodeCategorical(){
    //     return
    // }

    // normalize(){
    //     return
    // }

    // vectorOperation(){
    //     return
    // }

    // fillNan(){
    //     return
    // }

    // dropNan(){
    //     return
    // }

    readCsv() {
        /*
    
    put the data in the csv into a csv vector and make sure there are no categorical variables in the file
    TODO:
    -- NUMBERS VALIDATION

    */ 
        return new Promise((resolve, reject) => {
            let csvData = []
            let fullNumbers = true
            fs.createReadStream(this.csvFile)
                .pipe(csv())
                .on('data', (data) => csvData.push(data))
                .on('end', () => {
                    resolve(csvData);
                });
        })
    }

    makeY(csv) {
        /*
    
    get the target matrix for the ml algorithms and return also the rest of the data

    */
        return new Promise((resolve, reject) => {
            let y = []
            this.readCsv(csv).then(response => {
                for (let i of response) {
                    y.push(parseFloat(i[this.targetColumn]))
                    delete i[this.targetColumn]
                }
                resolve([y, response])
            })
        })
    }

    makeX([y, remainingData]) {
        /*
    
    get the X matrix for the training and return also the y

    */
        return new Promise((resolve, reject) => {
            let x = []
            for (let j of remainingData) {
                x.push(Object.values(j).map(x => parseFloat(x)))
            }
            resolve([x, y])
        })
    }

    csvIntoXY(csv) {
        /*
    
    use the makeY and makeX functions together to get the X and y in only one function and in a sync way

    */

        return new Promise((resolve, reject) => {
            this.makeY(csv, this.targetColumnColumn)
                .then(([y, remainingData]) => {
                    return this.makeX([y, remainingData])
                })
                .then(([x, y]) => {
                    resolve([x, y])
                })
        })
    }
}
