const schema = {
	properties: {
		dimension: {
			pattern: "^[0-9]+$",
			message: "Dimension must be number only",
			required: true,
			description: "Enter dimension of the zombie world.",
			default: "4" // Default 4 dimension matrix
		},
		zombie_init_position: {
			pattern: /^\(\d+,\d+\)/gm,
			message: "Zombie position must be in (x,y) format",
			required: true,
			description: "Enter Zombie's initial position in (x,y) format",
			default: "(3,1)" // Default (3,1) zombie init posstion
		},
		creature_init_position: {
			pattern: /^\(\d+,\d+\)|(\d+,\d+)/gm,
			required: true,
			description:
				"Enter Creature's initial positions in (x,y)(p,q)(a,b).. format",
			message: "Zombie position must be in (x,y)(p,q)(a,b).. format",
			default: "(0,1)(1,2)(1,1)" // Default (0,1)(1,2)(1,1) creatures init posstion
		},
		zombie_moves: {
			pattern: /^[U,D,L,R \.\,\+\-]*$/gm,
			required: true,
			description: "Enter Zombie's moves",
			message: "Acceptable moves are U,D,L,R only",
			default: "RDRU" // Default zombie moves
		}
	}
};

module.exports = schema;
