const assert = require('assert');
const userValidationSchema = require('../../../domain/validation/user');

function givenInvalidName_ShouldGiveError() {
    const {error, result} = userValidationSchema.validate({
        id: 1,
        name: "Jack3 Miller",
        email: "test@gmail.com",
        password: "234234alskdf",
        repeat_password: "234234alskdf"

    });
    assert(error != undefined, 'Name should not contain numbers!');
}

function noNameGiven_ShouldGiveError() {
    const {error, result} = userValidationSchema.validate({
        id: 1,
        email: "test@gmail.com",
        password: "234234alskdf",
        repeat_password: "234234alskdf"

    });
    assert(error != undefined, 'Name validation failed');
}

function nameLessThan4CharecterLong_ShouldGiveError() {
    const {error, result} = userValidationSchema.validate({
        id: 1,
        name: "Jac",
        email: "test@gmail.com",
        password: "234234alskdf",
        repeat_password: "234234alskdf"

    });
    assert(error != undefined, 'Name length validation failed');
}

function invalidEmail_ShouldGiveError() {
    const { error, result } = userValidationSchema.validate({
        id: 1,
        name: "Jack Miller",
        email: "test@gmail",
        password: "234234alskdf",
        repeat_password: "234234alskdf"
    });

    assert(error != undefined);
}

function invalidPasswordPattern_ShouldGiveError() {
    const { error, result } = userValidationSchema.validate({
    id: 1,
    name: "Jack Miller",
    email: "test@gmail.com",
    password: "12312",
    repeat_password: "12312"
    });

    assert(error != undefined);
}

function repeatPasswordNotMatch_ShouldGiveError() {
    const { error, result } = userValidationSchema.validate({
    id: 1,
    name: "Jack Miller",
    email: "test@gmail.com",
    password: "12312Dfkjadkf",
    repeat_password: "00012Dfkjadkf"
    });

    assert(error != undefined);
}


givenInvalidName_ShouldGiveError();
noNameGiven_ShouldGiveError();
nameLessThan4CharecterLong_ShouldGiveError();
invalidEmail_ShouldGiveError();
invalidPasswordPattern_ShouldGiveError();
repeatPasswordNotMatch_ShouldGiveError();