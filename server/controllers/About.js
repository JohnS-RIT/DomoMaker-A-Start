const aboutPage = (req, res) => {
    res.render('about', { csrfToken: req.csrfToken() });
};

module.exports.aboutPage = aboutPage;