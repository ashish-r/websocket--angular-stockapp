// function to display time in moments form
function timeSince(date) {
	var seconds = Math.floor((new Date() - date) / 1000); // calculating difference of seconds between current datetime and provided date time
	var interval = Math.floor(seconds / 31536000); //calculating no. of difference in terms of years
	if (interval > 1) {
		return interval + " Years Ago";
	}
	interval = Math.floor(seconds / 2592000); //calculating no. of difference in terms of months
	if (interval > 1) {
		return interval + " Months Ago";
	}
	interval = Math.floor(seconds / 86400); //calculating no. of difference in terms of days
	if (interval > 1) {
		return interval + " Days Ago";
	}
	interval = Math.floor(seconds / 3600); //calculating no. of difference in terms of Hours
	if (interval > 1) {
		return interval + " Hours Ago";
	}
	interval = Math.floor(seconds / 60); //calculating no. of difference in terms of Minutes
	if (interval > 1) {
		return interval + " Minutes Ago";
	}
	return " Just Now"; // For durations less than one minute
}
