const fs = require('fs');

let passportData = JSON.parse(fs.readFileSync('./src/passports.json', 'utf8'));
let passportStats = [];

passportData.forEach((passport) => {
	// console.log(passport.Passport);

	let score = {
		total: 0,
		free: 0,
		eta: 0,
		arrival: 0,
		required: 0
	};

	Object.keys(passport).forEach((country, index) => {
		// console.log(passport[country]);
		switch (passport[country]) {
			case 3:
				score.free++;
				break;
			case 2:
				score.eta++;
				break;
			case 1:
				score.arrival++;
				break;
			case 0:
				score.required++;
				break;
		}
		if (Object.keys(passport).length == index + 1) {
			score.total = score.free * 3 + score.eta * 2 + score.arrival * 1;
			let newCountry = Object.assign({ id: passport.Passport }, score);
			// console.log(newCountry);
			newCountryArray = [];
			newCountryArray[passport.Passport] = newCountry;
			passportStats.push(newCountryArray);

			fs.writeFileSync(
				'stats/'+ passport.Passport +'.json',
				JSON.stringify(newCountry),
				'utf8'
			);
		}
	});
});