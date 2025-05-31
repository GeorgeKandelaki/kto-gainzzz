export function calculateDays(startDate, endDate) {
	let start = new Date(startDate);
	let end = new Date(endDate);
	let timeDifference = end - start;
	let daysDifference = timeDifference / (1000 * 3600 * 24);

	return Math.round(daysDifference);
}
