const log = require("../lib/Logger")("App") || console;
const schema = require("../lib/schema");
const prompt = require("prompt");

prompt.start();

let zombie_count = 0; //init count of zombies

prompt.get(schema, (err, result) => {
	if (err) {
		return onErr(err);
	}
	const {
		dimension,
		zombie_init_position,
		creature_init_position,
		zombie_moves
	} = result;

	const zombie_init = zombie_init_position.replace(/[()]/g, "").split(",");

	const zombies = [
		{
			x: parseInt(zombie_init[0]),
			y: parseInt(zombie_init[1])
		}
	];

	const creatures = new Array();

	const creature_init = creature_init_position.split(")(");

	for (let i = 0; i < creature_init.length; i++) {
		creature_init[i] = creature_init[i].replace(/[()]/g, "").split(",");
		const creature = {
			x: parseInt(creature_init[i][0]),
			y: parseInt(creature_init[i][1])
		};
		creatures.push(creature);
	}

	const moves = executeMoves(zombie_moves);

	for (let j = 0; j < zombies.length + creatures.length; j++) {
		if (j + 1 > zombies.length) {
			break;
		}
		move(zombies[j], moves, dimension, creatures, zombies);
	}

	let zombie_positions = "";
	for (let i = 0; i < zombies.length; i++) {
		zombie_positions += "(" + zombies[i].x + "," + zombies[i].y + ")";
	}

	let creature_positions = "";
	for (let i = 0; i < creatures.length; i++) {
		creature_positions += "(" + creatures[i].x + "," + creatures[i].y + ")";
	}

	log.info(" -------------- Output ------------- ");
	log.result(" Zombies’ positions: " + (zombie_positions || "none"));
	log.result(" Creatures’ positions: " + (creature_positions || "none"));
});

/**
 * Method for executing each moves depending upon instructions.
 */
const executeMoves = zombie_moves => {
	const moves = [];
	for (let x = 0; x < zombie_moves.length; x++) {
		const character = zombie_moves.charAt(x);
		switch (character) {
			case "U":
				moves.push({
					x: 0,
					y: -1
				});
				break;
			case "D":
				moves.push({
					x: 0,
					y: 1
				});
				break;
			case "R":
				moves.push({
					x: 1,
					y: 0
				});
				break;
			case "L":
				moves.push({
					x: -1,
					y: 0
				});
				break;
		}
	}
	return moves;
};

/**
 * Method to similate each zombie move.
 */
const move = (zombie, moves, dimension, creatures, zombies) => {
	for (let i = 0; i < moves.length; i++) {
		zombie.x += moves[i].x;
		zombie.y += moves[i].y;

		if (zombie.x >= dimension) {
			zombie.x -= dimension;
		} else if (zombie.x < 0) {
			zombie.x += dimension;
		}
		if (zombie.y >= dimension) {
			zombie.y -= dimension;
		} else if (zombie.y < 0) {
			zombie.y += dimension;
		}

		log.info(
			"Zombie " +
				zombie_count +
				" moved to (" +
				zombie.x +
				", " +
				zombie.y +
				")"
		);

		if (infect(zombie, creatures, zombies) == true) {
			zombie_count++;
		}
	}
};

/**
 * Method that will infect a creature and turn him into a zombie.
 */
const infect = (zombie, creatures, zombies) => {
	let isInfected = false;
	for (let i = 0; i < creatures.length; i++) {
		if (zombie.x == creatures[i].x && zombie.y == creatures[i].y) {
			log.warn(
				"Zombie " +
					zombie_count +
					" infected creature at (" +
					zombie.x +
					", " +
					zombie.y +
					")"
			);
			isInfected = true;
			zombies.push(creatures[i]);
			creatures.splice(i, 1);
		}
	}
	return isInfected;
};

const onErr = err => {
	log.error(err);
	return 1;
};
