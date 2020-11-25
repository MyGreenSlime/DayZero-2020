const readline = require("readline-sync");
const generateDeck = () => {
	const faces = ["Clubs", "Spades", "Hearts", "Diamonds"];
	const points = [...Array(13).keys()];
	const deck = [];
	faces.forEach((face) => {
		points.forEach((point) => {
			deck.push(`${face}-${point}`);
		});
	});
	return deck;
};
const get2Card = (deck) => {
	const firstIndex = Math.floor(Math.random() * deck.length);
	const firstCard = deck[firstIndex];
	deck.splice(firstIndex, 1);
	const secondIndex = Math.floor(Math.random() * deck.length);
	const secondCard = deck[secondIndex];
	deck.splice(secondIndex, 1);
	return [firstCard, secondCard];
};
const calulateScore = (card) => {
	const point = parseInt(card.split("-")[1]) + 1;
	if (point >= 10) {
		return 0;
	}
	return point;
};
const cardShow = (card) => {
	const [face, point] = card.split("-");
	switch (point) {
		case "0":
			return `${face}-Ace`;
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return `${face}-${parseInt(point) + 1}`;
		case "10":
			return `${face}-Jack`;
		case "11":
			return `${face}-Queen`;
		case "12":
			return `${face}-King`;
	}
};
let totalChip = 0;
while (true) {
	const betChips = readline.question("Please put your bet \n");
	const deck = generateDeck();
	const playerCards = get2Card(deck);
	const dealerCards = get2Card(deck);
	const playerScore = playerCards.reduce((previous, current) => {
		return calulateScore(previous) + calulateScore(current);
	});
	const dealerScore = dealerCards.reduce((previous, current) => {
		return calulateScore(previous) + calulateScore(current);
	});
	console.log(
		`You got ${playerCards.map((card) => cardShow(card)).join(", ")}`
	);
	console.log(
		`The dealer got ${dealerCards.map((card) => cardShow(card)).join(", ")}`
	);
	if (playerScore > dealerScore) {
		totalChip += parseInt(betChips);
		console.log(`You Won!!!, received ${betChips} chips`);
	} else if (playerScore == dealerScore) {
		console.log(`You got nothing :|`);
	} else {
		totalChip -= parseInt(betChips);
		console.log(`You lose :( , lost ${betChips} chips`);
	}

	const ans = readline.question("Wanna play more? (Yes/No) \n");
	if (ans === "No") {
		console.log(`You got total ${totalChip} chips`);
		break;
	} else if (ans === "Yes") {
		continue;
	} else {
		throw new Error("Invalid Argument");
	}
}
