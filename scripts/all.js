const fs = require('fs');

let passportData = JSON.parse(fs.readFileSync('./src/passports.json', 'utf8'));
let passportTitles = JSON.parse(
	fs.readFileSync('./src/countries.json', 'utf8')
);
let passportStats = [];

passportData.forEach((passport, i) => {
	// console.log(passport.Passport);

	let score = {
		id: passport.Passport,
		title: passportTitles[i].title,
		short_title: passportTitles[i].short_title,
		score: {
			total: 0,
			free: 0,
			eta: 0,
			arrival: 0,
			required: 0
		},
		data: passport
	};

	delete score.data.Passport;

	Object.keys(passport).forEach((country, index) => {
		switch (passport[country]) {
			case 3:
				score.score.free++;
				break;
			case 2:
				score.score.eta++;
				break;
			case 1:
				score.score.arrival++;
				break;
			case 0:
				score.score.required++;
				break;
		}
		if (Object.keys(passport).length == index + 1) {
			score.score.total =
				score.score.free * 3 + score.score.eta * 2 + score.score.arrival * 1;
			// console.log(title);
			let newCountry = Object.assign({}, score);
			passportStats.push(newCountry);
		}
	});
});

// console.log(JSON.stringify(passportStats));
setTimeout(() => {
	fs.writeFileSync('all.json', JSON.stringify(passportStats), 'utf8');
}, 1000);
