const handleLogin = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("pass").val() == '') {
        handleError("RAWR! Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("pass").val() == '' || $("pass2").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("RAWR! Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

const AboutWindow = (props) => {
    return (
        <div id="aboutDiv">
            <h3 id="domoH">About Domo</h3>
            <p id="domoP">Domo, the main character, is a brown, furry and oviparous monster with a large, sawtoothed mouth that is locked wide open. His favorite food is nikujaga, a Japanese meat and potato stew. According to a Tokyopop press release of the Domo comic book, Domo "communicates sotto voce with a verve that only his friends can understand." Clint Bickham, the writer of the Domo comic book, said that to him Domo's expression is "a sort of cheery wonderment. Like when a kid wakes to a room full of presents on Christmas day." While Domo's face has variants, to Bickham most of his expressions have "an underlying sense of fascination." Domo is known to pass gas repeatedly when nervous or upset. He also sweats when nervous.
                <br></br>
                <br></br>
                Domo lives in a cave with Mr. Usaji, known in Japanese-language versions as Usajii (うさじい), a portmanteau of the words usagi (うさぎ), (rabbit), and jii (じい) (old man, grandpa). Mr. Usaji is a wise old rabbit who has lived in a cave for decades, loves to watch television and drink astringent green tea.[2] Mr. Usaji is not into any "new" materials, and does not own a telephone.[2][5] In terms of fashion, Mr. Usaji focuses on materials instead of shapes. Mr. Usaji's favorite food is carrots, and his least favorite food is "something that is meaningless."
                <br></br>
                <br></br><i>Sourced from Wikipedia</i>
            </p>
        </div>
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createAboutWindow = (csrf) => {
    ReactDOM.render(
        <AboutWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const aboutButton = document.querySelector("#aboutButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    aboutButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAboutWindow(csrf);
        return false;
    });

    createLoginWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});