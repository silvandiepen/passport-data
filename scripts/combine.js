const fs = require('fs');

let passport = JSON.parse(fs.readFileSync('./src/passports.json', 'utf8'));

// console.log(passport);

console.log(passport.length);

let newFile = {};

function removePassport(obj){
	delete obj.Passport;
	return obj;
}


passport.forEach((country, index) => {
	
	newFile[country.Passport] = removePassport(country);

	if ((index + 1) === passport.length) {

		fs.writeFileSync(
			'all-countries.json',
			JSON.stringify(newFile),
			'utf8'
		);
	
	}
});
