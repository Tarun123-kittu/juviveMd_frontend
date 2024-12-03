export const calculateAge = (dateString, givenYear = new Date().getFullYear()) => {
    const birthDate = new Date(dateString);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let age = givenYear - birthYear;

    const today = new Date(givenYear, new Date().getMonth(), new Date().getDate());
    const currentYearBirthday = new Date(givenYear, birthMonth, birthDay);

    if (today < currentYearBirthday) {
        age--;
    }

    return age;
};