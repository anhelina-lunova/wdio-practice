class SignInForm {
    get emailField() {
        return $('#signinEmail');
    }
    get passwordField() {
        return $('#signinPassword');
    }
    get submitButton() {
        return $('.modal-content .btn-primary');
    }

    get errorMessage() {
        return $('.alert-danger');
    }

    get emailErrorMessage() {
        return $('form>div:nth-child(1) .invalid-feedback');
    }

    get emailLabel() {
        return $('label[for="signinEmail"]');
    }

    get passwordErrorMessage() {
        return $('form>div:nth-child(2) .invalid-feedback');
    }
    get passwordLabel() {
        return $('label[for="signinPassword"]');
    }
}

export default new SignInForm();
