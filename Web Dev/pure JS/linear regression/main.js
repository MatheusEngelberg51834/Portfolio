const math = require('mathjs');


class LinearRegressor {
    constructor([x, y]) {
        this.x = x
        this.y = y
    }

    hypothesis(w, x) {
        let w_ = math.matrix(w)
        let x_ = math.matrix(x)
        let hypothesis = []
        for(let i of x) {
            hypothesis.push([math.dot(math.transpose(w_), i)])
        }
        return(hypothesis)
    }

    gradient(hypothesisFunction, w, x, y) {
        let gradient = math.zeros(x[0].length)
        let hypothesis = hypothesisFunction(w, x)
        for(let i =0; i < x.length; i++ ){
                gradient = math.add(x[i].map(x => x * (hypothesis[i] - y[i])), gradient)
        }
        return(gradient)
    }

    gradientDescent(eta, iterations, gradFunction, hypothesisFunction, x, y, w) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i< iterations; i++) {
                let gradient = gradFunction(hypothesisFunction, w, x, y)
                w = math.subtract(w, gradient.map(x => x * eta))
                if(i % 10 == 0) {
                    console.log('iteration: ' + i + ', w: ' + w )
                }
            }
            console.log('Optimal w: ' + w)
            resolve(w)
        })
    }

    score() {
        return
    }

    predict(w, x_) {
        return hypothesis(w, x)
    }

    coeficients() {
        return
    }

}
