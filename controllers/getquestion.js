

const getquestion = (req, res) => {
    console.log(`${req.method} ${req.baseUrl} `); 
    if (req.params.quesnum === "1"){
        res.json({
            "title": `Python - Lesson ${req.params.quesnum}`,
            "instructions": `Instructions for Python, lesson ${req.params.quesnum}`,
            "initialCode": `def add(a, b):\n    return a+b`
        })
    }else {
        res.json({
            "title": `Python - Lesson ${req.params.quesnum}`,
            "instructions": `Instructions for Python, lesson ${req.params.quesnum}`,
            "initialCode": `print("Goodbye, World! ${req.params.quesnum}")`
    
        })
    }
    
}

export default getquestion