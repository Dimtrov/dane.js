/**
 * 
 * @returns {Router}
 */
module.exports = (router) => {

    router.get('/', (req, res) => {

        return res.send(router.url('about', {id: 12}))
    });
    router.get('/about/:id', 'Home@about', 'about');

    return router;
}