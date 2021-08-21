const handleSignin = (req, res, db) => {
    const {name, password} = req.body;
    if (!name || !password){
        return res.status(400).json('Incorrect form submission');
    }
    db.select('name', 'password').from('users')
    .where('name', '=', name)
    .then(data => {
        const isValid = (data[0].name === name)
        if (isValid) {
            console.log(isValid);
        } else {
            res.status(400).json('Wrong credentials!')
        }
    })
}

module.exports = {
    handleSignin : handleSignin
};