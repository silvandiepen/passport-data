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
	// console.log(country.Passport, index);
	
	let passportName = country.Passport + '';
	// console.log(passportName);
	
	// setTimeout(function(){
		delete country.Passport;

		
	fs.writeFileSync(
		'country/' + passportName + '.json',
		JSON.stringify(removePassport(country)),
		'utf8'
	);

// 	// newFile[country.Passport] = country;
// 	// if ((index + 1) === passport.length) {
// 	// 	console.log('hoiii');
		
// 	// fs.writeFileSync(
// 	// 	'all-countries.json',
// 	// 	JSON.stringify(newFile),
// 	// 	'utf8'
// 	// );
// 	// },10);
	
// 	}
});
