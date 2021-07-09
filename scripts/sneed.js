    const FARMER_EYE_SCLERA_COLOR = "#BCCDD5";
		const FARMER_EYE_PUPIL_COLOR = "#0C141F";
		const FARMER_EYE_IMAGE = document.getElementById("farmerHead").getElementsByTagName("img")[0];
		const FARMER_EYE_POSITIONS = [[100, 235], [240, 230]];
		const FARMER_EYE_CANVAS = document.getElementById("farmerHead").getElementsByTagName("canvas")[0];
		let FARMER_EYE_CANVAS_CLIENT_RECT = null;
		let FARMER_EYE_CANVAS_SCALING_FACTORS = null;
		//Updates any screen-based measurements when the window size is changed
		function updateScreenBasedMeasurements() {
			FARMER_EYE_CANVAS_CLIENT_RECT = FARMER_EYE_CANVAS.getBoundingClientRect();
			FARMER_EYE_CANVAS_SCALING_FACTORS = [FARMER_EYE_CANVAS.width / FARMER_EYE_CANVAS_CLIENT_RECT.width, FARMER_EYE_CANVAS.height / FARMER_EYE_CANVAS_CLIENT_RECT.height];
		};
		FARMER_EYE_IMAGE.src = "/images/sneedHead.png";
		updateScreenBasedMeasurements();
		window.addEventListener("resize", updateScreenBasedMeasurements);
		const FARMER_EYE_MAX_LOOK_DISTANCE = 15;
		const FARMER_EYE_PUPIL_RADIUS = 8;
		const FARMER_EYE_CANVAS_CONTEXT = FARMER_EYE_CANVAS.getContext("2d");
		FARMER_EYE_CANVAS_CONTEXT.strokeStyle = "#00000000";
		function clientToCanvasPosition(coordinates) {
			return [FARMER_EYE_CANVAS_SCALING_FACTORS[0] * (coordinates[0] - FARMER_EYE_CANVAS_CLIENT_RECT.left), FARMER_EYE_CANVAS_SCALING_FACTORS[1] * (coordinates[1] - FARMER_EYE_CANVAS_CLIENT_RECT.top)];
		};
		function updateFarmerEyePosition(mouseMoveEvent) {
			FARMER_EYE_CANVAS_CONTEXT.fillStyle = FARMER_EYE_SCLERA_COLOR;
			FARMER_EYE_CANVAS_CONTEXT.fillRect(67, 190, 300, 70);

			const MOUSE_POSITION = [mouseMoveEvent.clientX, mouseMoveEvent.clientY];
			const MOUSE_POSITION_CANVAS = clientToCanvasPosition(MOUSE_POSITION);
			let THETAS = [Math.atan((MOUSE_POSITION_CANVAS[1] - FARMER_EYE_POSITIONS[0][1]) / (MOUSE_POSITION_CANVAS[0] - FARMER_EYE_POSITIONS[0][0])), Math.atan((MOUSE_POSITION_CANVAS[1] - FARMER_EYE_POSITIONS[1][1]) / (MOUSE_POSITION_CANVAS[0] - FARMER_EYE_POSITIONS[1][0]))];
			//Adding pi to the result if the sign of MOUSE_POSITION_CANVAS[1] - FARMER_EYE_POSITIONS[0][1] is negative gives the correct value of arctan, since the Math.atan() function only returns solutions within the interval [-pi/2, pi/2]
			for (let i = 0; i < 2; i++) {
				if (MOUSE_POSITION_CANVAS[0] - FARMER_EYE_POSITIONS[i][0] < 0) {
					THETAS[i] += Math.PI;
				};
			};
			const FARMER_EYE_LOOK_DISTANCES = [Math.min(Math.sqrt(Math.pow(FARMER_EYE_POSITIONS[0][0] - MOUSE_POSITION_CANVAS[0], 2) + Math.pow(FARMER_EYE_POSITIONS[0][1] - MOUSE_POSITION_CANVAS[1], 2)), FARMER_EYE_MAX_LOOK_DISTANCE), Math.min(Math.sqrt(Math.pow(FARMER_EYE_POSITIONS[1][0] - MOUSE_POSITION_CANVAS[0], 2) + Math.pow(FARMER_EYE_POSITIONS[1][1] - MOUSE_POSITION_CANVAS[1], 2)), FARMER_EYE_MAX_LOOK_DISTANCE)];
			const FARMER_EYE_LOOK_POSITIONS = [[FARMER_EYE_POSITIONS[0][0] + FARMER_EYE_LOOK_DISTANCES[0] * Math.cos(THETAS[0]), FARMER_EYE_POSITIONS[0][1] + FARMER_EYE_LOOK_DISTANCES[0] * Math.sin(THETAS[0])], [FARMER_EYE_POSITIONS[1][0] + FARMER_EYE_LOOK_DISTANCES[1] * Math.cos(THETAS[1]), FARMER_EYE_POSITIONS[1][1] + FARMER_EYE_LOOK_DISTANCES[1] * Math.sin(THETAS[1])]];
			FARMER_EYE_CANVAS_CONTEXT.fillStyle = FARMER_EYE_PUPIL_COLOR;
			FARMER_EYE_CANVAS_CONTEXT.beginPath();
			FARMER_EYE_CANVAS_CONTEXT.arc(FARMER_EYE_LOOK_POSITIONS[0][0], FARMER_EYE_LOOK_POSITIONS[0][1], FARMER_EYE_PUPIL_RADIUS, 0, 2 * Math.PI);
			FARMER_EYE_CANVAS_CONTEXT.fill();
			FARMER_EYE_CANVAS_CONTEXT.beginPath();
			FARMER_EYE_CANVAS_CONTEXT.arc(FARMER_EYE_LOOK_POSITIONS[1][0], FARMER_EYE_LOOK_POSITIONS[1][1], FARMER_EYE_PUPIL_RADIUS, 0, 2 * Math.PI);
			FARMER_EYE_CANVAS_CONTEXT.fill();
		};
		window.addEventListener("mousemove", updateFarmerEyePosition);

		//Causes the sclera and pupils to be drawn looking towards the left before the mouse moves for the first time
		const ARTIFICIAL_MOUSEMOVE_EVENT = new MouseEvent("mousemove", {
			clientX: FARMER_EYE_POSITIONS[0][0] - 100,
			clientY: (FARMER_EYE_POSITIONS[0][1] + FARMER_EYE_POSITIONS[1][1]) / 2
		});
		window.dispatchEvent(ARTIFICIAL_MOUSEMOVE_EVENT);