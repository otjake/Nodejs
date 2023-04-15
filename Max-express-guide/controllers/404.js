exports.badRoute = (req,res,next)=> {
    res.status(404).send('<h1>Page Unfound</h1>');
}